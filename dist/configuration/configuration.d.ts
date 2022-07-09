import { Authenticator, PasswordHashingFunction, UserStore } from "authentication-module/dist/authenticator";
import { SecretKeyProvider } from "authentication-module/dist/jwt-serializer";
import { NotebookStore } from "../stores/notebook-store";
import { HttpRedirectView } from "../views/http-redirect-view";
import { NotebookHtmlView } from "../views/notebook/notebook-html-view";
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
export declare const notebookControllerConfiguration: (overrides: ServiceConfigurationOverrides) => {
    authenticator: Authenticator;
    jwtSerializerSecretProvider: SecretKeyProvider;
    notebookStore: NotebookStore;
    passwordHashingFunction: PasswordHashingFunction;
    userStore: UserStore;
    baseUrl: string;
    entityView: NotebookHtmlView;
    httpRedirectView: HttpRedirectView;
    entityStore: NotebookStore;
};
