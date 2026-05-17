namespace AdapterExamples
{
    // ============================================================
    // 第五部分：感測器統一介面範例
    // ============================================================

    #region 不同品牌的 PLC SDK (第三方硬體 SDK)

    /// <summary>
    /// 西門子 PLC SDK
    /// </summary>
    public class SiemensPlc
    {
        private readonly string _ip;
        private readonly int _rack;
        private readonly int _slot;

        public SiemensPlc(string ip = "192.168.1.100", int rack = 0, int slot = 1)
        {
            _ip = ip;
            _rack = rack;
            _slot = slot;
        }

        /// <summary>
        /// 讀取資料區塊 (Data Block)
        /// </summary>
        public byte[] ReadDb(int dbNumber, int start, int length)
        {
            // 模擬讀取 (實際會透過 S7 協定讀取)
            // 模擬溫度: 100 → 實際要除以 10
            byte[] data = new byte[length];
            Random.Shared.NextBytes(data);
            data[0] = 0x00;
            data[1] = 0x64; // 100
            return data;
        }
    }

    /// <summary>
    /// 三菱 PLC SDK
    /// </summary>
    public class MitsubishiPlc
    {
        private readonly int _station;

        public MitsubishiPlc(int station = 0)
        {
            _station = station;
        }

        /// <summary>
        /// 讀取裝置 (如 D, M, X, Y)
        /// </summary>
        public int[] ReadDevice(string device, int count = 1)
        {
            // 模擬讀取
            return Enumerable.Range(0, count)
                .Select(_ => Random.Shared.Next(20, 30))
                .ToArray();
        }
    }

    /// <summary>
    /// 歐姆龍 PLC SDK
    /// </summary>
    public class OmronPlc
    {
        private readonly string _ip;
        private readonly int _port;

        public OmronPlc(string ip = "192.168.1.200", int port = 9600)
        {
            _ip = ip;
            _port = port;
        }

        /// <summary>
        /// 讀取 CIO 區域
        /// </summary>
        public int ReadCio(int channel, int word)
        {
            // 模擬讀取
            return Random.Shared.Next(100, 150);
        }
    }

    #endregion

    #region 統一感測器介面

    /// <summary>
    /// 統一感測器讀取介面
    /// </summary>
    public interface ISensorReader
    {
        /// <summary>
        /// 讀取溫度感測器
        /// </summary>
        SensorData GetTemperature(string sensorId);

        /// <summary>
        /// 讀取濕度感測器
        /// </summary>
        SensorData GetHumidity(string sensorId);

        /// <summary>
        /// 讀取所有感測器
        /// </summary>
        List<SensorData> GetAllSensors();
    }

    /// <summary>
    /// 感測器資料
    /// </summary>
    public record SensorData(
        string SensorId,
        double Value,
        string Unit,
        string Timestamp,
        string Status
    );

    #endregion

    #region 轉接器實作

    /// <summary>
    /// 西門子感測器轉接器
    /// </summary>
    public class SiemensSensorAdapter : ISensorReader
    {
        private readonly SiemensPlc _plc;

        // PLC 記憶體位址對應表
        private readonly Dictionary<string, (int db, int start, int length)> _addressMap = new()
        {
            { "temp_1", (1, 0, 2) },      // DB1.DBD0
            { "temp_2", (1, 2, 2) },      // DB1.DBD2
            { "humidity_1", (1, 4, 2) },  // DB1.DBD4
        };

        public SiemensSensorAdapter(SiemensPlc plc)
        {
            _plc = plc;
        }

        private int ReadRaw(string addressKey)
        {
            var addr = _addressMap.GetValueOrDefault(addressKey, (1, 0, 2));
            var raw = _plc.ReadDb(addr.db, addr.start, addr.length);
            return BitConverter.ToInt16(raw[..2], 0);
        }

        public SensorData GetTemperature(string sensorId)
        {
            string key = $"temp_{sensorId.Split('_').Last()}";
            int rawValue = ReadRaw(key);
            return new SensorData(
                SensorId: $"siemens_temp_{sensorId}",
                Value: rawValue / 10.0,
                Unit: "°C",
                Timestamp: DateTime.UtcNow.ToString("o"),
                Status: "ok"
            );
        }

        public SensorData GetHumidity(string sensorId)
        {
            string key = $"humidity_{sensorId.Split('_').Last()}";
            int rawValue = ReadRaw(key);
            return new SensorData(
                SensorId: $"siemens_humidity_{sensorId}",
                Value: rawValue / 10.0,
                Unit: "%RH",
                Timestamp: DateTime.UtcNow.ToString("o"),
                Status: "ok"
            );
        }

        public List<SensorData> GetAllSensors()
        {
            var sensors = new List<SensorData>();
            foreach (var i in new[] { "1", "2" })
            {
                sensors.Add(GetTemperature($"temp_{i}"));
                sensors.Add(GetHumidity($"humidity_{i}"));
            }
            return sensors;
        }
    }

    /// <summary>
    /// 三菱感測器轉接器
    /// </summary>
    public class MitsubishiSensorAdapter : ISensorReader
    {
        private readonly MitsubishiPlc _plc;

        private readonly Dictionary<string, string> _deviceMap = new()
        {
            { "temp_1", "D100" },
            { "temp_2", "D101" },
            { "humidity_1", "D102" },
        };

        public MitsubishiSensorAdapter(MitsubishiPlc plc)
        {
            _plc = plc;
        }

        public SensorData GetTemperature(string sensorId)
        {
            string key = $"temp_{sensorId.Split('_').Last()}";
            string device = _deviceMap.GetValueOrDefault(key, "D100");
            int value = _plc.ReadDevice(device)[0];
            return new SensorData(
                SensorId: $"mitsubishi_temp_{sensorId}",
                Value: value,
                Unit: "°C",
                Timestamp: DateTime.UtcNow.ToString("o"),
                Status: "ok"
            );
        }

        public SensorData GetHumidity(string sensorId)
        {
            string key = $"humidity_{sensorId.Split('_').Last()}";
            string device = _deviceMap.GetValueOrDefault(key, "D102");
            int value = _plc.ReadDevice(device)[0];
            return new SensorData(
                SensorId: $"mitsubishi_humidity_{sensorId}",
                Value: value,
                Unit: "%RH",
                Timestamp: DateTime.UtcNow.ToString("o"),
                Status: "ok"
            );
        }

        public List<SensorData> GetAllSensors()
        {
            var devices = new[] { "D100", "D101", "D102" };
            var values = devices.ToDictionary(d => d, d => _plc.ReadDevice(d)[0]);

            return new List<SensorData>
            {
                new("mitsubishi_temp_temp_1", values["D100"], "°C", DateTime.UtcNow.ToString("o"), "ok"),
                new("mitsubishi_temp_temp_2", values["D101"], "°C", DateTime.UtcNow.ToString("o"), "ok"),
                new("mitsubishi_humidity_humidity_1", values["D102"], "%RH", DateTime.UtcNow.ToString("o"), "ok"),
            };
        }
    }

    /// <summary>
    /// 歐姆龍感測器轉接器
    /// </summary>
    public class OmronSensorAdapter : ISensorReader
    {
        private readonly OmronPlc _plc;

        private readonly Dictionary<string, (string area, int word)> _areaMap = new()
        {
            { "temp_1", ("DM", 100) },
            { "temp_2", ("DM", 101) },
            { "humidity_1", ("DM", 102) },
        };

        public OmronSensorAdapter(OmronPlc plc)
        {
            _plc = plc;
        }

        public SensorData GetTemperature(string sensorId)
        {
            string key = $"temp_{sensorId.Split('_').Last()}";
            var (area, word) = _areaMap.GetValueOrDefault(key, ("DM", 100));
            int value = _plc.ReadCio(0, word);
            return new SensorData(
                SensorId: $"omron_temp_{sensorId}",
                Value: value / 10.0,
                Unit: "°C",
                Timestamp: DateTime.UtcNow.ToString("o"),
                Status: "ok"
            );
        }

        public SensorData GetHumidity(string sensorId)
        {
            string key = $"humidity_{sensorId.Split('_').Last()}";
            var (area, word) = _areaMap.GetValueOrDefault(key, ("DM", 102));
            int value = _plc.ReadCio(0, word);
            return new SensorData(
                SensorId: $"omron_humidity_{sensorId}",
                Value: value / 10.0,
                Unit: "%RH",
                Timestamp: DateTime.UtcNow.ToString("o"),
                Status: "ok"
            );
        }

        public List<SensorData> GetAllSensors()
        {
            var values = new[] { 110, 115, 120 }; // 模擬讀取值
            return new List<SensorData>
            {
                new("omron_temp_temp_1", values[0] / 10.0, "°C", DateTime.UtcNow.ToString("o"), "ok"),
                new("omron_temp_temp_2", values[1] / 10.0, "°C", DateTime.UtcNow.ToString("o"), "ok"),
                new("omron_humidity_humidity_1", values[2] / 10.0, "%RH", DateTime.UtcNow.ToString("o"), "ok"),
            };
        }
    }

    #endregion

    #region 感測器管理器

    /// <summary>
    /// 感測器管理器 - 統一管理所有品牌的感測器
    /// </summary>
    public class SensorManager
    {
        private readonly Dictionary<string, ISensorReader> _adapters = new();

        public void RegisterAdapter(string brand, ISensorReader adapter)
        {
            _adapters[brand] = adapter;
        }

        public SensorData? ReadSensor(string brand, string sensorType, string sensorId)
        {
            if (!_adapters.TryGetValue(brand, out var adapter))
                return null;

            return sensorType switch
            {
                "temperature" => adapter.GetTemperature(sensorId),
                "humidity" => adapter.GetHumidity(sensorId),
                _ => null
            };
        }

        public List<SensorData> ReadAll()
        {
            var allSensors = new List<SensorData>();
            foreach (var (_, adapter) in _adapters)
            {
                var sensors = adapter.GetAllSensors();
                allSensors.AddRange(sensors);
            }
            return allSensors;
        }
    }

    #endregion

    /// <summary>
    /// 感測器範例執行
    /// </summary>
    public static class SensorAdapter
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("5. 感測器統一介面範例");
            Console.WriteLine("=".PadRight(60, '='));

            // 建立各品牌的 PLC 實例
            var siemensPlc = new SiemensPlc();
            var mitsubishiPlc = new MitsubishiPlc();
            var omronPlc = new OmronPlc();

            // 建立轉接器
            var siemensAdapter = new SiemensSensorAdapter(siemensPlc);
            var mitsubishiAdapter = new MitsubishiSensorAdapter(mitsubishiPlc);
            var omronAdapter = new OmronSensorAdapter(omronPlc);

            // 示範單一品牌讀取
            Console.WriteLine("\n🔌 各品牌感測器讀取示範:");
            Console.WriteLine("-".PadRight(50, '-'));

            void ShowBrand(string brand, ISensorReader adapter)
            {
                Console.WriteLine($"\n  {brand}:");
                var temp = adapter.GetTemperature("1");
                Console.WriteLine($"    🌡️  溫度: {temp.Value:F1} {temp.Unit}");
                var humidity = adapter.GetHumidity("1");
                Console.WriteLine($"    💧 濕度: {humidity.Value:F1} {humidity.Unit}");
            }

            ShowBrand("Siemens", siemensAdapter);
            ShowBrand("Mitsubishi", mitsubishiAdapter);
            ShowBrand("Omron", omronAdapter);

            // 建立感測器管理器
            var manager = new SensorManager();
            manager.RegisterAdapter("siemens", siemensAdapter);
            manager.RegisterAdapter("mitsubishi", mitsubishiAdapter);
            manager.RegisterAdapter("omron", omronAdapter);

            // 統一讀取所有感測器
            var allSensors = manager.ReadAll();

            Console.WriteLine($"\n📊 工廠感測器統一讀取結果 ({allSensors.Count} 筆資料)");
            Console.WriteLine("-".PadRight(60, '-'));
            Console.WriteLine($"{"品牌",-12} {"感測器ID",-28} {"數值",-8} {"單位",-6}");
            Console.WriteLine("-".PadRight(60, '-'));

            // 顯示感測器資料 (這裡用簡化的方式)
            foreach (var adapter in new[] { siemensAdapter, mitsubishiAdapter, omronAdapter })
            {
                var brand = adapter.GetType().Name.Replace("SensorAdapter", "");
                foreach (var sensor in adapter.GetAllSensors())
                {
                    Console.WriteLine($"{brand,-12} {sensor.SensorId,-28} {sensor.Value,-8:F1} {sensor.Unit,-6}");
                }
            }

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. 每個品牌的 PLC API 都不同 (Siemens, Mitsubishi, Omron)");
            Console.WriteLine("   2. 透過轉接器，每個品牌都能提供統一的 ISensorReader 介面");
            Console.WriteLine("   3. 監控系統只需要知道 ISensorReader 介面");
            Console.WriteLine("   4. 未來新增品牌，只需實作新的 Adapter");
            Console.WriteLine("   5. 這個範例展示了 IoT 與工業自動化的常見應用場景");
        }
    }
}