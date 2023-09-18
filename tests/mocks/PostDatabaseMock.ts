import { BaseDatabase } from "../../src/database/Basedatabase";
import { LikeDislikeDB, POST_LIKE, PostDB } from "../../src/models/Post";

const mockPosts: PostDB[] = [
  {
    id: "post-id-mock1",
    creator_id: "id-mock-user1",
    content: " Qualquer coisa ",
    comments: 0,
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "post-id-mock2",
    creator_id: "id-mock-user2",
    content: " Qualquer coisa ",
    comments: 0,
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
const mockLikesDislikes: LikeDislikeDB[] = [
  { user_id: " id-mock-user1", post_id: "post-id-mock2", like: 0 },
  { user_id: " id-mock-user2", post_id: "post-id-mock1", like: 1 },
];

export class PostDataBaseMock extends BaseDatabase {
  public static POST_TABLE = "posts";
  public static LIKE_DISLIKE_TABLE = "like_dislike";

  public async getPosts() {
    return mockPosts;
  }

  public async createPost(newPost: PostDB) {
    return;
  }

  public async getPostByID(id: string): Promise<PostDB> {
    const [result] = mockPosts.filter((post) => post.id === id);
    return result;
  }

  public async updatePost(newPost: PostDB): Promise<void> {
    return;
  }

  public async getlikeOrDislikePost(
    likeOrDislike: LikeDislikeDB
  ): Promise<POST_LIKE | undefined> {
    const result = mockLikesDislikes.find(
      (likeDislike) =>
        likeDislike.user_id === likeOrDislike.user_id &&
        likeDislike.post_id === likeOrDislike.post_id
    );
    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  }

  public async removeLikeOrDislike(
    likeOrDislike: LikeDislikeDB
  ): Promise<void> {
    return;
  }

  public async updateLikeOrDislike(
    likeOrDislike: LikeDislikeDB
  ): Promise<void> {
    return;
  }

  public async insertLikeOrDislike(
    likeOrDislike: LikeDislikeDB
  ): Promise<void> {
    return;
  }
}
