import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Toloco - Giải Pháp Chuyển Đổi Số Toàn Diện Cho Doanh Nghiệp SME Việt Nam | BigData & AI',
  description: 'Toloco giúp doanh nghiệp SME tại Việt Nam tăng 30% hiệu suất kinh doanh với giải pháp ứng dụng CNTT tích hợp BigData & AI. Đồng hành cùng 1000+ doanh nghiệp thành công.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
} 