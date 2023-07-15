import { AbstractAction, Action } from "./AbstractAction";
// import { Action } from "./Action.interface";


class WalkAction extends AbstractAction {
  constructor() {
    super('Walk');
  }
}


class RunAction extends AbstractAction {
  constructor() {
    super('Run');
  }
}


class JumpAction extends AbstractAction {
  constructor() {
    super('Jump');
  }
}

// add other specfic actions.


class Context {
  private currentAction: Action | null;

  constructor() {
    this.currentAction = null;
  }

  setCurrentAction(action: Action): void {
    this.currentAction = action;
  }

  performAction(): void {
    if (this.currentAction !== null) {
      this.currentAction.performAction();
    }
  }
}

{
  // 使用一個context class
  const context = new Context();

  const walkAction = new WalkAction();
  const runAction = new RunAction();
  const jumpAction = new JumpAction();

  // 可以透過context進行轉換action.
  context.setCurrentAction(walkAction);
  context.performAction();

  context.setCurrentAction(runAction);
  context.performAction();
  
  context.setCurrentAction(jumpAction);
  context.performAction();

  context.setCurrentAction(walkAction);
  context.performAction();
}

