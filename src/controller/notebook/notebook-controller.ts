import { generate } from "short-uuid";

import { FormBody } from "../../http/body-parser";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Logger } from "../../logger/logger";
import { Notebook } from "../../model/notebook-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { NotebookTableColumnsRegistry } from "../../registries/notebook-table-columns-registry";
import { NoteStore } from "../../stores/note/note-store";
import { NoteHtmlView } from "../../views/note/note-html-view";
import { NotebookJsonView } from "../../views/notebook/notebook-json-view";
import {
  EntityController,
  EntityControllerProperties,
} from "../entity-controller";

export interface NotebookControllerProperties
  extends EntityControllerProperties<Notebook> {
  notebookJsonView: NotebookJsonView;
  noteHtmlView: NoteHtmlView;
  noteStore: NoteStore;
  noteTypesRegistry: NoteTypesRegistry;
  notebookTableColumnsRegistry: NotebookTableColumnsRegistry;
}

export class NotebookController extends EntityController<Notebook> {
  protected logger: Logger;
  constructor(
    private notebookControllerProperties: NotebookControllerProperties
  ) {
    super(notebookControllerProperties);
    this.logger = this.notebookControllerProperties.logger;
  }
  public async listSupportedColumns(): Promise<HttpResponse> {
    const columns =
      this.notebookControllerProperties.notebookTableColumnsRegistry.listColumns();
    return this.notebookControllerProperties.notebookJsonView.renderSupportedTableColumns(
      columns
    );
  }
  protected getEntityName(): string {
    return "notebook";
  }
  protected mapRequestToEntityID(requestForm: FormBody): string {
    return requestForm["notebook-id"];
  }
  protected mapRequestToExistingEntity(
    username: string,
    existingNotebook: Notebook,
    form: FormBody
  ): Notebook {
    let isUpdated = false;
    const r = { ...existingNotebook };
    if (form["notebook-name"]) {
      r.name = form["notebook-name"];
      isUpdated = true;
    }
    if (form["table-columns"]) {
      const supportedColumns =
        this.notebookControllerProperties.notebookTableColumnsRegistry.listColumns();
      r.tableColumns = [];

      (form["table-columns"] as unknown as FormBody[]).forEach(
        (x: FormBody) => {
          const column = supportedColumns.find(
            (c) => x["column-type"] === c.columnType
          );
          if (column) {
            r.tableColumns.push(column);
            isUpdated = true;
          }
        }
      );
    }
    if (isUpdated) {
      r.updatedAt = new Date().toISOString();
    }
    return r;
  }
  protected mapRequestToNewEntity(username: string, form: FormBody): Notebook {
    const now = new Date().toISOString();
    return {
      id: generate(),
      name: form["notebook-name"],
      owner: username,
      sections: [],
      tableColumns: [],
      createdAt: now,
      updatedAt: now,
      status: "",
    };
  }
  protected async isAuthorizedToCreate(
    user: string,
    entity: Notebook
  ): Promise<boolean> {
    this.logger.info("everyone is authorized to create a notebook", {
      username: user,
      data: entity,
    });
    return true;
  }
  protected getEntityURL(entity: Notebook): string {
    this.logger.info("notebook list is currently shown on home", {
      data: entity,
    });
    return "/home";
  }
  protected async deleteEntity(
    userName: string,
    entity: Notebook
  ): Promise<void> {
    entity.status = "MARKED_FOR_DELETION";
    await this.notebookControllerProperties.entityStore.editOne(entity);
  }

  public async showSingleEntityDetailsPage(
    entityID: string
  ): Promise<HttpResponse> {
    const response = await super.showSingleEntityDetailsPage(entityID);
    if (response.statusCode !== HttpStatus.OK) {
      return response;
    }
    let body = response.body;
    if (body.includes("{{MACRO_LIST_NOTES}}")) {
      body = body.replace(
        "{{MACRO_LIST_NOTES}}",
        await this.showNotesInNotebook(this.authorizedUserName, entityID)
      );
    }
    if (body.includes("{{MACRO_LIST_LINKS_TO_ADD_NOTES}}")) {
      body = body.replace(
        "{{MACRO_LIST_LINKS_TO_ADD_NOTES}}",
        await this.showLinksToAddNotes(entityID)
      );
    }
    const httpResponse = {
      ...response,
      body,
    };
    return await this.notebookControllerProperties.postProcessorRegistry.processResponse(
      this.authorizedUserName,
      httpResponse
    );
  }
  private async showNotesInNotebook(
    owner: string,
    notebookID: string
  ): Promise<string> {
    const notes =
      await this.notebookControllerProperties.noteStore.listAllInNotebook(
        owner,
        notebookID
      );
    return this.notebookControllerProperties.noteHtmlView.renderMacroListOfNotes(
      notes
    );
  }
  private showLinksToAddNotes(notebookID: string) {
    const noteTypes =
      this.notebookControllerProperties.noteTypesRegistry.listNoteTypeHandlers();
    return this.notebookControllerProperties.noteHtmlView.renderMacroLinksToAddNotes(
      notebookID,
      noteTypes
    );
  }
}
