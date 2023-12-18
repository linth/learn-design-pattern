/**
 * Pub/Sub Pattern Example.
 *  - 與 Observer Pattern 很接近的 Pub/Sub Pattern
 * 
 * 
 * Reference:
 *  - https://old-oomusou.goodjack.tw/design-pattern/pubsub/
 *  - https://dev.to/jucian0/pub-sub-pattern-a-brief-explanation-21ed
 *  - https://github.com/jucian0/pub-sub-pattern/tree/master
 */

export default class PubSub {
    subscribers: {};

    constructor() {
        this.subscribers = {};
    }

    subscribe(event, fn) {
        if (Array.isArray(this.subscribers[event])) {
          this.subscribers[event] = [...this.subscribers[event], fn];
        } else {
          this.subscribers[event] = [fn];
        }
        return () => {
          this.unsubscribe(event, fn);
        };
      }
    
      unsubscribe(event, fn) {
        this.subscribers[event] = this.subscribers[event].filter(
          (sub) => sub !== fn
        );
      }
    
      publish(event, data) {
        if (Array.isArray(this.subscribers[event])) {
          this.subscribers[event].forEach((sub) => {
            sub(data);
          });
        }
        return false;
      }
}
