/**
 * 策略模式 (Strategy Design Pattern) - 排序演算法範例
 * 將不同的排序演算法封裝成獨立的策略類別，可在執行時期動態切換。
 */

{
  /** [策略介面] 排序演算法的統一規範 */
  interface SortingStrategy {
    sort(data: number[]): number[];
  }

  /** [具體策略] 氣泡排序 */
  class BubbleSortStrategy implements SortingStrategy {
    sort(data: number[]): number[] {
      console.log('使用氣泡排序 (Bubble Sort)');
      return data;
    }
  }

  /** [具體策略] 合併排序 */
  class MergeSortStrategy implements SortingStrategy {
    sort(data: number[]): number[] {
      console.log('使用合併排序 (Merge Sort)');
      return data;
    }
  }

  /** [環境類別 Context] 排序器，可在執行時期動態切換排序演算法 */
  class Sorter {
    private strategy: SortingStrategy | null = null;

    /** 設定排序策略 */
    setStrategy(strategy: SortingStrategy): void {
      this.strategy = strategy;
    }

    /** 執行排序 */
    sortData(data: number[]): number[] {
      if (this.strategy) {
        return this.strategy.sort(data);
      }
      throw new Error('尚未設定排序策略');
    }
  }

  const sorter = new Sorter();
  const data = [5, 2, 8, 1, 9];

  // 使用氣泡排序
  sorter.setStrategy(new BubbleSortStrategy());
  console.log('排序結果:', sorter.sortData(data));

  // 動態切換為合併排序
  sorter.setStrategy(new MergeSortStrategy());
  console.log('排序結果 (Merge Sort):', sorter.sortData(data));
}
