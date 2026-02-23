{
  // 舊 API 資料 (v1: 巢狀物件)
  const v1Data = {
    metrics: { weightLb: 200, heightFt: 6 },
    macros: { gramsFat: 80 }
  };

  // 舊 API 資料 (v2: 陣列)
  const v2Data = [200, 6, 80];

  // Adapter 介面 (目標格式)
  class DataAdapter {
    adapt(data) {
      throw new Error('Must implement adapt()');
    }
  }

  // Adapter 介面 (目標格式)
  class DataAdapter__ {
    adapt(data) {
      throw new Error('Must implement adapt()');
    }
  }


  // v1 Adapter (巢狀物件)
  class V1Adapter extends DataAdapter__ {
    adapt(data) {
      return {
        weightKg: data.metrics.weightLb * 0.453592,  // lb to kg
        heightCm: data.metrics.heightFt * 30.48,     // ft to cm
        fatGrams: data.macros.gramsFat
      };
    }
  }

  // v2 Adapter (陣列)
  class V2Adapter extends DataAdapter__ {
    adapt(data) {
      return {
        weightKg: data[0] * 0.453592,
        heightCm: data[1] * 30.48,
        fatGrams: data[2]
      };
    }
  }


  // Client 使用 (無需知曉來源)
  const adapter = new V1Adapter();
  console.log(adapter.adapt(v1Data));  // { weightKg: 90.7, heightCm: 182.88, fatGrams: 80 }

  const adapter2 = new V2Adapter();
  console.log(adapter2.adapt(v2Data)); // 同上
}