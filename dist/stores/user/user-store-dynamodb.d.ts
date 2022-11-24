import { DataMapper } from "@aws/dynamodb-data-mapper";
import { User, UserStore } from "authentication-module/dist/authenticator";
export declare class UserEntity implements User {
    username: string;
    sortKey: string;
    passwordHash: string;
}
interface UserStoreDynamodbProps {
    dataMapper: DataMapper;
}
export declare class UserStoreDynamodb implements UserStore {
    private properties;
    constructor(properties: UserStoreDynamodbProps);
    getUserByName(username: string): Promise<User>;
    addUser(user: User): Promise<void>;
}
export {};
