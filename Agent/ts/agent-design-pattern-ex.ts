/**
 * agent design pattern
 * 
 * 
 */

interface Agent {
  name: string;
  receiveMessage(message: string): void;
  sendMessage(receiver: Agent, message: string): void;
}


// Concrete agent class.
class ConcreteAgent implements Agent {
  name: string;
  inbox: string[];

  constructor(name: string) {
    this.name = name;
    this.inbox = [];
  }

  receiveMessage(message: string): void {
    console.log(`${this.name} received message: ${message}`);    
    this.inbox.push(message);
  }

  sendMessage(receiver: Agent, message: string): void {
    console.log(`${this.name} sent message to ${receiver.name}: ${message}`);
    receiver.receiveMessage(message);
  }
}

{
  // create agents.
  const agent1 = new ConcreteAgent('Agent 1');
  const agent2 = new ConcreteAgent('Agent 2');
  const agent3 = new ConcreteAgent('Agent 3');

  // send message between agents.
  agent1.sendMessage(agent2, "Hello from Agent 1");
  agent2.sendMessage(agent1, "Hi back from Agent 2");

  agent3.sendMessage(agent1, 'hello, I\'m agent3.');
  agent3.sendMessage(agent2, 'hello, I\'m agent3.');
}