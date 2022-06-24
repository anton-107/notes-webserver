import { NotesWebserver } from "./src/notes-webserver";
import { routes } from "./src/router";
import { dependenciesConfiguration } from "./src/configuration/configuration";

const config = dependenciesConfiguration({});
const server = new NotesWebserver({
  ...config,
  routes,
});

async function main() {
  const localPort = 3000;
  server.listen(localPort);
  console.log(
    `Notes webserver is listening on http://localhost:${localPort}/home`
  );
  const passwordHash = await config.passwordHashingFunction.generateHash(
    "1234"
  );
  await config.userStore.addUser({ username: "user1", passwordHash });
}
main();
