import { UserBusiness } from "../../../src/businness/UserBusiness";
import { LoginSchema } from "../../../src/dtos/user/login.dto";
import { signupSchema } from "../../../src/dtos/user/signup.dto";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenGeneratorMock";
import { UserDataBaseMock } from "../../mocks/UserDatabaseMock";

describe(" Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  );
  test("Deve retornar um token", async () => {
    const input = LoginSchema.parse({
      email: "user2@email.com",
      password: "mockB123",
    });
    const output = await userBusiness.login(input);
    expect(output).toEqual({
      message: expect.any(String),
      token: "token-mock-user",
    });
  });
});
