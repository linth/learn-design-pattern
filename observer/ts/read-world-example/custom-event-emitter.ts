/**
 * Custom event emitter (Observer design pattern.)
 * 
 * 
 */
{
  type Listener = (...args: any[]) => void;

  class CustomEventEmitter {
    private events: {[event: string]: Listener[]} = {}

    on(event: string, listener: Listener): void {
      // 新增監聽器
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }

    off(event: string, listener: Listener): void {
      // 移除監聽器
      if (!this.events[event]) return;

      this.events[event] = this.events[event].filter(l => l !== listener);
    }

    emit(event: string, ...args: any[]): void {
      // 觸發事件
      if (!this.events[event]) return;

      this.events[event].forEach( listener => listener(...args));
    }

    removeAllListeners(event?: string): void {
      // 移除所有監聽器
      if (event) {
        delete this.events[event];
      } else {
        this.events = {};
      }
    }
  }

  const customEmitter = new CustomEventEmitter();

  const EVENT_NAME = {
    DATA_RECEIVED: 'dataReceived',
    DATA_SEND: 'dataSend',
    RECEIVE_MODBUS_TCP: 'receive_modbus_tcp',
    RECEIVE_TCP: 'receive_tcp',
    RECEIVE_UDP: 'receive_udp',
  };
  
  function onDataReceived(data: string) {
    console.log(`Data received: ${data}`);
  }
  
  function onDataSend(data: string) {
    console.log(`Data sent: ${data}`);
  }
  
  customEmitter.on(EVENT_NAME.DATA_RECEIVED, onDataReceived);
  customEmitter.on(EVENT_NAME.DATA_SEND, onDataSend);
  
  customEmitter.emit(EVENT_NAME.DATA_RECEIVED, 'Message for dataReceived');
  customEmitter.emit(EVENT_NAME.DATA_SEND, 'Message for dataSend');

  customEmitter.off(EVENT_NAME.DATA_RECEIVED, onDataReceived);

  customEmitter.emit(EVENT_NAME.DATA_RECEIVED, 'This message should not be logged');

  customEmitter.on(EVENT_NAME.RECEIVE_TCP, (data: string) => {
    console.log(`TCP data received dynamically: ${data}`);
  });

  customEmitter.emit(EVENT_NAME.RECEIVE_TCP, 'Dynamic TCP message');

  customEmitter.removeAllListeners(EVENT_NAME.DATA_SEND);

  customEmitter.emit(EVENT_NAME.DATA_SEND, 'This message should not be logged');
}

