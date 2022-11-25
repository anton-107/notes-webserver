import { Person } from "../../model/person-model";
import { EntityStore } from "../entity-store";

export interface PersonStore extends EntityStore<Person> {
  add(person: Person): Promise<void>;
  editOne(person: Person): Promise<void>;
  deleteOne(owner: string, id: string): Promise<void>;
}

export class InMemoryPersonStore implements PersonStore {
  private items: Person[] = [];

  public async add(person: Person) {
    this.items.push(person);
  }
  public async listAll(owner: string): Promise<Person[]> {
    return this.items.filter((x) => x.manager === owner);
  }
  public async getOne(owner: string, id: string): Promise<Person> {
    return this.items.find((x) => x.manager === owner && x.id === id);
  }
  public async editOne(person: Person): Promise<void> {
    const item = this.items.find(
      (x) => x.manager === person.manager && x.id === person.id
    );
    if (!item) {
      throw Error("Person is not found");
    }
    item.name = person.name;
    item.email = person.email;
  }
  public async deleteOne(owner: string, id: string): Promise<void> {
    const index = this.items.findIndex(
      (x) => x.manager === owner && x.id === id
    );
    if (index < 0) {
      throw Error("Person is not found");
    }
    this.items.splice(index, 1);
  }
}
