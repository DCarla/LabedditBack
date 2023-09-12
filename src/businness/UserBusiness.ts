import { ConflictError } from "../Errors/conflictError";
import { NotFoundError } from "../Errors/notFoundError";
import { UnauthorizedError } from "../Errors/unauthorizedError";
import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { signupInputDTO, signupOutputDTO } from "../dtos/user/signup.dto";
import { User, UserDB } from "../models/User";
import { HashManager } from "../services/hashManager";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/tokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}

  public signup = async (input: signupInputDTO): Promise<signupOutputDTO> => {
    const { nickname, email, password } = input;
    const id = this.idGenerator.generate();
    console.log(input);
    //hasheando a senha
    const hashedPassword = await this.hashManager.hash(password);
    // verificando se já existe o email cadastrado
    const emailExists = await this.userDatabase.findUserByEmail(email);
    console.log(emailExists);
    if (emailExists) {
      throw new ConflictError("Email já existe");
    }
    // Criação de uma nova instância de User com os dados fornecidos
    const newUser = new User(
      id,
      email,
      hashedPassword,
      nickname,
      new Date().toISOString()
    );
    const newUserDB: UserDB = {
      id: newUser.getId(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      nickname: newUser.getNickname(),
      created_at: newUser.getcreated_at(),
    };
    await this.userDatabase.insertUser(newUserDB);
    const payload = {
      id: newUser.getId(),
      nickname: newUser.getNickname(),
    };
    const token = this.tokenManager.createToken(payload);

    const output: signupOutputDTO = {
      message: "Usuário registrado com sucesso.",
      token,
    };
    return output;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);
    if (!userDB) {
      throw new NotFoundError("User not found");
    }
    const hashedPassword = userDB.password;
    const isPasswordCorrect = await this.hashManager.compare(
      password,
      hashedPassword
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid password");
    }
    const payload = {
      id: userDB.id,
      nickname: userDB.nickname,
    };
    const token = this.tokenManager.createToken(payload);
    const output: LoginOutputDTO = {
      message: "Login successful",
      token,
    };
    return output;
  };
}
