import { SourceFileHandlerExtensionProperties } from "notes-model/dist/note-types/codebase/source-file";

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
  it("should add numberOfLines, numberOfChanges, numberOfContributors and contributors to a new entity", () => {
    const handler = new SourceFileHandler({
      notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
    });
    const entity = handler.mapRequestToNewEntity("user1", {
      "number-of-lines": "100",
      "number-of-changes": "5",
      "number-of-contributors": "3",
      contributors: JSON.stringify([
        {
          name: "Bob",
          numberOfChanges: 1,
          firstChangeTimestamp: 1,
          lastChangeTimestamp: 1,
        },
        {
          name: "Alice",
          numberOfChanges: 2,
          firstChangeTimestamp: 1,
          lastChangeTimestamp: 3,
        },
        {
          name: "Mikee",
          numberOfChanges: 3,
          firstChangeTimestamp: 2,
          lastChangeTimestamp: 5,
        },
      ]),
    });
    if (!entity.extensionProperties) {
      throw "Expected entity to have extensionProperties";
    }
    expect(entity.extensionProperties.numberOfLines).toBe("100");
    expect(entity.extensionProperties.numberOfChanges).toBe("5");
    expect(entity.extensionProperties.numberOfContributors).toBe("3");

    const extensionProperties: SourceFileHandlerExtensionProperties =
      entity.extensionProperties as unknown as SourceFileHandlerExtensionProperties;
    if (!extensionProperties.contributors) {
      throw "Expected entity to have contributors in extensionProperties";
    }

    expect(extensionProperties.contributors[0].name).toBe("Bob");
    expect(extensionProperties.contributors[1].numberOfChanges).toBe(2);
    expect(extensionProperties.contributors[2].firstChangeTimestamp).toBe(2);
    expect(extensionProperties.contributors[2].lastChangeTimestamp).toBe(5);
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
