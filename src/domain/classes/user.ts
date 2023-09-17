class User {
  private _userId: string;
  private _email: string;
  private _password: string;
  private _username: Username;
  private _folders: Folders;
  constructor(
    userId: string,
    email: string,
    password: string,
    username: Username,
    folders: Folders
  ) {
    if (this.emailIsValid(email)) {
      this._userId = userId;
      this._email = email;
      this._password = password;
      this._username = username;
      this._folders = folders;
    } else {
      throw new Error("Email is not valid");
    }
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
