import { Task } from "./task";

export class Tasks {
  private _tasks: Task[];
  private _folder: string;

  constructor(tasks: Task[], folder: string) {
    this._tasks = tasks;
    this._folder = folder;
  }

  get tasks(): Task[] {
    return this._tasks;
  }
  get folder(): string {
    return this._folder;
  }

  add(newTask: Task) {
    if (this._tasks.includes(newTask)) {
      throw new Error("folder name has to be unique...");
    } else {
      this._tasks.push(newTask);
    }
  }

  delete(targetTask: Task): boolean {
    if (this._tasks.includes(targetTask)) {
      this._tasks = this._tasks.filter((s) => s !== targetTask);
      return true;
    } else {
      return false;
    }
  }
}
