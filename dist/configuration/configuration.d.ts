import { Authenticator, PasswordHashingFunction, UserStore } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../notebook-store";
export interface ServiceConfiguration {
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    jwtSerializerSecretKey: string;
}
export declare const dependenciesConfiguration: () => ServiceConfiguration;
