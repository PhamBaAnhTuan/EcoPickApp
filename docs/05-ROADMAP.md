# EcoPick - Development Roadmap

## Tổng quan Timeline

```
Phase 1 (MVP)         Phase 2 (Social)       Phase 3 (Growth)       Phase 4 (Scale)
━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━
8 tuần                6 tuần                 6 tuần                 Ongoing

Auth + Map + Report   Social Feed + Chat     Marketplace + Tour     AI + Analytics
Events + Profile      Leaderboard + Rewards  Advanced Gamification  Scale & Optimize
Notifications         Follow System          Admin Dashboard        Monetization
```

---

## Phase 1: MVP Core (8 tuần)

> **Mục tiêu**: App hoạt động end-to-end — người dùng đăng ký, báo cáo rác, tham gia sự kiện, nhận điểm.

### Sprint 1-2: Foundation (Tuần 1-2)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| Setup NestJS project, PostgreSQL, Redis | P0 | 2d |
| Database migration (users, reports, events tables) | P0 | 2d |
| Auth module: register, login, JWT, refresh token | P0 | 3d |
| Google OAuth integration | P0 | 1d |
| Apple Sign-In integration | P0 | 1d |
| Email verification (OTP) | P1 | 1d |
| Forgot/reset password flow | P1 | 1d |
| Upload module: S3 presigned URLs | P0 | 1d |
| Image processing worker (resize, thumbnail) | P1 | 1d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Auth screens: Login, Register, Forgot Password, Verify Email | P0 | 3d |
| Auth state management (SecureStore for tokens) | P0 | 1d |
| Auto-login flow (check stored refresh token on launch) | P0 | 1d |
| Protected routes (redirect to login if not authenticated) | P0 | 1d |
| Splash screen → auth check → login or main tabs | P0 | 0.5d |
| API client setup (Axios/fetch with interceptors, auto-refresh) | P0 | 1d |

#### Deliverables
- [ ] User có thể đăng ký, đăng nhập, đăng xuất
- [ ] JWT auth hoạt động end-to-end
- [ ] Upload ảnh lên S3 thành công
- [ ] Protected API routes verify token

---

### Sprint 3-4: Map & Report (Tuần 3-4)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| Reports CRUD API | P0 | 2d |
| PostGIS nearby query (GET /reports/nearby) | P0 | 2d |
| Reverse geocoding (lat/lng → address) | P1 | 1d |
| Report photo management | P0 | 1d |
| Upvote/downvote report API | P1 | 0.5d |
| Report status workflow (reported → verified → cleaned) | P1 | 1d |
| Comments API (for reports) | P1 | 1d |
| Points system: earn points on report creation | P0 | 1d |
| Badge check worker (trigger after points change) | P1 | 1d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Connect Map screen to real API (replace mock data) | P0 | 2d |
| Report form → API upload flow (presigned URL → upload → create report) | P0 | 2d |
| Location Detail screen → real data | P0 | 1d |
| Upvote functionality | P1 | 0.5d |
| Comments section → real API | P1 | 1d |
| Offline report draft (queue for later sync) | P2 | 1.5d |
| Error handling & loading states cho map/report | P0 | 1d |
| Pull-to-refresh cho map markers | P1 | 0.5d |

#### Deliverables
- [ ] Bản đồ hiển thị reports thật từ database
- [ ] Chụp ảnh → upload → tạo report thành công
- [ ] Nearby query trả về reports trong bán kính
- [ ] Upvote, comment hoạt động
- [ ] Points tự động cộng khi tạo report

---

### Sprint 5-6: Events (Tuần 5-6)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| Events CRUD API | P0 | 2d |
| Event participants API (join, leave, list) | P0 | 1.5d |
| Event nearby query (PostGIS) | P0 | 1d |
| Event check-in API (GPS verification) | P1 | 1d |
| Points: earn on event join + completion | P0 | 0.5d |
| Event status auto-update (cron: upcoming → ongoing → completed) | P1 | 1d |
| Event cover image upload | P0 | 0.5d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Events list → real API | P0 | 1.5d |
| Event Detail → real data | P0 | 1d |
| Join/Leave event flow | P0 | 1d |
| Create event screen (for organizers) | P1 | 2d |
| Event check-in (GPS proximity check) | P1 | 1d |
| Event filter & search | P1 | 1d |

#### Deliverables
- [ ] Danh sách events từ API, filter theo status
- [ ] Join/leave event hoạt động
- [ ] Check-in tại event (GPS verify)
- [ ] Organizer có thể tạo event mới

---

### Sprint 7-8: Profile, Badges & Notifications (Tuần 7-8)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| User profile API (get, update, avatar upload) | P0 | 1.5d |
| User stats aggregation | P0 | 1d |
| Activity log API | P1 | 1d |
| Badges system: define all badges + unlock logic | P0 | 2d |
| Push notification infrastructure (FCM setup) | P0 | 2d |
| Notification API (list, read, unread count) | P0 | 1d |
| Notification triggers (report verified, badge earned, event reminder) | P1 | 2d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Profile screen → real API | P0 | 1d |
| Edit profile screen | P0 | 1d |
| Badges screen → real data (earned/locked) | P0 | 1.5d |
| Push notification setup (Expo Notifications) | P0 | 1d |
| Notification center screen (bell icon + list) | P0 | 1.5d |
| Deep linking from notifications | P1 | 1d |
| Settings screen (notification preferences) | P1 | 1d |

#### Deliverables
- [ ] Profile hiển thị dữ liệu thật, edit hoạt động
- [ ] Badges unlock khi đạt milestone
- [ ] Push notifications gửi đúng trigger
- [ ] Notification center hiển thị + đánh dấu đã đọc

---

### Phase 1 — Tổng kết MVP

#### Acceptance Criteria
- [ ] Auth: đăng ký/đăng nhập/đăng xuất/reset password
- [ ] Map: hiển thị reports thật, filter, nearby, directions
- [ ] Report: chụp ảnh → upload → tạo report → nhận điểm
- [ ] Events: browse, join, check-in, tạo (organizer)
- [ ] Profile: xem/sửa profile, badges, activity log
- [ ] Notifications: push + in-app notification center
- [ ] Points: tự động cộng/trừ cho mọi hoạt động
- [ ] Offline: report draft lưu local
- [ ] Performance: API < 500ms, app load < 2s

#### Tech Debt cần clear
- [ ] Unit tests cho backend (>80% coverage cho auth, reports)
- [ ] E2E tests cho critical flows (register → login → report → submit)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Error monitoring (Sentry)
- [ ] CI/CD pipeline

---

## Phase 2: Social & Engagement (6 tuần)

> **Mục tiêu**: Biến app thành mạng xã hội xanh — follow, feed, chat, bảng xếp hạng.

### Sprint 9-10: Social Feed (Tuần 9-10)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| Posts CRUD API | P0 | 2d |
| Post media (multi-image, video) | P0 | 1.5d |
| Like/unlike API | P0 | 0.5d |
| Comments on posts API | P0 | 1d |
| Follow/unfollow API + follower/following count | P0 | 1.5d |
| Feed algorithm: Following feed (chronological) | P0 | 1.5d |
| Feed algorithm: Discover feed (trending by likes/recency) | P1 | 2d |
| Hashtag indexing + trending hashtags | P1 | 1d |
| Auto-post: when user creates report or joins event | P2 | 1d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Feed screen (Following + Discover tabs) | P0 | 3d |
| Post card component (ảnh carousel, like, comment, share) | P0 | 2d |
| Create post screen | P0 | 2d |
| Like animation (heart burst) | P1 | 0.5d |
| Comments bottom sheet | P0 | 1d |
| User profile → follow/unfollow button | P0 | 0.5d |
| Follower/following list screens | P1 | 1d |
| Hashtag search + trending | P1 | 1d |

#### Deliverables
- [ ] Feed hiển thị bài từ người follow
- [ ] Discover tab hiển thị trending posts
- [ ] Create post với ảnh/video + caption
- [ ] Like, comment, share hoạt động
- [ ] Follow/unfollow, follower/following list

---

### Sprint 11-12: Chat & Leaderboard (Tuần 11-12)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| WebSocket server (Socket.IO) | P0 | 2d |
| Conversations API (list, create DM, get messages) | P0 | 2d |
| Auto-create group chat khi event created | P1 | 1d |
| Message persistence + pagination | P0 | 1d |
| Read receipts + typing indicators | P2 | 1d |
| Leaderboard API (Redis sorted set) | P1 | 1.5d |
| Leaderboard: weekly/monthly/all-time + by city | P1 | 1d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Conversations list screen | P0 | 1.5d |
| Chat room screen (messages, input, send photo) | P0 | 3d |
| Event group chat integration | P1 | 1d |
| Typing indicator, read receipts UI | P2 | 1d |
| Leaderboard screen (tabs, rank list, highlight current user) | P1 | 2d |

#### Deliverables
- [ ] Chat 1-1 hoạt động real-time
- [ ] Group chat cho mỗi event
- [ ] Leaderboard weekly/monthly/all-time
- [ ] Rank animation khi lên/xuống hạng

---

### Sprint 13-14: Reward Store & Polish (Tuần 13-14)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| Rewards catalog API | P1 | 1d |
| Redeem reward API (deduct points, create order) | P1 | 1.5d |
| Redemption history API | P1 | 0.5d |
| Daily challenges system | P2 | 2d |
| Login streak tracking | P2 | 1d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Reward store screen (catalog grid, points balance) | P1 | 2d |
| Redeem flow (confirm dialog, animation, success) | P1 | 1.5d |
| Redemption history | P1 | 1d |
| Daily challenges card (on feed or profile) | P2 | 1.5d |
| Polish: loading skeletons, error states, empty states cho all screens | P0 | 2d |
| Polish: animations, transitions, haptics | P1 | 1.5d |

#### Deliverables
- [ ] Reward store với catalog thật
- [ ] Đổi điểm lấy reward thành công
- [ ] Daily challenges hiển thị + hoàn thành
- [ ] Toàn app polish (skeleton, error, empty states)

---

## Phase 3: Growth Features (6 tuần)

> **Mục tiêu**: Marketplace trao đổi đồ, tour du lịch xanh, AI features, admin dashboard.

### Sprint 15-16: Marketplace / Exchange (Tuần 15-16)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| Exchange items CRUD API | P1 | 2d |
| Nearby items (PostGIS) | P1 | 1d |
| Request/approve/reject flow | P1 | 2d |
| Transaction completion + points | P1 | 1d |
| Rating system after transaction | P2 | 1.5d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Exchange browse screen (grid, filter, search) | P1 | 2.5d |
| Item detail screen | P1 | 1.5d |
| Create listing screen (photos, details, category) | P1 | 2d |
| Request flow UI (send, manage incoming requests) | P1 | 2d |
| Rating dialog after transaction | P2 | 1d |

#### Deliverables
- [ ] Đăng đồ trao đổi/tặng thành công
- [ ] Browse items theo category, distance
- [ ] Request flow hoạt động end-to-end
- [ ] Rating sau giao dịch

---

### Sprint 17-18: Tour System (Tuần 17-18)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| Tour stops CRUD (sub-resource of events) | P1 | 1.5d |
| Stop check-in API (GPS proximity 100m) | P1 | 1.5d |
| Tour progress tracking | P1 | 1d |
| Tour completion logic + bonus badge | P1 | 1d |
| Route calculation between stops | P2 | 1d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| Tour detail screen (map + stops) | P1 | 3d |
| Stop check-in UI (proximity indicator, check-in button) | P1 | 2d |
| Tour progress bar / stepper | P1 | 1d |
| Create tour screen (for organizers) — add stops on map | P1 | 3d |

#### Deliverables
- [ ] Tour hiển thị lộ trình + stops trên map
- [ ] Check-in tại mỗi stop (GPS verify)
- [ ] Hoàn thành tour → bonus badge + points
- [ ] Organizer tạo tour với nhiều stops

---

### Sprint 19-20: AI & Admin (Tuần 19-20)

#### Backend
| Task | Priority | Effort |
|------|----------|--------|
| AI waste classification (TensorFlow Serving / Google Vision API) | P2 | 3d |
| Admin API: user management, content moderation | P1 | 2d |
| Analytics API: impact dashboard data | P1 | 2d |
| Report export (PDF/CSV) | P2 | 1.5d |
| Content moderation: auto-flag inappropriate images | P2 | 2d |

#### Frontend
| Task | Priority | Effort |
|------|----------|--------|
| AI auto-detect: khi chụp ảnh → suggest waste types | P2 | 2d |
| Admin web dashboard (React) — user management | P1 | 3d |
| Admin dashboard — reports moderation | P1 | 2d |
| Admin dashboard — analytics charts | P1 | 2d |
| Impact report screen (personal stats visualization) | P2 | 2d |

#### Deliverables
- [ ] AI suggest loại rác từ ảnh (>80% accuracy)
- [ ] Admin dashboard quản lý users, reports, events
- [ ] Impact analytics visualization

---

## Phase 4: Scale & Optimize (Ongoing)

> **Mục tiêu**: Tối ưu hiệu năng, mở rộng quy mô, thêm tính năng nâng cao.

### Optimization
| Task | Priority |
|------|----------|
| Database query optimization (explain analyze, indexes) | P0 |
| API caching strategy (Redis, CDN) | P0 |
| Image optimization pipeline (WebP, lazy loading) | P1 |
| App bundle size optimization (code splitting) | P1 |
| Offline-first architecture (local DB sync) | P2 |

### Scale
| Task | Priority |
|------|----------|
| Horizontal scaling (load balancer, multiple instances) | P0 |
| Database read replicas | P1 |
| CDN for all static assets | P0 |
| Monitoring & alerting (Grafana, Prometheus) | P0 |
| Automated backups & disaster recovery | P0 |

### Advanced Features
| Task | Priority |
|------|----------|
| Multi-language support (i18n: Vietnamese, English) | P1 |
| Dark mode | P2 |
| Widget (iOS/Android) — nearby reports count | P2 |
| Apple Watch / WearOS companion app | P3 |
| AR mode — point camera at trash → info overlay | P3 |
| Carbon footprint calculator | P2 |
| Integration with government waste management APIs | P2 |
| Sponsor/partner portal | P2 |

---

## Tổng kết Resource Estimation

### Team Composition đề xuất

| Role | Số người | Phase |
|------|----------|-------|
| Backend Developer (Node.js/NestJS) | 1-2 | All |
| Mobile Developer (React Native) | 1-2 | All |
| UI/UX Designer | 1 | Phase 1-2 |
| DevOps / Infra | 0.5 (part-time) | All |
| QA / Tester | 0.5 (part-time) | Phase 1+ |
| Product Manager | 1 | All |

### Timeline tổng

| Phase | Duration | Cumulative |
|-------|----------|-----------|
| Phase 1 — MVP | 8 tuần | 8 tuần |
| Phase 2 — Social | 6 tuần | 14 tuần |
| Phase 3 — Growth | 6 tuần | 20 tuần |
| Phase 4 — Scale | Ongoing | — |

### Cost Estimation (Infrastructure — Phase 1)

| Service | Monthly Cost (Est.) |
|---------|-------------------|
| Railway/Render (API server) | $20-50 |
| PostgreSQL (managed) | $15-30 |
| Redis (managed) | $10-20 |
| S3/R2 storage (50GB) | $5-10 |
| CDN (Cloudflare) | Free-$20 |
| FCM (Push notifications) | Free |
| Domain + SSL | $15/year |
| **Total Phase 1** | **~$65-130/month** |

### Cost at Scale (Phase 3+, 50K users)

| Service | Monthly Cost (Est.) |
|---------|-------------------|
| API servers (2-3 instances) | $100-200 |
| PostgreSQL (bigger instance + replica) | $50-100 |
| Redis | $30-50 |
| S3/R2 (500GB + bandwidth) | $30-50 |
| CDN | $20-50 |
| Search (Meilisearch) | $30 |
| Monitoring (Sentry, logs) | $30-50 |
| **Total at Scale** | **~$290-530/month** |

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|------------|------------|
| Low user adoption | High | Medium | Focus on UX, gamification, local communities |
| Content moderation challenges | Medium | High | AI auto-flag + community reporting + manual review |
| Scale issues with PostGIS queries | Medium | Low | Proper indexing, caching, pagination |
| Photo storage costs | Medium | Medium | Image compression, lifecycle policies, CDN caching |
| Real-time chat scaling | Low | Medium | Redis pub/sub, WebSocket clustering |
| API abuse / spam reports | Medium | Medium | Rate limiting, captcha, user reputation system |
| Data privacy concerns | High | Low | GDPR compliance, encryption, clear privacy policy |
