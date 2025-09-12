'''
adapter design pattern (轉接器) - 新舊印表機範例

'''

# 舊印表機
class OldPrinter:
    """舊有的印表機類別，其介面與新系統不相容。"""
    def print_document(self, document_content):
        print(f"舊印表機正在列印文件：{document_content}")

# 新印表機介面
class NewPrinterInterface:
    """新系統期望的印表機介面。"""
    def print_paper(self, paper_content):
        raise NotImplementedError("子類別必須實作此方法")

# printer adapter 轉接器
class PrinterAdapter(NewPrinterInterface):
    """印表機適配器，將舊印表機的介面轉換為新印表機介面。"""
    def __init__(self, old_printer: OldPrinter):
        self._old_printer = old_printer

    def print_paper(self, paper_content):
        # 將新介面的請求轉換為舊介面可以理解的請求
        self._old_printer.print_document(paper_content)

class Client:
    """客戶端，只知道如何使用 NewPrinterInterface。"""
    def use_printer(self, printer: NewPrinterInterface, content):
        print("客戶端正在使用新介面印表機...")
        printer.print_paper(content)

# --- 範例使用 --- #
if __name__ == "__main__":
    # 1. 實例化舊印表機
    old_printer_instance = OldPrinter()

    # 2. 實例化適配器，將舊印表機包裝起來
    adapter = PrinterAdapter(old_printer_instance)

    # 3. 實例化客戶端
    client = Client()

    # 4. 客戶端透過適配器使用舊印表機的功能
    client.use_printer(adapter, "這是一份重要的報告")

    print("\n--- 直接使用舊印表機 (不透過適配器) ---")
    old_printer_instance.print_document("這是一份直接列印的舊文件")

    # 嘗試直接使用 NewPrinterInterface 的子類別 (如果有的話)
    class ModernPrinter(NewPrinterInterface):
        def print_paper(self, paper_content):
            print(f"現代印表機正在列印紙張：{paper_content}")

    modern_printer_instance = ModernPrinter()
    print("\n--- 直接使用符合新介面的現代印表機 ---")
    client.use_printer(modern_printer_instance, "這是一份現代文件")