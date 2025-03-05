import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            TĂNG TRƯỞNG VƯỢT BẬC VỚI CHUYỂN ĐỔI SỐ TOÀN DIỆN
          </h1>
          <p className="text-xl mb-8">
            Giúp doanh nghiệp SME tại Việt Nam tăng 30% hiệu suất kinh doanh với giải pháp BigData & AI
          </p>
          <div className="text-lg mb-12">
            <ul className="flex flex-wrap justify-center gap-8">
              <li className="flex items-center">
                <span className="mr-2">✓</span> Tiết kiệm 40% chi phí vận hành
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Tăng 35% khả năng cạnh tranh
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span> Triển khai chỉ trong 2 tuần
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="#solutions"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              XEM GIẢI PHÁP
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              ĐĂNG KÝ NHẬN TƯ VẤN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 