/**
 * data filter
 * 
 * P.S: 使設計方法跟typeorm實作方式不同, typeorm 並非使用 singleton 設計模式進行實作的
 */

{

  class DataFilter {
    private static instance: DataFilter | null = null;

    private constructor() {
      // private constructor function.
    }

    static getInstance(): DataFilter {
      if (!DataFilter.instance) {
        DataFilter.instance = new DataFilter();
      }
      return DataFilter.instance;
    }

    // 實作資料篩選, 排序, 過濾等方法
    filterData(data: any[], condition: (item: any) => boolean): any[] {
      return data.filter(condition);
    }

    sortData(data: any[], compareFn: (a: any, b: any) => number): any[] {
      return data.sort(compareFn);
    }

    paginateData(data: any[], page: number, pageSize: number): any[] {
      const startIndex = (page - 1) * pageSize;
      return data.slice(startIndex, startIndex + pageSize);
    }

    countData(data: any[]): number {
      return data.length;
    }

    uniqueData(data: any[]): any[] {
      return Array.from(new Set(data));
    }
  }

  const dataFilter = DataFilter.getInstance();
  const data = [
      { id: 1, name: "Alice", age: 30 },
      { id: 2, name: "Bob", age: 25 },
      { id: 3, name: "Charlie", age: 35 }
  ];

  // 篩選年紀大於30
  const filteredData = dataFilter.filterData(data, item => item.age >= 30);
  console.log("Filtered Data:", filteredData);

  // 根據年齡升序排列
  const sortedData = dataFilter.sortData(data, (a, b) => a.age - b.age);
  console.log("Sorted Data:", sortedData);

  // 抓第一頁資料, 每頁2資料
  const paginatedData = dataFilter.paginateData(data, 1, 2);
  console.log("Paginated Data:", paginatedData);

  // 資料總數
  const totalCount = dataFilter.countData(data);
  console.log("Total Count:", totalCount);

  const uniqueData = dataFilter.uniqueData([1, 2, 3, 3, 4, 5, 5]);
  console.log("Unique Data:", uniqueData);
}


{
  class DataFilter<T> {
    private static instance: DataFilter<any> | null = null;

    private constructor() {
      
    }

    static getInstance<T>(): DataFilter<T> {
      if (!DataFilter.instance) {
        DataFilter.instance = new DataFilter<T>();
      }
      return DataFilter.instance as DataFilter<T>;
    }

    filterData(data: T[], condition: (item: T) => boolean): T[] {
      return data.filter(condition);
    }

    sortData(data: T[], compareFn: (a: T, b: T) => number): T[] {
      return data.sort(compareFn);
    }

    paginateData(data: T[], page: number, pageSize: number): T[] {
      const startIndex = (page - 1) * pageSize;
      return data.slice(startIndex, startIndex + pageSize);
    }

    countData(data: T[]): number {
      return data.length;
    }

    uniqueData(data: T[]): T[] | number[]{
      if (typeof data[0] === 'object') {
        const uniqueMap = new Map<string, T>();
        for (const item of data) {
          const key = JSON.stringify(item);
          uniqueMap.set(key, item);
        }
        return Array.from(uniqueMap.values());
      } else {
        return Array.from(new Set(data));
      }
      
    }
  }

  interface Person {
    id: number;
    name: string;
    age: number;
  }

  const dataFilter = DataFilter.getInstance<Person>();
  const data: Person[] = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 }
  ]

  const filteredData = dataFilter.filterData(data, item => item.age >= 30);
  console.log("Filtered Data:", filteredData);

  const sortedData = dataFilter.sortData(data, (a, b) => a.age - b.age);
  console.log("Sorted Data:", sortedData);

  const paginatedData = dataFilter.paginateData(data, 1, 2);
  console.log("Paginated Data:", paginatedData);

  const totalCount = dataFilter.countData(data);
  console.log("Total Count:", totalCount);

  const data2: Person[] = [
    { id: 1, name: "Alice", age: 30 },
    { id: 2, name: "Bob", age: 25 },
    { id: 3, name: "Charlie", age: 35 },
    { id: 3, name: "Charlie", age: 35 }, // 重複
    { id: 4, name: "David", age: 40 },
    { id: 5, name: "Eve", age: 28 },
    { id: 5, name: "Eve", age: 28 } // 重複
  ];

  const uniqueData = dataFilter.uniqueData(data2);
  console.log("Unique Data:", uniqueData);
}