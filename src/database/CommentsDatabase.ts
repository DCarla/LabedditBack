import {
  COMMENT_LIKE,
  CommentDB,
  CommentDBWithCreatorName,
  LikeDislikeCommentDB,
} from "../models/Comments";
import { BaseDatabase } from "./Basedatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentDatabase extends BaseDatabase {
  private static TABLE_COMMENTS = "comments";
  private static TABLE_LIKE_COMMENTS = "comments_like_dislike";
  public getComments = async (
    id: string
  ): Promise<CommentDBWithCreatorName[]> => {
    const result = await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .select(
        `${UserDatabase.TABLE_USERS}.nickname as creatorName`,
        `${CommentDatabase.TABLE_COMMENTS}.id`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        `${CommentDatabase.TABLE_COMMENTS}.post_id`,
        `${CommentDatabase.TABLE_COMMENTS}.content`,
        `${CommentDatabase.TABLE_COMMENTS}.likes`,
        `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
        `${CommentDatabase.TABLE_COMMENTS}.created_at`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({ post_id: id });
    return result;
  };

  public createComment = async (newComment: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS).insert(
      newComment
    );
  };

  public getCommentById = async (commentId: string): Promise<CommentDB> => {
    const [result]: CommentDB[] = await BaseDatabase.connection(
      CommentDatabase.TABLE_COMMENTS
    ).where({ id: commentId });
    return result;
  };

  public getLikeorDislikeComment = async (
    commentId: string,
    userId: string
  ): Promise<COMMENT_LIKE | undefined> => {
    const [result]: LikeDislikeCommentDB[] = await BaseDatabase.connection(
      CommentDatabase.TABLE_LIKE_COMMENTS
    )
      .where({ comment_id: commentId })
      .andWhere({ user_id: userId });
    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED;
    } else {
      return COMMENT_LIKE.ALREADY_DISLIKED;
    }
  };

  public removeLikeOrDislike = async (
    likeorDislikeComment: LikeDislikeCommentDB
  ): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_LIKE_COMMENTS)
      .del()
      .where({ user_id: likeorDislikeComment.user_id })
      .andWhere({ comment_id: likeorDislikeComment.comment_id });
  };
  public updateLikeOrDislike = async (
    likeorDislikeComment: LikeDislikeCommentDB
  ): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_LIKE_COMMENTS)
      .update(likeorDislikeComment)
      .where({ user_id: likeorDislikeComment.user_id })
      .andWhere({ comment_id: likeorDislikeComment.comment_id });
  };
  public createLikeOrDislike = async (
    likeorDislikeComment: LikeDislikeCommentDB
  ): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_LIKE_COMMENTS).insert(
      likeorDislikeComment
    );
  };

  public updateComment = async (newComment: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .update(newComment)
      .where({ id: newComment.id });
  };
}
