import { NotebookTableColumnsRegistry } from "../../src/registries/notebook-table-columns-registry";
import { SourceFileHandler } from "./../../src/registries/note-types/codebase/source-file-handler";

describe("SourceFileHandler handler", () => {
  it("should define names", () => {
    const handler = new SourceFileHandler({
      notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
    });
    expect(handler.typeName()).toBe("source-file");
    expect(handler.typeDisplayName()).toBe("Source file");
  });
  it("should add numberOfLines, numberOfChanges, numberOfContributors to a new entity", () => {
    const handler = new SourceFileHandler({
      notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
    });
    const entity = handler.mapRequestToNewEntity("user1", {
      "number-of-lines": "100",
      "number-of-changes": "5",
      "number-of-contributors": "3",
    });
    if (!entity.extensionProperties) {
      throw "Expected entity to have extensionProperties";
    }
    expect(entity.extensionProperties.numberOfLines).toBe("100");
    expect(entity.extensionProperties.numberOfChanges).toBe("5");
    expect(entity.extensionProperties.numberOfContributors).toBe("3");
  });
  it("should add numberOfLines, numberOfChanges, numberOfContributors to an existing entity", () => {
    const handler = new SourceFileHandler({
      notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
    });
    const entity = handler.mapRequestToExistingEntity(
      "user1",
      {
        id: "",
        content: "/src/index.ts",
        notebookID: "notebook-1",
        owner: "user1",
        type: { type: "source-file" },
      },
      {
        "number-of-lines": "100",
        "number-of-changes": "5",
        "number-of-contributors": "3",
      }
    );
    if (!entity.extensionProperties) {
      throw "Expected entity to have extensionProperties";
    }
    expect(entity.extensionProperties.numberOfLines).toBe("100");
    expect(entity.extensionProperties.numberOfChanges).toBe("5");
    expect(entity.extensionProperties.numberOfContributors).toBe("3");
  });
});
