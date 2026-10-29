# Uber UI clone

A React Native recreation of Uber’s dark home screen and ride-selection flow. Includes Uber, Parcel and Travel departments, Services, Account, destination search, pickup scheduling, ride selection and a session-only activity list.

Follow [@pandathedeveloper](https://www.instagram.com/pandathedeveloper/) on Instagram for more React Native UI clones.

## Run locally

Use Node 22.22.2 (`nvm use`) and npm. iOS requires Xcode and CocoaPods. Android requires Android Studio, SDK/Build Tools 37, JDK 17 and NDK 27.1.12297006.

```sh
npm ci
cd ios && pod install && cd ..
npm start
```

In another terminal with a simulator or emulator open:

```sh
npm run ios
# or
npm run android
```

Checks: `npm run typecheck`, `npm run lint`, `npm test -- --runInBand`.

Screens and separate styles live in `src/Screens`; reusable UI, data, navigation, state and shared styles have their own folders. Layouts, text, prices, icons, banners and the draggable demo map are built in React Native/SVG. Images contain individual vehicles or promotional artwork only.

No API keys are needed. Search uses bundled Mumbai destinations; fares and schedules are sample data. The map is an illustrated preview, with no geocoding, live traffic, driver matching or payments. Confirming a demo ride only adds it to local session activity. The existing native registration, splash and app icon are retained.

An independent UI study, not an official Uber app. Reference imagery and trademarks belong to their respective owners.
