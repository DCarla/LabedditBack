import { LikeDislikeDB, POST_LIKE, PostDB } from "../models/Post";
import { BaseDatabase } from "./Basedatabase";

export class PostDatabase extends BaseDatabase {
  public static POST_TABLE = "posts";
  public static LIKE_DISLIKE_TABLE = "like_deslike";

  public async getPosts() {
    const result: PostDB[] = await BaseDatabase.connection(
      PostDatabase.POST_TABLE
    );
    return result;
  }
  public async createPost(newPost: PostDB) {
    await BaseDatabase.connection(PostDatabase.POST_TABLE).insert(newPost);
  }

  public async getPostByID(id: string): Promise<PostDB> {
    const [result]: PostDB[] = await BaseDatabase.connection(
      PostDatabase.POST_TABLE
    ).where({ id });
    return result;
  }
  public async getlikeOrDislikePost(
    likeOrDislike: LikeDislikeDB
  ): Promise<POST_LIKE | undefined> {
    const [result]: LikeDislikeDB[] = await BaseDatabase.connection(
      PostDatabase.LIKE_DISLIKE_TABLE
    ).where({ user_id: likeOrDislike.user_id, post_id: likeOrDislike.post_id });

    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  }

  public async updatePost(newPost: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.POST_TABLE)
      .update(newPost)
      .where({ id: newPost.id });
  }

  public async removeLikeOrDislike(
    likeOrDislike: LikeDislikeDB
  ): Promise<void> {
    await BaseDatabase.connection(PostDatabase.LIKE_DISLIKE_TABLE).del().where({
      user_id: likeOrDislike.user_id,
      post_id: likeOrDislike.post_id,
    });
  }
  public async updateLikeOrDislike(
    likeOrDislike: LikeDislikeDB
  ): Promise<void> {
    await BaseDatabase.connection(PostDatabase.LIKE_DISLIKE_TABLE)
      .update(likeOrDislike)
      .where({
        user_id: likeOrDislike.user_id,
        post_id: likeOrDislike.post_id,
      });
  }

  public async insertLikeOrDislike(
    likeOrDislike: LikeDislikeDB
  ): Promise<void> {
    await BaseDatabase.connection(PostDatabase.LIKE_DISLIKE_TABLE).insert(
      likeOrDislike
    );
  }
}
