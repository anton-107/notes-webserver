import { Authenticator, PasswordHashingFunction, UserStore } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../notebook-store";
export interface ServiceConfiguration {
    authenticator: Authenticator;
    notebookStore: NotebookStore;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    jwtSerializerSecretKey: string;
    baseUrl: string;
}
declare type ServiceConfigurationOverrides = Partial<ServiceConfiguration>;
export declare const dependenciesConfiguration: (overrides: ServiceConfigurationOverrides) => ServiceConfiguration;
export {};
