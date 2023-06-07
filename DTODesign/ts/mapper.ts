/**
 * mapper design pattern.
 *  - User, UserDTO
 *  - UserMapper (User->UserDTO, UserDTO->User)
 * 
 */

{
  // 使用者 Domain Model
  class User {
    constructor(public id: number, public name: string, public email: string) {}
  }

  // 使用者 Data Transfer Object (DTO)
  class UserDTO {
    constructor(public id: number, public name: string, public email: string) {}
  }

  // Mapper (使用者->DTO, DTO->使用者)
  class UserMapper {
    // Map User to UserDTO
    static toDTO(user: User): UserDTO {
      return new UserDTO(user.id, user.name, user.email);
    }

    // Map UserDTO to User
    static toDomain(userDTO: UserDTO): User {
      return new User(userDTO.id, userDTO.name, userDTO.email);
    }
  }

  // Usage example
  const user = new User(123, 'John Doe', 'johndoe@example.com');

  // Convert User to UserDTO
  const userDTO = UserMapper.toDTO(user);
  console.log(userDTO); // UserDTO { id: 123, name: 'John Doe', email: 'johndoe@example.com' }

  // Convert UserDTO to User
  const userConverted = UserMapper.toDomain(userDTO);
  console.log(userConverted); // User { id: 123, name: 'John Doe', email: 'johndoe@example.com' }

}