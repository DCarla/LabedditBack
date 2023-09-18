import { UserBusiness } from "../../../src/businness/UserBusiness";
import { signupSchema } from "../../../src/dtos/user/signup.dto";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";

describe(" Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  );
  test("Deve retornar um token", async () => {
    const input = signupSchema.parse({
      email: "fulano123@gmail.com",
      password: "123456",
      nickname: "Fulano",
    });
    const output = await userBusiness.signup(input);
    expect(output).toEqual({
      message: expect.any(String),
      token: "token-mock",
    });
  });
});
