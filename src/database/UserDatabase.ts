import { promises } from "dns";
import { UserDB } from "../models/User";
import { BaseDatabase } from "./Basedatabase";

// Deve colocar o userDB entre [] pois o resultado deve vir em um array
export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";
  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ email });
    return userDB;
  }

  public async insertUser(newUser: UserDB) {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(newUser);
  }

  public async findUserByID(id: string): Promise<UserDB> {
    const [result]: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ id });
    return result;
  }
}
