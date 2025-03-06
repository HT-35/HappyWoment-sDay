// pages/index.js
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const everyOne =
    "Chúc bạn – một người phụ nữ tuyệt vời – luôn xinh đẹp, mạnh mẽ và hạnh phúc! 💜💐 Nhân Ngày Quốc tế Phụ nữ, mong rằng bạn luôn đạt được những ước mơ của mình, thành công trong công việc và tràn đầy yêu thương trong cuộc sống. Chúc bạn một ngày thật rực rỡ! ✨💕";

  const Thu =
    "Chúc chị Thư – một designer tài năng và sáng tạo – luôn tràn đầy cảm hứng, thành công rực rỡ trong công việc và hạnh phúc trong cuộc sống. Nhân Ngày Quốc tế Phụ nữ, chúc chị luôn tỏa sáng như những thiết kế đầy nghệ thuật của mình! 💐✨";

  const Ngan =
    "Chúc Ngân – cô gái tài năng trong thế giới content và SEO – luôn tràn đầy ý tưởng sáng tạo, viết bài 'triệu view' và các chiến dịch luôn lên top! Nhân Ngày Quốc tế Phụ nữ, chúc bạn thành công rực rỡ, luôn hạnh phúc và ngày càng tỏa sáng trong sự nghiệp! 🌸✨🚀";

  const Thao =
    "Chúc chị Thảo một Ngày Quốc tế Phụ nữ tràn đầy niềm vui, hạnh phúc và thành công! ✨ Mong chị luôn giữ vững nhiệt huyết, tỏa sáng rực rỡ trong công việc và cuộc sống. Chúc chị mỗi ngày đều ngập tràn yêu thương và những điều tốt đẹp nhất! 💜💐💜";

  const [message, setMessage] = useState<String>(everyOne);

  useEffect(() => {
    if (name === "Thu") {
      setMessage(Thu);
    } else if (name === "Ngan") {
      setMessage(Ngan);
    } else if (name === "Thao") {
      setMessage(Thao);
    }
  }, [name]);

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Hiệu ứng confetti khi trang tải xong
    setShowConfetti(true);

    // Tắt confetti sau 5 giây
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (typeof window === undefined) {
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 max-lg:pb-10">
      {showConfetti && <Confetti />}

      <main className="container mx-auto px-4 py-1 ">
        <div className="text-center my-10 max-w-[1100px] mx-auto">
          <motion.h1
            className="text-5xl font-bold text-purple-800 mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Chúc mừng ngày Quốc tế Phụ nữ 8/3
          </motion.h1>

          <motion.p
            className="text-xl text-pink-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {message}
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-16">
          <Card
            title="Hoa Hồng"
            description="Tượng trưng cho tình yêu và sự ngưỡng mộ"
            imageUrl="/images/rose.jpg"
            delay={0.3}
          />
          <Card
            title="Hoa Tulip"
            description="Biểu tượng của sự hoàn hảo và thanh lịch"
            imageUrl="/images/tulip.jpg"
            delay={0.6}
          />
          <Card
            title="Hoa Lan"
            description="Đại diện cho sự quý phái và thanh cao"
            imageUrl="/images/orchid.jpg"
            delay={0.9}
          />
        </div>

        <FloatingHearts />
      </main>
    </div>
  );
}

function Card({
  title,
  description,
  imageUrl,
  delay,
}: {
  title: string;
  description: string;
  imageUrl: string;
  delay: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-72 transform hover:-translate-y-2 transition-transform duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-white text-lg font-semibold">
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={200}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-pink-600 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

function Confetti() {
  const [confetti, setConfetti] = useState<
    Array<{
      left: number;
      color: string;
      delay: number;
      duration: number;
      rotate: number;
    }>
  >([]);

  useEffect(() => {
    const colors = ["#FF69B4", "#FFB6C1", "#FFC0CB", "#9370DB", "#BA55D3"];
    const newConfetti = Array.from({ length: 100 }).map(() => ({
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      rotate: 360 * Math.floor(Math.random() * 5),
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((conf, index) => (
        <motion.div
          key={index}
          className="absolute h-3 w-3 rounded-full"
          style={{
            backgroundColor: conf.color,
            top: `-10%`,
            left: `${conf.left}%`,
          }}
          animate={{
            top: "100%",
            rotate: conf.rotate,
          }}
          transition={{
            duration: conf.duration,
            ease: "linear",
            delay: conf.delay,
          }}
        />
      ))}
    </div>
  );
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ left: number; delay: number }>>(
    []
  );

  useEffect(() => {
    // Tạo mảng các hearts với vị trí ngẫu nhiên chỉ ở phía client
    const newHearts = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl"
          style={{
            bottom: "-10%",
            left: `${heart.left}%`,
          }}
          initial={{ opacity: 0.7 }}
          animate={{
            bottom: "110%",
            left: `${heart.left}%`,
            opacity: [0.7, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: heart.delay,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
