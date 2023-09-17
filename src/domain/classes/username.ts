export class Username {
  private _username: string;

  constructor(username: string) {
    if (this.isValid(username)) {
      this._username = username;
    } else {
      throw new Error("Username should be 3 to 20 letters");
    }
  }

  get username(): string {
    return this._username;
  }

  set username(newUsername: string) {
    if (this.isValid(newUsername)) {
      this._username = newUsername;
    } else {
      throw new Error("Username should be 3 to 20 letters");
    }
  }

  toString(): string {
    return this._username;
  }

  private isValid(username: string): boolean {
    return username.length >= 3 && username.length <= 20;
  }
}
