import { Argon2HashingFunction } from "authentication-module/dist/argon2-hashing";
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

const passwordHashingFunction = new Argon2HashingFunction();
const userStore = new InMemoryUserStore();
const jwtSerializerSecretKey = String(Math.random());
const notebookStore = new NotebookStore();

export const dependenciesConfiguration = (): ServiceConfiguration => {
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
  };
};
