# Adapter Pattern (轉接器模式)

## 目錄
- [基本概念](#基本概念)
- [深度講解](#深度講解)
- [使用時機](#使用時機)
- [Class Diagram](#class-diagram)
- [實際案例](#實際案例)
- [萬用模板](#萬用模板)
- [Python 實作範例](#python-實作範例)

---

## 基本概念

**轉接器模式** (Adapter Pattern) 是一種**結構型設計模式**，它的核心目的是**將一個類別的介面轉換成客戶端所期望的另一種介面**。

就像現實生活中的轉接頭一樣：
- 手機充电器是 Type-C，但插座是 USB-A → 需要轉接頭
- 系統A輸出 JSON，但系統B需要 XML → 需要轉接器

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │ ───▶ │   Adapter  │ ───▶ │   Adaptee   │
│  (客戶端)   │      │  (轉接器)   │      │  (被轉接者) │
└─────────────┘      └─────────────┘      └─────────────┘
     期望:                    轉換:                  實際:
     interface A              to B                  interface B
```

---

## 深度講解

### 為什麼需要轉接器？

1. **介面不相容**
   - 現有系統的介面與新需求不匹配
   - 無法修改原有程式碼（因為是第三方 library）

2. **保護現有程式碼**
   - 不違反「開放封閉原則」(Open-Closed Principle)
   - 不需要修改已經正常運作的舊程式碼

3.**整合外部服務**
   - 不同廠商提供的 API 有不同的介面
   - 統一一致的 API 給內部使用

### 轉接器的兩種實現方式

#### 1. 類別轉接器 (Class Adapter) - 使用繼承
```
┌──────────────────┐
│      Target      │  ← 客戶端期望的介面
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Adapter      │  ← 繼承 Target，同時繼承 Adaptee
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌─────────┐
│ Target │ │ Adaptee │
└────────┘ └─────────┘
```

**優點**: 可以覆寫 Adaptee 的行為
**缺點**: Python 不支援多重繼承（但可透過 mixin 模擬）

#### 2. 物件轉接器 (Object Adapter) - 使用組合
```
┌──────────────────┐
│      Target      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Adapter      │  ← 持有 Adaptee 的實例
│  - adaptee       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Adaptee      │
└──────────────────┘
```

**優點**: 更靈活，可以動態更換 Adaptee
**缺點**: 無法覆寫 Adaptee 的行為

---

## 使用時機

| 場景 | 範例 |
|------|------|
| 整合第三方 library | 使用舊版 API 整合新系統 |
| 系統升級 | 舊系統資料格式轉換到新系統 |
| 統一介面 | 多個支付閘道統一為同一個介面 |
| 跨系統溝通 | REST API 轉換為 GraphQL 格式 |
| 硬體轉接 | 不同品牌的感測器輸出統一格式 |

### 轉接器 vs 裝飾者 vs 代理者

| 模式 | 目的 | 關鍵差異 |
|------|------|----------|
| **Adapter** | 轉換介面 | 改變介面，讓不相容變相容 |
| **Decorator** | 增加行為 | 不改介面，但增強功能 |
| **Proxy** | 控制存取 | 代替原物件，控制存取權限 |

---

## Class Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Class Diagram                           │
└─────────────────────────────────────────────────────────────┘

    class AdapterPattern {
        + request(): str
    }

    class Target {
        + request(): str
    }

    class Adaptee {
        + specific_request(): str
    }

    class Client {
        + do_something(target: Target): void
    }

    Target <|.. Adapter : implements
    Adaptee <|.. Adapter : inherits
    Client --> Target
    Adapter --> Adaptee
```

### UML 圖示說明

```
┌─────────────────────┐
│      <<interface>>  │
│        Target       │
├─────────────────────┤
│ + request()         │
└──────────┬──────────┘
           │
           │ implements
           ▼
┌─────────────────────┐
│       Adapter       │
├─────────────────────┤
│ - adaptee: Adaptee  │◄────────────┐
├─────────────────────┤             │
│ + request()         │             │ composition
└──────────┬──────────┘             │
           │                         │
           └─────────────────────────┘
                    │
                    ▼
┌─────────────────────┐
│       Adaptee       │
├─────────────────────┤
│ + specific_request()│
└─────────────────────┘
```

---

## 實際案例

### 案例 1: 電子商務 - 幣別轉換

情境：系統原本只支援 TWD，但需要支援 USD、EUR、JPY

```
客戶端 ──▶ 價格轉接器 ──▶ TWD 計算邏輯
              │
              ├── USD 轉換
              ├── EUR 轉換
              └── JPY 轉換
```

### 案例 2: 支付系統整合

情境：整合多家支付廠商（LinePay, 街口, 信用卡）

```
統一訂單系統
     │
     ├── LinePayAdapter ──▶ LinePay API
     ├── SkuPayAdapter ──▶ 街口支付 API
     └── CreditAdapter ──▶ 信用卡 API
```

### 案例 3: 舊系統資料遷移

情境：舊系統用 XML，新系統用 JSON

```
新系統 (期望 JSON)
     │
     └── XMLToJSONAdapter ──▶ 舊系統 (輸出 XML)
```

### 案例 4: 感測器數據統一

情境：工廠有多種品牌的 PLC，需要統一讀取

```
數據監控系統
     │
     ├── SiemensAdapter ──▶ Siemens PLC
     ├── MitsubishiAdapter ──▶ 三菱 PLC
     └── OmronAdapter ──▶ Omron PLC
```

---

## 萬用模板

### Python 模板 (物件轉接器)

```python
from abc import ABC, abstractmethod
from typing import Any

# 1. 定義目標介面 (Target Interface)
class TargetInterface(ABC):
    @abstractmethod
    def request(self, data: Any) -> Any:
        """客戶端期望的介面"""
        pass

# 2. 定義被轉接者 (Adaptee)
class Adaptee:
    """已有的類別，介面不相容"""
    def specific_request(self, data: Any) -> Any:
        """原始的介面"""
        pass

# 3. 實現轉接器 (Adapter)
class Adapter(TargetInterface):
    """轉接器：將 Adaptee 轉換成 Target 介面"""
    def __init__(self, adaptee: Adaptee):
        self._adaptee = adaptee
    
    def request(self, data: Any) -> Any:
        # 在這裡進行介面轉換
        return self._adaptee.specific_request(data)

# 4. 客戶端 (Client)
def client_code(target: TargetInterface):
    """客戶端只需要知道 Target 介面"""
    return target.request(data)
```

---

## Python 實作範例

### 檔案結構

```
adapter/py/
├── 1_basic_concept.py      # 基本概念示範
├── 2_currency_converter.py # 幣別轉換範例
├── 3_payment_gateway.py   # 支付閘道整合
├── 4_legacy_system.py      # 舊系統資料遷移
├── 5_sensor_adapter.py     # 感測器統一介面
└── README.md               # 本檔案說明
```

### 執行方式

```bash
cd adapter/py
python 1_basic_concept.py
python 2_currency_converter.py
python 3_payment_gateway.py
python 4_legacy_system.py
python 5_sensor_adapter.py
```

---

## 總結

| 重點 | 說明 |
|------|------|
| **目的** | 將不相容的介面轉換成相容 |
| **優點** | 不修改原始碼、符合開放封閉原則 |
| **缺點** | 增加程式碼複雜度 |
| **關鍵** | 建立一個「轉接層」介於客戶端與被轉接者之間 |

記住這個口诀：**「介面不相容，轉接器來幫」** 🔌