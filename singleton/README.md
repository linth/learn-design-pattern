# Singleton design pattern

```
class Singleton {
  private static instance: Singleton | null = null;

  private constructor() {}

  public static getInstance(): Singleton {
    if (! Signleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

}
```



# Reference
- [Java 设计模式 (一) - 单例模式](https://www.lumin.tech/blog/design-patterns-java-1-singleton/)