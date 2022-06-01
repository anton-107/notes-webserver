import { User, UserStore } from "authentication-module/src/authenticator";
import { NotesWebserver } from "./src/notes-webserver";
import { Argon2HashingFunction } from "authentication-module/dist/argon2-hashing";

class InMemoryUserStore implements UserStore {
  private users: User[] = [];

  public async getUserByName(username: string): Promise<User | null> {
    return this.users.find((u) => u.username === username) || null;
  }
  public async addUser(user: User): Promise<void> {
    this.users.push(user);
  }
}

const hashingFunction = new Argon2HashingFunction();
const userStore = new InMemoryUserStore();
const server = new NotesWebserver({
  userStore: userStore,
  jwtSerializerSecretKey: String(Math.random),
});

async function main() {
  const localPort = 3000;
  server.listen(localPort);
  console.log(
    `Notes webserver is listening on http://localhost:${localPort}/home`
  );
  const passwordHash = await hashingFunction.generateHash("1234");
  await userStore.addUser({ username: "user1", passwordHash });
}
main();
