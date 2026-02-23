# 燈控設備資料轉換

## 🎯 情境說明
你有 3 種不同廠商的燈控設備，上傳資料格式不同：

1️⃣ 廠商 A（MQTT JSON 格式）
```json
{
  "deviceId": "A-1001",
  "state": "ON",
  "brightness": 80
}
```

2️⃣ 廠商 B（另一種 JSON 格式）
```json
{
  "id": "B-5566",
  "power": 1,
  "level": 0.6
}
```

3️⃣ 廠商 C（字串格式）
```cli
C|7788|OFF|45
```

---

## 目標：統一成平台格式，但是不使用adapter來處理，就會產生一堆if-else的判斷，每次都要新增廠商就要修改程式碼。
Adapter Pattern 可以：
- 解耦 vendor 格式
- 平台邏輯永遠只處理 UnifiedLight
- 新增廠商只新增 adapter

---

### 1. 定義統一格式
```typescript
// unified-light.ts
export interface UnifiedLight {
  id: string
  isOn: boolean
  brightness: number
}
```

### 2. 定義 Adapter Interface
```typescript
// light-adapter.ts
import { UnifiedLight } from "./unified-light"

export interface LightAdapter {
  transform(data: any): UnifiedLight
}
```

### 3. 廠商 A Adapter
```typescript
// vendor-a-adapter.ts
import { LightAdapter } from "./light-adapter"
import { UnifiedLight } from "./unified-light"

export class VendorAAdapter implements LightAdapter {
  transform(data: any): UnifiedLight {
    return {
      id: data.deviceId,
      isOn: data.state === "ON",
      brightness: data.brightness
    }
  }
}
```

### 4. 廠商 B Adapter
```typescript
// vendor-b-adapter.ts
import { LightAdapter } from "./light-adapter"
import { UnifiedLight } from "./unified-light"

export class VendorBAdapter implements LightAdapter {
  transform(data: any): UnifiedLight {
    return {
      id: data.id,
      isOn: data.power === 1,
      brightness: Math.round(data.level * 100)
    }
  }
}
```

### 5. 廠商 C Adapter（字串解析）
```typescript
// vendor-c-adapter.ts
import { LightAdapter } from "./light-adapter"
import { UnifiedLight } from "./unified-light"

export class VendorCAdapter implements LightAdapter {
  transform(data: string): UnifiedLight {
    const [vendor, id, state, brightness] = data.split("|")

    return {
      id,
      isOn: state === "ON",
      brightness: Number(brightness)
    }
  }
}
```

### 6. 使用方式（Collector）
```typescript
import { VendorAAdapter } from "./vendor-a-adapter"
import { VendorBAdapter } from "./vendor-b-adapter"
import { VendorCAdapter } from "./vendor-c-adapter"

const aAdapter = new VendorAAdapter()
const bAdapter = new VendorBAdapter()
const cAdapter = new VendorCAdapter()

// 模擬三種來源資料
const vendorAData = {
  deviceId: "A-1001",
  state: "ON",
  brightness: 80
}

const vendorBData = {
  id: "B-5566",
  power: 1,
  level: 0.6
}

const vendorCData = "C|7788|OFF|45"

console.log(aAdapter.transform(vendorAData))
console.log(bAdapter.transform(vendorBData))
console.log(cAdapter.transform(vendorCData))
```

### 7. 輸出結果（統一格式）
```typescript
{ id: 'A-1001', isOn: true,  brightness: 80 }
{ id: 'B-5566', isOn: true,  brightness: 60 }
{ id: '7788',   isOn: false, brightness: 45 }
```