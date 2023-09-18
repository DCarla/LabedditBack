import { PostBusinness } from "../../../src/businness/PostBusiness";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";
import { PostDataBaseMock } from "../../mocks/PostDatabaseMock";
import { CreatePostSchema } from "../../../src/dtos/post/createPost.dto";

describe(" Testando criação de post", () => {
  const postBusiness = new PostBusinness(
    new PostDataBaseMock(),
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  );

  test("post criado com sucesso", async () => {
    const input = CreatePostSchema.parse({
      token: "token-mock-user",
      content: "Post teste com sucesso",
    });
    const output = await postBusiness.createPost(input);
    expect(output).toBeUndefined();
  });
});
