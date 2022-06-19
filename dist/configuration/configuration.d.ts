import { Authenticator, PasswordHashingFunction, UserStore } from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { NotebookStore } from "../notebook-store";
export interface ServiceConfiguration {
    authenticator: Authenticator;
    jwtSerializerSecretProvider: SecretKeyProvider;
    notebookStore: NotebookStore;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    baseUrl: string;
}
export declare type ServiceConfigurationOverrides = Partial<ServiceConfiguration>;
export declare const dependenciesConfiguration: (overrides: ServiceConfigurationOverrides) => ServiceConfiguration;
