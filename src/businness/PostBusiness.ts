import { UnauthorizedError } from "../Errors/unauthorizedError";
import { PostDatabase } from "../database/Postdatabase";
import { UserDatabase } from "../database/UserDatabase";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import { PostModel, Posts } from "../models/Post";
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
  ): Promise<GetPostsOutputDTO[]> => {
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
}
