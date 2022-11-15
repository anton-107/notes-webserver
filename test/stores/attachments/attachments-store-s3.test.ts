import { AWSError, S3 } from "aws-sdk";
import { anything, instance, mock, verify, when } from "ts-mockito";
import { AttachmentsStoreS3 } from "./../../../src/stores/attachments/attachments-store-s3";
import { Request } from "aws-sdk/lib/request";

describe("AttachmentsStoreS3", () => {
  it("should persist provided content as an S3 object", async () => {
    const s3Mock = mock<S3>();
    const s3PutObjectMock = mock<Request<S3.Types.PutObjectOutput, AWSError>>();
    when(s3Mock.putObject(anything())).thenReturn(instance(s3PutObjectMock));
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
