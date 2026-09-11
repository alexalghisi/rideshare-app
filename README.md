# 🚗 React Native Uber Clone

A beautiful, modern rideshare application built with React Native and Expo. This app mimics the core functionality of Uber with a clean, intuitive UI.

![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)
![Expo](https://img.shields.io/badge/Expo-51.0-black.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🔐 **Authentication Flow** - Phone/Google/Apple sign-in
- 🗺️ **Interactive Maps** - Real-time map with pickup/dropoff markers
- 📍 **Location Selection** - Search and select pickup/destination points
- 🚕 **Ride Options** - Multiple ride types (X, Comfort, XL, Lux)
- 💳 **Payment Integration** - Payment method selection
- 🎨 **Beautiful UI** - Modern, clean design following best UX practices
- 📱 **Responsive Layout** - Works on all screen sizes

## 📱 Screenshots

The app includes:
- Login screen with multiple auth options
- Home screen with recent and saved places
- Interactive map view with pickup/dropoff selection
- Ride options with pricing and vehicle details
- Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Studio (for emulator)
- Google Maps API Key (for production use)

### Installation

1. **Install dependencies**

```bash
npm install
```

or

```bash
yarn install
```

2. **Configure Google Maps API**

- Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
- Open `app.json` and replace the placeholder API keys:

```json
{
  "ios": {
    "config": {
      "googleMapsApiKey": "YOUR_IOS_GOOGLE_MAPS_API_KEY"
    }
  },
  "android": {
    "config": {
      "googleMaps": {
        "apiKey": "YOUR_ANDROID_GOOGLE_MAPS_API_KEY"
      }
    }
  }
}
```

3. **Start the development server**

```bash
npm start
```

or

```bash
expo start
```

4. **Run on your device**

- **iOS**: Press `i` in the terminal or scan the QR code with the Expo Go app
- **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
- **Web**: Press `w` in the terminal

## 📂 Project Structure

```
uber-clone/
├── App.js                      # Main app component with navigation
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── babel.config.js             # Babel configuration
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js      # Authentication screen
│   │   ├── HomeScreen.js       # Main home screen
│   │   ├── MapScreen.js        # Map with pickup/dropoff
│   │   └── RideOptionsScreen.js # Ride selection and booking
│   └── components/             # Reusable components (add as needed)
└── assets/                     # Images and icons
```

## 🛠️ Built With

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **React Native Maps** - Map integration
- **Expo Location** - Location services
- **React Native Elements** - UI components

## 🎯 Key Screens

### 1. Login Screen
- Phone number authentication
- Social login options (Google, Apple)
- Clean, modern design

### 2. Home Screen
- Search for destinations
- Recent and saved places
- Quick access to map view

### 3. Map Screen
- Interactive map with markers
- Pickup and dropoff selection
- Location confirmation
- Smooth bottom sheet animation

### 4. Ride Options Screen
- Multiple ride types with pricing
- Vehicle capacity and arrival time
- Payment method selection
- Promo code support
- Real-time booking

## 🔧 Configuration

### Environment Setup

The app uses Expo's managed workflow. No native code configuration is required for basic development.

### Maps Configuration

For development, the app uses a default map view. For production:

1. Enable the following APIs in Google Cloud Console:
   - Maps SDK for iOS
   - Maps SDK for Android
   - Directions API (for route calculation)

2. Add the API keys to `app.json`

## 📝 Development Tips

- **Hot Reload**: Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android) to open the developer menu
- **Debugging**: Use React Native Debugger or Chrome DevTools
- **Expo Go**: Test on real devices without building native apps

## 🚀 Deployment

### Build for iOS

```bash
expo build:ios
```

### Build for Android

```bash
expo build:android
```

### OTA Updates

Expo supports over-the-air updates:

```bash
expo publish
```

## 📱 Running on Physical Devices

1. Install **Expo Go** from App Store or Google Play
2. Run `npm start` or `expo start`
3. Scan the QR code with your camera (iOS) or Expo Go app (Android)

## 🎨 Customization

### Colors and Styling

All styles are defined in each screen file. Key colors used:
- Primary: `#000000` (Black)
- Success: `#00D86F` (Green)
- Error: `#FF3B30` (Red)
- Background: `#FFFFFF` (White)
- Secondary: `#F5F5F5` (Light Gray)

### Adding Features

To add new features:
1. Create a new screen in `src/screens/`
2. Add the screen to navigation in `App.js`
3. Create reusable components in `src/components/`

## 🐛 Known Issues

- Maps require API keys for production use
- Location permissions need to be granted on first use
- Payment integration is simulated (not connected to real payment gateway)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Design inspired by Uber's mobile app
- Built with React Native and Expo
- Maps powered by Google Maps

## 📧 Support

For issues or questions, please open an issue on the repository.

---

**Happy Coding! 🚀**
