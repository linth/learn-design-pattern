/**
 * 策略模式 (Strategy Design Pattern) - RPG 遊戲技能系統
 * 將英雄的技能（衝鋒、砍擊、盾擊、火球術）封裝成可互換的策略，
 * 英雄可在執行時期動態切換技能。
 *
 * Reference:
 *  - https://www.youtube.com/watch?v=IkG_KuMpQRM
 */

// TODO: 尚未完成

{
  /** 英雄資料介面 */
  interface IHero {
    name: string;
    hp: number;
    mp: number;
    strength: number;
    wisdom: number;
    defense: number;
  }

  /** [策略介面] 技能：不同技能的攻擊邏輯被封裝成獨立策略 */
  interface Skill {
    skilledMp: number;

    getSkillName(): string;
    attack(attackingHero: Hero, attackedHero: Hero): void;
  }

  /** [具體策略] 衝鋒 */
  class Charge implements Skill {
    skilledMp: number = 20;

    getSkillName(): string {
      return 'Charge (衝鋒)';
    }

    attack(attackingHero: Hero, attackedHero: Hero): void {
      const remainedHp =
        attackedHero.getHp() - attackingHero.getStrength() + attackedHero.getDefense();
      const remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }

  /** [具體策略] 砍擊 */
  class Slash implements Skill {
    skilledMp: number = 10;

    getSkillName(): string {
      return 'Slash (砍擊)';
    }

    attack(attackingHero: Hero, attackedHero: Hero): void {
      const remainedHp =
        attackedHero.getHp() - attackingHero.getStrength() + attackedHero.getDefense();
      const remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }

  /** [具體策略] 盾擊 */
  class ShieldBash implements Skill {
    skilledMp: number = 15;

    getSkillName(): string {
      return 'Shield Bash (盾擊)';
    }

    attack(attackingHero: Hero, attackedHero: Hero): void {
      const remainedHp =
        attackedHero.getHp() - attackingHero.getStrength() + attackedHero.getDefense();
      const remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }

  /** [具體策略] 火球術（依賴 wisdom 屬性，與物理技能不同） */
  class FireballSpell implements Skill {
    skilledMp: number = 30;

    getSkillName(): string {
      return 'Fireball Spell (火球術)';
    }

    attack(attackingHero: Hero, attackedHero: Hero): void {
      const remainedHp = attackedHero.getHp() - attackingHero.getWisdom();
      const remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }

  /** [環境類別 Context] 英雄，可裝備不同技能（策略）進行攻擊 */
  class Hero implements IHero {
    name: string;
    hp: number;
    mp: number;
    strength: number;
    wisdom: number;
    defense: number;
    // skill: Skill;  // TODO: 裝備技能

    constructor(
      name: string,
      hp: number,
      mp: number,
      strength: number,
      wisdom: number,
      defense: number,
    ) {
      this.name = name;
      this.hp = hp;
      this.mp = mp;
      this.strength = strength;
      this.wisdom = wisdom;
      this.defense = defense;
    }

    getHp(): number {
      return this.hp;
    }
    getMp(): number {
      return this.mp;
    }
    getStrength(): number {
      return this.strength;
    }
    getWisdom(): number {
      return this.wisdom;
    }
    getDefense(): number {
      return this.defense;
    }
    setHp(hp: number): void {
      this.hp = hp;
    }
    setMp(mp: number): void {
      this.mp = mp;
    }
  }

  /** 法師（繼承 Hero） */
  class Mage extends Hero {
    constructor(
      name: string,
      hp: number,
      mp: number,
      strength: number,
      wisdom: number,
      defense: number,
    ) {
      super(name, hp, mp, strength, wisdom, defense);
    }

    water_polo(): number {
      if (this.mp > 5) {
        const attack = this.wisdom * 2;
        this.mp -= 5;
        return attack;
      }
      throw new Error('MP 不足 5');
    }
  }

  /** 劍士（繼承 Hero） */
  class Swordsman extends Hero {
    constructor(
      name: string,
      hp: number,
      mp: number,
      strength: number,
      wisdom: number,
      defense: number,
    ) {
      super(name, hp, mp, strength, wisdom, defense);
    }

    collision_skill(other_side_defense: number): number {
      return this.strength - other_side_defense;
    }
  }

  /** 回合制管理器 */
  class Round {
    num_roud: number = 0;
    info: object = {
      num_roud: this.num_roud,
    };

    start(): void {
      this.num_roud += 1;
    }
  }

  function main(): void {
    const s = new Swordsman('Hero-1', 130, 150, 5, 25, 10);
    const m = new Mage('Hero-2', 200, 50, 20, 10, 30);
  }
}
