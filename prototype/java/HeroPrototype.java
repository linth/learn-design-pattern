/**
 * 原型模式
 *  - Creational Patterns — Prototype Pattern 
 * 
 * 
 * 使用時機
 *  - 當今天想要複製一個模型裡面的屬性時
 *  - 並且複製的是原本物件的全部屬性
 *  - 當今天new可能會造成危害時
 * 
 * Reference:
 *  - https://medium.com/bucketing/creational-patterns-prototype-pattern-eb6e3c14f1b2
 */
class Hero implements Cloneable {
    // prototype

    private String weapon;
    public String getWeapon() {
        return weapon;
    }

    public void setWeapon(String weapon) {
        this.weapon = weapon;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

class HeroCam {
    // prototype registry
    public Hero makeHero() {
        return new Hero();
    }

    public Hero cloneHero(Hero hero) throws CloneNotSupportedException {
        return (Hero) hero.clone();
    }
}



public class HeroPrototype {
    public static void main(String[] args) {
        HeroCam heroCam = new HeroCam();

        try {
            Hero hero = heroCam.makeHero();
            hero.setWeapon("Magic");

            Hero newHero = heroCam.cloneHero(hero);

            System.out.println(hero.getWeapon());
            System.out.println(newHero.getWeapon());
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        } 
    }
}