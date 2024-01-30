import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css'; // Đảm bảo bạn đã nhập thư viện Boxicons

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Xử lý sự kiện cuộn
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const threshold = 200; // Ngưỡng cuộn để hiển thị nút

      // Kiểm tra xem vị trí cuộn có vượt quá ngưỡng không
      setIsVisible(scrollTop > threshold);
    };

    // Đăng ký sự kiện cuộn
    window.addEventListener('scroll', handleScroll);

    // Hủy đăng ký sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Hàm xử lý khi nút được nhấp
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Cuộn mượt
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <i className='bx bxs-to-top'></i>
    </button>
  );
};

export default ScrollTop;
