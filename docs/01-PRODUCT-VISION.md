# EcoPick - Product Vision & Business Requirements

## 1. Tầm nhìn sản phẩm

**EcoPick** là nền tảng mạng xã hội xanh kết nối cộng đồng tình nguyện viên bảo vệ môi trường. App cho phép người dùng báo cáo điểm ô nhiễm rác thải, tổ chức/tham gia các tour du lịch nhặt rác, chia sẻ hoạt động trồng cây & dọn dẹp, và đổi điểm thưởng lấy quà tặng xanh.

### Tagline
> "Pick up trash. Plant trees. Earn rewards. Save the planet."

---

## 2. Đối tượng người dùng

### 2.1 Persona chính

| Persona | Mô tả | Nhu cầu chính |
|---------|--------|---------------|
| **Tình nguyện viên** | Sinh viên, người đi làm muốn tham gia hoạt động môi trường | Tìm sự kiện gần, ghi nhận đóng góp, kết nối cộng đồng |
| **Tổ chức/Nhóm** | CLB môi trường, NGO, nhóm tình nguyện | Tạo sự kiện, quản lý tình nguyện viên, báo cáo impact |
| **Du khách xanh** | Khách du lịch muốn kết hợp du lịch + bảo vệ môi trường | Tham gia tour nhặt rác, khám phá địa điểm, trải nghiệm |
| **Doanh nghiệp** | Công ty CSR, nhà tài trợ | Tài trợ sự kiện, quảng bá thương hiệu xanh, báo cáo ESG |

### 2.2 User Roles

| Role | Quyền hạn |
|------|-----------|
| `user` | Báo cáo rác, tham gia sự kiện, đăng bài, đổi thưởng |
| `organizer` | Tạo/quản lý sự kiện, duyệt tình nguyện viên, tạo tour |
| `moderator` | Duyệt báo cáo, quản lý nội dung cộng đồng |
| `admin` | Quản trị hệ thống, quản lý người dùng, dashboard analytics |

---

## 3. Core Value Propositions

### 3.1 Cho người dùng cá nhân
- **Báo cáo điểm ô nhiễm** bằng camera → AI phân loại rác tự động
- **Tham gia sự kiện** dọn rác, trồng cây theo lịch & vị trí
- **Tour du lịch xanh** — du lịch kết hợp nhặt rác, khám phá thiên nhiên
- **Mạng xã hội xanh** — chia sẻ hoạt động, follow bạn bè, newsfeed
- **Hệ thống thưởng** — tích điểm → đổi quà, huy hiệu, bảng xếp hạng
- **Trao đổi đồ cũ** — marketplace đổi/tặng đồ không dùng nữa

### 3.2 Cho tổ chức
- **Dashboard quản lý** sự kiện, tình nguyện viên, impact report
- **Tạo tour tùy chỉnh** với lộ trình, điểm dừng, mục tiêu
- **Báo cáo ESG** — số liệu tác động môi trường cho doanh nghiệp

---

## 4. Business Requirements tổng quan

### BR-01: Hệ thống xác thực & hồ sơ người dùng
- Đăng ký/đăng nhập bằng email, Google, Apple
- Hồ sơ cá nhân với avatar, bio, thống kê hoạt động
- Hệ thống level dựa trên điểm tích lũy

### BR-02: Báo cáo & bản đồ ô nhiễm
- Chụp ảnh + gắn GPS → tạo báo cáo rác thải
- Bản đồ hiển thị tất cả điểm ô nhiễm theo mức độ
- Hệ thống vote xác minh báo cáo từ cộng đồng
- Theo dõi trạng thái: Reported → In Progress → Cleaned

### BR-03: Sự kiện & Tour du lịch xanh
- Tạo sự kiện dọn rác với thời gian, địa điểm, số lượng người
- Tour du lịch nhặt rác — nhiều điểm dừng, lộ trình trên bản đồ
- Đăng ký tham gia, check-in tại sự kiện
- Chat nhóm cho từng sự kiện

### BR-04: Mạng xã hội xanh
- Newsfeed — đăng bài ảnh/video hoạt động môi trường
- Like, comment, share bài viết
- Follow người dùng, tag bạn bè
- Hashtag & trending topics (#PlasticFree, #TreePlanting...)

### BR-05: Gamification & Rewards
- Hệ thống điểm (EcoPoints) cho mọi hoạt động
- Huy hiệu (Badges) theo milestone đạt được
- Bảng xếp hạng tuần/tháng/tổng (cá nhân & nhóm)
- Daily challenges & streaks

### BR-06: Marketplace trao đổi đồ cũ
- Đăng đồ muốn tặng/đổi (quần áo, sách, đồ điện tử...)
- Tìm kiếm theo danh mục, khoảng cách
- Chat 1-1 để thỏa thuận trao đổi
- Đánh giá sau giao dịch

### BR-07: Analytics & Impact
- Dashboard cá nhân: tổng rác nhặt, cây trồng, sự kiện tham gia
- Impact report cộng đồng: tổng kg rác, số cây, CO₂ giảm
- Xuất báo cáo PDF cho tổ chức/doanh nghiệp

---

## 5. Yêu cầu phi chức năng

| Yêu cầu | Mô tả |
|----------|-------|
| **Performance** | App load < 2s, API response < 500ms, map render < 1s |
| **Scalability** | Hỗ trợ 100K+ users, 1M+ reports |
| **Offline** | Cho phép tạo report offline, sync khi có mạng |
| **Security** | JWT auth, HTTPS, input validation, rate limiting |
| **Privacy** | GDPR compliant, user data encryption, opt-in location |
| **Platform** | iOS 15+, Android 10+, React Native/Expo |
| **Localization** | Vietnamese (default), English |
| **Accessibility** | WCAG 2.1 AA, screen reader support |

---

## 6. Competitive Landscape

| App | Điểm mạnh | EcoPick khác biệt |
|-----|-----------|-------------------|
| **TrashOut** | Báo cáo rác, bản đồ | + Social network + Tour du lịch + Gamification |
| **Litterati** | Chụp ảnh rác, data | + Sự kiện + Marketplace + Community |
| **iNaturalist** | Cộng đồng khoa học | + Focus rác thải + Rewards + Exchange |
| **Olio** | Chia sẻ đồ ăn/đồ dùng | + Bản đồ ô nhiễm + Sự kiện + Impact tracking |

---

## 7. Revenue Model (Tương lai)

| Nguồn | Mô tả |
|-------|-------|
| **Freemium** | Free cho cá nhân, Premium cho tổ chức (dashboard, analytics) |
| **Sponsorship** | Doanh nghiệp tài trợ sự kiện → hiển thị logo, báo cáo CSR |
| **Marketplace fee** | Phí nhỏ cho giao dịch trao đổi (tùy chọn) |
| **Data insights** | Bán dữ liệu ô nhiễm ẩn danh cho cơ quan quản lý |

---

## 8. Success Metrics (KPIs)

| Metric | Target Phase 1 | Target Phase 3 |
|--------|---------------|---------------|
| MAU (Monthly Active Users) | 1,000 | 50,000 |
| Reports/month | 500 | 25,000 |
| Events/month | 20 | 500 |
| Avg session time | 5 min | 12 min |
| Retention D7 | 30% | 50% |
| Reports resolved rate | 20% | 60% |
| NPS Score | 40 | 65 |
