package java;

import java.food.Food;

public class TaiwanChicken extends Food {
    @Override
    public void addCondiment(String material) {
        System.out.println("[TaiwanChicken] call addCondiment(), and the material is " + material);
    }
}
