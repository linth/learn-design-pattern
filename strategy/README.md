# Strategy Pattern（策略模式）

## 介紹說明

策略模式是一種**行為型設計模式**，定義一系列演算法，將每一種演算法封裝成獨立的類別，使它們可以互相替換。演算法的變化不會影響到使用它的客戶端，符合開閉原則（OCP）。

核心概念：
- **策略介面（Strategy Interface）**：所有演算法的共同規範
- **具體策略（Concrete Strategy）**：封裝了特定演算法的類別
- **環境類別（Context）**：持有策略物件的參考，負責執行策略

## 使用時機

- 同一種操作有多種實現方式（如折扣計算、排序、加密）
- 需要在執行時期動態切換演算法
- 大量 if-else 或 switch-case 判斷不同演算法時
- 希望將演算法與業務邏輯分離，各自獨立演進

## 使用情境

### 情境一：電商折扣計算（經典範例）

購物車系統支援多種折扣方案：新用戶折扣、節日促銷、會員滿減、階梯折扣。每種折扣都是一個策略，可在結帳時根據使用者身份與活動動態切換。

```python
class PercentageDiscount:
    def calculate(self, amount):
        return amount * 0.8  # 八折

class VoucherDiscount:
    def calculate(self, amount):
        return amount - 200 if amount >= 1000 else amount

# 環境類別（Context）持有策略，執行時期可動態切換
calculator = PriceCalculator()
calculator.set_strategy(PercentageDiscount())
print(calculator.calculate(1200))  # 960

calculator.set_strategy(VoucherDiscount())
print(calculator.calculate(1200))  # 1000
```

### 情境二：資料排序與搜尋

報表系統需要根據資料量與特性選擇不同的排序演算法（氣泡排序、合併排序、快速排序），或根據不同搜尋需求切換搜尋策略。

```typescript
const sorter = new Sorter();
sorter.setStrategy(new QuickSortStrategy());
sorter.sortData(largeDataset);       // 大量資料用快速排序
sorter.setStrategy(new MergeSortStrategy());
sorter.sortData(stableSortRequired); // 需要穩定排序時切換
```

### 情境三：RPG 遊戲技能系統

遊戲中的英雄角色可裝備不同技能（衝鋒、砍擊、火球術等），每個技能的攻擊邏輯不同。英雄可在戰鬥中動態切換技能策略，新增技能不影響既有角色。

```typescript
const hero = new Hero('战士', 100, 50, 20, 10, 15);
hero.equipSkill(new Slash());          // 裝備砍擊
hero.attack(enemy);                    // 執行砍擊
hero.equipSkill(new FireballSpell());  // 切換為火球術
hero.attack(enemy);                    // 執行火球術
```

## 優點

- **符合 OCP**：新增演算法不需修改既有程式碼，只需新增策略類別
- **消除條件判斷**：取代大量的 if-else / switch-case
- **提高重用性**：策略可在多個 Context 間共用
- **靈活性高**：可在執行時期動態切換行為

## 缺點

- **類別數量增加**：每個策略都是一個類別，可能產生大量類別
- **客戶端必須了解策略**：使用者需要知道不同策略的差異才能選擇
- **策略間無法共享狀態**：除非透過 Context 傳遞

## 與樣板方法模式的區別

| 面向 | 策略模式 | 樣板方法模式 |
|------|---------|------------|
| 關係 | 組合（has-a） | 繼承（is-a） |
| 變化粒度 | 可替換整個演算法 | 可覆寫特定步驟 |
| 控制權 | 客戶端選擇策略 | 超類別控制流程 |
| 靈活性 | 更高（執行時期切換） | 較低（編譯時期決定） |

## Reference

- [Refactoring Guru - Strategy](https://refactoring.guru/design-patterns/strategy)
- [Head First Design Patterns - Strategy Pattern](https://www.oreilly.com/library/view/head-first-design/0596007124/)
