import { User, UserStore } from "authentication-module/dist/authenticator";

export class InMemoryUserStore implements UserStore {
  private users: User[] = [];

  public async getUserByName(username: string): Promise<User | null> {
    console.log(`[InMemoryUserStore] fetching up user ${username}`);
    return this.users.find((u) => u.username === username);
  }
  public async addUser(user: User): Promise<void> {
    this.users.push(user);
  }
}
