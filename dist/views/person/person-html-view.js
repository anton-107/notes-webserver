"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonHtmlView = void 0;
const http_1 = require("../../http/http");
class PersonHtmlView {
    constructor(properties) {
        this.properties = properties;
    }
    renderEditingFormOneEntity(person) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `
        <h1 data-testid='person-name'>${person.name}</h1>
        <form method='post' action='${this.properties.baseUrl}/person/${person.id}/edit'>
          <input type='hidden' name='person-id' value='${person.id}' />
          <label>Person name:
            <input type='text' name='person-name' value='${person.name}' data-testid='person-name-input' />
          </label>
          <label>Person email:
            <input type='text' name='person-email' value='${person.email}' data-testid='person-email-input' />
          </label>
          <button type='submit' data-testid='edit-person-button'>Update</button>
        </form>
        <a href='${this.properties.baseUrl}/person/${person.id}'>Cancel edit</a>
      `,
        };
    }
    renderCreationFormOneEntity() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `<form method='post' action='${this.properties.baseUrl}/person'>
        <label>Person name:
          <input name='person-name' data-testid='person-name-input' />
        </label>
        <label>Person email:
          <input name='person-email' data-testid='person-email-input' />
        </label>
        <input type='submit' />
      </form>`,
        };
    }
    renderDetailsPageOneEntity(person) {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `
        <h1 data-testid='person-name'>${person.name}</h1>
        <a href='${this.properties.baseUrl}/person/${person.id}/edit' data-testid='edit-person-link'>Edit this person details</a>
        <form method='post' action='${this.properties.baseUrl}/delete-person'>
          <input type='hidden' name='personID' value='${person.id}' />
          <button type='submit' data-testid='delete-person-button'>Delete this person entry</button>
        </form>
      `,
        };
    }
}
exports.PersonHtmlView = PersonHtmlView;
//# sourceMappingURL=person-html-view.js.map