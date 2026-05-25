/**
 * 策略模式 (Strategy Design Pattern) - RPG 遊戲技能系統（改良版）
 * 將英雄的攻擊技能封裝成可互換的策略物件。
 */
// TODO: 尚未完成

{
  /** 英雄角色 */
  class Hero {
    name: string;
    hp: number;
    mp: number;
    strength: number;
    wisdom: number;
    defense: number;
    skill: Skill;

    constructor(
      name: string,
      hp: number,
      mp: number,
      strength: number,
      wisdom: number,
      defense: number,
      skill: Skill,
    ) {
      this.name = name;
      this.hp = hp;
      this.mp = mp;
      this.strength = strength;
      this.wisdom = wisdom;
      this.defense = defense;
      this.skill = skill;
    }

    attack(target_hero: Hero): void {
      // const injury = this.skill.attack(this, target_hero);
    }

    lostHp(hp: number): void {
      this.setHp(this.getHp() - hp);
    }
    lostMp(mp: number): void {
      const currentMp = this.getMp();
      if (currentMp < mp) {
        throw new Error('MP 不足');
      }
      this.setMp(currentMp - mp);
    }

    getHp(): number {
      return this.hp;
    }
    getMp(): number {
      return this.mp;
    }
    setHp(hp: number): void {
      this.hp = hp;
    }
    setMp(mp: number): void {
      this.mp = mp;
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
  }

  /** [策略介面] 技能 */
  interface Skill {
    attack(attacking_hero: Hero, attacked_hero: Hero): number;
  }

  /** [具體策略] 衝撞攻擊 = strength * 1.2, Mp -80 */
  class Colliding implements Skill {
    attack(attacking_hero: Hero, attacked_hero: Hero): number {
      const injury = attacking_hero.getStrength() * 1.2;
      attacking_hero.lostMp(80);
      attacked_hero.lostHp(injury);
      return injury;
    }
  }

  /** [具體策略] 水球攻擊 = wisdom * 2, Mp -20 */
  class WaterBall implements Skill {
    attack(attacking_hero: Hero, attacked_hero: Hero): number {
      const injury = attacked_hero.getWisdom() * 2;
      attacking_hero.lostMp(20);
      attacked_hero.lostHp(injury);
      return injury;
    }
  }
}
