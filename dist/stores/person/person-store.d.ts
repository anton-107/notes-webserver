import { EntityStore } from "../entity-store";
export interface Person {
    id: string;
    name: string;
    email: string;
    manager: string;
}
export interface PersonStore extends EntityStore<Person> {
    add(person: Person): Promise<void>;
    listAll(owner: string): Promise<Person[]>;
    editOne(person: Person): Promise<void>;
    deleteOne(owner: string, id: string): Promise<void>;
}
export declare class InMemoryPersonStore implements PersonStore {
    private items;
    add(person: Person): Promise<void>;
    listAll(owner: string): Promise<Person[]>;
    getOne(owner: string, id: string): Promise<Person>;
    editOne(person: Person): Promise<void>;
    deleteOne(owner: string, id: string): Promise<void>;
}
