namespace SOLIDExamples
{
    // ============================================================
    // 開放封閉原則 (Open/Closed Principle, OCP)
    // 軟體實體應對擴展開放，但對修改關閉。
    // 新增功能時不應修改既有程式碼，而是透過擴充來達成。
    // ============================================================

    /// <summary>
    /// 違反 OCP 的範例：每次新增圖形型別都要修改 AreaCalculator
    /// </summary>
    public class AreaCalculatorViolation
    {
        public double CalculateArea(object shape)
        {
            if (shape is RectangleV1 r)
                return r.Width * r.Height;
            if (shape is CircleV1 c)
                return Math.PI * c.Radius * c.Radius;
            // 每次新增型別都要在此新增判斷，違反 OCP
            throw new NotSupportedException("不支援的圖形型別");
        }
    }

    public class RectangleV1 { public double Width; public double Height; }
    public class CircleV1 { public double Radius; }

    // ---------- 遵循 OCP ----------

    /// <summary>
    /// 抽象圖形介面，所有圖形需實作計算面積方法
    /// </summary>
    public interface IShape
    {
        double CalculateArea();
    }

    /// <summary>
    /// 長方形，實作 IShape 介面
    /// </summary>
    public class Rectangle : IShape
    {
        public double Width { get; set; }
        public double Height { get; set; }

        public Rectangle(double width, double height)
        {
            Width = width;
            Height = height;
        }

        public double CalculateArea() => Width * Height;
    }

    /// <summary>
    /// 圓形，實作 IShape 介面
    /// </summary>
    public class Circle : IShape
    {
        public double Radius { get; set; }

        public Circle(double radius)
        {
            Radius = radius;
        }

        public double CalculateArea() => Math.PI * Radius * Radius;
    }

    /// <summary>
    /// 三角形，新增時不需修改既有程式碼
    /// </summary>
    public class Triangle : IShape
    {
        public double Base { get; set; }
        public double Height { get; set; }

        public Triangle(double baseLength, double height)
        {
            Base = baseLength;
            Height = height;
        }

        public double CalculateArea() => 0.5 * Base * Height;
    }

    /// <summary>
    /// 面積計算器，不需修改即可支援所有實作 IShape 的圖形
    /// </summary>
    public class AreaCalculator
    {
        public double CalculateArea(IShape shape) => shape.CalculateArea();
    }

    public static class OCPDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("OCP - 開放封閉原則");
            Console.WriteLine("=".PadRight(60, '='));

            var calculator = new AreaCalculator();
            IShape[] shapes = {
                new Rectangle(10, 20),
                new Circle(5),
                new Triangle(8, 6)
            };

            foreach (var shape in shapes)
            {
                var area = calculator.CalculateArea(shape);
                Console.WriteLine($"  {shape.GetType().Name} 面積: {area:F2}");
            }
        }
    }
}
