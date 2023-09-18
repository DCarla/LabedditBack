export class HashManagerMock {
  public hash = async (plaintext: string): Promise<string> => {
    return "hash-mock";
  };

  public compare = async (
    plaintext: string,
    hash: string
  ): Promise<boolean> => {
    switch (plaintext) {
      case "mockA123":
        return hash === "mocka1234";

      case "mockB123":
        return hash === "mockb1234";

      default:
        return false;
    }
  };
}
