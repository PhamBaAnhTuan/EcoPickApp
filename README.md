# EcoPick 🌿

> **Pick up trash. Plant trees. Earn rewards. Save the planet.**

EcoPick is a green social network mobile app that connects environmental volunteers. Users can report waste pollution spots, organize/join cleanup events & eco-tours, share environmental activities, and redeem eco-points for green rewards.

---

## Table of Contents

- [Core Business Features](#core-business-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Domain Model](#domain-model)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Backend Configuration](#backend-configuration)
- [Running the App](#running-the-app)
- [Building the APK / AAB](#building-the-apk--aab)
- [CI/CD Pipeline](#cicd-pipeline)
- [Release Checklist](#release-checklist)
- [API Contract](#api-contract)
- [Data Flow](#data-flow)
- [Common Errors & Troubleshooting](#common-errors--troubleshooting)
- [Documentation Index](#documentation-index)
- [Contributing](#contributing)
- [License](#license)

---

## Core Business Features

| Module | Description | Status |
|--------|-------------|--------|
| **Waste Report & Map** | Report pollution spots with photos + GPS, view on interactive map with severity filters | ✅ UI Complete |
| **Events** | Browse, join, and check-in to cleanup/tree-planting events | ✅ UI Complete |
| **User Profile & Badges** | Profile with stats, EcoPoints system, badge achievements | ✅ UI Complete |
| **Authentication** | Email/password + Google/Apple OAuth, JWT-based sessions | 🟡 In Progress |
| **Notifications** | Push notifications (FCM) + in-app notification center | ❌ Planned |
| **Social Feed** | Instagram-like green feed with posts, likes, comments, follows | ❌ Planned (Phase 2) |
| **Chat** | Real-time 1-1 and event group chat via WebSocket | ❌ Planned (Phase 2) |
| **Marketplace** | Give/exchange used items to reduce waste | ❌ Planned (Phase 3) |
| **Eco-Tours** | Multi-stop cleanup tours with GPS check-in at each stop | ❌ Planned (Phase 3) |
| **Gamification** | EcoPoints, Leaderboard, Daily Challenges, Reward Store | 🟡 Partial |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Mobile App (Expo/React Native)            │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ REST API │ │ WebSocket│ │   Push   │ │  S3 Direct   │   │
│  │ (HTTPS)  │ │  (WSS)   │ │  (FCM)   │ │  Upload      │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘   │
└───────┼─────────────┼───────────┼───────────────┼───────────┘
        │             │           │               │
┌───────▼─────────────▼───────────▼───────────────▼───────────┐
│               API Gateway / Load Balancer                    │
│               (Rate Limiting, CORS, Auth)                    │
└───────┬─────────────┬───────────┬───────────────┬───────────┘
        │             │           │               │
┌───────▼──────┐ ┌────▼─────┐ ┌──▼──────┐ ┌──────▼──────────┐
│  API Server  │ │ WebSocket│ │  Worker  │ │  S3 / R2        │
│  (NestJS)    │ │  Server  │ │  Queue   │ │  Object Storage │
│              │ │(Socket.IO)│ │(BullMQ)  │ │                 │
└───────┬──────┘ └────┬─────┘ └──┬──────┘ └─────────────────┘
        │             │          │
┌───────▼─────────────▼──────────▼────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────┐  ┌──────────┐  ┌────────────────────┐     │
│  │ PostgreSQL   │  │  Redis   │  │ Meilisearch        │     │
│  │ + PostGIS    │  │  Cache   │  │ (Full-text Search)  │     │
│  └──────────────┘  └──────────┘  └────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Decisions

- **Expo SDK 54** with file-based routing via `expo-router`
- **State management**: Zustand (global auth/map state) + React Query (server state & caching)
- **API client**: Axios with interceptors for auto-attach JWT token & auto-logout on 401
- **Maps**: `expo-maps` + `react-native-maps` with Google Maps tiles
- **i18n**: `react-i18next` with Vietnamese (default) and English
- **Forms**: `react-hook-form` + `zod` validation

---

## Tech Stack

### Mobile (Frontend)

| Technology | Purpose |
|-----------|---------|
| React Native 0.81 | Cross-platform mobile framework |
| Expo SDK 54 | Build toolchain, native modules, OTA updates |
| expo-router 6 | File-based navigation |
| TypeScript 5.9 | Type safety |
| Zustand 5 | Lightweight state management (auth, map) |
| React Query 5 | Server-state caching, data fetching |
| Axios | HTTP client with interceptors |
| react-hook-form + Zod | Form management & validation |
| react-i18next | Internationalization (vi/en) |
| expo-maps / react-native-maps | Map rendering |
| expo-image / expo-image-picker | Image display & camera access |
| @gorhom/bottom-sheet | Bottom sheet interactions |
| react-native-reanimated | Performant animations |
| dayjs | Date formatting |

### Backend (Planned / External)

| Technology | Purpose |
|-----------|---------|
| Node.js 20 LTS + NestJS | REST API server |
| PostgreSQL 16 + PostGIS | Relational DB + geospatial queries |
| Redis | Caching, sessions, leaderboard |
| AWS S3 / Cloudflare R2 | Photo & media storage |
| Socket.IO | Real-time chat & notifications |
| Firebase Cloud Messaging | Push notifications |
| BullMQ | Background job queue |

---

## Domain Model

```
┌──────────┐       ┌──────────────┐       ┌────────────┐
│  User    │──1:N──│ WasteReport  │──1:N──│ ReportPhoto│
│          │       │              │       └────────────┘
│ id       │       │ id           │
│ email    │       │ user_id (FK) │       ┌────────────┐
│ username │       │ lat/lng      │──1:N──│  Comment   │
│ role     │       │ severity     │       └────────────┘
│ eco_pts  │       │ waste_types  │
│ level    │       │ status       │
└──────┬───┘       └──────────────┘
       │
       ├──1:N──┌──────────┐       ┌───────────────┐
       │       │  Event   │──1:N──│  TourStop     │
       │       │          │       └───────────────┘
       │       │ id       │
       │       │ org_id   │       ┌───────────────────┐
       │       │ type     │──N:M──│ EventParticipant  │
       │       │ lat/lng  │       └───────────────────┘
       │       └──────────┘
       │
       ├──1:N──┌──────────┐       ┌────────────┐
       │       │  Post    │──1:N──│ PostMedia   │
       │       └──────────┘       └────────────┘
       │
       ├──1:N──┌──────────────┐
       │       │ExchangeItem  │
       │       └──────────────┘
       │
       ├──N:M──┌──────────┐
       │       │ Follow   │
       │       └──────────┘
       │
       └──1:N──┌──────────────┐
               │ Notification │
               └──────────────┘
```

### Key Entities

| Entity | Description |
|--------|-------------|
| **User** | App user with role (`user`, `organizer`, `moderator`, `admin`), eco-points, level |
| **WasteReport** | A reported pollution spot with GPS coordinates, severity, waste types, status workflow |
| **Event** | Cleanup/tree-planting/tour event with location, participants, and EcoPoints reward |
| **Post** | Social feed post with media, likes, comments, hashtags |
| **ExchangeItem** | Item listed for give-away or exchange in the marketplace |
| **Badge** | Achievement unlocked at specific milestones |

### Report Status Workflow

```
Reported → Verified (5+ upvotes) → In Progress (claimed) → Cleaned
```

---

## Project Structure

```
ecopick/
├── src/
│   ├── app/                  # Expo Router screens (file-based routing)
│   │   ├── (tabs)/           # Bottom tab screens (map, events, report, badges, profile)
│   │   ├── auth/             # Authentication screens
│   │   ├── events/           # Event detail screen
│   │   ├── location/         # Location detail screen
│   │   ├── badges/           # Badge detail screen
│   │   ├── profile/          # Profile sub-screens
│   │   ├── _layout.tsx       # Root layout with auth guard
│   │   ├── splash.tsx        # Custom splash screen
│   │   ├── onboarding.tsx    # Onboarding flow
│   │   ├── settings.tsx      # App settings
│   │   └── report-success.tsx
│   ├── api/                  # API layer
│   │   ├── endpoints.ts      # API endpoint constants
│   │   ├── queryKeys.ts      # React Query key factories
│   │   ├── index.ts          # API hooks barrel export
│   │   └── services/         # API service functions
│   ├── components/           # Reusable UI components
│   ├── screens/              # Screen-specific components (extracted from app/)
│   ├── stores/               # Zustand stores
│   │   ├── authStore.ts      # Authentication state (token, user, login/logout)
│   │   ├── mapStore.ts       # Map state (selected filters, selected marker)
│   │   └── commonStore.ts    # Shared app state
│   ├── lib/
│   │   └── axios.ts          # Axios instance with auth interceptors
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── constants/            # App constants, colors, config
│   ├── i18n/                 # Localization (vi, en)
│   ├── data/                 # Mock data (to be replaced by API)
│   └── assets/               # Images, fonts, icons
├── docs/                     # Product & technical documentation
├── .github/workflows/        # CI/CD (build-and-release.yml)
├── app.json                  # Expo app configuration
├── eas.json                  # EAS Build profiles
├── .env.example              # Environment variable template
├── package.json
└── tsconfig.json
```

---

## Prerequisites

Before you start, make sure you have:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| **Node.js** | 20 LTS | `node --version` |
| **npm** | ≥ 9 | `npm --version` |
| **Expo CLI** | Latest | `npx expo --version` |
| **EAS CLI** | ≥ 18.3.0 | `npx eas --version` |
| **Git** | Latest | `git --version` |
| **Android Studio** | Latest (for emulator) | — |
| **Xcode** | 15+ (macOS only, for iOS) | `xcodebuild -version` |
| **Java JDK** | 17 (for local Android build) | `java -version` |

### Required Accounts

| Account | Purpose | URL |
|---------|---------|-----|
| **Expo** | EAS builds, OTA updates | https://expo.dev |
| **Google Cloud** | Google Maps API key | https://console.cloud.google.com |

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/luan-thnh/ecopick.git
cd ecopick
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values (see [Environment Variables](#environment-variables) below).

### 4. Start the Development Server

```bash
npx expo start
```

### 5. Run on Device / Emulator

- **Android Emulator**: Press `a` in the terminal
- **iOS Simulator** (macOS only): Press `i` in the terminal
- **Physical device**: Scan the QR code with Expo Go app
- **Development build** (recommended for native modules):
  ```bash
  npx expo start --dev-client
  ```

> ⚠️ **Note**: Some native modules (maps, image picker, location) require a **development build** and won't work in Expo Go. See [Building the APK](#building-the-apk--aab).

---

## Environment Variables

Create `.env` from `.env.example`:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `EXPO_PUBLIC_API_BASE_URL` | Backend API base URL | `https://ecopickapi.onrender.com` | ✅ |

### Per-Environment Defaults (in `eas.json`)

| Profile | `EXPO_PUBLIC_API_BASE_URL` | Build Output |
|---------|---------------------------|-------------|
| `development` | `https://ecopick-api.vercel.app` | Dev client (internal) |
| `preview` | `https://ecopick-api.vercel.app` | `.apk` (testing) |
| `production` | `https://ecopick-api.vercel.app` | `.aab` (Play Store) |

> **Tip**: You can override the API URL at build time by editing `eas.json` → `build.<profile>.env.EXPO_PUBLIC_API_BASE_URL`.

---

## Backend Configuration

The mobile app connects to a REST API backend. The backend URL is configured via `EXPO_PUBLIC_API_BASE_URL`.

### Switching Backend per Environment

1. **Local backend** (development):
   ```bash
   # .env
   EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:8080
   ```
   > Use your machine's LAN IP — `localhost` won't work from a physical device or emulator.

2. **Staging** (preview builds):
   Edit `eas.json` → `build.preview.env`:
   ```json
   "EXPO_PUBLIC_API_BASE_URL": "https://your-staging-api.example.com"
   ```

3. **Production** (release builds):
   Edit `eas.json` → `build.production.env`:
   ```json
   "EXPO_PUBLIC_API_BASE_URL": "https://api.ecopick.vn"
   ```

### API Authentication Flow

```
Client                          Server
  │                                │
  ├── POST /api/v1/auth/login ────►│
  │   { email, password }          │
  │                                │
  │◄── { accessToken (15min),  ────┤
  │      refreshToken (30d) }      │
  │                                │
  ├── GET /api/v1/reports ────────►│
  │   Authorization: Bearer <JWT>  │
  │                                │
  │◄── 401 (token expired) ───────┤
  │                                │
  ├── POST /api/v1/auth/refresh ──►│
  │   { refreshToken }             │
  │                                │
  │◄── { newAccessToken } ────────┤
  │                                │
  └── (Axios interceptor handles   │
       auto-refresh automatically) │
```

---

## Running the App

### Development Mode

```bash
# Start Expo dev server
npx expo start

# Start with cache cleared
npx expo start --clear

# Start for specific platform
npx expo start --android
npx expo start --ios
```

### Creating a Development Build

A dev build is needed for native modules like maps, camera, and location:

```bash
# Build dev client for Android
npx eas build --profile development --platform android

# Build dev client for iOS
npx eas build --profile development --platform ios
```

Install the resulting build on your device, then:

```bash
npx expo start --dev-client
```

---

## Building the APK / AAB

### Option 1: EAS Build (Recommended — Cloud)

EAS Build compiles native code on Expo's servers. No local Android SDK or Java setup needed.

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build Android APK (for testing / side-loading)
eas build --profile preview --platform android

# Build Android AAB (for Google Play Store)
eas build --profile production --platform android

# Build iOS IPA
eas build --profile production --platform ios
```

After the build completes, download the artifact from the link in the terminal output or from https://expo.dev.

### Option 2: Local Build (Advanced)

```bash
# Requires: Android SDK, Java 17, Android NDK

# Generate native android/ directory
npx expo prebuild --platform android

# Build debug APK
cd android && ./gradlew assembleDebug

# The APK is at: android/app/build/outputs/apk/debug/app-debug.apk
```

### Build Profiles Summary

| Profile | Command | Output | Use Case |
|---------|---------|--------|----------|
| `development` | `eas build -p android --profile development` | Dev client APK | Development with native modules |
| `preview` | `eas build -p android --profile preview` | APK | Internal testing, QA |
| `production` | `eas build -p android --profile production` | AAB | Google Play Store release |

---

## CI/CD Pipeline

The project uses GitHub Actions (`.github/workflows/build-and-release.yml`):

### Triggers

| Trigger | Profile | Action |
|---------|---------|--------|
| Push tag `v*` (e.g. `v1.0.0`) | `production` | Build + GitHub Release |
| Push to `main` | `preview` | Build preview APK |
| Manual `workflow_dispatch` | Choose (`preview` / `production`) | Build on demand |

### Pipeline Steps

```
1. Lint & Type Check    →  npx expo lint + tsc --noEmit
2. Resolve Build Profile
3. Build Android        →  EAS Build (cloud)
4. Build iOS            →  EAS Build (cloud)
5. Create GitHub Release (production only)
```

### Required GitHub Secrets

| Secret | Description | How to Get |
|--------|-------------|-----------|
| `EXPO_TOKEN` | Expo access token for CI builds | https://expo.dev/accounts/[you]/settings/access-tokens |
| `GITHUB_TOKEN` | Auto-provided by GitHub | Built-in |

---

## Release Checklist

Before creating a release, verify the following:

### Pre-Release

- [ ] All features for the release are merged to `main`
- [ ] `package.json` → `version` is updated (e.g., `"1.0.0"` → `"1.1.0"`)
- [ ] `app.json` → `expo.version` matches `package.json` version
- [ ] `.env` / `eas.json` → production API URL is correct
- [ ] `EXPO_TOKEN` secret is configured in GitHub repo settings
- [ ] Expo project ID in `app.json` → `extra.eas.projectId` is valid
- [ ] Google Maps API key in `app.json` is valid and has correct restrictions
- [ ] No `console.log` statements left in production code
- [ ] All TypeScript errors resolved (`npx tsc --noEmit`)
- [ ] Lint passes (`npx expo lint`)
- [ ] Test on physical Android device with preview build
- [ ] Test on physical iOS device (if applicable)

### Trigger Release

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
# → CI automatically builds + creates GitHub Release
```

### Post-Release

- [ ] Verify GitHub Release was created with build artifacts
- [ ] Download and install APK on a test device
- [ ] Verify API connectivity in production
- [ ] Monitor Expo build dashboard for any failed builds

---

## API Contract

The backend exposes a REST API at `/api/v1/`. Full details in [`docs/04-BACKEND-API.md`](docs/04-BACKEND-API.md).

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | Register with email/password |
| `POST` | `/api/v1/auth/login` | Login, returns JWT tokens |
| `POST` | `/api/v1/auth/google` | Google OAuth login |
| `POST` | `/api/v1/auth/refresh` | Refresh access token |
| `GET` | `/api/v1/users/me` | Get current user profile |
| `POST` | `/api/v1/reports` | Create waste report |
| `GET` | `/api/v1/reports/nearby?lat=&lng=&radius=` | Get nearby reports (geo query) |
| `GET` | `/api/v1/events` | List events (filterable) |
| `POST` | `/api/v1/events/:id/join` | Join an event |
| `GET` | `/api/v1/leaderboard` | Get points leaderboard |
| `POST` | `/api/v1/uploads/presigned` | Get presigned URL for photo upload |

### Standard Response Format

```json
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input |
| `UNAUTHORIZED` | 401 | Not logged in or token expired |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Duplicate (email exists, already joined) |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Data Flow

### Report Submission Flow

```
User taps Report tab
       │
       ▼
Camera opens (expo-image-picker)
       │
       ▼
Photo captured → Preview screen
       │
       ▼
Auto-detect GPS (expo-location)
  → Reverse geocode to address
       │
       ▼
User fills form:
  - Severity (slider)
  - Waste types (multi-select)
  - Notes (optional)
       │
       ▼
Submit → POST /api/v1/uploads/presigned
       → Upload photo to S3
       → POST /api/v1/reports { lat, lng, severity, wasteTypes, photoKeys }
       │
       ▼
Success screen (+50 EcoPoints)
       │
       ▼
Report appears on map for all users
```

### State Management Flow

```
┌──────────────────────────────────────────────┐
│                  Zustand Stores              │
│  ┌────────────┐  ┌──────────┐  ┌──────────┐ │
│  │ authStore  │  │ mapStore │  │ common   │ │
│  │ • token    │  │ • filter │  │ Store    │ │
│  │ • user     │  │ • marker │  │          │ │
│  │ • login()  │  │ • region │  │          │ │
│  │ • logout() │  │          │  │          │ │
│  └────────────┘  └──────────┘  └──────────┘ │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│              React Query Cache               │
│  • reports (nearby, list, detail)            │
│  • events (list, detail, participants)       │
│  • user profile, badges, activity            │
│  • Auto refetch, cache invalidation          │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────┐
│            Axios HTTP Client                  │
│  • Base URL from EXPO_PUBLIC_API_BASE_URL    │
│  • Auto-attach Bearer token (interceptor)    │
│  • Auto-logout on 401                        │
│  • Retry / error logging                     │
└──────────────────────────────────────────────┘
```

---

## Common Errors & Troubleshooting

### Android Build Errors

<details>
<summary><b>❌ "Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'"</b></summary>

**Cause**: Wrong Java version. The project requires Java 17.

**Fix**:
```bash
# Check Java version
java -version

# Install Java 17 (Ubuntu/Debian)
sudo apt install openjdk-17-jdk

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Or use EAS Build (cloud) to avoid local Java issues
eas build --profile preview --platform android
```
</details>

<details>
<summary><b>❌ "SDK location not found"</b></summary>

**Cause**: Android SDK path not configured.

**Fix**:
```bash
# Set ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools
```

Or create `android/local.properties`:
```
sdk.dir=/home/your-user/Android/Sdk
```
</details>

<details>
<summary><b>❌ "Execution failed for task ':app:mergeExtDexDebug'" (duplicate classes)</b></summary>

**Cause**: Conflicting native dependencies (e.g., `expo-maps` and `react-native-maps`).

**Fix**:
```bash
# Clean the build
cd android && ./gradlew clean && cd ..

# Clear metro cache
npx expo start --clear

# If persists, remove android/ and re-prebuild
rm -rf android/
npx expo prebuild --platform android
```
</details>

<details>
<summary><b>❌ "Call to function 'ExpoImageManipulator.manipulate' has been rejected"</b></summary>

**Cause**: `expo-image-manipulator` native module not linked in Expo Go or a stale dev client.

**Fix**:
```bash
# Rebuild the development client
eas build --profile development --platform android

# Install the new dev client on your device, then:
npx expo start --dev-client
```
</details>

<details>
<summary><b>❌ Map crashes on production build / Map shows blank</b></summary>

**Cause**: Invalid or restricted Google Maps API key.

**Fix**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Verify the API key in `app.json` → `android.config.googleMaps.apiKey`
3. Ensure these APIs are enabled:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Places API (if using search)
   - Directions API (if using routing)
4. Check API key restrictions — the Android package name must match `com.luanthnh.EcoPick`
</details>

### API Connection Errors

<details>
<summary><b>❌ "Network Error: Không thể kết nối đến server"</b></summary>

**Cause**: The app cannot reach the backend API.

**Fix**:
1. Check the API URL:
   ```bash
   echo $EXPO_PUBLIC_API_BASE_URL
   ```
2. Test the API directly:
   ```bash
   curl https://ecopickapi.onrender.com/api/v1/health
   ```
3. If running locally, use your LAN IP instead of `localhost`:
   ```bash
   # .env
   EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:8080
   ```
4. If the backend is on Render, it may be sleeping (free tier cold start ~30s). Wait and retry.
</details>

<details>
<summary><b>❌ 401 Unauthorized on every request</b></summary>

**Cause**: JWT token expired or invalid.

**Fix**:
1. The app auto-logouts on 401 (see `src/lib/axios.ts` interceptor)
2. If stuck, clear app data:
   - Android: Settings → Apps → EcoPick → Clear Data
   - Or: uninstall and reinstall the app
3. Check if the backend refresh token endpoint is working:
   ```bash
   curl -X POST https://your-api.com/api/v1/auth/refresh \
     -H "Content-Type: application/json" \
     -d '{"refreshToken": "..."}'
   ```
</details>

<details>
<summary><b>❌ CORS errors in the browser (web mode)</b></summary>

**Cause**: The backend doesn't allow requests from the Expo web dev server origin.

**Fix**: Add CORS headers in the backend:
```js
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:19006'],
  credentials: true,
}));
```
</details>

### Expo / Metro Errors

<details>
<summary><b>❌ "Unable to resolve module" or metro cache issues</b></summary>

**Fix**:
```bash
# Clear all caches
npx expo start --clear

# Or manually:
rm -rf node_modules/.cache
watchman watch-del-all  # if using watchman
npm install
npx expo start --clear
```
</details>

<details>
<summary><b>❌ EAS Build fails with "EXPO_TOKEN not set"</b></summary>

**Fix**:
1. Generate a token at https://expo.dev/accounts/[you]/settings/access-tokens
2. Add it to GitHub Secrets:
   - Repo → Settings → Secrets → Actions → `EXPO_TOKEN`
3. For local builds:
   ```bash
   export EXPO_TOKEN=your_token_here
   eas build --profile preview --platform android
   ```
</details>

---

## Documentation Index

| Document | Description |
|----------|-------------|
| [`docs/01-PRODUCT-VISION.md`](docs/01-PRODUCT-VISION.md) | Product vision, user personas, business requirements, KPIs |
| [`docs/02-FEATURE-SPECS.md`](docs/02-FEATURE-SPECS.md) | Detailed feature specifications with acceptance criteria |
| [`docs/03-SCREENS.md`](docs/03-SCREENS.md) | Screen-by-screen UI documentation, navigation flow |
| [`docs/04-BACKEND-API.md`](docs/04-BACKEND-API.md) | Database schema, API endpoints, auth flow, error codes |
| [`docs/05-ROADMAP.md`](docs/05-ROADMAP.md) | 4-phase development roadmap, sprint plans, cost estimates |

---

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Description |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code style (formatting, no logic change) |
| `refactor:` | Code restructuring |
| `chore:` | Build, deps, CI changes |

---

## License

This project is private and proprietary. All rights reserved.
