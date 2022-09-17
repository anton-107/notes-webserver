import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { HttpResponse } from "../../http/http";
import { NotebookSection } from "../../model/notebook-model";
import { NotebookSectionStore } from "../../stores/notebook-section/notebook-section-store";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import {
  EntityController,
  EntityControllerProperties,
} from "../entity-controller";

interface NotebookSectionControllerProperties
  extends EntityControllerProperties<NotebookSection> {
  notebookSectionsStore: NotebookSectionStore;
  notebookStore: NotebookStore;
  notebookID: string | null;
}

export class NotebookSectionController extends EntityController<NotebookSection> {
  constructor(
    private notebookSectionControllerProperties: NotebookSectionControllerProperties
  ) {
    super(notebookSectionControllerProperties);
  }

  public async showSectionsInNotebook(
    notebookID: string
  ): Promise<HttpResponse> {
    const user =
      await this.notebookSectionControllerProperties.authenticator.authenticate(
        this.notebookSectionControllerProperties.authenticationToken
      );
    const notes =
      await this.notebookSectionControllerProperties.notebookSectionsStore.listAllInNotebook(
        user.username,
        notebookID
      );
    return this.notebookSectionControllerProperties.entityView.renderListPageAllEntities(
      notes
    );
  }

  protected getEntityName(): string {
    throw new Error("Method not implemented.");
  }
  protected mapRequestToExistingEntity(
    username: string,
    existingEntity: NotebookSection,
    requestForm: FormBody
  ): NotebookSection {
    return {
      ...existingEntity,
      name: requestForm["section-name"],
    };
  }
  protected mapRequestToNewEntity(
    username: string,
    requestForm: FormBody
  ): NotebookSection {
    return {
      id: generate(),
      owner: username,
      name: requestForm["section-name"],
      notebookID: this.notebookSectionControllerProperties.notebookID,
    };
  }
  protected mapRequestToEntityID(requestForm: FormBody): string {
    return requestForm["section-id"];
  }
  protected async isAuthorizedToCreate(
    user: string,
    entity: NotebookSection
  ): Promise<boolean> {
    const notebook =
      await this.notebookSectionControllerProperties.notebookStore.getOne(
        user,
        entity.notebookID
      );
    if (!notebook) {
      console.log(
        "[isAuthorizedToCreate] notebook not found. Access denied",
        notebook
      );
      return false;
    }
    // if notebook is found, it means that user owns that notebook
    console.log(
      "[isAuthorizedToCreate] notebook found. Access granted",
      notebook
    );
    return true;
  }
  protected getEntityURL(entity: NotebookSection): string {
    return `/notebook/${entity.notebookID}`;
  }
}
