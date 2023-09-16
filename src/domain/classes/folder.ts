class Folder {
  private _folder: string[];

  constructor(folder: string[]) {
    if (folder.length >= 1 && folder.includes("All")) {
      this._folder = folder;
    } else {
      throw new Error("folder must contain All folder");
    }
  }

  get folder(): string[] {
    return this._folder;
  }

  add(newFolder: string) {
    if (this._folder.includes(newFolder)) {
      throw new Error("folder name has to be unique...");
    } else {
      this._folder.push(newFolder);
    }
  }

  delete(targetFolder: string) {
    if (this._folder.includes(targetFolder)) {
      this._folder = this._folder.filter((s) => s !== targetFolder);
    }
  }
}
