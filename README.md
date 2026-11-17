# FuongYSLComestic — 3D Haute Couture Noël Gala 2026

Trải nghiệm website 3D tương tác cao cấp cho thương hiệu **FuongYSLComestic** (Haute Couture Beauté Paris Noël Gala 2026).

![FuongYSLComestic Showcase](/public/assets/spotlight-muse.jpg)

## ✦ Tính Năng Nổi Bật

- **Mô Hình 3D Real-time YSL Monogram (60 FPS)**:
  - Render PBR mạ vàng hoàng gia 24K (`MeshPhysicalMaterial`), phản quang đa diện và bóng đổ chuẩn studio.
  - Tương tác tự do: xoay 360° theo chuột/chạm vuốt, điều khiển thanh trượt góc độ, tự động xoay và reset góc nhìn.
  - Đặt trên bục sơn mài đen piano với vòng hào quang Cassandre xoay tròn.
- **Hành Trình Mùa Đông 3D (Wonderland Scroll)**:
  - Chuỗi hình ảnh 327 frame chất lượng điện ảnh mượt mà, cuộn chuột bay qua rừng thông tuyết trắng tiến về cánh cửa gỗ phát sáng.
  - Khung truy cập trực tiếp vào dạ tiệc YSL tại điểm đích của hành trình.
- **Hệ Thống Tuyết Rơi 3D GPU (Three.js WebGL + Custom Shader)**:
  - Kế thừa & nâng cấp từ `rauschermate/react-weather-effects`.
  - Mô phỏng vật lý gió động (Dynamic Wind Physics) tương tác theo chuyển động chuột.
  - Tự động tạo hoa tuyết tinh thể 6 cánh sắc nét (procedural dendritic crystal) kết hợp ánh vàng champagne.
  - Widget chuyển đổi chế độ: *Tuyết Dịu Êm* ⟷ *Bão Tuyết Noël*.
- **Tâm Điểm BST & Trải Nghiệm Khắc Tên Laser Bạc 24K**:
  - Son kem nhung bóng *The Inks Vinyl Cream #416* cùng nàng thơ YSL Beauté.
  - Modal mô phỏng khắc tên cá nhân hóa bằng laser trực tiếp lên thỏi son và chai nước hoa.
- **Dạ Tiệc Gala RSVP & Giỏ Quà Noël**:
  - Đăng ký thiệp mời VIP Concierge tại Pop-up Vincom Đồng Khởi.
  - Quản lý giỏ hàng quà tặng, danh sách yêu thích và bộ quà độc bản (Coffrets).

---

## 🛠 Công Nghệ Sử Dụng

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D & Đồ Họa**: [Three.js](https://threejs.org/) (GLTFLoader, WebGLRenderer, Custom GLSL Shaders)
- **Hiệu Ứng & Animation**: [GSAP](https://gsap.com/), [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

```bash
# 1. Clone repository
git clone https://github.com/PHUOBG/fuongYSL.git
cd fuongYSL

# 2. Cài đặt dependencies
npm install

# 3. Khởi chạy môi trường phát triển (Dev Server)
npm run dev
# Mở trình duyệt tại http://localhost:3000

# 4. Build phiên bản Production
npm run build
```

---

## 📄 Bản Quyền

© 2026 FuongYSLComestic Paris. Bản quyền thương hiệu Haute Couture Beauté.
