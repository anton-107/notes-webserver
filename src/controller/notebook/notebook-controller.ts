import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Notebook } from "../../model/notebook-model";
import { NoteTypesRegistry } from "../../registries/note-types-registry";
import { NoteStore } from "../../stores/note/note-store";
import { NoteHtmlView } from "../../views/note/note-html-view";
import {
  EntityController,
  EntityControllerProperties,
} from "../entity-controller";

export interface NotebookControllerProperties
  extends EntityControllerProperties<Notebook> {
  noteHtmlView: NoteHtmlView;
  noteStore: NoteStore;
  noteTypesRegistry: NoteTypesRegistry;
}

export class NotebookController extends EntityController<Notebook> {
  constructor(
    private notebookControllerProperties: NotebookControllerProperties
  ) {
    super(notebookControllerProperties);
  }
  protected getEntityName(): string {
    return "notebook";
  }
  protected mapRequestToEntityID(requestForm: FormBody): string {
    return requestForm["notebook-id"];
  }
  protected mapRequestToExistingEntity(
    username: string,
    notebook: Notebook,
    form: FormBody
  ): Notebook {
    return {
      id: form["notebook-id"],
      name: form["notebook-name"],
      owner: username,
      sections: [],
    };
  }
  protected mapRequestToNewEntity(username: string, form: FormBody): Notebook {
    return {
      id: generate(),
      name: form["notebook-name"],
      owner: username,
      sections: [],
    };
  }
  protected async isAuthorizedToCreate(
    user: string,
    entity: Notebook
  ): Promise<boolean> {
    console.log("everyone is authorized to create a notebook", entity, user);
    return true;
  }
  protected getEntityURL(entity: Notebook): string {
    console.log("notebook list is currently shown on home", entity);
    return "/home";
  }

  public async showSingleEntityDetailsPage(
    entityID: string
  ): Promise<HttpResponse> {
    const response = await super.showSingleEntityDetailsPage(entityID);
    if (response.statusCode !== HttpStatus.OK) {
      return response;
    }
    const httpResponse = {
      ...response,
      body: response.body
        .replace(
          "{{MACRO_LIST_NOTES}}",
          await this.showNotesInNotebook(this.authorizedUserName, entityID)
        )
        .replace(
          "{{MACRO_LIST_LINKS_TO_ADD_NOTES}}",
          await this.showLinksToAddNotes(entityID)
        ),
    };
    console.log(
      "notebook controller showSingleEntityDetailsPage",
      this.notebookControllerProperties.postProcessorRegistry
    );
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
