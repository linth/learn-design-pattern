import { AbstractAction, Action } from './AbstractAction';

/** [具體狀態] 走路 */
class WalkAction extends AbstractAction {
  constructor() {
    super('走路');
  }
}

/** [具體狀態] 跑步 */
class RunAction extends AbstractAction {
  constructor() {
    super('跑步');
  }
}

/** [具體狀態] 跳躍 */
class JumpAction extends AbstractAction {
  constructor() {
    super('跳躍');
  }
}

/** [環境類別] 可隨時切換當前行為 */
class Context {
  private currentAction: Action | null = null;

  setCurrentAction(action: Action): void {
    this.currentAction = action;
  }

  performAction(): void {
    if (this.currentAction) {
      this.currentAction.performAction();
    }
  }
}

{
  const context = new Context();
  const walk = new WalkAction();
  const run = new RunAction();
  const jump = new JumpAction();

  // 可動態切換不同行為（狀態）
  context.setCurrentAction(walk);
  context.performAction();

  context.setCurrentAction(run);
  context.performAction();

  context.setCurrentAction(jump);
  context.performAction();

  context.setCurrentAction(walk);
  context.performAction();
}

