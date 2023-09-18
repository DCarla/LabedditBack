import { PostBusinness } from "../../../src/businness/PostBusiness";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";
import { PostDataBaseMock } from "../../mocks/PostDatabaseMock";
import { CreatePostSchema } from "../../../src/dtos/post/createPost.dto";
import { GetPostsSchema } from "../../../src/dtos/post/getPosts.dto";
import { LikeOrDislikePostSchema } from "../../../src/dtos/post/likeOrDislike.dto";

describe("Testando - Get post", () => {
  const postBusiness = new PostBusinness(
    new PostDataBaseMock(),
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  );

  test("Testando like e dislike do post", async () => {
    const input = LikeOrDislikePostSchema.parse({
      id: "post-id-mock2",
      token: "token-mock-user",
      like: true,
    });
    const output = await postBusiness.likeOrDislikePost(input);
    expect(output).toBeUndefined;
  });
});
