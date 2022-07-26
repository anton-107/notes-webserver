import { NoteTypeHandler } from "../note-types-registry";
import { PlaintextNoteHandler } from "./plaintext-handler";

export class MarkdownHandler
  extends PlaintextNoteHandler
  implements NoteTypeHandler
{
  public typeName(): string {
    return "markdown";
  }
  public typeDisplayName(): string {
    return "markdown formatted note";
  }
}
