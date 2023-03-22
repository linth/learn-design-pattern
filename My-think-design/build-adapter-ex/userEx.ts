/**
 * User (old user and extend user class) by using adapter & builder design pattern.
 * 
 * 
 * 
 */

// 定義 adaptee interface
interface LegacyUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// 定義 target interface
interface User {
  id: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive';
}

// 定義 adapter 
class UserAdapter implements User {
  private legacyUser: LegacyUser;

  constructor(legacyUser: LegacyUser) {
    this.legacyUser = legacyUser;
  }

  get id() {
    return this.legacyUser.id.toString();
  }

  get fullName() {
    return `${this.legacyUser.firstName} ${this.legacyUser.lastName}`;
  }

  get email() {
    return this.legacyUser.email;
  }

  get status() {
    return this.legacyUser.password === '123456' ? 'inactive' : 'active';
  }
}

// 定義 builder
class UserBuilder {
  private id: string = '';
  private fullName: string = '';
  private email: string = '';
  private status: "active" | "inactive" = 'inactive';

  setId(id: string) {
    this.id = id;
    return this;
  }

  setFullName(fullName: string) {
    this.fullName = fullName;
    return this;
  }

  setEmail(email: string) {
    this.email = email;
    return this;
  }

  setStatus(status: "active" | "inactive") {
    this.status = status;
    return this;
  }

  builder(): User {
    if (!this.id || !this.fullName || !this.email || !this.status) {
      throw new Error('missing required fields.');
    }

    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      status: this.status,
    };
  }
}

{
  const legacyUser: LegacyUser = {
    id: 1,
    firstName: 'george',
    lastName: 'chen',
    email: 'george_chen@gmail.com',
    password: '123456',
  };

  const user = new UserAdapter(legacyUser);
  const newUser = new UserBuilder()
    .setId(user.id)
    .setFullName(user.fullName)
    .setEmail(user.email)
    .setStatus(user.status)
    .builder()

  console.log(newUser);
  // {id: '1', fullName: 'george chen', email: 'george_chen@gmail.com', status: 'inactive'}
}