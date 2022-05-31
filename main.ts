import { User, UserStore } from "authentication-module/src/authenticator";
import { NotesWebserver } from "./src/notes-webserver";

class InMemoryUserStore implements UserStore {
  getUserByName(username: string): Promise<User> {
    console.log("InMemoryUserStore.getUserByName", username);
    throw new Error("Method not implemented.");
  }
  addUser(user: User): Promise<void> {
    console.log("InMemoryUserStore.addUser", user);
    throw new Error("Method not implemented.");
  }
}

const server = new NotesWebserver({
  userStore: new InMemoryUserStore(),
  jwtSerializerSecretKey: String(Math.random),
});

const localPort = 3000;
server.listen(localPort);
console.log(
  `Notes webserver is listening on http://localhost:${localPort}/home`
);
