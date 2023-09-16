class Task {
  private _title: string;
  private _detail: string;
  private _isDone: boolean;
  constructor(title: string, detail: string, isDone: boolean) {
    if (this.titleIsValid(title)) {
      this._title = title;
      this._detail = detail;
      this._isDone = isDone;
    } else {
      throw new Error("title must have at least one letter...");
    }
  }

  get title(): string {
    return this._title;
  }
  set title(newTitle: string) {
    if (this.titleIsValid(newTitle)) {
      this._title = newTitle;
    } else {
      throw new Error("title must have at least one letter...");
    }
  }

  get detail(): string {
    return this._detail;
  }
  set detail(newDetail: string) {
    this._detail = newDetail;
  }

  get isDone(): boolean {
    return this._isDone;
  }
  set isDone(newIsDone: boolean) {
    this._isDone = newIsDone;
  }

  private titleIsValid(title: string): boolean {
    return title !== "";
  }
}
