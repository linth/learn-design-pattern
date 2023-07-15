/**
 * state design pattern.
 * 
 * Reference:
 *  - https://www.youtube.com/watch?v=h8x6lBkwRUQ&list=PLV5qT67glKSFAhREF8DpbN6fn3VFSr8J7&index=29
 */

export interface Action {
  performAction(): void;
}

export abstract class AbstractAction implements Action {
  protected actionName: string;

  constructor(actionName: string) {
    this.actionName = actionName;
  }

  performAction(): void {
    console.log(`Performing ${this.actionName} action.`);      
  }
}