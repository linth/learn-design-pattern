/**
 * DIP concepts (依賴反轉)
 * 	- 控制反轉就是在軟體工程中decouple的思維 把物件的創建這個責任丟給IOC容器，在運行的時候再讓容器將具體的物件動態的注入到需要使用的類別裡
 * 
 * 
 * * 思考很多情境都會需要依賴反轉設計:
 * 	- 「當兩個 class 有依賴關係，透過 interface 解耦，讓雙方依賴於抽象而不是具體實作。」
 * 	- 高層模組不應依賴低層模組，兩者都應依賴抽象；抽象不應依賴細節，細節應依賴抽象。
 * 
 * Dependency Inversion Principle
 * Dependency Injection
 * 
 * 
 * Reference:
 * 	- https://www.jyt0532.com/2020/03/24/dip/
 * 	- https://medium.com/@yhosutun2491/design-pattern-%E4%BE%9D%E8%B3%B4%E5%8F%8D%E8%BD%89%E5%8E%9F%E5%89%87-dependency-inversion-principle-dip-725f29deca6f
 * 	- https://www.appcoda.com.tw/dependency-inversion-principle/
 */

{
	// 依賴的情況: programmer依賴computer.
	class Programmer {
		private computer = new Computer();
	}	
	
	class Computer {}
}

{
	// 使用依賴反轉的設計: 上層跟下層的依賴都是朝向共同的 interface: programmable.
	interface Programmable {
		program(): void;
	}

	class Computer implements Programmable {
		program(): void {}
	}

	class Programmer {
		private programmable: Programmable;

		constructor(p: Programmable) {
			this.programmable = p;
		}

		code(): void {
			this.programmable.program();
		}
	}
}

