import { User, UserStore } from "authentication-module/dist/authenticator";
import DynamoDB = require("aws-sdk/clients/dynamodb");
export declare class UserStoreDynamodb implements UserStore {
    private dataMapper;
    constructor(dynamoDB: DynamoDB);
    getUserByName(username: string): Promise<User>;
    addUser(user: User): Promise<void>;
}
