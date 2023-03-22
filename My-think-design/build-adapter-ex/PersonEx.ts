/**
 * LegacyPerson & Person example.
 * 
 * 使用 adapter 和 builder design pattern.
 * 
 * LegacyPerson <- (PersonAdapter) -> Person
 */

// 定義 adaptee interface.
interface LegacyPerson {
  name: string;
  age: number;
}

// 定義 target interface.
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

// 定義 adapter class: PersonAdapter, 繼承 Person. 
// 藉由 interface 擴充 LegacyPerson，再利用 adapter
class PersonAdapter implements Person {
  private legacyPerson: LegacyPerson;

  constructor(legacyPerson: LegacyPerson) {
    this.legacyPerson = legacyPerson;
  }

  get firstName() {
    return this.legacyPerson.name.split(' ')[0];
  }

  get lastName() {
    return this.legacyPerson.name.split(' ')[1];
  }

  get age() {
    return this.legacyPerson.age;
  }
}

class PersonBuilder {
  private firstName: string = "";
  private lastName: string = "";
  private age: number = 1;

  setFirstName(firstName: string) {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
    return this;
  }

  setAge(age: number) {
    this.age = age;
    return this;
  }

  build(): Person {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
    };
  }
}

function main() {
  const legacyPerson: LegacyPerson = {
    name: 'george',
    age: 33
  };
  const person = new PersonAdapter(legacyPerson);
  const newPerson = new PersonBuilder()
    .setFirstName(person.firstName)
    .setLastName(person.lastName)
    .setAge(person.age)
    .build();
  console.log(newPerson);  
}

main(); 

// { firstName: 'george', lastName: undefined, age: 33 }

