/**
 * interpreter design pattern.
 * 
 * 
 * Reference:
 *  - https://github.com/torokmark/design_patterns_in_typescript/blob/main/interpreter/interpreter.ts
 */

namespace InterpreterPattern {

  export class Context {

  }

  export interface AbstractExpression {
    interpret(context: Context): void;
  }

  export class TerminalExpression implements AbstractExpression {
    public interpret(context: Context): void {
      console.log(`interpret method of TerminalExpression is being called!`);
    }
  }

  export class NonterminalExpression implements AbstractExpression {
    public interpret(context: Context): void {
      console.log(`interpret hod of NonterminalExpression is being called!`);      
    }
  }
}


{
  var context: InterpreterPattern.Context = new InterpreterPattern.Context(), 
    list = [], 
    i = 0, 
    max;

  // TODO: need to check this example.
  // list.push(new InterpreterPattern.NonterminalExpression());
  // list.push(new InterpreterPattern.NonterminalExpression());
  // list.push(new InterpreterPattern.NonterminalExpression());
  // list.push(new InterpreterPattern.TerminalExpression());
  // list.push(new InterpreterPattern.NonterminalExpression());
  // list.push(new InterpreterPattern.NonterminalExpression());
  // list.push(new InterpreterPattern.TerminalExpression());
  // list.push(new InterpreterPattern.TerminalExpression());

  // for (let i=0, max=list.length; i<max; i+=1) {
  //   list[i].interpret(context);
  // }
}


