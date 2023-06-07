/**
 * DTO (Data Transfer Object) pattern.
 * 
 * 
 */
{
  class UserDTO {
    public readonly id: number;
    public readonly name: string;
    public readonly email: string;
  
    constructor(id: number, name: string, email: string) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }

  // Usage example
  function getUserData(userId: number): UserDTO {
    // Fetch user data from the server or database
    const userData = fetchUserData(userId);

    // Map the retrieved data to UserDTO object
    const userDTO = new UserDTO(userData.id, userData.name, userData.email);

    return userDTO;
  }

  // Mock function to simulate fetching user data
  function fetchUserData(userId: number): { id: number; name: string; email: string } {
    // In reality, this function would interact with a server or database
    // Here, we'll simply return a mock user object
    return {
      id: userId,
      name: "John Doe",
      email: "johndoe@example.com",
    };
  }

  // Usage example
  const user = getUserData(123);
  console.log(user); // UserDTO { id: 123, name: 'John Doe', email: 'johndoe@example.com' }
}