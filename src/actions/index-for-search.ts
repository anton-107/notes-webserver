import { Note } from "aws-sdk/clients/securityhub";
import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";

import { Notebook } from "../model/notebook-model";
import { Person } from "../model/person-model";

type IndexableEntity = Notebook | Note | Person;

interface IndexForSearchProperties {
  openSearchClient: OpenSearchClient;
}

interface IndexForSearchAction<T> {
  document: IndexableEntity;
  item: T;
}

export class IndexForSearch<T extends IndexableEntity> {
  constructor(private properties: IndexForSearchProperties) {}
  public async run(actionTrigger: IndexForSearchAction<T>) {
    //eslint-disable-next-line no-console
    console.log(
      "actionTrigger",
      actionTrigger,
      this.properties.openSearchClient
    );
    return;
  }
}
