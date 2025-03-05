import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Liên Hệ Với TOLOCO
            </h1>
            <p className="text-xl text-blue-100">
              Chúng tôi luôn sẵn sàng hỗ trợ doanh nghiệp của bạn trong hành trình chuyển đổi số
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông Tin Liên Hệ</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">huuai.cn@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Điện Thoại</h3>
                    <p className="text-gray-600">(84) 909751088</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Địa Chỉ</h3>
                    <p className="text-gray-600">9 Phạm Ngũ Lão, P.3, Gò Vấp, Hồ Chí Minh</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Giờ Làm Việc</h2>
              <div className="space-y-2 text-gray-600">
                <p>Thứ 2 - Thứ 6: 8:30 - 17:30</p>
                <p>Thứ 7: 8:30 - 12:00</p>
                <p>Chủ nhật: Nghỉ</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
} 