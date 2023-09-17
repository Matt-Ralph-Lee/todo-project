import { Folders } from "./folder";
import { Username } from "./username";

export class User {
  private _userId: string;
  private _username: Username;
  private _folders: Folders;
  constructor(userId: string, username: Username, folders: Folders) {
    this._userId = userId;
    this._username = username;
    this._folders = folders;
  }

  get userId(): string {
    return this._userId;
  }
  get username(): Username {
    return this._username;
  }
  get folders(): Folders {
    return this._folders;
  }

  private emailIsValid(email: string): boolean {
    return /.+@.+\..+/.test(email);
  }
}
