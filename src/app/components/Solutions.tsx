import React from 'react';

const solutions = [
  {
    id: 1,
    title: 'Cập Nhật Xu Hướng CNTT',
    description: 'Tích hợp BigData & AI vào hoạt động kinh doanh, giúp doanh nghiệp luôn đi đầu trong thị trường.',
    result: 'Tăng 35% khả năng cạnh tranh sau 6 tháng',
    icon: '📈'
  },
  {
    id: 2,
    title: 'Ổn Định Chuỗi Cung Ứng',
    description: 'Tối ưu hóa quy trình mua bán, giảm hàng tồn kho và tăng hiệu quả vận hành.',
    result: 'Giảm 40% hàng tồn kho',
    icon: '🔄'
  },
  {
    id: 3,
    title: 'Nhận Tiền Ngay Khi Bán',
    description: 'Hỗ trợ thanh khoản nhanh từ đối tác tài chính, cải thiện dòng tiền nhanh chóng.',
    result: '95% thanh toán trong 24h',
    icon: '💰'
  },
  {
    id: 4,
    title: 'Báo Cáo Giao Nhận',
    description: 'Theo dõi thời gian thực tiến độ giao nhận hàng qua đường biển, bộ và hàng không.',
    result: 'Tăng 45% độ hài lòng khách hàng',
    icon: '📦'
  },
  {
    id: 5,
    title: 'Đào Tạo Lãnh Đạo',
    description: 'Lộ trình đào tạo theo từng trình độ, trang bị kỹ năng lãnh đạo trong kỷ nguyên số.',
    result: '85% học viên áp dụng thành công',
    icon: '👥'
  },
  {
    id: 6,
    title: 'Mở Rộng Quy Mô',
    description: 'Hỗ trợ mở rộng kinh doanh với chiến lược tiếp cận nhanh chóng đến mục tiêu.',
    result: 'Giảm 50% thời gian thâm nhập thị trường',
    icon: '🚀'
  }
];

const Solutions = () => {
  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Giải Pháp Toàn Diện Cho SMEs</h2>
          <p className="text-xl text-gray-600">
            Tích hợp công nghệ hiện đại giúp doanh nghiệp của bạn tăng trưởng vượt bậc
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div 
              key={solution.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
              <p className="text-gray-600 mb-4">{solution.description}</p>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm">
                ✓ {solution.result}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            NHẬN BÁO GIÁ TRONG 24H
          </button>
        </div>
      </div>
    </section>
  );
};

export default Solutions; 