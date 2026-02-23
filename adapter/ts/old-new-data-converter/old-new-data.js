/**
 * 範例將 v1 API（巢狀物件）與 v2 API（陣列）轉成統一格式 {weightKg, heightCm, fatGrams}。
 */


// 舊 API 資料 (v1: 巢狀物件)
const v1Data = {
  metrics: { weightLb: 200, heightFt: 6 },
  macros: { gramsFat: 80 }
};

// 舊 API 資料 (v2: 陣列)
const v2Data = [200, 6, 80];