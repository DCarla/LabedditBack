import { PostDB } from "../models/Post";
import { BaseDatabase } from "./Basedatabase";

export class PostDatabase extends BaseDatabase {
  public static POST_TABLE = "posts";

  public async getPosts() {
    const result: PostDB[] = await BaseDatabase.connection(
      PostDatabase.POST_TABLE
    );
    return result;
  }
}
