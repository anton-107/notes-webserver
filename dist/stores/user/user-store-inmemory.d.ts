import { User, UserStore } from "authentication-module/dist/authenticator";
export declare class InMemoryUserStore implements UserStore {
    private users;
    getUserByName(username: string): Promise<User | null>;
    addUser(user: User): Promise<void>;
}
