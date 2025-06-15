

## 📌 Mô tả

**Chill Nhac** là một hệ thống nghe nhạc trực tuyến được xây dựng với công nghệ hiện đại MERN Stack (MongoDB, Express, React, Node.js) kết hợp với Clerk cho xác thực người dùng và Socket.io cho tính năng nhắn tin thời gian thực.

---

## 🚀 Tính năng

•	🎼 Nghe nhạc (phát/tạm dừng/chuyển tiếp/quay lại)

•	🔐 Đăng ký – đăng nhập bằng Google thông qua Clerk

•	📃 Xem chi tiết album và danh sách bài hát

•	💬 Nhắn tin thời gian thực giữa người dùng

•	🧑‍💻 Quản lý nội dung bởi Admin (bài hát, album, người dùng)

---

## 🛠️ Công nghệ sử dụng

### 📦 Backend
•	**Node.js**

•	**Express.js**

•	**MongoDB**

•	**Socket.IO**

•	**JavaScript**

### 💻 Frontend
•	**React.js**

•	**Tailwind CSS**

•	**Shadcn/UI**

•	**TypeScript**

•	**Zustand**

---

## 📁 Cấu trúc thư mục
```
realtime-chat/
├── Frontend (React + Vite)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── Layout/
│ │ ├── lib/
│ │ ├── Pages/
│ │ ├── providers/
│ │ ├── stores/
│ │ ├── types/
│ │ └── App.tsx
│ └── vite.config.js
│
├── Backend (Node.js + Express)
│ ├── controller/
│ ├── lib/
│ ├── middleware/
│ ├── models/
│ ├── middleware/
│ ├── routes/
│ └── index.js
│
├── .env

```

---

## ⚙️ Cài đặt & chạy ứng dụng

### 1. Clone project
git clone https://github.com/DieuLinh2603/ChillNhac.git
cd ChillNhac

---


### 2. Cài đặt backend
cd BackEnd
npm install

---


### 3. Cài đặt frontend
cd FrontEnd
npm install

---


### 4. Thiết lập môi trường
Chỉnh sửa các thông tin cần thiết tại file BackEnd/.env

---


### 5. Chạy ứng dụng
**Chạy BackEnd**
npm run dev
**Chạy FrontEnd**
npm run dev
