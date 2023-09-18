import { BaseDatabase } from "../../src/database/Basedatabase";
import {
  COMMENT_LIKE,
  CommentDB,
  CommentDBWithCreatorName,
  LikeDislikeCommentDB,
} from "../../src/models/Comments";
import { LikeDislikeDB } from "../../src/models/Post";

const mockComments: CommentDB[] = [
  {
    id: "comment-id-mock1",
    content: "Qualquer coisa",
    likes: 0,
    dislikes: 1,
    created_at: new Date().toISOString(),
    post_id: "post-id-mock1",
    creator_id: "id-mock-user1",
  },
];

const mockCommentswithCreatorName: CommentDBWithCreatorName[] = [
  {
    id: "comment-id-mock1",
    content: "Qualquer coisa",
    likes: 0,
    dislikes: 1,
    created_at: new Date().toISOString(),
    creator_name: "mock-user2",
    post_id: "post-id-mock1",
    creator_id: "id-mock-user1",
  },
];
const mockLikesDislikesComments: LikeDislikeCommentDB[] = [
  { user_id: " id-mock-user2", comment_id: "comment-id-mock1", like: 0 },
];
export class CommentDatabaseMock extends BaseDatabase {
  private static TABLE_COMMENTS = "comments";
  private static TABLE_LIKE_COMMENTS = "comments_like_dislike";

  public getComments = async (
    id: string
  ): Promise<CommentDBWithCreatorName[]> => {
    const result = mockCommentswithCreatorName.filter(
      (comment) => comment.post_id === id
    );
    return result;
  };

  public createComment = async (newComment: CommentDB): Promise<void> => {
    return;
  };

  public getCommentById = async (commentId: string): Promise<CommentDB> => {
    const [result] = mockComments.filter((comment) => comment.id === commentId);
    return result;
  };

  public getLikeorDislikeComment = async (
    commentId: string,
    userId: string
  ): Promise<COMMENT_LIKE | undefined> => {
    const result = mockLikesDislikesComments.find(
      (comment) =>
        comment.comment_id === commentId && comment.user_id === userId
    );
    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED;
    } else {
      return COMMENT_LIKE.ALREADY_DISLIKED;
    }
  };

  public removeLikeOrDislike = async (
    likeOrDislikeComment: LikeDislikeCommentDB
  ): Promise<void> => {
    return;
  };

  public updateLikeOrDislike = async (
    likeOrDislikeComment: LikeDislikeCommentDB
  ): Promise<void> => {
    return;
  };

  public createLikeOrDislike = async (
    likeOrDislikeComment: LikeDislikeCommentDB
  ): Promise<void> => {
    return;
  };

  public updateComment = async (newComment: CommentDB): Promise<void> => {
    return;
  };
}
