import { User, UserStore } from "authentication-module/dist/authenticator";

export class InMemoryUserStore implements UserStore {
  private users: User[] = [];

  public async getUserByName(username: string): Promise<User | null> {
    return this.users.find((u) => u.username === username);
  }
  public async addUser(user: User): Promise<void> {
    this.users.push(user);
  }
}
