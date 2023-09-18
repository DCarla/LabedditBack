import { CommentBusiness } from "../../../src/businness/CommentsBusiness";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { PostDataBaseMock } from "../../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";
import { CommentDatabaseMock } from "../../mocks/CommentsDatabaseMock";
import { createCommentSchema } from "../../../src/dtos/comments/createComments.dto";
import { likeDislikeCommentSchema } from "../../../src/dtos/comments/likeDislikeComment.dto";

describe("Testando likes e dislikes comments ", () => {
  const commentBusiness = new CommentBusiness(
    new UserDataBaseMock(),
    new CommentDatabaseMock(),
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );
  test("Testando o likes e dislikes comments ", async () => {
    const input = likeDislikeCommentSchema.parse({
      postId: "post-id-mock1",
      like: true,
      token: "token-mock-user",
      commentId: "comment-id-mock1",
    });
    const output = await commentBusiness.likeOrDislikeComment(input);
    expect(output).toBeUndefined();
  });
});
