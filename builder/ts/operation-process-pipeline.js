"use strict";

/**
 * 建造者模式 (Builder Design Pattern)
 * 
 * 核心概念：
 * 1. 將「複雜物件的構建過程」與「物件本身的表示」分離。
 * 2. 讓相同的構建過程可以創建不同的表示（易於擴充）。
 * 3. 提供流式接口 (Fluent Interface) 讓代碼更直觀、易讀（易於理解）。
 */

{
  /** 
   * [產品類別 1]：最小執行單元 - 操作 (Operation)
   * 封裝具體的數據處理邏輯。
   */
  class ExcelOperation {
    constructor(name, action) {
      this.name = name;
      this.action = action; // 這裡我們讓 action 可彈性傳入，方便未來任意擴充邏輯
    }

    execute(data) {
      console.log(`    - [Operation] 執行: ${this.name}`);
      return this.action(data);
    }
  }

  /** 
   * [產品類別 2]：中間單元 - 程序 (Process)
   * 由一系列 Operation 組成，代表一個大型的處理階段。
   */
  class ExcelProcess {
    constructor(name) {
      this.name = name;
      this.operations = [];
    }

    addOperation(operation) {
      this.operations.push(operation);
    }

    execute(data) {
      console.log(`  [Process] 開始程序: ${this.name}`);
      let result = data;
      for (const op of this.operations) {
        result = op.execute(result);
      }
      return result;
    }
  }

  /** 
   * [產品類別 3]：最終管線 (Pipeline)
   * 最外層的容器，包含多個由 Process 組成的處理鏈。
   */
  class ExcelPipeline {
    constructor() {
      this.processes = [];
    }

    addProcess(process) {
      this.processes.push(process);
    }

    execute(data) {
      console.log(`>>> [Pipeline] 啟動管線執行...`);
      let result = data;
      for (const proc of this.processes) {
        result = proc.execute(result);
      }
      console.log(`>>> [Pipeline] 執行完畢。\n`);
      return result;
    }
  }

  /** 
   * [建造者]：PipelineBuilder
   * 目的：隱藏從 Operation 到 Process 再到 Pipeline 的手動組裝細節。
   * 優點：
   * 1. 易懂：開發者只需像在寫腳本一樣，調用 `addCleanupStep` 這種語意化方法。
   * 2. 易擴充：新增一種操作只需在 Builder 增加方法，或直接使用 `addCustomStep`。
   */
  class PipelineBuilder {
    constructor() {
      this.reset();
    }

    /** 初始化或重置 Builder 狀態 */
    reset() {
      this.pipeline = new ExcelPipeline();
      this.currentProcess = null;
    }

    /** 開啟一個新的處理程序階段 (Process) */
    startNewProcess(processName) {
      this.currentProcess = new ExcelProcess(processName);
      this.pipeline.addProcess(this.currentProcess);
      return this; // 返回 builder 本身以利串接 (Fluent API)
    }

    /** 
     * 內部輔助：確保目前有正在建構的 Process
     * 若使用者直接添加操作而未調用 startNewProcess，我們提供一個預設分組。
     */
    _ensureProcess() {
      if (!this.currentProcess) {
        this.startNewProcess("Default Step Group");
      }
    }

    /** 預定義常用操作：資料清理 */
    addCleanupStep() {
      this._ensureProcess();
      const op = new ExcelOperation('資料清理 (Cleanup)', (data) => {
        return data.toString().trim(); // 模擬邏輯：除去前後空白
      });
      this.currentProcess.addOperation(op);
      return this;
    }

    /** 預定義常用操作：資料分析 */
    addAnalysisStep() {
      this._ensureProcess();
      const op = new ExcelOperation('資料分析 (Analysis)', (data) => {
        return `AnalysisResult(${data})`; // 模擬邏輯：包裝結果
      });
      this.currentProcess.addOperation(op);
      return this;
    }

    /** 預定義常用操作：統計計算 */
    addStatisticsStep() {
      this._ensureProcess();
      const op = new ExcelOperation('統計計算 (Statistics)', (data) => {
        return `${data} -> [Total stats computed]`;
      });
      this.currentProcess.addOperation(op);
      return this;
    }

    /** 
     * 擴充點：允許加入完全自定義的操作
     * 這種「鉤子」設計讓 Builder 本身不需要不斷修改就能滿足多變需求。
     */
    addCustomStep(name, customLogic) {
      this._ensureProcess();
      const op = new ExcelOperation(name, customLogic);
      this.currentProcess.addOperation(op);
      return this;
    }

    /** 完成構建並產出產品 */
    build() {
      const product = this.pipeline;
      this.reset(); // 清空狀態以便重複使用同一個 Builder 實體
      return product;
    }
  }

  // --- 實作展示 ---

  // 範例 1：構建一個包含兩個階段、三個步驟的標準管線
  // Builder 讓原本複雜的巢狀結構 (Pipeline -> Process -> Operation) 變得一目了然
  const standardPipeline = new PipelineBuilder()
    .startNewProcess("階段一：資料預處裡")
    .addCleanupStep()
    .startNewProcess("階段二：核心運算")
    .addAnalysisStep()
    .addStatisticsStep()
    .build();

  console.log("--- 範例 1: 使用 Builder 生成的標準流程 ---");
  const result1 = standardPipeline.execute("   Raw Excel Data String   ");
  console.log("最終結果:", result1, "\n");


  // 範例 2：易擴充性展示 - 快速加入一個自定義操作，無需修改原有類別
  const customPipeline = new PipelineBuilder()
    .startNewProcess("快速處理流程")
    .addCleanupStep()
    .addCustomStep("自定義加密處理", (d) => `Encrypted_Hash(${d})`)
    .build();

  console.log("--- 範例 2: 包含自定義邏輯的擴充流程 ---");
  const result2 = customPipeline.execute("UserSensitiveData");
  console.log("最終結果:", result2);
}
