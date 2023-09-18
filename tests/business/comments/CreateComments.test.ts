import { CommentBusiness } from "../../../src/businness/CommentsBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock } from "../../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock";

import { createCommentSchema } from "../../../src/dtos/comments/createComments.dto";

describe("Testando Criando Comentarios", () => {
  const commentBusiness = new CommentBusiness(
    new UserDataBaseMock(),
    new CommentDatabaseMock(),
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );
  test("Testando o create comments", async () => {
    const input = createCommentSchema.parse({
      token: "token-mock-user",
      postId: "post-id-mock2",
      content: "Comentario de teste com sucesso",
    });
    const output = await commentBusiness.createComment(input);
    expect(output).toBeUndefined();
  });
});
