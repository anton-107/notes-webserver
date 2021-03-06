import { DataMapper } from "@aws/dynamodb-data-mapper";
import { PersonStore } from "./person-store";
import { Person } from "../../model/person-model";
export declare class PersonEntity implements Person {
    manager: string;
    sortKey: string;
    name: string;
    email: string;
    id: string;
}
interface PersonStoreDynamodbProps {
    dataMapper: DataMapper;
}
export declare class PersonStoreDynamodb implements PersonStore {
    private properties;
    constructor(properties: PersonStoreDynamodbProps);
    add(person: Person): Promise<void>;
    listAll(manager: string): Promise<Person[]>;
    getOne(manager: string, id: string): Promise<Person | null>;
    deleteOne(manager: string, id: string): Promise<void>;
    editOne(person: Person): Promise<void>;
}
export {};
