import { Notebook } from "notes-model/dist/notebook-model";
import { Person } from "notes-model/dist/person-model";
import { HtmlViewProperties } from "../interfaces";
export declare class HomeHtmlView {
    private properties;
    constructor(properties: HtmlViewProperties);
    renderHomePage(username: string, notebooks: Notebook[], people: Person[]): string;
}
