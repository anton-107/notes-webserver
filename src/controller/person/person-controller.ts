import { generate } from "short-uuid";
import { FormBody } from "../../http/body-parser";
import { Person } from "../../model/person-model";
import { EntityController } from "../entity-controller";

export class PersonController extends EntityController<Person> {
  protected getEntityName(): string {
    return "person";
  }
  protected mapRequestToExistingEntity(
    username: string,
    form: FormBody
  ): Person {
    return {
      id: form["person-id"],
      name: form["person-name"],
      email: form["person-email"],
      manager: username,
    };
  }
  protected mapRequestToNewEntity(username: string, form: FormBody): Person {
    return {
      id: generate(),
      name: form["person-name"],
      email: form["person-email"],
      manager: username,
    };
  }
}
