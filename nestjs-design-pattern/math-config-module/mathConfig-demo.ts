/**
 * declare class + implementation example.
 * 
 * TODO: 思考關於使用範型方式?  generic method.
 */

// math-service.interface.ts
// 把相關 math service option 設定拉出來單獨class
export interface MathServiceOptions {
  precision?: number; // Optional: 用於設置計算精度
}


/**
 * @publicApi
 */
// math-service.d.ts, 宣告 MathService: 這個宣告的類只提供類和方法的簽名，但沒有實作細節。它是用於告知 TypeScript 這個類的存在及其接口
export declare class MathService {
  constructor(options?: MathServiceOptions);

  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}


// 實作: 這個類實作了 MathService 的方法，並使用可選的 MathServiceOptions 來設置精度。每個計算方法都會調用 round 方法來確保結果的精度。
export class CustomMySelfMathService {
  private precision: number;

  constructor(options?: MathServiceOptions) {
    this.precision = options?.precision ?? 10; // 代表的是小數點後的位數
  }

  add(a: number, b: number): number {
    return this.round(a + b);
  }

  subtract(a: number, b: number): number {
    return this.round(a - b);
  }

  multiply(a: number, b: number): number {
    return this.round(a * b);
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return this.round(a / b);
  }

  private round(value: number): number {
    return parseFloat(value.toFixed(this.precision));
  }
}


{
  const options: MathServiceOptions = { precision: 2 };
  const mathService = new CustomMySelfMathService(options);

  console.log(mathService.add(1.123, 2.6788)); // 3.8
  console.log(mathService.subtract(5.678, 3.456)); // 2.22
  console.log(mathService.multiply(1.234, 3.456)); // 4.26
  console.log(mathService.divide(10, 3)); // 3.33
}
