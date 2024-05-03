/**
 * KOF game
 * 
 * Reference:
 *  - https://juejin.cn/post/7064160904899723301?searchId=20240504002124C2FFA1D188D88289EBBA
 */

{
  // 發起者
  class RoleOriginator {
    hp: number = 100;
    attack: number = 50;

    display(): void {
      console.log('HP: ', this.hp);
      console.log('Attack: ', this.attack);      
    }

    fight(): void {

    }

    saveState(): RoleStateMemento {
      return new RoleStateMemento(this.hp, this.attack);
    }

    recoveryState(memento: RoleStateMemento): void {
      this.hp = memento.getHp();
      this.attack = memento.getAttack();
    }
  }

  class RoleStateMemento {
    hp: number;
    attack: number;

    constructor(hp: number, attack: number) {
      this.hp = hp;
      this.attack = attack;
    }

    getHp(): number {
      return this.hp;
    }

    setHp(hp: number): void {
      this.hp = hp;
    }

    getAttack(): number {
      return this.attack;
    }

    setAttack(attack: number) {
      this.attack = attack;
    }
  }

  // 管理者: 快照資訊, 角色狀態快照管理器
  class RoleStateCaretaker {
    memento: RoleStateMemento;

    getMemento(): RoleStateMemento {
      return this.memento;
    }

    setMemento(memento: RoleStateMemento): void {
      this.memento = memento;
    }
  }

  const ro = new RoleOriginator();
  ro.display();

  console.log('儲存現在的狀態快照');
  const rsc = new RoleStateCaretaker();
  rsc.setMemento(ro.saveState());

  ro.fight();
  ro.fight();
  ro.fight();
  ro.display();

  console.log('恢復之前的狀態快照');
  ro.recoveryState(rsc.getMemento());
  ro.display();
}


