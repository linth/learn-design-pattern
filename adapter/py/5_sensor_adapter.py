"""
Adapter Pattern - 感測器統一介面範例

情境：
- 工廠有多個不同品牌的 PLC (可程式邏輯控制器)
- 每個品牌的讀取介面都不同
- 需要統一介面來讀取所有感測器的資料

品牌：
- Siemens (西門子)
- Mitsubishi (三菱)
- Omron (歐姆龍)
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Optional
from datetime import datetime
import random


# ============================================================
# 第一部分：不同品牌的 PLC API (第三方硬體 SDK)
# ============================================================

class SiemensPLC:
    """西門子 PLC SDK"""

    def __init__(self, ip: str = "192.168.1.100", rack: int = 0, slot: int = 1):
        self._ip = ip
        self._rack = rack
        self._slot = slot

    def read_db(self, db_number: int, start: int, length: int) -> bytes:
        """
        讀取資料區塊 (Data Block)
        回傳 raw bytes，需要自行解析
        """
        # 模擬讀取 (實際會透過 S7 協定讀取)
        return b'\x00\x64\x00\x00\x00\x00'  # 模擬溫度: 100

    def read_multiple(self, addresses: List[tuple]) -> Dict[str, bytes]:
        """
        讀取多個位址
        地址格式: (db_number, start_byte, data_type)
        """
        result = {}
        for addr in addresses:
            db, start, length = addr
            result[f"DB{db}.DBX{start}"] = self.read_db(db, start, length)
        return result


class MitsubishiPLC:
    """三菱 PLC SDK"""

    def __init__(self, station: int = 0):
        self._station = station

    def read_device(self, device: str, count: int = 1) -> List[int]:
        """
        讀取裝置 (如 D, M, X, Y)
        device: "D100" 表示資料暫存器 100
        回傳 int 陣列
        """
        # 模擬讀取
        return [random.randint(20, 30) for _ in range(count)]

    def read_devices_batch(self, devices: List[str]) -> Dict[str, int]:
        """批次讀取多個裝置"""
        result = {}
        for device in devices:
            value = self.read_device(device)[0]
            result[device] = value
        return result


class OmronPLC:
    """歐姆龍 PLC SDK"""

    def __init__(self, ip: str = "192.168.1.200", port: int = 9600):
        self._ip = ip
        self._port = port

    def read_cio(self, channel: int, word: int) -> int:
        """
        讀取 CIO 區域
        channel: 通道 (0-999)
        word: 字元位置
        """
        # 模擬讀取
        return random.randint(100, 150)

    def read_range(self, area: str, start: int, count: int) -> List[int]:
        """
        讀取某區域範圍
        area: "DM", "CIO", "WR", "HR"
        """
        # 模擬讀取
        return [random.randint(20, 35) for _ in range(count)]


# ============================================================
# 第二部分：統一感測器介面 (Target Interface)
# ============================================================

class SensorReader(ABC):
    """統一感測器讀取介面"""

    @abstractmethod
    def get_temperature(self, sensor_id: str) -> Dict:
        """
        讀取溫度感測器
        Returns:
            {
                "sensor_id": "string",
                "value": float,
                "unit": "°C",
                "timestamp": "ISO8601",
                "status": "ok|error"
            }
        """
        pass

    @abstractmethod
    def get_humidity(self, sensor_id: str) -> Dict:
        """讀取濕度感測器"""
        pass

    @abstractmethod
    def get_all_sensors(self) -> List[Dict]:
        """讀取所有感測器"""
        pass


# ============================================================
# 第三部分：轉接器實作
# ============================================================

class SiemensSensorAdapter(SensorReader):
    """西門子感測器轉接器"""

    # PLC 記憶體位址對應表
    ADDRESS_MAP = {
        "temp_1": (1, 0, 2),      # DB1.DBD0 - 溫度感測器 1
        "temp_2": (1, 2, 2),      # DB1.DBD2 - 溫度感測器 2
        "humidity_1": (1, 4, 2),  # DB1.DBD4 - 濕度感測器 1
    }

    def __init__(self, plc: SiemensPLC):
        self._plc = plc

    def _read_raw(self, address_key: str) -> int:
        """從 PLC 讀取原始資料"""
        addr = self.ADDRESS_MAP.get(address_key, (1, 0, 2))
        raw = self._plc.read_db(addr[0], addr[1], addr[2])
        # 解析 bytes (假設是 big-endian, 2 bytes)
        return int.from_bytes(raw[:2], 'big', signed=True)

    def get_temperature(self, sensor_id: str) -> Dict:
        value = self._read_raw(f"temp_{sensor_id.split('_')[-1]}")
        return {
            "sensor_id": f"siemens_temp_{sensor_id}",
            "value": float(value) / 10.0,  # 除以 10 得到實際溫度
            "unit": "°C",
            "timestamp": datetime.now().isoformat(),
            "status": "ok"
        }

    def get_humidity(self, sensor_id: str) -> Dict:
        value = self._read_raw(f"humidity_{sensor_id.split('_')[-1]}")
        return {
            "sensor_id": f"siemens_humidity_{sensor_id}",
            "value": float(value) / 10.0,
            "unit": "%RH",
            "timestamp": datetime.now().isoformat(),
            "status": "ok"
        }

    def get_all_sensors(self) -> List[Dict]:
        sensors = []
        for i in range(1, 3):
            sensors.append(self.get_temperature(f"temp_{i}"))
            sensors.append(self.get_humidity(f"humidity_{i}"))
        return sensors


class MitsubishiSensorAdapter(SensorReader):
    """三菱感測器轉接器"""

    DEVICE_MAP = {
        "temp_1": "D100",   # 資料暫存器 100
        "temp_2": "D101",   # 資料暫存器 101
        "humidity_1": "D102",  # 資料暫存器 102
    }

    def __init__(self, plc: MitsubishiPLC):
        self._plc = plc

    def get_temperature(self, sensor_id: str) -> Dict:
        device = self.DEVICE_MAP.get(f"temp_{sensor_id.split('_')[-1]}", "D100")
        value = self._plc.read_device(device)[0]
        return {
            "sensor_id": f"mitsubishi_temp_{sensor_id}",
            "value": float(value),
            "unit": "°C",
            "timestamp": datetime.now().isoformat(),
            "status": "ok"
        }

    def get_humidity(self, sensor_id: str) -> Dict:
        device = self.DEVICE_MAP.get(f"humidity_{sensor_id.split('_')[-1]}", "D102")
        value = self._plc.read_device(device)[0]
        return {
            "sensor_id": f"mitsubishi_humidity_{sensor_id}",
            "value": float(value),
            "unit": "%RH",
            "timestamp": datetime.now().isoformat(),
            "status": "ok"
        }

    def get_all_sensors(self) -> List[Dict]:
        devices = ["D100", "D101", "D102"]
        values = self._plc.read_devices_batch(devices)

        sensors = [
            {"sensor_id": "mitsubishi_temp_temp_1", "value": values["D100"], "unit": "°C", "timestamp": datetime.now().isoformat(), "status": "ok"},
            {"sensor_id": "mitsubishi_temp_temp_2", "value": values["D101"], "unit": "°C", "timestamp": datetime.now().isoformat(), "status": "ok"},
            {"sensor_id": "mitsubishi_humidity_humidity_1", "value": values["D102"], "unit": "%RH", "timestamp": datetime.now().isoformat(), "status": "ok"},
        ]
        return sensors


class OmronSensorAdapter(SensorReader):
    """歐姆龍感測器轉接器"""

    AREA_MAP = {
        "temp_1": ("DM", 100),   # DM 區域 100
        "temp_2": ("DM", 101),   # DM 區域 101
        "humidity_1": ("DM", 102),  # DM 區域 102
    }

    def __init__(self, plc: OmronPLC):
        self._plc = plc

    def get_temperature(self, sensor_id: str) -> Dict:
        area, word = self.AREA_MAP.get(f"temp_{sensor_id.split('_')[-1]}", ("DM", 100))
        value = self._plc.read_cio(0, word)
        return {
            "sensor_id": f"omron_temp_{sensor_id}",
            "value": float(value) / 10.0,
            "unit": "°C",
            "timestamp": datetime.now().isoformat(),
            "status": "ok"
        }

    def get_humidity(self, sensor_id: str) -> Dict:
        area, word = self.AREA_MAP.get(f"humidity_{sensor_id.split('_')[-1]}", ("DM", 102))
        value = self._plc.read_cio(0, word)
        return {
            "sensor_id": f"omron_humidity_{sensor_id}",
            "value": float(value) / 10.0,
            "unit": "%RH",
            "timestamp": datetime.now().isoformat(),
            "status": "ok"
        }

    def get_all_sensors(self) -> List[Dict]:
        values = self._plc.read_range("DM", 100, 3)
        sensors = [
            {"sensor_id": "omron_temp_temp_1", "value": values[0]/10.0, "unit": "°C", "timestamp": datetime.now().isoformat(), "status": "ok"},
            {"sensor_id": "omron_temp_temp_2", "value": values[1]/10.0, "unit": "°C", "timestamp": datetime.now().isoformat(), "status": "ok"},
            {"sensor_id": "omron_humidity_humidity_1", "value": values[2]/10.0, "unit": "%RH", "timestamp": datetime.now().isoformat(), "status": "ok"},
        ]
        return sensors


# ============================================================
# 第四部分：感測器集中管理 (配合其他模式)
# ============================================================

class SensorManager:
    """感測器管理器 - 統一管理所有品牌的感測器"""

    def __init__(self):
        self._adapters: Dict[str, SensorReader] = {}

    def register_adapter(self, brand: str, adapter: SensorReader) -> None:
        """註冊某品牌的轉接器"""
        self._adapters[brand] = adapter

    def read_sensor(self, brand: str, sensor_type: str, sensor_id: str) -> Optional[Dict]:
        """讀取指定品牌的感測器"""
        adapter = self._adapters.get(brand)
        if not adapter:
            return None

        if sensor_type == "temperature":
            return adapter.get_temperature(sensor_id)
        elif sensor_type == "humidity":
            return adapter.get_humidity(sensor_id)
        return None

    def read_all(self) -> List[Dict]:
        """讀取所有感測器"""
        all_sensors = []
        for brand, adapter in self._adapters.items():
            sensors = adapter.get_all_sensors()
            for sensor in sensors:
                sensor["brand"] = brand
            all_sensors.extend(sensors)
        return all_sensors


# ============================================================
# 第五部分：執行範例
# ============================================================

def display_sensor_data(sensors: List[Dict]) -> None:
    """顯示感測器資料"""

    print("\n" + "=" * 80)
    print(f"📊 工廠感測器統一讀取結果 ({len(sensors)} 筆資料)")
    print("=" * 80)

    print(f"\n{'品牌':<12} {'感測器ID':<28} {'數值':<10} {'單位':<6}")
    print("-" * 60)

    for sensor in sensors:
        print(f"{sensor.get('brand', 'N/A'):<12} {sensor['sensor_id']:<28} "
              f"{sensor['value']:<10.2f} {sensor['unit']:<6}")

    print()


def demonstrate_single_brand(adapter: SensorReader, brand: str) -> None:
    """示範單一品牌的讀取"""

    print(f"\n🔌 {brand} 感測器讀取示範:")
    print("-" * 40)

    # 讀取溫度
    temp = adapter.get_temperature("1")
    print(f"  🌡️  溫度: {temp['value']:.1f} {temp['unit']}")

    # 讀取濕度
    humidity = adapter.get_humidity("1")
    print(f"  💧 濕度: {humidity['value']:.1f} {humidity['unit']}")


if __name__ == "__main__":
    print("=" * 80)
    print("Adapter Pattern - 感測器統一介面範例")
    print("=" * 80)

    # 建立各品牌的 PLC 實例
    siemens_plc = SiemensPLC()
    mitsubishi_plc = MitsubishiPLC()
    omron_plc = OmronPLC()

    # 建立轉接器
    siemens_adapter = SiemensSensorAdapter(siemens_plc)
    mitsubishi_adapter = MitsubishiSensorAdapter(mitsubishi_plc)
    omron_adapter = OmronSensorAdapter(omron_plc)

    # 示範單一品牌
    demonstrate_single_brand(siemens_adapter, "Siemens")
    demonstrate_single_brand(mitsubishi_adapter, "Mitsubishi")
    demonstrate_single_brand(omron_adapter, "Omron")

    # 建立感測器管理器
    manager = SensorManager()
    manager.register_adapter("siemens", siemens_adapter)
    manager.register_adapter("mitsubishi", mitsubishi_adapter)
    manager.register_adapter("omron", omron_adapter)

    # 統一讀取所有感測器
    all_sensors = manager.read_all()
    display_sensor_data(all_sensors)

    print("\n🎯 重點說明：")
    print("1. 每個品牌的 PLC API 都不同 (Siemens, Mitsubishi, Omron)")
    print("2. 透過轉接器，每個品牌都能提供統一的 SensorReader 介面")
    print("3. 監控系統只需要知道 SensorReader 介面，不需要知道底層 PLC 差異")
    print("4. 未來新增品牌，只需實作新的 Adapter")
    print("5. 這個範例展示了 IoT 與工業自動化的常見應用場景")
    print("=" * 80)