import { BaseDatabase } from "../../src/database/Basedatabase";
import { UserDB } from "../../src/models/User";

const usersMock: UserDB[] = [
  {
    id: "id-mock-user1",
    email: "user1@email.com",
    password: "mocka1234",
    nickname: "mock-user1",
    created_at: new Date().toISOString(),
  },
  {
    id: "id-mock-user2",
    email: "user2@email.com",
    password: "mockb1234",
    nickname: "mock-user2",
    created_at: new Date().toISOString(),
  },
];
export class UserDataBaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    const [result] = usersMock.filter((user) => user.email === email);
    return result;
  }

  public async insertUser(newUser: UserDB) {
    return;
  }

  public async findUserByID(id: string): Promise<UserDB> {
    const [result] = usersMock.filter((user) => user.id === id);
    return result;
  }
}
