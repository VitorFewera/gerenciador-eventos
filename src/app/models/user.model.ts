export interface UserModels {
  id: number;
  image:any;
  nome: string;
  setor: string;
  email: string;
  login: string;
  senha: string;
}

export interface UserModel {
  users: UserModels[];
}
