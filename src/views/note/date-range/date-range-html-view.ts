import { HttpResponse, HttpStatus } from "../../../http/http";
import { NoteHtmlViewProperties } from "../note-html-view";

export class DateRangeHtmlView {
  constructor(private properties: NoteHtmlViewProperties) {}
  public renderCreationFormOneEntity(): HttpResponse {
    return {
      isBase64Encoded: false,
      statusCode: HttpStatus.OK,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      body: `
        <h1 data-testid='notebook-name'>Add new note</h1>
        <form method='post' action='${this.properties.baseUrl}/note/date-range'>
          <input type='hidden' name='notebook-id' value='${this.properties.notebookID}' />
          <label>Description
            <input name='note-content' data-testid='note-content-input' />
          </label>
          <label>Date start
            <input name='note-content' data-testid='date-range-start-input' />
          </label>
          <label>Date end
            <input name='note-content' data-testid='date-range-end-input' />
          </label>
          <div>
          * - enter dates in YYYY-MM-DD format
          </div>

          <button type='submit' data-testid='edit-notebook-button'>Add</button>
        </form>
        <a href='${this.properties.baseUrl}/notebook/${this.properties.notebookID}'>Cancel</a>
      `,
    };
  }
}
