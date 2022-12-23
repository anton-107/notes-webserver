import { PersonController } from "../../controller/person/person-controller";
import { HttpHeaders } from "../../http/http";
import { ResponseType } from "../../http/response-type-parser";
interface PersonControllerBuilderProperties {
    headers: HttpHeaders;
    responseType: ResponseType;
}
export declare class PersonControllerBuilder {
    static build(properties: PersonControllerBuilderProperties): PersonController;
}
export {};
