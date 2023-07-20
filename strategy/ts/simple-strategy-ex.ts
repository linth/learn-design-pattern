/**
 * strategy design pattern example.
 * 
 * 
 * 
 */


{
  interface SortingStrategy {
    sort(data: number[]): number[];
  }

  class BubbleSortStrategy implements SortingStrategy {
    sort(data: number[]): number[] {
      console.log("Sorting using Bubble Sort");
      return data;
    }
  }

  class MergeSortStrategy implements SortingStrategy {
    sort(data: number[]): number[] {
      console.log('Sorting using Merge Sort');
      return data;
    }
  }

  class Sorter {
    private strategy: SortingStrategy | any;

    setStrategy(strategy: SortingStrategy) {
      this.strategy = strategy;
    }

    sortData(data: number[]): number[] {
      if (this.strategy) {
        return this.strategy.sort(data);
      } else {
        throw new Error('No sorting strategy set.');        
      }
    }
  }

  const sorter = new Sorter();
  const data = [5, 2, 8, 1, 9];

  sorter.setStrategy(new BubbleSortStrategy());
  const sortedData = sorter.sortData(data);
  console.log("Sorted data:", sortedData);

  sorter.setStrategy(new MergeSortStrategy());
  const sortedData2 = sorter.sortData(data);
  console.log("Sorted data (using Merge Sort):", sortedData2);


  // Sorting using Bubble Sort
  // Sorted data: [ 5, 2, 8, 1, 9 ]
  // Sorting using Merge Sort
  // Sorted data (using Merge Sort): [ 5, 2, 8, 1, 9 ]
}



