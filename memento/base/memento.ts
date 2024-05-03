/**
 * Memento design pattern.
 *  - Memento 
 *  - Originator
 *  - Caretaker
 * 
 * Reference:
 *  - https://refactoring.guru/design-patterns/memento
 */

{
  class GamePlayer {
    level: number = 0;
    memory: number = 0;

    createMemento(): Memento {
      return new Memento(this.level, this.memory);
    }

    setMemento(memento: Memento) {
      this.level = memento.level;
      this.memory = memento.memory;
    }
  }

  class Memento {
    level: number;
    memory: number;

    constructor(level: number, memory: number) {
      this.level = level;
      this.memory = memory;
    }
  }

  class Caretaker {
    memento?: Memento;
  }

  console.log('hello world.');
  
  
  let m = new Memento(2, 300);
  let player = new GamePlayer().createMemento();
  console.log(player.level);
  console.log(player.memory);
}

