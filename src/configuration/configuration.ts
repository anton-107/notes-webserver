import { ScryptHashingFunction } from "authentication-module/dist/scrypt-hashing";
import {
  Authenticator,
  PasswordHashingFunction,
  User,
  UserStore,
} from "authentication-module/dist/authenticator";
import {
  JWTSerializer,
  StandardJwtImplementation,
} from "authentication-module/dist/jwt-serializer";
import { NotebookStore } from "../notebook-store";

export interface ServiceConfiguration {
  authenticator: Authenticator;
  notebookStore: NotebookStore;
  passwordHashingFunction: PasswordHashingFunction;
  userStore: UserStore;
  jwtSerializerSecretKey: string;
  baseUrl: string;
}

class InMemoryUserStore implements UserStore {
  private users: User[] = [];

  public async getUserByName(username: string): Promise<User | null> {
    return this.users.find((u) => u.username === username);
  }
  public async addUser(user: User): Promise<void> {
    this.users.push(user);
  }
}

const baseUrl = process.env["BASE_URL"] || "";
const passwordHashingFunction = new ScryptHashingFunction();
const userStore = new InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const notebookStore = new NotebookStore();

type ServiceConfigurationOverrides = Partial<ServiceConfiguration>;
export const dependenciesConfiguration = (
  overrides: ServiceConfigurationOverrides
): ServiceConfiguration => {
  return {
    userStore,
    authenticator: new Authenticator({
      userStore,
      passwordHashingFunction,
      authTokensSerializer: new JWTSerializer(
        new StandardJwtImplementation(),
        jwtSerializerSecretKey
      ),
    }),
    jwtSerializerSecretKey,
    passwordHashingFunction,
    notebookStore,
    baseUrl,
    ...overrides,
  };
};
