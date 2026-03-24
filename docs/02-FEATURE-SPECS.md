# EcoPick - Feature Specifications

## Module 1: Authentication & User Profile

### F1.1 — Đăng ký / Đăng nhập

| Field | Chi tiết |
|-------|---------|
| **Priority** | P0 — Critical |
| **Phase** | Phase 1 |
| **Status** | ❌ Chưa triển khai |

#### Mô tả
Người dùng có thể tạo tài khoản và đăng nhập bằng nhiều phương thức. Hệ thống quản lý session bằng JWT tokens.

#### User Stories
- US-1.1: Là người dùng mới, tôi muốn đăng ký bằng email/mật khẩu để tạo tài khoản
- US-1.2: Là người dùng, tôi muốn đăng nhập bằng Google/Apple để tiết kiệm thời gian
- US-1.3: Là người dùng, tôi muốn reset mật khẩu khi quên
- US-1.4: Là người dùng, tôi muốn app ghi nhớ đăng nhập (refresh token)

#### Acceptance Criteria
- [ ] Đăng ký với email + password (min 8 ký tự, có chữ hoa + số)
- [ ] Đăng nhập Google OAuth 2.0
- [ ] Đăng nhập Apple Sign-In (iOS required)
- [ ] Xác minh email qua OTP 6 số (hết hạn 10 phút)
- [ ] Forgot password flow qua email
- [ ] JWT access token (15 min) + refresh token (30 ngày)
- [ ] Auto-logout khi refresh token hết hạn
- [ ] Loading state, error handling cho mọi trường hợp

#### Screens liên quan
- `auth/login.tsx` — Màn hình đăng nhập
- `auth/register.tsx` — Màn hình đăng ký
- `auth/forgot-password.tsx` — Quên mật khẩu
- `auth/verify-email.tsx` — Xác minh OTP

---

### F1.2 — Hồ sơ người dùng

| Field | Chi tiết |
|-------|---------|
| **Priority** | P0 — Critical |
| **Phase** | Phase 1 |
| **Status** | 🟡 UI có, chưa có API |

#### Mô tả
Trang hồ sơ hiển thị thông tin cá nhân, thống kê hoạt động, huy hiệu, và lịch sử hoạt động.

#### User Stories
- US-1.5: Là người dùng, tôi muốn cập nhật avatar, tên, bio
- US-1.6: Là người dùng, tôi muốn xem tổng quan thống kê của mình
- US-1.7: Là người dùng, tôi muốn xem lịch sử hoạt động

#### Acceptance Criteria
- [ ] Hiển thị avatar, tên, username, bio
- [ ] Upload/crop avatar (max 5MB, jpg/png)
- [ ] Stats cards: Reports, Events Joined, Trees Planted, EcoPoints
- [ ] Activity timeline (report created, event joined, badge earned...)
- [ ] Edit profile form (name, bio, location)
- [ ] Settings: notification, privacy, language, logout
- [ ] Delete account option (soft delete, 30 ngày khôi phục)

---

## Module 2: Bản đồ & Báo cáo rác thải

### F2.1 — Bản đồ tương tác (Map/Explore)

| Field | Chi tiết |
|-------|---------|
| **Priority** | P0 — Critical |
| **Phase** | Phase 1 |
| **Status** | 🟢 UI hoàn chỉnh, dùng mock data |

#### Mô tả
Bản đồ hiển thị tất cả điểm ô nhiễm rác thải, cho phép lọc theo mức độ, xem chi tiết, và tính đường đi đến điểm.

#### User Stories
- US-2.1: Là người dùng, tôi muốn xem bản đồ các điểm rác gần tôi
- US-2.2: Là người dùng, tôi muốn lọc theo mức độ nghiêm trọng
- US-2.3: Là người dùng, tôi muốn tìm đường đến điểm rác để dọn
- US-2.4: Là người dùng, tôi muốn tìm kiếm địa điểm theo tên

#### Acceptance Criteria
- [ ] Google Maps hiển thị markers color-coded theo severity (Light/Medium/Heavy/Extreme)
- [ ] Cluster markers khi zoom out (nhiều markers gần nhau gom lại)
- [ ] Filter chips: All / Light / Medium / Heavy / Extreme
- [ ] Tap marker → bottom sheet hiển thị preview (ảnh, loại rác, khoảng cách)
- [ ] Nút "Get Directions" → vẽ route trên bản đồ (OSRM/Google Directions API)
- [ ] Search bar tìm kiếm địa điểm (Google Places Autocomplete)
- [ ] Nút "My Location" → di chuyển về vị trí hiện tại
- [ ] Load data theo viewport (chỉ fetch markers trong vùng nhìn thấy)
- [ ] Pull-to-refresh data

#### Data Requirements
```typescript
interface WasteReport {
  id: string;
  latitude: number;
  longitude: number;
  severity: 'light' | 'medium' | 'heavy' | 'extreme';
  wasteTypes: string[];
  photoUrls: string[];
  description?: string;
  status: 'reported' | 'in_progress' | 'cleaned';
  reportedBy: UserSummary;
  createdAt: string;
  upvotes: number;
  commentsCount: number;
}
```

---

### F2.2 — Báo cáo rác thải (Report)

| Field | Chi tiết |
|-------|---------|
| **Priority** | P0 — Critical |
| **Phase** | Phase 1 |
| **Status** | 🟢 UI hoàn chỉnh, chưa có API upload |

#### Mô tả
Người dùng chụp ảnh rác → app tự phát hiện vị trí GPS → điền thông tin → submit report.

#### User Stories
- US-2.5: Là người dùng, tôi muốn chụp ảnh rác và báo cáo nhanh
- US-2.6: Là người dùng, tôi muốn hệ thống tự nhận diện loại rác (AI)
- US-2.7: Là người dùng, tôi muốn điều chỉnh mức độ nghiêm trọng
- US-2.8: Là người dùng, tôi muốn thêm ghi chú mô tả

#### Acceptance Criteria
- [ ] Tap Report tab → mở camera trực tiếp
- [ ] Chụp ảnh → preview + nút Retake (góc phải)
- [ ] Auto-detect GPS location → hiển thị địa chỉ (reverse geocoding)
- [ ] Severity slider: Minor → Light → Moderate → Heavy → Extreme
- [ ] Multi-select waste types: Plastic, Paper, Glass, Organic, Metal + Other
- [ ] Optional description text (max 500 ký tự)
- [ ] Submit → upload ảnh lên cloud storage → tạo report
- [ ] Success screen: điểm +50 EcoPoints, animation confetti
- [ ] Offline support: lưu draft, sync khi có mạng
- [ ] Rate limit: max 10 reports/ngày/user

#### Tương lai (Phase 2)
- [ ] AI auto-detect loại rác từ ảnh (TensorFlow Lite / Vision API)
- [ ] Chụp nhiều ảnh (max 5)
- [ ] Video 15s

---

### F2.3 — Chi tiết điểm ô nhiễm (Location Detail)

| Field | Chi tiết |
|-------|---------|
| **Priority** | P1 — High |
| **Phase** | Phase 1 |
| **Status** | 🟢 UI hoàn chỉnh, mock data |

#### Mô tả
Trang chi tiết hiển thị đầy đủ thông tin về một điểm ô nhiễm, lịch sử cập nhật, và bình luận.

#### Acceptance Criteria
- [ ] Header: ảnh full-width, severity badge, waste types
- [ ] Info: địa chỉ, người báo cáo, thời gian, khoảng cách
- [ ] Status timeline: Reported → Verified → In Progress → Cleaned
- [ ] Nút Upvote (xác minh báo cáo đúng)
- [ ] Nút "I'll clean this" → nhận nhiệm vụ dọn dẹp
- [ ] Comments section: bình luận + ảnh cập nhật
- [ ] Share report (deep link)
- [ ] Report abuse button

---

## Module 3: Sự kiện & Tour du lịch xanh

### F3.1 — Danh sách sự kiện (Events)

| Field | Chi tiết |
|-------|---------|
| **Priority** | P0 — Critical |
| **Phase** | Phase 1 |
| **Status** | 🟢 UI hoàn chỉnh, mock data |

#### Mô tả
Trang liệt kê các sự kiện dọn rác, trồng cây sắp diễn ra. Lọc theo tab: Upcoming / Ongoing / Past.

#### User Stories
- US-3.1: Là người dùng, tôi muốn xem sự kiện gần tôi
- US-3.2: Là người dùng, tôi muốn đăng ký tham gia sự kiện
- US-3.3: Là tổ chức, tôi muốn tạo sự kiện mới

#### Acceptance Criteria
- [ ] Tab filter: Upcoming / Ongoing / Past
- [ ] Event card: ảnh, tiêu đề, ngày giờ, địa điểm, số người tham gia, tổ chức
- [ ] Search sự kiện theo tên, địa điểm
- [ ] Filter theo loại: Cleanup / Tree Planting / Beach Cleanup / Education
- [ ] Sort by: Date / Distance / Popularity
- [ ] Pull-to-refresh, infinite scroll pagination

#### Data Requirements
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  type: 'cleanup' | 'tree_planting' | 'beach_cleanup' | 'education' | 'tour';
  startDate: string;
  endDate: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  organizer: UserSummary;
  maxParticipants: number;
  currentParticipants: number;
  participants: UserSummary[];
  equipment: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  ecoPointsReward: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}
```

---

### F3.2 — Chi tiết sự kiện (Event Detail)

| Field | Chi tiết |
|-------|---------|
| **Priority** | P0 — Critical |
| **Phase** | Phase 1 |
| **Status** | 🟢 UI hoàn chỉnh, mock data |

#### Acceptance Criteria
- [ ] Cover image full-width + info overlay
- [ ] Organizer info (avatar, tên, rating)
- [ ] Mô tả chi tiết sự kiện
- [ ] Thời gian, địa điểm + bản đồ nhỏ
- [ ] Danh sách dụng cụ cần mang
- [ ] Danh sách người tham gia (avatar stack)
- [ ] Nút "Join Event" / "Leave Event"
- [ ] Chat nhóm sự kiện (preview + link)
- [ ] Share event (deep link)
- [ ] Nút "Get Directions" đến địa điểm

---

### F3.3 — Tour du lịch nhặt rác

| Field | Chi tiết |
|-------|---------|
| **Priority** | P1 — High |
| **Phase** | Phase 2 |
| **Status** | ❌ Chưa triển khai |

#### Mô tả
Tour là sự kiện đặc biệt gồm nhiều điểm dừng (stops) theo lộ trình. Mỗi stop có mục tiêu (nhặt X kg rác, trồng Y cây). Người tham gia check-in tại mỗi stop.

#### User Stories
- US-3.4: Là organizer, tôi muốn tạo tour với nhiều điểm dừng trên bản đồ
- US-3.5: Là người dùng, tôi muốn xem lộ trình tour trước khi đăng ký
- US-3.6: Là người dùng, tôi muốn check-in tại mỗi điểm dừng

#### Acceptance Criteria
- [ ] Tạo tour: tiêu đề, mô tả, ngày, số ngày
- [ ] Thêm stops: tên, vị trí GPS, mục tiêu, thứ tự
- [ ] Bản đồ hiển thị lộ trình nối các stops
- [ ] Estimated duration, distance giữa các stops
- [ ] Check-in tại stop (GPS verify trong bán kính 100m)
- [ ] Hoàn thành stop → +EcoPoints
- [ ] Hoàn thành toàn bộ tour → Badge đặc biệt
- [ ] Ảnh gallery cho mỗi stop (participants upload)

#### Data Requirements
```typescript
interface Tour extends Event {
  type: 'tour';
  stops: TourStop[];
  totalDistance: number; // km
  estimatedDuration: number; // hours
}

interface TourStop {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  order: number;
  goal: string; // "Collect 50kg plastic"
  photoUrls: string[];
  checkedInUsers: string[]; // userIds
}
```

---

## Module 4: Mạng xã hội xanh (Social)

### F4.1 — Newsfeed

| Field | Chi tiết |
|-------|---------|
| **Priority** | P1 — High |
| **Phase** | Phase 2 |
| **Status** | ❌ Chưa triển khai |

#### Mô tả
Newsfeed kiểu Instagram nhưng focus vào hoạt động môi trường. Hiển thị bài đăng của người dùng follow + trending.

#### User Stories
- US-4.1: Là người dùng, tôi muốn đăng bài ảnh/video hoạt động dọn rác
- US-4.2: Là người dùng, tôi muốn like, comment bài của bạn bè
- US-4.3: Là người dùng, tôi muốn follow người dùng khác
- US-4.4: Là người dùng, tôi muốn xem bài trending trong cộng đồng

#### Acceptance Criteria
- [ ] Tạo bài: ảnh (max 10) / video (max 60s) + caption + location tag
- [ ] Like (heart animation), comment, share
- [ ] Follow/unfollow user
- [ ] 2 tabs: Following (bài từ người follow) | Discover (trending)
- [ ] Hashtag support (#PlasticFree, #TreePlanting, #BeachCleanup)
- [ ] Tag users trong bài viết
- [ ] Report/block bài viết & người dùng
- [ ] Infinite scroll, pull-to-refresh
- [ ] Push notification khi có like/comment/follow

#### Data Requirements
```typescript
interface Post {
  id: string;
  author: UserSummary;
  content: string;
  mediaUrls: MediaItem[];
  location?: { address: string; lat: number; lng: number };
  hashtags: string[];
  taggedUsers: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  createdAt: string;
  relatedReport?: string; // link to waste report
  relatedEvent?: string;  // link to event
}

interface MediaItem {
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
  width: number;
  height: number;
}
```

---

### F4.2 — Chat / Messaging

| Field | Chi tiết |
|-------|---------|
| **Priority** | P2 — Medium |
| **Phase** | Phase 2 |
| **Status** | ❌ Chưa triển khai |

#### Mô tả
Hệ thống chat real-time cho: chat 1-1, chat nhóm sự kiện, chat trao đổi đồ.

#### Acceptance Criteria
- [ ] Chat 1-1 giữa 2 users
- [ ] Chat nhóm tự động cho mỗi event (participants only)
- [ ] Gửi text, ảnh, location
- [ ] Seen indicators, typing indicator
- [ ] Push notification cho tin nhắn mới
- [ ] Block/report user trong chat
- [ ] Chat history persistent

---

## Module 5: Gamification & Rewards

### F5.1 — EcoPoints System

| Field | Chi tiết |
|-------|---------|
| **Priority** | P1 — High |
| **Phase** | Phase 1 |
| **Status** | 🟡 UI hiển thị, chưa có logic backend |

#### Mô tả
Mọi hoạt động đều được ghi nhận bằng EcoPoints. Points dùng để lên level, đổi quà, xếp hạng.

#### Bảng điểm

| Hoạt động | Points |
|-----------|--------|
| Tạo waste report | +50 |
| Report được verified (5+ upvotes) | +30 bonus |
| Tham gia sự kiện | +100 |
| Hoàn thành sự kiện (check-out) | +200 |
| Hoàn thành tour (all stops) | +500 |
| Đăng bài social | +20 |
| Bài được 10+ likes | +15 bonus |
| Trao đổi đồ thành công | +30 |
| Daily login streak (7 ngày) | +50 bonus |
| Invite friend joined | +100 |

#### Level System

| Level | Points cần | Danh hiệu |
|-------|-----------|-----------|
| 1 | 0 | Eco Newbie |
| 2 | 200 | Green Starter |
| 3 | 500 | Eco Warrior |
| 4 | 1,200 | Nature Guardian |
| 5 | 2,500 | Earth Protector |
| 6 | 5,000 | Eco Champion |
| 7 | 10,000 | Planet Hero |
| 8 | 20,000 | Eco Legend |

---

### F5.2 — Badges / Huy hiệu

| Field | Chi tiết |
|-------|---------|
| **Priority** | P1 — High |
| **Phase** | Phase 1 |
| **Status** | 🟡 UI grid có, chưa có logic |

#### Mô tả
Huy hiệu unlock khi đạt milestone cụ thể. Hiển thị trong profile và được khoe trong social feed.

#### Danh sách Badges

| Badge | Điều kiện | Icon |
|-------|----------|------|
| First Report | Tạo report đầu tiên | 📸 |
| Reporter Pro | 50 reports | 📷 |
| Cleanup Rookie | Tham gia 1 sự kiện | 🧹 |
| Cleanup Veteran | Tham gia 20 sự kiện | 🏆 |
| Tree Hugger | Trồng 10 cây | 🌳 |
| Forest Maker | Trồng 100 cây | 🌲 |
| Tour Explorer | Hoàn thành 1 tour | 🗺️ |
| Globe Trotter | Hoàn thành 10 tours | 🌍 |
| Social Star | 100 followers | ⭐ |
| Eco Influencer | 1000 followers | 🌟 |
| Streak Master | 30 ngày liên tục | 🔥 |
| Generous Soul | Trao đổi 20 đồ | 🎁 |
| Community Leader | Tổ chức 5 sự kiện | 👑 |

---

### F5.3 — Leaderboard / Bảng xếp hạng

| Field | Chi tiết |
|-------|---------|
| **Priority** | P2 — Medium |
| **Phase** | Phase 2 |
| **Status** | ❌ Chưa triển khai |

#### Acceptance Criteria
- [ ] Tab: Weekly / Monthly / All-time
- [ ] Top 100 users (avatar, name, points, level)
- [ ] Highlight vị trí của user hiện tại
- [ ] Group leaderboard (tổ chức/nhóm)
- [ ] City/region leaderboard
- [ ] Animated rank changes (lên/xuống hạng)

---

### F5.4 — Reward Store / Đổi thưởng

| Field | Chi tiết |
|-------|---------|
| **Priority** | P2 — Medium |
| **Phase** | Phase 2 |
| **Status** | ❌ Chưa triển khai |

#### Mô tả
Người dùng đổi EcoPoints lấy quà tặng: voucher cây xanh, túi vải, bình nước, hoặc donate cho tổ chức.

#### Acceptance Criteria
- [ ] Danh sách rewards (ảnh, tên, điểm cần, còn lại bao nhiêu)
- [ ] Danh mục: Physical Goods / Digital / Donation
- [ ] Quy đổi: chọn reward → confirm → trừ points → nhận mã
- [ ] Lịch sử đổi thưởng
- [ ] Donation option: quy đổi points thành tiền donate cho NGO

---

## Module 6: Marketplace trao đổi đồ cũ

### F6.1 — Đăng & Tìm đồ trao đổi

| Field | Chi tiết |
|-------|---------|
| **Priority** | P2 — Medium |
| **Phase** | Phase 3 |
| **Status** | ❌ Chưa triển khai |

#### Mô tả
Marketplace cho phép tặng/đổi đồ không dùng nữa. Giảm rác thải bằng cách tái sử dụng.

#### User Stories
- US-6.1: Là người dùng, tôi muốn đăng đồ không dùng để tặng/đổi
- US-6.2: Là người dùng, tôi muốn tìm đồ cần gần tôi
- US-6.3: Là người dùng, tôi muốn chat với chủ đồ để thỏa thuận

#### Acceptance Criteria
- [ ] Đăng item: ảnh (max 5), tên, mô tả, category, condition, type (give/exchange)
- [ ] Categories: Clothing, Books, Electronics, Furniture, Kitchen, Sports, Other
- [ ] Condition: New / Like New / Good / Fair
- [ ] Browse: grid view, filter by category + distance + condition
- [ ] Search by keyword
- [ ] Item detail: ảnh gallery, info, owner profile, nút "Request"
- [ ] Request flow: gửi request → owner approve/reject → chat → giao dịch
- [ ] Mark as "Given" sau khi hoàn thành → +30 EcoPoints mỗi bên
- [ ] Đánh giá sau giao dịch (1-5 sao)

#### Data Requirements
```typescript
interface ExchangeItem {
  id: string;
  title: string;
  description: string;
  photoUrls: string[];
  category: 'clothing' | 'books' | 'electronics' | 'furniture' | 'kitchen' | 'sports' | 'other';
  condition: 'new' | 'like_new' | 'good' | 'fair';
  type: 'give' | 'exchange';
  exchangeFor?: string; // "Looking for a book bag"
  owner: UserSummary;
  location: { address: string; lat: number; lng: number };
  status: 'available' | 'reserved' | 'completed';
  createdAt: string;
  requestsCount: number;
}
```

---

## Module 7: Notifications

### F7.1 — Push Notifications

| Field | Chi tiết |
|-------|---------|
| **Priority** | P1 — High |
| **Phase** | Phase 1 |
| **Status** | ❌ Chưa triển khai |

#### Notification Types

| Type | Trigger | Message example |
|------|---------|----------------|
| `report_verified` | Report đạt 5 upvotes | "Your report was verified! +30 points" |
| `report_cleaned` | Report được đánh dấu cleaned | "Great news! The spot you reported is now clean!" |
| `event_reminder` | 24h trước sự kiện | "Beach Cleanup starts tomorrow at 8 AM" |
| `event_joined` | Có người join event bạn tổ chức | "Minh joined your cleanup event" |
| `badge_earned` | Unlock badge mới | "You earned the Cleanup Rookie badge! 🧹" |
| `level_up` | Lên level | "Congrats! You're now a Nature Guardian 🌿" |
| `new_follower` | Có người follow | "Linh started following you" |
| `post_liked` | Bài viết được like | "An and 5 others liked your post" |
| `new_message` | Tin nhắn mới | "Tuan: Are you coming to the event?" |
| `exchange_request` | Có người request đồ | "Hoa wants your 'Python Book'" |

#### Acceptance Criteria
- [ ] Expo Push Notifications setup (FCM + APNs)
- [ ] Notification center trong app (bell icon + badge count)
- [ ] Mark as read / mark all as read
- [ ] Deep link từ notification → đúng screen
- [ ] Settings: toggle on/off từng loại notification
- [ ] Quiet hours setting (22:00 - 07:00)
