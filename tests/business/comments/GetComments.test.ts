import { CommentBusiness } from "../../../src/businness/CommentsBusiness";

import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock } from "../../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock";
import { getCommentSchema } from "../../../src/dtos/comments/getComments.dto";

describe("Testando Gest Comentarios", () => {
  const commentBusiness = new CommentBusiness(
    new UserDataBaseMock(),
    new CommentDatabaseMock(),
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );
  test("Testando get comments", async () => {
    const input = getCommentSchema.parse({
      token: "token-mock-user",
      postId: "post-id-mock1",
    });
    const output = await commentBusiness.getComments(input);
    expect(output).toEqual([
      {
        id: "comment-id-mock1",
        content: "Qualquer coisa",
        likes: 0,
        dislikes: 1,
        createdAt: expect.any(String),
        postId: "post-id-mock1",
        creator: {
          id: "id-mock-user1",
          name: "mock-user1",
        },
      },
    ]);
  });
});
