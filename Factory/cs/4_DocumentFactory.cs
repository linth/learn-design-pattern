namespace FactoryExamples
{
    // ============================================================
    // 第四部分：文件產生器工廠
    // ============================================================

    #region 文件產品介面

    /// <summary>
    /// 文件介面 - 所有文件類型的共同介面
    /// </summary>
    public interface IDocument
    {
        string DocumentType { get; }
        string Generate(DocumentData data);
        void Save(string filePath);
        string GetFileExtension();
    }

    /// <summary>
    /// 文件資料
    /// </summary>
    public record DocumentData(
        string Title,
        string Author,
        DateTime CreatedDate,
        Dictionary<string, string> Metadata,
        List<string> Content
    );

    #endregion

    #region 具體文件類別

    /// <summary>
    /// PDF 文件
    /// </summary>
    public class PdfDocument : IDocument
    {
        public string DocumentType => "PDF";

        public string Generate(DocumentData data)
        {
            return $"%PDF-1.4\n標題: {data.Title}\n作者: {data.Author}\n建立日期: {data.CreatedDate}\n內容: {string.Join("\n", data.Content)}\n%%EOF";
        }

        public void Save(string filePath)
        {
            Console.WriteLine($"   [PDF] 已儲存至: {filePath}");
        }

        public string GetFileExtension() => ".pdf";
    }

    /// <summary>
    /// Word 文件
    /// </summary>
    public class WordDocument : IDocument
    {
        public string DocumentType => "Word";

        public string Generate(DocumentData data)
        {
            return $"PK!\ndoc.xml\n標題: {data.Title}\n作者: {data.Author}\n內容: {string.Join("\n", data.Content)}";
        }

        public void Save(string filePath)
        {
            Console.WriteLine($"   [Word] 已儲存至: {filePath}");
        }

        public string GetFileExtension() => ".docx";
    }

    /// <summary>
    /// HTML 文件
    /// </summary>
    public class HtmlDocument : IDocument
    {
        public string DocumentType => "HTML";

        public string Generate(DocumentData data)
        {
            var html = new System.Text.StringBuilder();
            html.AppendLine("<!DOCTYPE html>");
            html.AppendLine("<html>");
            html.AppendLine("<head>");
            html.AppendLine($"  <title>{data.Title}</title>");
            html.AppendLine("</head>");
            html.AppendLine("<body>");
            html.AppendLine($"  <h1>{data.Title}</h1>");
            html.AppendLine($"  <p>作者: {data.Author}</p>");
            html.AppendLine($"  <p>建立日期: {data.CreatedDate:yyyy-MM-dd}</p>");
            html.AppendLine("  <hr>");
            foreach (var line in data.Content)
            {
                html.AppendLine($"  <p>{line}</p>");
            }
            html.AppendLine("</body>");
            html.AppendLine("</html>");
            return html.ToString();
        }

        public void Save(string filePath)
        {
            Console.WriteLine($"   [HTML] 已儲存至: {filePath}");
        }

        public string GetFileExtension() => ".html";
    }

    /// <summary>
    /// Markdown 文件
    /// </summary>
    public class MarkdownDocument : IDocument
    {
        public string DocumentType => "Markdown";

        public string Generate(DocumentData data)
        {
            var md = new System.Text.StringBuilder();
            md.AppendLine($"# {data.Title}");
            md.AppendLine();
            md.AppendLine($"**作者**: {data.Author}");
            md.AppendLine($"**建立日期**: {data.CreatedDate:yyyy-MM-dd}");
            md.AppendLine();
            md.AppendLine("---");
            md.AppendLine();
            foreach (var line in data.Content)
            {
                md.AppendLine(line);
            }
            return md.ToString();
        }

        public void Save(string filePath)
        {
            Console.WriteLine($"   [Markdown] 已儲存至: {filePath}");
        }

        public string GetFileExtension() => ".md";
    }

    /// <summary>
    /// JSON 文件
    /// </summary>
    public class JsonDocument : IDocument
    {
        public string DocumentType => "JSON";

        public string Generate(DocumentData data)
        {
            var json = new Dictionary<string, object>
            {
                ["title"] = data.Title,
                ["author"] = data.Author,
                ["createdDate"] = data.CreatedDate.ToString("o"),
                ["content"] = data.Content
            };
            return System.Text.Json.JsonSerializer.Serialize(json, new System.Text.Json.JsonSerializerOptions
            {
                WriteIndented = true
            });
        }

        public void Save(string filePath)
        {
            Console.WriteLine($"   [JSON] 已儲存至: {filePath}");
        }

        public string GetFileExtension() => ".json";
    }

    #endregion

    #region 工廠類別

    /// <summary>
    /// 文件工廠 - 負責建立各種文件物件
    /// </summary>
    public class DocumentFactory
    {
        private static readonly Dictionary<string, Func<IDocument>> _documentTypes = new()
        {
            { "pdf", () => new PdfDocument() },
            { "word", () => new WordDocument() },
            { "html", () => new HtmlDocument() },
            { "markdown", () => new MarkdownDocument() },
            { "json", () => new JsonDocument() }
        };

        /// <summary>
        /// 建立文件
        /// </summary>
        public IDocument CreateDocument(string format)
        {
            var key = format.ToLower();
            if (_documentTypes.TryGetValue(key, out var createFunc))
            {
                return createFunc();
            }
            throw new ArgumentException($"不支援的文件格式: {format}");
        }

        /// <summary>
        /// 取得支援的格式清單
        /// </summary>
        public static IEnumerable<string> GetSupportedFormats()
        {
            return _documentTypes.Keys;
        }
    }

    /// <summary>
    /// 文件服務 - 使用工廠產生文件
    /// </summary>
    public class DocumentService
    {
        private readonly DocumentFactory _factory;

        public DocumentService()
        {
            _factory = new DocumentFactory();
        }

        public void GenerateReport(string format, DocumentData data, string outputPath)
        {
            Console.WriteLine($"\n📄 產生報告 - 格式: {format}");
            Console.WriteLine($"   標題: {data.Title}");
            Console.WriteLine($"   作者: {data.Author}");

            // 使用工廠建立文件
            var document = _factory.CreateDocument(format);

            // 產生內容
            var content = document.Generate(data);
            Console.WriteLine($"   內容長度: {content.Length} 字元");

            // 儲存檔案
            var filePath = $"{outputPath}/report{document.GetFileExtension()}";
            document.Save(filePath);
        }
    }

    #endregion

    /// <summary>
    /// 文件工廠範例執行
    /// </summary>
    public static class DocumentFactory
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("4. 文件產生器工廠");
            Console.WriteLine("=".PadRight(60, '='));

            // 建立文件資料
            var reportData = new DocumentData(
                Title: "2024 年度報告",
                Author: "系統管理員",
                CreatedDate: DateTime.Now,
                Metadata: new Dictionary<string, string>
                {
                    { "department", "技術部" },
                    { "version", "1.0" }
                },
                Content: new List<string>
                {
                    "這是年度報告的第一章節",
                    "包含營運績效分析",
                    "以及未來發展規劃",
                    "感謝大家的努力"
                }
            );

            // 建立文件服務
            var service = new DocumentService();

            // 產生不同格式的報告
            service.GenerateReport("pdf", reportData, "reports");
            service.GenerateReport("html", reportData, "reports");
            service.GenerateReport("markdown", reportData, "reports");
            service.GenerateReport("json", reportData, "reports");

            // 展示每種格式的輸出
            Console.WriteLine("\n📋 各格式輸出範例:");

            var factory = new DocumentFactory();
            foreach (var format in new[] { "html", "markdown", "json" })
            {
                var doc = factory.CreateDocument(format);
                Console.WriteLine($"\n【{format.ToUpper()} 格式】");
                var preview = doc.Generate(reportData);
                // 只顯示前幾行
                var lines = preview.Split('\n').Take(10);
                foreach (var line in lines)
                {
                    Console.WriteLine($"   {line}");
                }
                if (preview.Split('\n').Length > 10)
                {
                    Console.WriteLine($"   ... (共 {preview.Split('\n').Length} 行)");
                }
            }

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. IDocument 是產品介面");
            Console.WriteLine("   2. 各種文件格式 (PDF, HTML, Markdown) 是具體產品");
            Console.WriteLine("   3. DocumentFactory 是工廠，負責建立產品");
            Console.WriteLine("   4. 客戶端只需要知道 IDocument 介面");
            Console.WriteLine("   5. 新增文件格式只需在工廠中註冊");
            Console.WriteLine("   6. 常見應用場景：報告產生、匯出功能、文件轉換");
        }
    }
}