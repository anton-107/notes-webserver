import DynamoDB, { DocumentClient } from "aws-sdk/clients/dynamodb";

export class TemporaryTable {
  constructor(private tableName: string, private devKey: string, private sortKey: string) {}

  public async create() {
    const db = new DynamoDB();
    const describeOutput = await db.describeTable({
      TableName: this.tableName
    }).promise();
    if (!describeOutput.Table || !describeOutput.Table.TableName) {
      throw Error('Could not find a table to use during test');
    }
    console.log('found a table to use during test', describeOutput.Table.TableArn);
    this.tableName = describeOutput.Table.TableName;
  }
  public async tearDown() {
    const db = new DocumentClient();
    await db.delete({
      TableName: this.tableName,
      Key: { key: this.devKey, sort: this.sortKey }
    }).promise();
    console.log('table cleaned up');
  }
  public getName(): string {
    if (!this.tableName) {
      throw Error('Table name is not set');
    }
    return this.tableName;
  }
}