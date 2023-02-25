import { instance, mock, when } from "ts-mockito";

import { LoggerBunyan } from "../../../src/logger/logger-bunyan";
import { Note } from "../../../src/model/note-model";
import { NoteStore } from "../../../src/stores/note/note-store";
import {
  verifyNoNotesInNotebook,
  VerifyNoNotesInNotebookAction,
} from "../../../src/workflows/notebook-deletion/actions/verify-no-notes-in-notebook-action";

describe("verifyNoNotesInNotebook", () => {
  it("should pass owner and notebookID to output", async () => {
    const output = await verifyNoNotesInNotebook({
      Payload: { notebookID: "notebook1", owner: "user1" },
    });
    expect(output.notebookID).toBe("notebook1");
    expect(output.owner).toBe("user1");
  });
  it("should throw an error if there are one or more notes in notebook", async () => {
    const noteStoreMock = mock<NoteStore>();

    when(noteStoreMock.listAllInNotebook("user1", "my-notebook")).thenResolve([
      { id: "note1" } as Note,
      { id: "note2" } as Note,
    ]);

    const action = new VerifyNoNotesInNotebookAction({
      logger: new LoggerBunyan(),
      noteStore: instance(noteStoreMock),
    });

    await expect(async () => {
      await action.run({
        owner: "user1",
        notebookID: "my-notebook",
      });
    }).rejects.toThrow("There are 2 notes in notebook my-notebook");
  });
});
