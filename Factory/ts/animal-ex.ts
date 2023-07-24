/**
 * factory design pattern for animal example.
 * 
 * 
 */


{

  interface Animal {
    makeSound(): string;
  }
  
  class Dog implements Animal {
    makeSound() {
      return "Woof!";
    }
  }
  
  class Cat implements Animal {
    makeSound() {
      return "Meow!";
    }
  }
  
  // 使用 factory design pattern缺點是當不同的type, if/else, switch判斷會變很多，且改動頻繁。
  class AnimalFactory {
    static createAnimal(type: string): Animal {
      switch (type) {
        case "dog":
          return new Dog();
        case "cat":
          return new Cat();
        default:
          throw new Error("Invalid animal type");
      }
    }
  }
  
  const dog = AnimalFactory.createAnimal("dog");
  const cat = AnimalFactory.createAnimal("cat");
  
  console.log(dog.makeSound()); // Woof!
  console.log(cat.makeSound()); // Meow!
}