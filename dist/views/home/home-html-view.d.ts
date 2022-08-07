import { Notebook } from "../../model/notebook-model";
import { Person } from "../../model/person-model";
import { HtmlViewProperties } from "../interfaces";
export declare class HomeHtmlView {
    private properties;
    constructor(properties: HtmlViewProperties);
    renderHomePage(username: string, notebooks: Notebook[], people: Person[]): string;
}
