import { AWSError, S3 } from "aws-sdk";
import { Request } from "aws-sdk/lib/request";
import {
  anything,
  instance,
  mock,
  objectContaining,
  verify,
  when,
} from "ts-mockito";

import { LoggerBunyan } from "./../../../src/logger/logger-bunyan";
import { AttachmentsStoreS3 } from "./../../../src/stores/attachments/attachments-store-s3";

const logger = new LoggerBunyan();

describe("AttachmentsStoreS3", () => {
  it("should persist provided content as an S3 object", async () => {
    const s3Mock = mock<S3>();
    const s3PutObjectMock = mock<Request<S3.Types.PutObjectOutput, AWSError>>();
    when(s3Mock.putObject(anything())).thenReturn(instance(s3PutObjectMock));
    const store = new AttachmentsStoreS3({
      logger,
      s3: instance(s3Mock),
      bucketName: "test-bucket",
      folderName: "test-folder",
    });
    const attachmentKey = await store.persist("test-content");
    verify(s3Mock.putObject(anything())).called();
    expect(attachmentKey.length).toBe(36);
  });
  it("should return the contents of S3 object for a provided key", async () => {
    const s3Mock = mock<S3>();
    const s3GetObjectMock = mock<Request<S3.Types.GetObjectOutput, AWSError>>();
    when(s3GetObjectMock.promise()).thenResolve({
      Body: "test object body",
      $response: instance(mock()),
    });
    when(
      s3Mock.getObject(
        objectContaining({
          Bucket: "test-bucket",
          Key: "test-folder/test-object",
        })
      )
    ).thenReturn(instance(s3GetObjectMock));
    const store = new AttachmentsStoreS3({
      logger,
      s3: instance(s3Mock),
      bucketName: "test-bucket",
      folderName: "test-folder",
    });
    const contents = await store.read("test-object");
    expect(contents).toBe("test object body");
  });
});
