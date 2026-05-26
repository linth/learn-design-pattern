"use strict";
/**
 * state design pattern.
 *
 * Reference:
 *  - https://www.youtube.com/watch?v=h8x6lBkwRUQ&list=PLV5qT67glKSFAhREF8DpbN6fn3VFSr8J7&index=29
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractAction = void 0;
class AbstractAction {
    constructor(actionName) {
        this.actionName = actionName;
    }
    performAction() {
        console.log(`Performing ${this.actionName} action.`);
    }
}
exports.AbstractAction = AbstractAction;
