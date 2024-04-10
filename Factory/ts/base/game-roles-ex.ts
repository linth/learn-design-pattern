/**
 * 遊戲角色創建的示例，以及對應的技能使用範例
 * 
 */

{
  // 定義角色介面
  interface Character {
    name: string;
    attack(): void;
  }

  // 具體的戰士角色類別
  class Warrior implements Character {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    attack(): void {
      console.log(`${this.name} uses sword to attack!`);
    }
  }

  // 具體的法師角色類別
  class Mage implements Character {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    attack(): void {
      console.log(`${this.name} casts a fireball!`);
    }
  }

  // 定義技能介面
  interface Skill {
    useSkill(): void;
  }

  // 具體的劍舞技能類別
  class SwordDance implements Skill {
    useSkill(): void {
      console.log("Performing Sword Dance!");
    }
  }

  // 具體的火球術技能類別
  class FireballSpell implements Skill {
    useSkill(): void {
      console.log("Casting Fireball Spell!");
    }
  }


  // 角色工廠介面
  interface CharacterFactory {
    createCharacter(name: string): Character;
  }

  // 具體的戰士工廠
  class WarriorFactory implements CharacterFactory {
    createCharacter(name: string): Character {
      return new Warrior(name);
    }
  }

  // 具體的法師工廠
  class MageFactory implements CharacterFactory {
    createCharacter(name: string): Character {
      return new Mage(name);
    }
  }

  // 技能工廠介面
  interface SkillFactory {
    createSkill(): Skill;
  }

  // 具體的劍舞技能工廠
  class SwordDanceFactory implements SkillFactory {
    createSkill(): Skill {
        return new SwordDance();
    }
  }

  // 具體的火球術技能工廠
  class FireballSpellFactory implements SkillFactory {
    createSkill(): Skill {
        return new FireballSpell();
    }
  }

  const warriorFactory = new WarriorFactory();
  const warrior = warriorFactory.createCharacter("Conan");
  warrior.attack(); // 輸出：Conan uses sword to attack!

  const mageFactory = new MageFactory();
  const mage = mageFactory.createCharacter("Gandalf");
  mage.attack(); // 輸出：Gandalf casts a fireball!

  const swordDanceFactory = new SwordDanceFactory();
  const swordDance = swordDanceFactory.createSkill();
  swordDance.useSkill(); // 輸出：Performing Sword Dance!

  const fireballSpellFactory = new FireballSpellFactory();
  const fireballSpell = fireballSpellFactory.createSkill();
  fireballSpell.useSkill(); // 輸出：Casting Fireball Spell!
}
