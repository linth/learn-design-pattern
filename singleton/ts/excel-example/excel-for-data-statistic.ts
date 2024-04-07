/**
 * data statistic
 * 
 * 
 */


{
  class DataStatistic {
    private static instance: DataStatistic | null = null;

    private constructor() {

    }

    public static getInstance(): DataStatistic {
      if (!DataStatistic.instance) {
        DataStatistic.instance = new DataStatistic();
      }
      return DataStatistic.instance;
    }

    // 實作資料統計分析和方法
    public sum(values: number[]): number {
      return values.reduce((acc, curr) => acc + curr, 0);
    }

    public average(values: number[]): number {
      if (values.length === 0) return 0;
      return this.sum(values) / values.length;
    }

    public max(values: number[]): number {
      if (values.length === 0) return 0;
      return Math.max(...values);
    }

    public min(values: number[]): number {
      if (values.length === 0) return 0;
      return Math.min(...values);
    }

    public median(values: number[]): number {
      if (values.length === 0) return 0;

      const sortedValues = values.sort((a, b) => a - b);
      const mid = Math.floor(sortedValues.length / 2);

      if (sortedValues.length % 2 === 0) {
        return (sortedValues[mid - 1] + sortedValues[mid]) / 2;
      } else {
        return sortedValues[mid];
      }
    }
  }

  const dataStatistics = DataStatistic.getInstance();
  const values = [10, 20, 30, 40, 50];

  console.log("Sum:", dataStatistics.sum(values)); 
  console.log("Average:", dataStatistics.average(values));
  console.log("Max:", dataStatistics.max(values));
  console.log("Min:", dataStatistics.min(values));
  console.log("Median:", dataStatistics.median(values));
}