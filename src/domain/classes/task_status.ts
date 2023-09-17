class TaskStatus {
  private _taskNum: number;
  private _doneTaskNum: number;
  constructor(taskNum: number, doneTaskNum: number) {
    if (taskNum >= 0 && doneTaskNum >= 0) {
      this._taskNum = taskNum;
      this._doneTaskNum = doneTaskNum;
    } else {
      throw new Error("task number cannot be less than 0");
    }
  }

  get taskNum(): number {
    return this._taskNum;
  }
  get doneTaskNum(): number {
    return this._doneTaskNum;
  }

  calculateProgress(): number {
    if (this._taskNum === 0) {
      return 0;
    }
    return this._taskNum / this._doneTaskNum;
  }
}
