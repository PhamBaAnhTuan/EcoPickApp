# EcoPick - Screen Documentation

> Tài liệu mô tả chi tiết từng màn hình trong app, bao gồm UI elements, user flow, và trạng thái hiện tại.

---

## Sơ đồ Navigation tổng quan

```
App Launch
  └─ Splash Screen (2.5s)
       └─ Auth Check
            ├─ NOT logged in → Auth Flow
            │    ├─ Login Screen
            │    ├─ Register Screen
            │    ├─ Forgot Password
            │    └─ Verify Email
            │
            └─ Logged in → Main Tabs
                 ├─ Tab 1: Map/Explore
                 │    └─ Location Detail (modal)
                 ├─ Tab 2: Events
                 │    └─ Event Detail (card)
                 ├─ Tab 3: Report (FAB → Camera)
                 │    ├─ Report Form
                 │    └─ Report Success
                 ├─ Tab 4: Badges
                 └─ Tab 5: Profile
                      └─ Settings
                      └─ Edit Profile

Future Screens:
  ├─ Social Feed (new tab or replace)
  ├─ Chat / Messages
  ├─ Marketplace (Exchange)
  ├─ Tour Detail
  ├─ Leaderboard
  ├─ Reward Store
  └─ Notification Center
```

---

## Screen 1: Splash Screen

| | |
|---|---|
| **File** | `app/splash.tsx` |
| **Status** | 🟢 Hoàn thành |
| **Phase** | Phase 1 |

### UI Elements
- Nền: `rgba(32, 105, 58, 0.2)` — xanh lá nhạt
- Logo EcoPick: 195×264px, centered cả ngang lẫn dọc
- StatusBar: dark style

### Animation Flow
1. **0ms** — Logo opacity 0, scale 0.6, translateY +20
2. **0-800ms** — Fade in (opacity → 1), spring scale (→ 1.0), slide up (→ 0)
3. **800-2200ms** — Hold hiển thị logo
4. **2200-2500ms** — Fade out (opacity → 0), scale up (→ 1.1)
5. **2500ms** — `router.replace('/(tabs)/map')` → chuyển vào app

### User Flow
```
App mở → Native splash (app.json) → Custom splash animation → Main app
```

---

## Screen 2: Login (Chưa triển khai)

| | |
|---|---|
| **File** | `app/auth/login.tsx` (planned) |
| **Status** | ❌ Chưa triển khai |
| **Phase** | Phase 1 |

### UI Elements (Planned)
- App logo nhỏ ở trên
- Welcome text: "Welcome back to EcoPick"
- Email input field
- Password input field (toggle show/hide)
- "Forgot password?" link
- Login button (primary green)
- Divider: "or continue with"
- Google Sign-In button
- Apple Sign-In button (iOS only)
- Footer: "Don't have an account? Sign Up" link

### User Flow
```
Nhập email + password → Tap Login → Loading → Validate
  ├─ Success → Navigate to Main Tabs
  ├─ Wrong credentials → Error message "Invalid email or password"
  └─ Network error → Error message "Check your connection"
```

---

## Screen 3: Register (Chưa triển khai)

| | |
|---|---|
| **File** | `app/auth/register.tsx` (planned) |
| **Status** | ❌ Chưa triển khai |
| **Phase** | Phase 1 |

### UI Elements (Planned)
- Header: "Create Account"
- Full name input
- Email input
- Password input (strength indicator)
- Confirm password input
- Checkbox: Agree to Terms & Privacy Policy
- Register button
- Footer: "Already have an account? Sign In" link

### Validation Rules
- Name: 2-50 characters, letters & spaces only
- Email: valid format, unique in system
- Password: min 8 chars, 1 uppercase, 1 number, 1 special char
- Passwords must match

---

## Screen 4: Map / Explore

| | |
|---|---|
| **File** | `app/(tabs)/map.tsx` |
| **Status** | 🟢 UI hoàn chỉnh, mock data |
| **Phase** | Phase 1 |

### UI Elements
- **Google Map** — full screen, custom styled
- **Search Bar** — top, icon search + text input + filter icon
- **Filter Chips** — horizontal scroll: All / Light / Medium / Heavy / Extreme
  - Each chip color-coded theo severity
  - Active chip: filled background
- **Map Markers** — custom markers color-coded:
  - Light: `#16A34A` (green dot)
  - Medium: `#EAB308` (yellow dot)
  - Heavy: `#DC2626` (red dot)
  - Extreme: `#9333EA` (purple dot)
- **Bottom Sheet** — snap khi tap marker:
  - Ảnh thumbnail
  - Waste types pills
  - Severity badge
  - Distance + reported time
  - "View Details" → Location Detail
  - "Get Directions" → vẽ route trên map
- **My Location Button** — bottom-right, di chuyển về vị trí GPS

### Data Hiện tại (Mock)
- 12 waste reports hardcoded
- Vị trí: TP. HCM area
- Severity phân bố đều

### User Flow
```
Mở tab Map → Load markers → Scroll/Zoom map
  ├─ Tap marker → Bottom sheet preview
  │    ├─ "View Details" → Location Detail (modal)
  │    └─ "Get Directions" → Route overlay trên map
  ├─ Tap filter chip → Filter markers theo severity
  ├─ Tap search → Keyboard + autocomplete (planned)
  └─ Tap My Location → Animate về GPS position
```

---

## Screen 5: Report Form

| | |
|---|---|
| **File** | `app/(tabs)/report.tsx` |
| **Status** | 🟢 UI hoàn chỉnh + animation |
| **Phase** | Phase 1 |

### UI Elements
- **Photo Section** (top 42% màn hình):
  - Captured photo preview (full bleed)
  - Animated scale khi drag sheet xuống (1x → 1.12x spring)
  - `overflow: hidden` clip ảnh khi scale
- **Retake Button** — pill button, góc phải của ảnh, z-index 15
  - Icon refresh + "Retake" text
  - Fixed position, không scale theo animation
- **Header** — floating trên ảnh:
  - Back button (circle, translucent white)
  - Title "Review Report"
- **Sheet** (bắt đầu ở 34% height, animated translateY):
  - **Drag Handle** — 48×5px pill, gesture target
  - **Location Section**: icon + "Detected Location" label + address (auto from GPS)
  - **Severity Slider**: native slider 0-1, label badge (Minor/Light/Moderate/Heavy/Extreme)
  - **Waste Types**: multi-select chips (Plastic, Paper, Glass, Organic, Metal)
  - **Additional Notes**: TextInput multiline, rounded border, optional
- **Submit Button** — fixed bottom, full-width green button
  - Icon cloud-upload + "SUBMIT REPORT"
  - Disabled state (gray) khi chưa có ảnh
  - Safe area padding (iOS 34px, Android 24px)

### Animation
- **Drag handle kéo xuống** → sheet translateY (max 100px) + photo scale up (1 → 1.12)
- **Thả ra** → spring back (damping: 18, stiffness: 220, mass: 0.8)
- Gesture chỉ attach vào drag handle, ScrollView bên trong vẫn scroll bình thường

### User Flow
```
Tab Report tap → Camera mở → Chụp ảnh → Navigate đến report form
  ├─ Tap Retake → Camera mở lại
  ├─ Adjust severity slider
  ├─ Select waste types (min 1)
  ├─ Optional: thêm notes
  ├─ Tap Submit → API call → Navigate Report Success
  └─ Tap Back → Quay lại tab trước
```

---

## Screen 6: Report Success

| | |
|---|---|
| **File** | `app/report-success.tsx` |
| **Status** | 🟢 Hoàn chỉnh |
| **Phase** | Phase 1 |

### UI Elements
- Background gradient xanh lá
- Animated checkmark icon (scale + bounce)
- Title: "Report Submitted!"
- Subtitle: "Thank you for helping keep our planet clean"
- Points earned card: "+50 EcoPoints"
- "Back to Map" button → navigate về tab Map

---

## Screen 7: Location Detail

| | |
|---|---|
| **File** | `app/location/[id].tsx` |
| **Status** | 🟢 UI hoàn chỉnh, mock data |
| **Phase** | Phase 1 |
| **Presentation** | Full screen modal |

### UI Elements
- **Header Image** — ảnh rác full-width, gradient overlay
- **Back button** + **Share button** trên header
- **Info Card**:
  - Severity badge (color-coded)
  - Waste type pills
  - Address + distance
  - Reported by: avatar + name + time ago
- **Status Timeline**:
  - Reported ✅ → Verified → In Progress → Cleaned
  - Mỗi step: icon + label + timestamp
- **Action Buttons**:
  - "Upvote" (verify) — heart icon + count
  - "I'll Clean This" — nhận task dọn dẹp
  - "Get Directions" — mở navigation
- **Comments Section**:
  - Comment list (avatar, name, text, time)
  - Comment input (bottom fixed)
- **Report Actions**: "Report Abuse" (flag inappropriate)

---

## Screen 8: Events List

| | |
|---|---|
| **File** | `app/(tabs)/events.tsx` |
| **Status** | 🟢 UI hoàn chỉnh, mock data |
| **Phase** | Phase 1 |

### UI Elements
- **Header**: "Events" title
- **Tab Filter**: Upcoming / Ongoing / Past (horizontal tabs)
- **Event Cards** (vertical scroll):
  - Cover image (rounded corners)
  - Event type badge (Cleanup / Tree Planting / Beach)
  - Title (bold)
  - Date + time icon
  - Location + distance icon
  - Participant avatars (stack, max 3 + "+X")
  - Organizer name
  - EcoPoints reward badge

### Data Hiện tại (Mock)
- 3 events: Beach Cleanup, Tree Planting, City Cleanup
- Fake participant data

---

## Screen 9: Event Detail

| | |
|---|---|
| **File** | `app/events/[id].tsx` |
| **Status** | 🟢 UI hoàn chỉnh, mock data |
| **Presentation** | Card modal |

### UI Elements
- **Cover Image** — full width + gradient
- **Back button** + **Share button**
- **Event Info**:
  - Type badge
  - Title (large bold)
  - Date, time, duration
  - Location + mini map
  - Organizer card (avatar, name, organized X events)
- **Description** — markdown-ready text
- **Equipment List** — checklist items (what to bring)
- **Participants** — avatar grid/list, "X going"
- **Chat Preview** — last 2 messages từ group chat
- **Action**: "Join Event" button (fixed bottom, green)
  - Đã join → "Leave Event" (outline red)

---

## Screen 10: Profile

| | |
|---|---|
| **File** | `app/(tabs)/profile.tsx` |
| **Status** | 🟢 UI hoàn chỉnh, mock data |
| **Phase** | Phase 1 |

### UI Elements
- **Profile Header**:
  - Avatar (large, circular)
  - Full name + @username
  - Bio text
  - Level badge: "Eco Warrior — Level 3"
  - Edit Profile button (outline)
- **Stats Row**: 4 cards
  - Reports: icon + count
  - Events: icon + count
  - Trees: icon + count
  - EcoPoints: icon + count
- **Badges Section**: horizontal scroll of earned badges (icon + name)
- **Activity Timeline**: vertical list
  - "Created a report — 2h ago"
  - "Joined Beach Cleanup — Yesterday"
  - "Earned Tree Hugger badge — 3 days ago"
- **Settings** link → Settings screen

---

## Screen 11: Badges

| | |
|---|---|
| **File** | `app/(tabs)/badges.tsx` |
| **Status** | 🟡 Placeholder/basic UI |
| **Phase** | Phase 1 |

### UI Elements (Planned full version)
- **Header**: "Badges" + "X/Y earned" count
- **Badge Grid**: 3 columns
  - Earned: full color icon + name + date earned
  - Locked: grayscale icon + name + progress bar + "X more to unlock"
- **Badge Detail Modal** (tap badge):
  - Large icon
  - Name + description
  - Progress: "15/20 reports" progress bar
  - Date earned (if earned)
  - Share button

---

## Screens Planned (Chưa triển khai)

### Screen 12: Social Feed
- **File**: `app/(tabs)/feed.tsx` hoặc thay thế 1 tab
- **Phase**: Phase 2
- 2 tabs: Following | Discover
- Post cards: ảnh/video + caption + like/comment/share
- Create post FAB button

### Screen 13: Chat / Messages
- **File**: `app/chat/index.tsx`, `app/chat/[id].tsx`
- **Phase**: Phase 2
- Conversation list (avatar, last message, time, unread badge)
- Chat room: messages bubble, input bar, send photo

### Screen 14: Marketplace (Exchange)
- **File**: `app/(tabs)/exchange.tsx` hoặc `app/exchange/`
- **Phase**: Phase 3
- Grid of items (photo, title, condition, distance)
- Item detail screen
- Request flow

### Screen 15: Tour Detail
- **File**: `app/tour/[id].tsx`
- **Phase**: Phase 2
- Map with stops connected by route
- Stop cards with goals
- Check-in button at each stop

### Screen 16: Leaderboard
- **File**: `app/leaderboard.tsx`
- **Phase**: Phase 2
- Tab: Weekly / Monthly / All-time
- Rank list with avatar, name, points
- Highlight current user position

### Screen 17: Reward Store
- **File**: `app/rewards.tsx`
- **Phase**: Phase 2
- Reward cards grid
- Points balance header
- Redemption flow

### Screen 18: Notification Center
- **File**: `app/notifications.tsx`
- **Phase**: Phase 1
- Notification list (grouped by today/earlier)
- Unread indicator dot
- Deep link on tap

### Screen 19: Settings
- **File**: `app/settings.tsx`
- **Phase**: Phase 1
- Sections: Account, Notifications, Privacy, Language, About
- Toggle switches for notification types
- Logout button, Delete account

---

## Tab Bar Configuration

| Tab | Icon | Screen | Đặc biệt |
|-----|------|--------|-----------|
| Explore | `compass` / `compass-outline` | Map | Default tab |
| Events | `calendar` / `calendar-outline` | Events | — |
| Report | `camera-outline` | Report | Floating action button (orange circle), mở camera on tap, tab bar hidden khi ở report |
| Badges | `trophy` / `trophy-outline` | Badges | — |
| Profile | `person` / `person-outline` | Profile | — |

### Tab Bar Style
- Height: iOS 85px, Android 70px
- Rounded top corners (24px)
- Background: `rgba(255, 255, 255, 0.95)`
- Shadow: strong drop shadow
- Position: absolute bottom
- Hidden on: Report screen
