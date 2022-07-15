import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { Notebook } from "../../model/notebook-model";
import { EntityController } from "../entity-controller";

export class NotebookController extends EntityController<Notebook> {
  protected getEntityName(): string {
    return "notebook";
  }
  protected mapRequestToExistingEntity(
    username: string,
    form: FormBody
  ): Notebook {
    return {
      id: form["notebook-id"],
      name: form["notebook-name"],
      owner: username,
    };
  }
  protected mapRequestToNewEntity(username: string, form: FormBody): Notebook {
    return {
      id: generate(),
      name: form["notebook-name"],
      owner: username,
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
}
