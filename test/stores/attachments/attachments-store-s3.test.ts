import { S3 } from "aws-sdk";
import { anything, instance, mock, verify } from "ts-mockito";
import { AttachmentsStoreS3 } from "./../../../src/stores/attachments/attachments-store-s3";

describe("AttachmentsStoreS3", () => {
  it("should persist provided content as an S3 object", async () => {
    const s3Mock = mock<S3>();
    const store = new AttachmentsStoreS3({
      s3: instance(s3Mock),
      bucketName: "test-bucket",
      folderName: "test-folder",
    });
    const attachmentKey = await store.persist("test-content");
    verify(s3Mock.putObject(anything())).called();
    expect(attachmentKey.length).toBe(36);
  });
});
