import { DataMapper } from "@aws/dynamodb-data-mapper";

import { Logger } from "../../logger/logger";
import { Person } from "../../model/person-model";
import { PersonStore } from "./person-store";
export declare class PersonEntity implements Person {
    manager: string;
    sortKey: string;
    name: string;
    email: string;
    id: string;
}
interface PersonStoreDynamodbProps {
    logger: Logger;
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
