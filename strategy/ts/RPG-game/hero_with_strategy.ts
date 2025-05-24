// TODO: 尚未完成


{
  class Hero {
    name: string;
    hp: number;
    mp: number;
    strength: number;
    wisdom: number;
    defense: number;
    skill: Skill;

    constructor(name: string, hp: number, mp: number, strength: number, wisdom: number, defense: number, skill: Skill) {
      this.name = name;
      this.hp = hp;
      this.mp = mp;
      this.strength = strength;
      this.wisdom = wisdom;
      this.defense = defense;
      this.skill = skill;
    }

    attack(target_hero: Hero): void {
      // let injury = this.skill.attack()
    }

    lostHp(hp: number): void { this.setHp(this.getHp() - hp); }
    lostMp(mp: number): void {
      let currentMp = this.getMp();
      if (currentMp < mp) {
        throw new Error;
      } else {
        this.setMp(currentMp - mp);
      }
    }

    getHp(): number { return this.hp; }
    getMp(): number { return this.mp; }
    setHp(hp: number): void { this.hp = hp; }
    setMp(mp: number): void { this.mp = mp; }
    getStrength(): number { return this.strength; }
    getWisdom(): number { return this.wisdom; }
    getDefense(): number { return this.defense; }
  }
  
  
  interface Skill {
    attack(attacking_hero: Hero, attacked_hero: Hero): number;
  }

  class Colliding implements Skill {
    // 衝撞攻擊 = strength * 1.2; Mp = -80
    attack(attacking_hero: Hero, attacked_hero: Hero): number {
      let injury = attacking_hero.getStrength() * 1.2;
      attacking_hero.getMp() - 80;
      attacked_hero.getHp() - injury;
      return injury;
    }
  }

  class WaterBall implements Skill {
    // 水球攻擊 = wisdom * 2; Mp = -20
    attack(attacking_hero: Hero, attacked_hero: Hero): number {
      let injury = attacked_hero.getWisdom() * 2;
      attacking_hero.getMp() - 20;
      attacked_hero.getHp() - injury;
      return injury;
    }
  }
}