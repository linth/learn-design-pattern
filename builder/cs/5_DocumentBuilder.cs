namespace BuilderExamples
{
    // ============================================================
    // 第五部分：文件建構器
    // ============================================================

    /// <summary>
    /// 文件產品 (Product)
    /// </summary>
    public class Document
    {
        public string Title { get; set; } = "";
        public string Author { get; set; } = "";
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public List<string> Headers { get; set; } = new();
        public List<string> Paragraphs { get; set; } = new();
        public List<string> Images { get; set; } = new();
        public List<string> Tables { get; set; } = new();
        public List<string> Footnotes { get; set; } = new();
        public Dictionary<string, string> Metadata { get; set; } = new();
        public DocumentStyle Style { get; set; } = new();

        public void Print()
        {
            Console.WriteLine($"""
               📄 文件: {Title}
               ─────────────────────────────────────────
               作者: {Author}
               建立日期: {CreatedDate:yyyy-MM-dd}
               ─────────────────────────────────────────
               標題層: {Headers.Count} 個
               段落: {Paragraphs.Count} 段
               圖片: {Images.Count} 張
               表格: {Tables.Count} 個
               註腳: {Footnotes.Count} 個
               樣式: {Style.FontFamily}, {Style.FontSize}pt
               """);
        }

        public string ExportToText()
        {
            var sb = new System.Text.StringBuilder();
            sb.AppendLine($"# {Title}");
            sb.AppendLine();
            sb.AppendLine($"**作者**: {Author}");
            sb.AppendLine($"**日期**: {CreatedDate:yyyy-MM-dd}");
            sb.AppendLine();
            sb.AppendLine("---");
            sb.AppendLine();

            foreach (var header in Headers)
            {
                sb.AppendLine($"## {header}");
                sb.AppendLine();
            }

            foreach (var para in Paragraphs)
            {
                sb.AppendLine(para);
                sb.AppendLine();
            }

            return sb.ToString();
        }
    }

    /// <summary>
    /// 文件樣式
    /// </summary>
    public class DocumentStyle
    {
        public string FontFamily { get; set; } = "Arial";
        public int FontSize { get; set; } = 12;
        public string TextColor { get; set; } = "#000000";
        public string BackgroundColor { get; set; } = "#FFFFFF";
        public int LineSpacing { get; set; } = 1;
    }

    /// <summary>
    /// 文件 Builder 介面
    /// </summary>
    public interface IDocumentBuilder
    {
        IDocumentBuilder SetTitle(string title);
        IDocumentBuilder SetAuthor(string author);
        IDocumentBuilder AddHeader(string header);
        IDocumentBuilder AddParagraph(string paragraph);
        IDocumentBuilder AddImage(string imagePath);
        IDocumentBuilder AddTable(string tableContent);
        IDocumentBuilder AddFootnote(string footnote);
        IDocumentBuilder AddMetadata(string key, string value);
        IDocumentBuilder SetStyle(Action<DocumentStyle> styleConfig);
        Document Build();
    }

    /// <summary>
    /// 具體 Builder - 技術報告
    /// </summary>
    public class TechnicalReportBuilder : IDocumentBuilder
    {
        private Document _document = new();

        public IDocumentBuilder SetTitle(string title)
        {
            _document.Title = title;
            return this;
        }

        public IDocumentBuilder SetAuthor(string author)
        {
            _document.Author = author;
            return this;
        }

        public IDocumentBuilder AddHeader(string header)
        {
            _document.Headers.Add(header);
            return this;
        }

        public IDocumentBuilder AddParagraph(string paragraph)
        {
            _document.Paragraphs.Add(paragraph);
            return this;
        }

        public IDocumentBuilder AddImage(string imagePath)
        {
            _document.Images.Add(imagePath);
            return this;
        }

        public IDocumentBuilder AddTable(string tableContent)
        {
            _document.Tables.Add(tableContent);
            return this;
        }

        public IDocumentBuilder AddFootnote(string footnote)
        {
            _document.Footnotes.Add(footnote);
            return this;
        }

        public IDocumentBuilder AddMetadata(string key, string value)
        {
            _document.Metadata[key] = value;
            return this;
        }

        public IDocumentBuilder SetStyle(Action<DocumentStyle> styleConfig)
        {
            styleConfig(_document.Style);
            return this;
        }

        public Document Build()
        {
            // 技術報告預設樣式
            if (string.IsNullOrEmpty(_document.Style.FontFamily))
            {
                _document.Style.FontFamily = "Consolas";
                _document.Style.FontSize = 11;
                _document.Style.LineSpacing = 2;
            }

            return _document;
        }
    }

    /// <summary>
    /// 具體 Builder - 行銷文件
    /// </summary>
    public class MarketingDocumentBuilder : IDocumentBuilder
    {
        private Document _document = new();

        public IDocumentBuilder SetTitle(string title)
        {
            _document.Title = title;
            return this;
        }

        public IDocumentBuilder SetAuthor(string author)
        {
            _document.Author = author;
            return this;
        }

        public IDocumentBuilder AddHeader(string header)
        {
            _document.Headers.Add(header);
            return this;
        }

        public IDocumentBuilder AddParagraph(string paragraph)
        {
            _document.Paragraphs.Add(paragraph);
            return this;
        }

        public IDocumentBuilder AddImage(string imagePath)
        {
            _document.Images.Add(imagePath);
            return this;
        }

        public IDocumentBuilder AddTable(string tableContent)
        {
            _document.Tables.Add(tableContent);
            return this;
        }

        public IDocumentBuilder AddFootnote(string footnote)
        {
            _document.Footnotes.Add(footnote);
            return this;
        }

        public IDocumentBuilder AddMetadata(string key, string value)
        {
            _document.Metadata[key] = value;
            return this;
        }

        public IDocumentBuilder SetStyle(Action<DocumentStyle> styleConfig)
        {
            styleConfig(_document.Style);
            return this;
        }

        public Document Build()
        {
            // 行銷文件預設樣式
            if (string.IsNullOrEmpty(_document.Style.FontFamily))
            {
                _document.Style.FontFamily = "Calibri";
                _document.Style.FontSize = 14;
                _document.Style.LineSpacing = 1;
            }

            return _document;
        }
    }

    /// <summary>
    /// 文件 Director - 建立常見文件類型
    /// </summary>
    public class DocumentDirector
    {
        public Document CreateUserManual(IDocumentBuilder builder)
        {
            return builder
                .SetTitle("使用者手冊")
                .SetAuthor("技術文件團隊")
                .AddHeader("產品介紹")
                .AddParagraph("歡迎使用本產品。本手冊將引導您了解產品的所有功能。")
                .AddHeader("安裝指南")
                .AddParagraph("1. 打開包裝取出所有配件")
                .AddParagraph("2. 按照說明書進行組裝")
                .AddParagraph("3. 連接電源並開機")
                .AddHeader("操作說明")
                .AddParagraph("本產品提供多種操作方式...")
                .AddHeader("故障排除")
                .AddParagraph("若遇到問題，請參考以下解決方案...")
                .AddFootnote("保固資訊請參考官方網站")
                .SetStyle(s => { s.FontFamily = "Arial"; s.FontSize = 11; })
                .Build();
        }

        public Document CreateMarketingBrochure(IDocumentBuilder builder)
        {
            return builder
                .SetTitle("產品型錄")
                .SetAuthor("行銷部門")
                .AddHeader("精選商品")
                .AddParagraph("我們為您精選了以下優質商品...")
                .AddImage("/images/products/banner.jpg")
                .AddHeader("優惠活動")
                .AddParagraph("現在購買享有超值優惠！")
                .AddHeader("聯絡我們")
                .AddParagraph("歡迎致電或蒞臨門市參觀選購")
                .SetStyle(s => { s.FontFamily = "Calibri"; s.FontSize = 14; })
                .Build();
        }
    }

    /// <summary>
    /// 文件建構器範例執行
    /// </summary>
    public static class DocumentBuilder
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("5. 文件建構器");
            Console.WriteLine("=".PadRight(60, '='));

            var director = new DocumentDirector();

            // 建立技術報告
            Console.WriteLine("\n📄 範例 1 - 使用 Director 建立使用者手冊:");
            var manualBuilder = new TechnicalReportBuilder();
            var userManual = director.CreateUserManual(manualBuilder);
            userManual.Print();

            // 建立行銷文件
            Console.WriteLine("\n📄 範例 2 - 使用 Director 建立產品型錄:");
            var marketingBuilder = new MarketingDocumentBuilder();
            var brochure = director.CreateMarketingBrochure(marketingBuilder);
            brochure.Print();

            // 自訂技術報告
            Console.WriteLine("\n📄 範例 3 - 自訂技術報告:");
            var customReport = new TechnicalReportBuilder()
                .SetTitle("API 技術文件")
                .SetAuthor("開發團隊")
                .AddHeader("概述")
                .AddParagraph("本文件說明 API 的使用方法...")
                .AddHeader("認證")
                .AddParagraph("所有 API 請求都需要提供 API Key...")
                .AddHeader("端點")
                .AddTable("GET /api/users - 取得用戶列表")
                .AddTable("POST /api/users - 建立新用戶")
                .AddMetadata("version", "2.0")
                .AddMetadata("status", "draft")
                .SetStyle(s =>
                {
                    s.FontFamily = "Consolas";
                    s.FontSize = 10;
                    s.LineSpacing = 2;
                })
                .Build();
            customReport.Print();

            // 匯出為文字
            Console.WriteLine("\n📄 範例 4 - 匯出為文字格式:");
            Console.WriteLine(customReport.ExportToText());

            Console.WriteLine("\n🎯 重點說明：");
            Console.WriteLine("   1. IDocumentBuilder 定義文件建立步驟");
            Console.WriteLine("   2. TechnicalReportBuilder, MarketingDocumentBuilder 是具體 Builder");
            Console.WriteLine("   3. DocumentDirector 封裝常用文件類型的建立流程");
            Console.WriteLine("   4. SetStyle 使用 Action<DocumentStyle> 進行細部設定");
            Console.WriteLine("   5. 常見應用場景：報告產生、文件範本、自動化文件生成");
        }
    }
}