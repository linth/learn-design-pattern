/**
 * Operation, Process, Pipeline with design pattern.
 * 
 */


{
  interface ExcelOperationBuilder {
    build(): ExcelOperation;
  }

  /** Excel handling. */
  class ExcelOperation {
    constructor(private operationName: string) {}

    execute(data: any): any {
      // TODO: excute excel handling code.
      console.log(`${this.operationName} executed with data:`, data);      
      return data;
    }
  }
  /** Clearnup data with builder. */
  class DataCleanupOperationBuilder implements ExcelOperationBuilder {
    private operationName: string = 'Data Cleanup';

    build(): ExcelOperation {
      return new ExcelOperation(this.operationName);
    }
  }
  /** Data analysis with builder. */
  class DataAnalysisOperationBuilder implements ExcelOperationBuilder {
    private operationName: string = 'Data Analysis';

    build(): ExcelOperation {
      return new ExcelOperation(this.operationName);
    }
  }
  /** Data statistic with builder. */
  class DataStatisticsOperationBuilder implements ExcelOperationBuilder {
    private operationName: string = 'Data Statistics';

    build(): ExcelOperation {
      return new ExcelOperation(this.operationName);
    }
  }

  /** Excel 處理流程, 由一系列操作組成 */
  class ExcelProcess {
    private operations: ExcelOperation[] = [];

    constructor() {
      return this;
    }

    addOperation(operation: ExcelOperation): this {
      console.log('[ExcelProcess] 新增 operation');
      
      this.operations.push(operation);
      return this;
    }

    execute(data: any): any {
      console.log('[ExcelProcess] 執行 excel process');

      let result = data;
      for (const operation of this.operations) {
        result = operation.execute(result);
      }
      return result;
    }
  }

  class ExcelPipeline {
    private processes: ExcelProcess[] = [];

    addProcess(process: ExcelProcess): void {
      console.log('[ExcelPipeline] 新增 process');
      this.processes.push(process);
    }

    execute(data: any): any {
      console.log('[ExcelPipeline] 執行 excel pipeline');
      let result = data;
      for (const process of this.processes) {
        result = process.execute(result);
      }
      return result;
    }
  }

  // 建立 data, cleanupOperation, analysisOperation, statisticsOperation
  const data = 'Excel data';
  const cleanupOperation = new DataCleanupOperationBuilder().build();
  const analysisOperation = new DataAnalysisOperationBuilder().build();
  const statisticsOperation = new DataStatisticsOperationBuilder().build();

  // 建立 process, 塞入2個operations: cleanupOperation, analysisOperation
  const process = new ExcelProcess();
  process.addOperation(cleanupOperation);
  process.addOperation(analysisOperation);
  
  // 建立 pipeline, 塞入2個process: process (包含2個operations), statisticsOperation
  const pipeline = new ExcelPipeline();
  pipeline.addProcess(process);
  pipeline.addProcess(
    new ExcelProcess().addOperation(statisticsOperation)
  );
  
  const finalResult = pipeline.execute(data);
  console.log('Final result:', finalResult);
}