/**
 * 狀態模式 (State Pattern) - 人類行為動作範例
 * 人的行為（走路、跑步、跳躍）可看作不同狀態，透過 Context 切換。
 *
 * Reference:
 *  - https://www.youtube.com/watch?v=h8x6lBkwRUQ&list=PLV5qT67glKSFAhREF8DpbN6fn3VFSr8J7&index=29
 */

/** [狀態介面] 行為動作 */
export interface Action {
  performAction(): void;
}

/** 抽象基底動作 */
export abstract class AbstractAction implements Action {
  protected actionName: string;

  constructor(actionName: string) {
    this.actionName = actionName;
  }

  performAction(): void {
    console.log(`執行 ${this.actionName} 動作`);
  }
}