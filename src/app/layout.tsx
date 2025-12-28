import React from 'react';
import './globals.css'; // تأكدي من وجود ملف CSS فارغ على الأقل بهذا الاسم

export const metadata = {
  title: 'أكاديمية يلا مصري | Yalla Masry Academy',
  description: 'الأكاديمية الأولى للهجة المصرية الراقية',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body className="bg-[#000814] antialiased">
        {children}
      </body>
    </html>
  );
}
