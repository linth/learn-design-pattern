namespace SOLIDExamples
{
    // ============================================================
    // 介面隔離原則 (Interface Segregation Principle, ISP)
    // 客戶端不應被迫依賴它們不使用的方法。
    // 應將大型介面拆分為多個小型、專用的介面。
    // ============================================================

    /// <summary>
    /// 違反 ISP 的範例：大型介面包含所有功能，所有類別都必須實作不需要的方法
    /// </summary>
    public class ISPViolation
    {
        /// <summary>
        /// 過大的介面，包含飛行、游泳、奔跑等多種能力
        /// </summary>
        public interface IAnimal
        {
            void Fly();
            void Swim();
            void Run();
        }

        /// <summary>
        /// 狗不會飛，但被迫實作 Fly()
        /// </summary>
        public class Dog : IAnimal
        {
            public void Fly() => throw new NotImplementedException("狗不會飛！");
            public void Swim() => Console.WriteLine("狗在游泳");
            public void Run() => Console.WriteLine("狗在奔跑");
        }

        /// <summary>
        /// 魚不會跑，但被迫實作 Run()
        /// </summary>
        public class Fish : IAnimal
        {
            public void Fly() => throw new NotImplementedException("魚不會飛！");
            public void Swim() => Console.WriteLine("魚在游泳");
            public void Run() => throw new NotImplementedException("魚不會跑！");
        }
    }

    // ---------- 遵循 ISP ----------

    /// <summary>
    /// 將大型介面拆分為多個小型專用介面
    /// </summary>
    public interface IRunnable
    {
        void Run();
    }

    public interface ISwimmable
    {
        void Swim();
    }

    public interface IFlyable
    {
        void Fly();
    }

    /// <summary>
    /// 狗只實作它需要的介面：IRunnable, ISwimmable
    /// </summary>
    public class Dog : IRunnable, ISwimmable
    {
        public void Run() => Console.WriteLine("狗在奔跑");
        public void Swim() => Console.WriteLine("狗在游泳");
    }

    /// <summary>
    /// 魚只實作它需要的介面：ISwimmable
    /// </summary>
    public class Fish : ISwimmable
    {
        public void Swim() => Console.WriteLine("魚在游泳");
    }

    /// <summary>
    /// 鳥只實作它需要的介面：IRunnable, IFlyable
    /// </summary>
    public class Bird : IRunnable, IFlyable
    {
        public void Run() => Console.WriteLine("鳥在走路");
        public void Fly() => Console.WriteLine("鳥在飛翔");
    }

    public static class ISPDemo
    {
        public static void Run()
        {
            Console.WriteLine("\n" + "=".PadRight(60, '='));
            Console.WriteLine("ISP - 介面隔離原則");
            Console.WriteLine("=".PadRight(60, '='));

            // 每個動物只使用自己需要的能力
            var dog = new Dog();
            var fish = new Fish();
            var bird = new Bird();

            Console.WriteLine("\n  狗:");
            dog.Run();
            dog.Swim();

            Console.WriteLine("\n  魚:");
            fish.Swim();

            Console.WriteLine("\n  鳥:");
            bird.Run();
            bird.Fly();
        }
    }
}
