import { ForbiddenError } from "../Errors/forbiddenError";
import { NotFoundError } from "../Errors/notFoundError";
import { UnauthorizedError } from "../Errors/unauthorizedError";
import { PostDatabase } from "../database/Postdatabase";
import { UserDatabase } from "../database/UserDatabase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/post/createPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import {
  LikeOrDislikePostInputDTO,
  LikeOrDislikePostOutputDTO,
} from "../dtos/post/likeOrDislike.dto";
import { LikeDislikeDB, POST_LIKE, PostModel, Posts } from "../models/Post";
import { HashManager } from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/tokenManager";

export class PostBusinness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}

  public getPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;
    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new UnauthorizedError("você precisa estar autenticado");
    }
    const postsDB = await this.postDatabase.getPosts();
    const postsModel: Array<Promise<PostModel>> = postsDB.map(async (post) => {
      const creator = await this.userDatabase.findUserByID(post.creator_id);
      const postsModel = new Posts(
        post.id,
        post.creator_id,
        post.content,
        post.comments,
        post.likes,
        post.dislikes,
        post.created_at,
        post.updated_at,
        creator.nickname
      ).toBusinessModel();
      return postsModel;
    });
    const output: PostModel[] = await Promise.all(postsModel);
    return output;
  };
  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { token, content } = input;
    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new UnauthorizedError("você precisa estar autenticado");
    }
    const id = this.idGenerator.generate();
    const newPost = new Posts(
      id,
      tokenPayload.id,
      content,
      0,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      tokenPayload.nickname
    );

    await this.postDatabase.createPost(newPost.toDBModel());

    const output: CreatePostOutputDTO = undefined;
    return output;
  };

  public likeOrDislikePost = async (
    input: LikeOrDislikePostInputDTO
  ): Promise<LikeOrDislikePostOutputDTO> => {
    const { token, like, id } = input;
    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new UnauthorizedError("você precisa estar autenticado");
    }
    const postdb = await this.postDatabase.getPostByID(id);
    if (!postdb) {
      throw new NotFoundError("Post não foi encontrado");
    }
    const creator = await this.userDatabase.findUserByID(postdb.creator_id);
    const post = new Posts(
      postdb.id,
      postdb.creator_id,
      postdb.content,
      postdb.comments,
      postdb.likes,
      postdb.dislikes,
      postdb.created_at,
      postdb.updated_at,
      creator.nickname
    );

    const likeDB = like ? 1 : 0;
    const likeOrDislikedb: LikeDislikeDB = {
      like: likeDB,
      post_id: postdb.id,
      user_id: tokenPayload.id,
    };
    const likeOrDislikeExist = await this.postDatabase.getlikeOrDislikePost(
      likeOrDislikedb
    );
    if (post.getCreatorId() === tokenPayload.id) {
      throw new ForbiddenError(" Você não deve curtir o proprio post");
    }
    if (likeOrDislikeExist === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDatabase.removeLikeOrDislike(likeOrDislikedb);
        post.removeLike();
      } else {
        await this.postDatabase.updateLikeOrDislike(likeOrDislikedb);
        post.removeLike();
        post.addDislike();
      }
    } else if (likeOrDislikeExist === POST_LIKE.ALREADY_DISLIKED) {
      if (!like) {
        await this.postDatabase.removeLikeOrDislike(likeOrDislikedb);
        post.removeDislike();
      } else {
        await this.postDatabase.updateLikeOrDislike(likeOrDislikedb);
        post.removeDislike();
        post.addLike();
      }
    } else {
      await this.postDatabase.insertLikeOrDislike(likeOrDislikedb);
      like ? post.addLike() : post.addDislike();
    }
    await this.postDatabase.updatePost(post.toDBModel());
    const output: LikeOrDislikePostOutputDTO = undefined;
    return output;
  };
}
