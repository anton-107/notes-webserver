import { Note } from "aws-sdk/clients/securityhub";
import { Notebook } from "notes-model/dist/notebook-model";
import { Person } from "notes-model/dist/person-model";
import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";
type IndexableEntity = Notebook | Note | Person;
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
