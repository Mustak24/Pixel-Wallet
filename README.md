# 💸 Pixel-Wallet

**Pixel-Wallet** is a fully offline-first, local-data-powered personal finance management app built with **React Native** and **TypeScript**. This app allows users to track transactions, manage accounts, and visualize financial transitions with a sleek and responsive UI — all without the need for an internet connection.

## 🚀 Features

- 📱 Cross-platform React Native mobile application
- 📊 Account and transaction management
- 🧮 Custom in-app calculator for inputs
- 📆 Date and category modals for quick filtering
- 🔒 Secure local storage using custom database models
- 🌗 Theming support with `ThemeProvider`
- 💬 Custom modals and alerts
- 🔧 Clean and modular code architecture

---

## 🧠 Tech Stack

- **Framework**: React Native
- **Language**: TypeScript
- **State Management**: React Context API
- **Navigation**: React Navigation (custom stack + tab)
- **UI Components**: Custom reusable components
- **Storage**: Local storage via custom models and file system

---

## 📁 Project Structure

```bash
Pixel-Wallet/
├── App.tsx                 # Entry point
├── src/
│   ├── components/         # Reusable UI components (Buttons, Cards, Icons, etc.)
│   ├── screens/            # App screens (Home, Accounts, Transitions, etc.)
│   ├── Database/           # Custom storage and models
│   ├── Contexts/           # App-wide context providers
│   ├── Navigation/         # Navigation logic (stack/tab)
│   └── Assets/             # Static assets like JSON and icons
├── android/                # Android native project
├── ios/                    # iOS native project
├── .vscode/                # Editor configs
├── README.md               # Project readme
└── package.json            # Project config
```

---

## 🛠 Getting Started

### Prerequisites

- Node.js ≥ 14
- Yarn or npm
- Android Studio or Xcode
- Follow React Native environment setup

### 1. Clone the Repository
```sh
git clone https://github.com/Mustak24/Pixel-Wallet.git
cd Pixel-Wallet
```

### 2. Install Dependencies
```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

### 3. Start Metro Bundler
```sh
npm start
# or
yarn start
```

### 4. Run the App

#### For Android
```sh
npm run android
# or
yarn android
```

#### For iOS
```sh
bundle install
bundle exec pod install

npm run ios
# or
yarn ios
```

---

## 🧪 Running Tests
```sh
npm test
# or
yarn test
```

---

## 🔥 Code Hotspots (Actively Updated Files)

- App.tsx
- src/screens/Transition.tsx
- src/components/BottomTabNavbar.tsx
- src/screens/HomeScreens/Home.tsx
- src/components/Modal/BottomModal.tsx
- src/components/Calculator.tsx
- src/Database/Models/AccountModal.ts
- src/Database/Models/TransitionModal.ts

---

## 🧩 Future Improvements

- Dark mode toggle
- Budget goal tracking
- Backup/Restore to cloud (optional)
- Enhanced analytics & visual charts

---

## 🙌 Acknowledgements

- React Native
- TypeScript
- React Navigation
- AsyncStorage
- React Native Vector Icons

---

## 📃 License

This project is licensed under the MIT License - see the LICENSE file for details.

Built with ❤️ by @Mustak24
