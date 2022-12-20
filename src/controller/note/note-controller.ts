import { generate } from "short-uuid";

import { FormBody } from "../../http/body-parser";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Logger } from "../../logger/logger";
import { Note } from "../../model/note-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { AttachmentsStore } from "../../stores/attachments/attachments-store";
import { NoteAttachmentsStore } from "../../stores/note/note-attachments-store";
import { NoteStore } from "../../stores/note/note-store";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import {
  EntityController,
  EntityControllerProperties,
} from "../entity-controller";

export interface NoteControllerProperties
  extends EntityControllerProperties<Note> {
  noteStore: NoteStore;
  noteAttachmentsStore: NoteAttachmentsStore;
  notebookStore: NotebookStore;
  attachmentsStore: AttachmentsStore;
  notebookID: string | null;
  noteTypesRegistry: NoteTypesRegistry;
  noteType: string;
  corsHeaders: CORSHeaders;
}

export class NoteController extends EntityController<Note> {
  protected logger: Logger;
  constructor(private noteControllerProperties: NoteControllerProperties) {
    super(noteControllerProperties);
    this.logger = this.noteControllerProperties.logger;
  }
  public async showCreateNewEntityPage(): Promise<HttpResponse> {
    const user = await this.noteControllerProperties.authenticator.authenticate(
      this.noteControllerProperties.authenticationToken
    );
    const createNewEntityResponse =
      this.noteControllerProperties.entityView.renderCreationFormOneEntity({
        type: { type: this.noteControllerProperties.noteType },
      });
    return await this.noteControllerProperties.postProcessorRegistry.processResponse(
      user.username,
      createNewEntityResponse
    );
  }
  public async showNotesInNotebook(notebookID: string): Promise<HttpResponse> {
    const user = await this.noteControllerProperties.authenticator.authenticate(
      this.noteControllerProperties.authenticationToken
    );
    const notes =
      await this.noteControllerProperties.noteStore.listAllInNotebook(
        user.username,
        notebookID
      );
    return this.noteControllerProperties.entityView.renderListPageAllEntities(
      notes
    );
  }

  public async listAttachments(noteID: string): Promise<HttpResponse> {
    const { note, username } = await this.getNote(noteID);
    const attachments =
      await this.noteControllerProperties.noteAttachmentsStore.listAllForNote(
        username,
        note.id
      );
    this.logger.info("Found attachments", { data: attachments });

    return {
      isBase64Encoded: false,
      headers: {
        "Content-Type": "application/json",
        ...this.noteControllerProperties.corsHeaders,
      },
      body: JSON.stringify({ attachments }),
      statusCode: HttpStatus.OK,
    };
  }
  public async downloadAttachment(
    noteID: string,
    attachmentID: string
  ): Promise<HttpResponse> {
    const { note, username } = await this.getNote(noteID);

    this.logger.info("Checking attachments");
    const noteAttachments =
      await this.noteControllerProperties.noteAttachmentsStore.listAllForNote(
        username,
        note.id
      );
    this.logger.info("Found attachments", { data: noteAttachments });
    this.logger.info("Checking noteAttachment");
    const noteAttachment = noteAttachments.find((a) => a.id === attachmentID);
    this.logger.info("Found noteAttachment", { data: noteAttachment });

    this.logger.info("Reading objectBody", {
      entityID: noteAttachment.objectKey,
    });
    const objectBody =
      await this.noteControllerProperties.attachmentsStore.read(
        noteAttachment.objectKey
      );
    this.logger.info("Got object body of length", {
      objectSize: objectBody.length,
    });

    return {
      isBase64Encoded: true,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${noteAttachment.name}.${noteAttachment.fileExtension}"`,
      },
      body: objectBody,
      statusCode: HttpStatus.OK,
    };
  }
  protected getEntityName(): string {
    return "note";
  }
  protected mapRequestToEntityID(requestForm: FormBody): string {
    return requestForm["note-id"];
  }
  protected mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note {
    const noteTypeHandler =
      this.noteControllerProperties.noteTypesRegistry.getNoteTypeHandler(
        existingNote.type.type
      );
    return noteTypeHandler.mapRequestToExistingEntity(
      username,
      existingNote,
      form
    );
  }
  protected mapRequestToNewEntity(username: string, form: FormBody): Note {
    let noteType = form["note-type"];
    if (noteType === "note") {
      const autoType =
        this.noteControllerProperties.noteTypesRegistry.getAutoType(
          form["note-content"]
        );
      if (autoType) {
        noteType = autoType;
      }
    }
    const noteTypeHandler =
      this.noteControllerProperties.noteTypesRegistry.getNoteTypeHandler(
        noteType
      );
    if (noteTypeHandler) {
      return noteTypeHandler.mapRequestToNewEntity(username, form);
    }
    return {
      id: generate(),
      notebookID: form["notebook-id"],
      owner: username,
      type: { type: "note" },
      content: form["note-content"],
    };
  }
  protected async isAuthorizedToCreate(
    user: string,
    entity: Note
  ): Promise<boolean> {
    const notebook = await this.noteControllerProperties.notebookStore.getOne(
      user,
      entity.notebookID
    );
    if (!notebook) {
      this.logger.info(
        "[isAuthorizedToCreate] notebook not found. Access denied",
        { data: notebook }
      );
      return false;
    }
    // if notebook is found, it means that user owns that notebook
    this.logger.info("[isAuthorizedToCreate] notebook found. Access granted", {
      data: notebook,
    });
    return true;
  }
  protected getEntityURL(note: Note): string {
    return `/notebook/${note.notebookID}`;
  }

  private async getUserName(): Promise<string> {
    this.logger.info("Checking user");
    const user = await this.noteControllerProperties.authenticator.authenticate(
      this.noteControllerProperties.authenticationToken
    );
    this.logger.info("Found user", { username: user.username });
    return user.username;
  }

  private async getNote(
    noteID: string
  ): Promise<{ note: Note; username: string }> {
    const username = await this.getUserName();
    this.logger.info("Checking note");
    const note = await this.noteControllerProperties.noteStore.getOne(
      username,
      noteID
    );
    this.logger.info("Found note", { data: note });
    return { note, username };
  }
}
