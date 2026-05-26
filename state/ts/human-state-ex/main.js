"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAction_1 = require("./AbstractAction");
// import { Action } from "./Action.interface";
class WalkAction extends AbstractAction_1.AbstractAction {
    constructor() {
        super('Walk');
    }
}
class RunAction extends AbstractAction_1.AbstractAction {
    constructor() {
        super('Run');
    }
}
class JumpAction extends AbstractAction_1.AbstractAction {
    constructor() {
        super('Jump');
    }
}
// add other specfic actions.
class Context {
    constructor() {
        this.currentAction = null;
    }
    setCurrentAction(action) {
        this.currentAction = action;
    }
    performAction() {
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
