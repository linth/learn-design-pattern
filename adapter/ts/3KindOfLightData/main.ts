import {
  VendorAAdapter,
  VendorBAdapter,
  VendorCAdapter
} from "./lightAdapter"

{
  /**
   * vender A data =轉換=> unifiedLight 
   * vender B data =轉換=> unifiedLight 
   * vender C data =轉換=> unifiedLight 
   * 
   * 統一成 unifiedLight 後，就可以做統一的處理
   * 
   * 其實也就是ETL當中的Tranform部分
   * 
   */
  const aAdapter = new VendorAAdapter();
  const bAdapter = new VendorBAdapter();
  const cAdapter = new VendorCAdapter();

  // 模擬三種來源資料
  const vendorAData = {
    deviceId: "A-1001",
    state: "ON",
    brightness: 80
  };

  const vendorBData = {
    id: "B-5566",
    power: 1,
    level: 0.6
  };

  const vendorCData = "C|7788|OFF|45";

  console.log(aAdapter.transform(vendorAData)); // { id: 'A-1001', isOn: true,  brightness: 80 }
  console.log(bAdapter.transform(vendorBData)); // { id: 'B-5566', isOn: true,  brightness: 60 }
  console.log(cAdapter.transform(vendorCData)); // { id: '7788',   isOn: false, brightness: 45 }
}