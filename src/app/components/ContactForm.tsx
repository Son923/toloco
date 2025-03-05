'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    message: '',
    isError: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', isError: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra');
      }

      setStatus({
        loading: false,
        message: 'Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.',
        isError: false
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        loading: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra, vui lòng thử lại sau.',
        isError: true
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Bắt Đầu Hành Trình Chuyển Đổi Số
        </h2>
        <p className="text-gray-600">
          Ưu đãi giới hạn: Miễn phí đánh giá & tư vấn lộ trình chuyển đổi số trị giá 10 triệu đồng
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={status.loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={status.loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={status.loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên doanh nghiệp</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={status.loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lĩnh vực hoạt động</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={status.loading}
          >
            <option value="">Chọn lĩnh vực</option>
            <option value="retail">Bán lẻ</option>
            <option value="manufacturing">Sản xuất</option>
            <option value="services">Dịch vụ</option>
            <option value="technology">Công nghệ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nhu cầu tư vấn</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={status.loading}
          ></textarea>
        </div>

        {status.message && (
          <div className={`p-4 rounded-lg ${status.isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {status.message}
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full ${
              status.loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={status.loading}
          >
            {status.loading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Chỉ còn 5 suất ưu đãi trong tháng 3/2025
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 