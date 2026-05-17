namespace BuilderExamples
{
    // ============================================================
    // 第一部分：電腦組裝 - 基本 Builder 模式
    // ============================================================

    /// <summary>
    /// 電腦產品 (Product) - 要建立的複雜物件
    /// </summary>
    public class Computer
    {
        public string CPU { get; set; } = "";
        public string RAM { get; set; } = "";
        public string Storage { get; set; } = "";
        public string GPU { get; set; } = "";
        public string PowerSupply { get; set; } = "";
        public string Case { get; set; } = "";
        public bool HasWiFi { get; set; }
        public bool HasBluetooth { get; set; }
        public List<string> Peripherals { get; set; } = new();

        public override string ToString()
        {
            return $"""
               🖥️ 電腦組態
               ─────────────────────────────────────────
               CPU: {CPU}
               RAM: {RAM}
               儲存: {Storage}
               顯示卡: {GPU}
               電源: {PowerSupply}
               機殼: {Case}
               WiFi: {(HasWiFi ? "✓" : "✗")}
               Bluetooth: {(HasBluetooth ? "✓" : "✗")}
               周邊設備: {(Peripherals.Count > 0 ? string.Join(", ", Peripherals) : "無")}
               """;
        }
    }

    /// <summary>
    /// 電腦 Builder 介面 (Builder Interface)
    /// </summary>
    public interface IComputerBuilder
    {
        IComputerBuilder SetCPU(string cpu);
        IComputerBuilder SetRAM(string ram);
        IComputerBuilder SetStorage(string storage);
        IComputerBuilder SetGPU(string gpu);
        IComputerBuilder SetPowerSupply(string power);
        IComputerBuilder SetCase(string computerCase);
        IComputerBuilder EnableWiFi(bool enable);
        IComputerBuilder EnableBluetooth(bool enable);
        IComputerBuilder AddPeripheral(string peripheral);
        Computer Build();
    }

    /// <summary>
    /// 具體 Builder - 遊戲電腦
    /// </summary>
    public class GamingComputerBuilder : IComputerBuilder
    {
        private Computer _computer = new();

        public IComputerBuilder SetCPU(string cpu)
        {
            _computer.CPU = cpu;
            return this;
        }

        public IComputerBuilder SetRAM(string ram)
        {
            _computer.RAM = ram;
            return this;
        }

        public IComputerBuilder SetStorage(string storage)
        {
            _computer.Storage = storage;
            return this;
        }

        public IComputerBuilder SetGPU(string gpu)
        {
            _computer.GPU = gpu;
            return this;
        }

        public IComputerBuilder SetPowerSupply(string power)
        {
            _computer.PowerSupply = power;
            return this;
        }

        public IComputerBuilder SetCase(string computerCase)
        {
            _computer.Case = computerCase;
            return this;
        }

        public IComputerBuilder EnableWiFi(bool enable)
        {
            _computer.HasWiFi = enable;
            return this;
        }

        public IComputerBuilder EnableBluetooth(bool enable)
        {
            _computer.HasBluetooth = enable;
            return this;
        }

        public IComputerBuilder AddPeripheral(string peripheral)
        {
            _computer.Peripherals.Add(peripheral);
            return this;
        }

        public Computer Build()
        {
            // 遊戲電腦的預設配置
            if (string.IsNullOrEmpty(_computer.CPU))
                _computer.CPU = "Intel Core i9-13900K";
            if (string.IsNullOrEmpty(_computer.RAM))
                _computer.RAM = "64GB DDR5";
            if (string.IsNullOrEmpty(_computer.Storage))
                _computer.Storage = "2TB NVMe SSD";
            if (string.IsNullOrEmpty(_computer.GPU))
                _computer.GPU = "NVIDIA RTX 4090";
            if (string.IsNullOrEmpty(_computer.PowerSupply))
                _computer.PowerSupply = "1000W 80+ Gold";
            if (string.IsNullOrEmpty(_computer.Case))
                _computer.Case = "遊戲機殼 (RGB)";

            return _computer;
        }
    }

    /// <summary>
    /// 具體 Builder - 辦公電腦
    /// </summary>
    public class OfficeComputerBuilder : IComputerBuilder
    {
        private Computer _computer = new();

        public IComputerBuilder SetCPU(string cpu)
        {
            _computer.CPU = cpu;
            return this;
        }

        public IComputerBuilder SetRAM(string ram)
        {
            _computer.RAM = ram;
            return this;
        }

        public IComputerBuilder SetStorage(string storage)
        {
            _computer.Storage = storage;
            return this;
        }

        public IComputerBuilder SetGPU(string gpu)
        {
            _computer.GPU = gpu;
            return this;
        }

        public IComputerBuilder SetPowerSupply(string power)
        {
            _computer.PowerSupply = power;
            return this;
        }

        public IComputerBuilder SetCase(string computerCase)
        {
            _computer.Case = computerCase;
            return this;
        }

        public IComputerBuilder EnableWiFi(bool enable)
        {
            _computer.HasWiFi = enable;
            return this;
        }

        public IComputerBuilder EnableBluetooth(bool enable)
        {
            _computer.HasBluetooth = enable;
            return this;
        }

        public IComputerBuilder AddPeripheral(string peripheral)
        {
            _computer.Peripherals.Add(peripheral);
            return this;
        }

        public Computer Build()
        {
            // 辦公電腦的預設配置
            if (string.IsNullOrEmpty(_computer.CPU))
                _computer.CPU = "Intel Core i5-13400";
            if (string.IsNullOrEmpty(_computer.RAM))
                _computer.RAM = "16GB DDR4";
            if (string.IsNullOrEmpty(_computer.Storage))
                _computer.Storage = "512GB SSD";
            if (string.IsNullOrEmpty(_computer.GPU))
                _computer.GPU = "內建顯示";
            if (string.IsNullOrEmpty(_computer.PowerSupply))
                _computer.PowerSupply = "500W 80+ Bronze";
            if (string.IsNullOrEmpty(_computer.Case))
                _computer.Case = "標準機殼";

            _computer.HasWiFi = true;
            _computer.HasBluetooth = false;

            return _computer;
        }
    }

    /// <summary>
    /// 指導者 (Director) - 負責安排組裝流程
    /// </summary>
    public class ComputerDirector
    {
        public void BuildGamingComputer(IComputerBuilder builder)
        {
            builder
                .SetCPU("AMD Ryzen 9 7950X")
                .SetRAM("64GB DDR5-6000")
                .SetStorage("4TB NVMe Gen5 SSD")
                .SetGPU("AMD Radeon RX 7900 XTX")
                .SetPowerSupply("1200W 80+ Platinum")
                .SetCase("Hydro RGB 機殼")
                .EnableWiFi(true)
                .EnableBluetooth(true)
                .AddPeripheral("機械鍵盤")
                .AddPeripheral("電競滑鼠")
                .AddPeripheral("曲面螢幕");
        }

        public void BuildWorkstation(IComputerBuilder builder)
        {
            builder
                .SetCPU("Intel Xeon W-3475X")
                .SetRAM("128GB ECC DDR4")
                .SetStorage("8TB NVMe SSD + 8TB HDD")
                .SetGPU("NVIDIA RTX A6000")
                .SetPowerSupply("1600W 80+ Titanium")
                .SetCase("工作站機殼")
                .EnableWiFi(true)
                .EnableBluetooth(false)
                .AddPeripheral("專業顯示器")
                .AddPeripheral("繪圖板");
        }
    }

    /// <summary>
    /// 電腦組裝範例執行
    /// </summary>
    public static class ComputerBuilder
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("1. 電腦組裝 - 基本 Builder 模式");
            Console.WriteLine("=".PadRight(60, '='));

            // 使用指導者建立遊戲電腦
            var director = new ComputerDirector();
            var gamingBuilder = new GamingComputerBuilder();

            Console.WriteLine("\n🎮 建立遊戲電腦 (使用 Director):");
            director.BuildGamingComputer(gamingBuilder);
            var gamingPC = gamingBuilder.Build();
            Console.WriteLine(gamingPC);

            // 使用指導者建立工作站
            var workstationBuilder = new OfficeComputerBuilder();
            Console.WriteLine("\n💼 建立工作站電腦 (使用 Director):");
            director.BuildWorkstation(workstationBuilder);
            var workstationPC = workstationBuilder.Build();
            Console.WriteLine(workstationPC);

            // 直接使用 Builder (鏈式呼叫)
            Console.WriteLine("\n🔧 直接使用 Builder 建立辦公電腦:");
            var officePC = new OfficeComputerBuilder()
                .SetCPU("Intel Core i7-13700")
                .SetRAM("32GB DDR5")
                .SetStorage("1TB SSD")
                .SetGPU("NVIDIA RTX 4060")
                .EnableWiFi(true)
                .AddPeripheral("雙螢幕")
                .Build();
            Console.WriteLine(officePC);

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. Computer 是複雜產品 (Product)");
            Console.WriteLine("   2. IComputerBuilder 是 Builder 介面");
            Console.WriteLine("   3. GamingComputerBuilder, OfficeComputerBuilder 是具體 Builder");
            Console.WriteLine("   4. ComputerDirector 是 Director，負責流程控制");
            Console.WriteLine("   5. 客戶端可以選擇不同的 Builder 來建立不同類型的產品");
        }
    }
}