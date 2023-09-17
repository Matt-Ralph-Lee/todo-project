class Folders {
  private _folders: string[];

  constructor(folders: string[]) {
    if (folders.length >= 1 && folders.includes("All")) {
      this._folders = folders;
    } else {
      throw new Error("folder must contain All folder");
    }
  }

  get folders(): string[] {
    return this._folders;
  }

  add(newFolder: string) {
    if (this._folders.includes(newFolder)) {
      throw new Error("folder name has to be unique...");
    } else {
      this._folders.push(newFolder);
    }
  }

  delete(targetFolder: string) {
    if (this._folders.includes(targetFolder)) {
      this._folders = this._folders.filter((s) => s !== targetFolder);
    }
  }
}
