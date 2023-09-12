export interface TokenPayload {
  id: string;
  nickname: string;
}

export interface UserDB {
  id: string;

  email: string;
  password: string;
  nickname: string;
  created_at: string;
}
export interface UserModel {
  id: string;

  email: string;
  nickname: string;
  created_at: string;
}

export class User {
  constructor(
    private id: string,

    private email: string,
    private password: string,
    private nickname: string,
    private created_at: string
  ) {}
  public getId(): string {
    return this.id;
  }

  public setId(value: string): void {
    this.id = value;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(value: string): void {
    this.email = value;
  }
  public getPassword(): string {
    return this.password;
  }

  public setPassword(value: string): void {
    this.password = value;
  }
  public getNickname(): string {
    return this.nickname;
  }
  public setNickname(value: string): void {
    this.nickname = value;
  }

  public getcreated_at(): string {
    return this.created_at;
  }

  public setcreated_at(value: string): void {
    this.created_at = value;
  }
  public toDBModel(): UserDB {
    return {
      id: this.id,

      email: this.email,
      password: this.password,
      nickname: this.nickname,
      created_at: this.created_at,
    };
  }

  public toBusinessModel(): UserModel {
    return {
      id: this.id,

      email: this.email,
      nickname: this.nickname,
      created_at: this.created_at,
    };
  }
}
