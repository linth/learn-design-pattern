/**
 * RPG game example.
 * 
 * 
 * 
 * Reference:
 *  - https://www.youtube.com/watch?v=IkG_KuMpQRM
 */

// TODO: 尚未完成

{
  interface IHero {
    name: string;
    hp: number;
    mp: number;
    strength: number;
    wisdom: number;
    defense: number;
    // skill: Skill;
  }
  
  interface Skill {
    skilledMp: number;

    // Charge (衝鋒), Slash (砍擊), Shield Bash (盾擊), Fireball Spell (火球術)
    getSkillName(): string;
    attack(attackingHero: Hero, attackedHero: Hero): void;
  }

  class Charge implements Skill {
    skilledMp: number = 20;

    getSkillName(): string {
      return 'Charge (衝鋒)';
    }

    attack(attackingHero: Hero, attackedHero: Hero): void {
      let remainedHp = attackedHero.getHp() - attackingHero.getStrength() + attackedHero.getDefense();
      let remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }

  class Slash implements Skill {
    skilledMp: number = 10;

    getSkillName() {
      return 'Slash (砍擊)';
    }

    attack(attackingHero: Hero, attackedHero: Hero): void {
      let remainedHp = attackedHero.getHp() - attackingHero.getStrength() + attackedHero.getDefense();
      let remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }

  class ShieldBash implements Skill {
    skilledMp: number = 15;

    getSkillName() {
      return 'Shield Bash (盾擊)';
    }

    attack(attackingHero: Hero, attackedHero: Hero) {
      let remainedHp = attackedHero.getHp() - attackingHero.getStrength() + attackedHero.getDefense();
      let remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }

  class FireballSpell implements Skill {
    skilledMp: number = 30;

    getSkillName(): string {
      return 'Fireball Spell (火球術)';
    }

    attack(attackingHero: Hero, attackedHero: Hero): void {
      let remainedHp = attackedHero.getHp() - attackingHero.getWisdom();
      let remainedMp = attackingHero.getMp() - this.skilledMp;
      attackedHero.setHp(remainedHp);
      attackingHero.setMp(remainedMp);
    }
  }
  
  class Hero implements IHero {
    name: string;
    hp: number;
    mp: number;
    strength: number;
    wisdom: number;
    defense: number;
    // skill: Skill;
  
    constructor(name: string, hp: number, mp: number, strength: number, wisdom: number, defense: number) {
      this.name = name;
      this.hp = hp;
      this.mp = mp;
      this.strength = strength;
      this.wisdom = wisdom;
      this.defense = defense;
    }
  
    getHp(): number { return this.hp; }
    getMp(): number { return this.mp; }
    getStrength(): number { return this.strength; }
    getWisdom(): number { return this.wisdom; }
    getDefense(): number { return this.defense; }
  
    setHp(hp: number): void { this.hp = hp; }
    setMp(mp: number): void { this.mp = mp; }
  }
  
  class Mage extends Hero {
    constructor(name: string, hp: number, mp: number, strength: number, wisdom: number, defense: number) {
      super(name, hp, mp, strength, wisdom, defense);
    }
  
    water_polo(): number | string {
      if (this.mp > 5) {
        let attack = this.wisdom * 2;
        this.mp -= 5;
        return attack;
      }
      throw new Error('MP less than 5 mp.');
    }
  }
  
  class Swordsman extends Hero {
    constructor(name: string, hp: number, mp: number, strength: number, wisdom: number, defense: number) {
      super(name, hp, mp, strength, wisdom, defense);
    }
  
    collision_skill(other_side_defense: number): number {
      return this.strength - other_side_defense;
    }
  }
  
  class Round {
    num_roud: number = 0;
    info: object = {
      num_roud: this.num_roud,
  
    }
  
    start() {
      this.num_roud += 1;
    }
  }
  
  
  function main() {
    const s = new Swordsman('Hero-1', 130, 150, 5, 25, 10);
    const m = new Mage('Hero-2', 200, 50, 20, 10, 30);
  }
}