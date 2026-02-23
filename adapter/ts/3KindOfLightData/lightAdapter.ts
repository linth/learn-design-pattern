import { UnifiedLight } from "./unifiedLight";


export interface LightAdapter {
  transform(data: any): UnifiedLight
}


// 廠商 A Adapter
export class VendorAAdapter implements LightAdapter {
  transform(data: any): UnifiedLight {
    return {
      id: data.deviceId,
      isOn: data.state === "ON",
      brightness: data.brightness
    }
  }
}

// 廠商 B Adapter
export class VendorBAdapter implements LightAdapter {
  transform(data: any): UnifiedLight {
    return {
      id: data.id,
      isOn: data.power === 1,
      brightness: Math.round(data.level * 100)
    }
  }
}

// 廠商 C Adapter
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