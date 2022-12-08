import { HttpResponse } from "../http/http";

export interface EntityView<T> {
  renderEditingFormOneEntity(entity: T): HttpResponse;
  renderCreationFormOneEntity(partialEntity: Partial<T>): HttpResponse;
  renderDetailsPageOneEntity(entity: T): HttpResponse;
  renderListPageAllEntities(entities: T[]): HttpResponse;
}
