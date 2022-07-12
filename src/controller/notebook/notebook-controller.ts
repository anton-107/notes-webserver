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
}
