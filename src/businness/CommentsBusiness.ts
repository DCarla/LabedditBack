import { CommentDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/Postdatabase";
import { UserDatabase } from "../database/UserDatabase";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/comments/createComments.dto";

import {
  GetCommentsInputDTO,
  GetCommentsOutputDTO,
} from "../dtos/comments/getComments.dto";
import {
  likeDislikeCommentOutputDTO,
  LikeOrDislikeCommentInputDTO,
} from "../dtos/comments/likeDislikeComment.dto";
import { LikeOrDislikePostInputDTO } from "../dtos/post/likeOrDislike.dto";
import { ForbiddenError } from "../Errors/forbiddenError";
import { NotFoundError } from "../Errors/notFoundError";
import { UnauthorizedError } from "../Errors/unauthorizedError";
import {
  Comment,
  COMMENT_LIKE,
  LikeDislikeCommentDB,
} from "../models/Comments";
import { Posts } from "../models/Post";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/tokenManager";

export class CommentBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private commentDatabase: CommentDatabase,
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenmanager: TokenManager
  ) {}

  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {
    const { token, postId } = input;
    const tokenPayload = this.tokenmanager.getPayload(token);
    if (!tokenPayload) {
      throw new UnauthorizedError("você deve estar autenticado para acessar");
    }
    const post = await this.postDatabase.getPostByID(postId);
    if (!post) {
      throw new NotFoundError("post não encontrado");
    }
    const commentsdb = await this.commentDatabase.getComments(postId);
    const commentsmodel = commentsdb.map(async (comment) => {
      const creator = await this.userDatabase.findUserByID(comment.creator_id);
      return new Comment(
        comment.id,
        comment.post_id,
        comment.content,
        comment.likes,
        comment.dislikes,
        comment.created_at,
        comment.creator_id,
        creator.nickname
      ).toBusinessModel();
    });
    const output = await Promise.all(commentsmodel);
    return output;
  };

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {
    const { token, postId, content } = input;
    const tokenPayload = this.tokenmanager.getPayload(token);
    if (!tokenPayload) {
      throw new UnauthorizedError("você deve estar autenticado para acessar");
    }
    const post = await this.postDatabase.getPostByID(postId);
    if (!post) {
      throw new NotFoundError("post não encontrado");
    }
    const id = this.idGenerator.generate();
    const newComment = new Comment(
      id,
      post.id,
      content,
      0,
      0,
      new Date().toISOString(),
      tokenPayload.id,
      tokenPayload.nickname
    ).toDBModel();
    await this.commentDatabase.createComment(newComment);
    const postCreator = await this.userDatabase.findUserByID(post.creator_id);
    const updatePost = new Posts(
      post.id,
      post.creator_id,
      post.content,
      post.comments + 1,
      post.likes,
      post.dislikes,
      post.created_at,
      post.updated_at,
      postCreator.nickname
    );
    await this.postDatabase.updatePost(updatePost.toDBModel());
    const output: CreateCommentOutputDTO = undefined;
    return output;
  };

  public likeOrDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<likeDislikeCommentOutputDTO> => {
    const { token, postId, commentId, like } = input;
    const tokenPayload = this.tokenmanager.getPayload(token);
    if (!tokenPayload) {
      throw new UnauthorizedError("você deve estar autenticado para acessar");
    }
    const post = await this.postDatabase.getPostByID(postId);
    if (!post) {
      throw new NotFoundError("post não encontrado");
    }
    const comment = await this.commentDatabase.getCommentById(commentId);
    console.log({ commentId }, { post } , {comment});

    if (!comment) {
      throw new NotFoundError("Comentario não existe :-)");
    }
    if (tokenPayload.id === comment.creator_id) {
      throw new ForbiddenError(" O criador comentario não deve curti-lo");
    }
    const creator = await this.userDatabase.findUserByID(comment.creator_id);
    const newComment = new Comment(
      comment.id,
      comment.post_id,
      comment.content,
      comment.likes,
      comment.dislikes,
      comment.created_at,
      comment.creator_id,
      creator.nickname
    );
    const likeDB = like ? 1 : 0;
    const commentLike = await this.commentDatabase.getLikeorDislikeComment(
      commentId,
      tokenPayload.id
    );

    const likeOrDislikeDB: LikeDislikeCommentDB = {
      user_id: tokenPayload.id,
      comment_id: comment.id,
      like: likeDB,
    };
    if (commentLike === COMMENT_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.commentDatabase.removeLikeOrDislike(likeOrDislikeDB);
        newComment.removeLike();
      } else {
        await this.commentDatabase.updateLikeOrDislike(likeOrDislikeDB);
        newComment.removeLike();
        newComment.addDislike();
      }
    } else if (commentLike === COMMENT_LIKE.ALREADY_DISLIKED) {
      if (!like) {
        await this.commentDatabase.removeLikeOrDislike(likeOrDislikeDB);
        newComment.removeDislike();
      } else {
        await this.commentDatabase.updateLikeOrDislike(likeOrDislikeDB);
        newComment.removeDislike();
        newComment.addLike();
      }
    } else {
      await this.commentDatabase.createLikeOrDislike(likeOrDislikeDB);
      like ? newComment.addLike() : newComment.addDislike();
    }
    const newCommentDB = newComment.toDBModel();
    await this.commentDatabase.updateComment(newCommentDB);
    const output: likeDislikeCommentOutputDTO = undefined;
    return output;
  };
}
