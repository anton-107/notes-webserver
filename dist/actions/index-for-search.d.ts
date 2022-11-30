import { Note } from "aws-sdk/clients/securityhub";
import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";
import { Notebook } from "../model/notebook-model";
import { Person } from "../model/person-model";
declare type IndexableEntity = Notebook | Note | Person;
interface IndexForSearchProperties {
    openSearchClient: OpenSearchClient;
}
interface IndexForSearchAction<T> {
    document: IndexableEntity;
    item: T;
}
export declare class IndexForSearch<T extends IndexableEntity> {
    private properties;
    constructor(properties: IndexForSearchProperties);
    run(actionTrigger: IndexForSearchAction<T>): Promise<void>;
}
export {};
