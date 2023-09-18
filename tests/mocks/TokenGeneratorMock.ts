import { TokenPayload } from "../../src/models/User";

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      return "token-mock";
    } else if (payload.id === "id-mock-admin") {
      return "token-mock-admin";
    } else {
      return "token-mock-user";
    }
  };

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock-admin") {
      return {
        id: "id-mock-admin",
        nickname: "Test User",
      };
    } else if (token === "token-mock-user") {
      return {
        id: "id-mock-user",
        nickname: "Test User",
      };
    } else if (token === "token-mock-test-error") {
      return {
        id: "id-mock-test-error",
        nickname: "Test Error",
      };
    } else {
      return null;
    }
  };
}
