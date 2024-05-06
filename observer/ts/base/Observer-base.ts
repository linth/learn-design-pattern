/**
 * Observer design pattern.
 *  - 每當一個 object 改變狀態, 依賴他的 object 都會都會得到通知並自動更新
 * 
 * Reference:
 *  - https://juejin.cn/post/7008147314841747487
 */

{
  class Subject {
    observerList: Observer[] = [];

    add(observer: Observer): void {
      this.observerList.push(observer);
    }

    remove(observer: Observer): void {
      const index = this.observerList.indexOf(observer);
      if (index !== -1) {
        this.observerList.splice(index, 1)
      }
    }

    notifyAllObservers(observer: Observer): void {
      this.observerList.forEach(observer => {
        observer.update();
      });
    }
  }

  abstract class Observer {
    abstract update(): void;
  }

  class TwitterNewsSubject extends Subject {
    pushNews(): void {
      this.notifyAllObservers;
    }
  }

  class TwitterObserver extends Observer {
    update(): void {
      console.log('收到twitter推播新聞');
    }
  }

  class GeorgeObserver extends Observer {
    update(): void {
      console.log('george收到新聞推播');
    }
  }

  const s = new TwitterNewsSubject();
  const to = new TwitterNewsSubject();
  const go = new GeorgeObserver();

  s.pushNews();
}