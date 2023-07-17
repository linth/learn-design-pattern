/**
 * Prototype design pattern.
 *  - Prototype allows objects to be clones of other objects, rather then extended via inheritance.
 * 
 * Reference:
 *  - https://fireship.io/lessons/typescript-design-patterns/
 */


const zombie = {
  eatBrains() {
    return 'yum brain';
  }
}

{
  const chad = Object.create(zombie, { name: { value: 'chad'} });

  console.log(chad.__proto__); // { eatBrains: [Function: eatBrains] }
  const res = Object.getPrototypeOf(chad);
  console.log(res); // { eatBrains: [Function: eatBrains] }
  
  const babyChad = Object.create(chad, { baby: { value: true } });
  console.log('babyChad', babyChad.__proto__); // babyChad {}
  const res2 = Object.getPrototypeOf(babyChad);
  console.log(res2); // {}
  
}
