/**
 * adapter design pattern
 *  - Dog Cat Example.
 * 
 * 
 * 1) build interfaces for both.
 * 2) build a class to implement the interface.
 * 3) the adapter class named by Aadapter (A become to B).
 * 
 * 
 * Reference:
 *  - https://badgameshow.com/fly/design-pattern-adapter-pattern%E9%81%A9%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F/fly/design-pattern/
 */

// 1) build two interfaces.
interface Dog {
    eatBone(): void;
    wang(): void;
}

interface Cat {
    catchFish(): void;
    meow(): void;
}


// 2) build a class to implement the interface.
class BigDog implements Dog {

    eatBone(): void {
        console.log('吃骨頭');        
    }

    wang(): void {
        console.log('汪汪叫');
    }
}



// 3) the adapter class named by Aadapter (A become to B).
// 把狗適配成貓
class DogAdapter implements Cat {
    private dog: Dog;

    constructor(dog: Dog) {
        this.dog = dog;
    }

    catchFish(): void {
        this.dog.eatBone();
    }

    meow(): void {
        this.dog.wang();
    }
}


// main
const bigDog: BigDog = new BigDog();
const dogAdapter: DogAdapter = new DogAdapter(bigDog);

dogAdapter.catchFish(); // 吃骨頭
dogAdapter.meow(); // 汪汪叫
