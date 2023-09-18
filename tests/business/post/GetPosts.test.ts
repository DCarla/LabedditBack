import { PostBusinness } from "../../../src/businness/PostBusiness";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";
import { PostDataBaseMock } from "../../mocks/PostDatabaseMock";
import { CreatePostSchema } from "../../../src/dtos/post/createPost.dto";
import { GetPostsSchema } from "../../../src/dtos/post/getPosts.dto";

describe("Testando - Get post", () => {
  const postBusiness = new PostBusinness(
    new PostDataBaseMock(),
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  );

  test("Todos os posts", async () => {
    const input = GetPostsSchema.parse({
      token: "token-mock-user",
    });
    const output = await postBusiness.getPosts(input);
    expect(output).toContainEqual({
      id: "post-id-mock2",
      content: " Qualquer coisa ",
      comment: 0,
      likes: 0,
      dislikes: 0,
      created_at: expect.any(String),
      updated_at: expect.any(String),
      creator: {
        id: "id-mock-user2",
        name: "mock-user2",
      },
    });
  });
});
