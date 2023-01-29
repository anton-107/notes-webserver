import { getSchema } from "@aws/dynamodb-data-mapper";
import { marshallItem } from "@aws/dynamodb-data-marshaller";

import { runTriggerDeleteNotebookWorkflow } from "../../src/actions/trigger-workflow/trigger-delete-notebook-workflow";
import { NotebookEntity } from "../../src/stores/notebook/notebook-store-dynamodb";

describe("TriggerDeleteNotebookWorkflow", () => {
  describe("runTriggerDeleteNotebookWorkflow", () => {
    it("should trigger TriggerDeleteNotebookWorkflow action", async () => {
      const results = await runTriggerDeleteNotebookWorkflow({
        Records: [
          {
            eventName: "MODIFY",
            dynamodb: {
              NewImage: marshallItem(getSchema(NotebookEntity.prototype), {
                id: "notebook-1",
                status: "MARKED_FOR_DELETION",
              }),
            },
          },
        ],
      });
      if (!results) {
        throw Error("Expected results to be defined");
      }
      expect(results.length).toBe(1);
    });
    it("should return undefined on INSERT event", async () => {
      const results = await runTriggerDeleteNotebookWorkflow({
        Records: [
          {
            eventName: "INSERT",
            dynamodb: {
              NewImage: marshallItem(getSchema(NotebookEntity.prototype), {
                id: "notebook-1",
                status: "",
              }),
            },
          },
        ],
      });
      expect(results).toBeUndefined();
    });
  });
});
