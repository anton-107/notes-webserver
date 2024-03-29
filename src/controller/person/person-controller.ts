import { Person } from "notes-model/dist/person-model";
import { generate } from "short-uuid";

import { FormBody } from "../../http/body-parser";
import { EntityController } from "../entity-controller";

export class PersonController extends EntityController<Person> {
  protected getEntityName(): string {
    return "person";
  }
  protected mapRequestToEntityID(requestForm: FormBody): string {
    return requestForm["person-id"];
  }
  protected mapRequestToExistingEntity(
    username: string,
    person: Person,
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
  protected async isAuthorizedToCreate(
    user: string,
    entity: Person
  ): Promise<boolean> {
    this.logger.info("everyone is authorized to add a person", {
      data: entity,
      username: user,
    });
    return true;
  }
  protected getEntityURL(entity: Person): string {
    this.logger.info("list of people is currently shown on home", {
      data: entity,
    });
    return "/home";
  }
}
