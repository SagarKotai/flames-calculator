# FLAMES Calculator

A romantic and interactive FLAMES calculator web application that determines the relationship status between two people. The app features a beautiful pink UI with continuous falling hearts animation and real-time Firebase integration.

## Features

- Beautiful romantic UI with pink theme
- Continuous falling hearts animation
- Real-time Firebase integration
- Responsive design
- Push notifications for new calculations
- Interactive result display with emojis

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase Realtime Database
- Firebase Cloud Messaging

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flames-calculator.git
```

2. Open the project directory:
```bash
cd flames-calculator
```

3. Open `index.html` in your web browser

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database and Cloud Messaging
3. Copy your Firebase configuration to `firebase-config.js`
4. Update security rules in Firebase Console:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

## Usage

1. Enter two names in the input fields
2. Click "Calculate" or press Enter
3. View the relationship result with animated emojis
4. Use "Reset" to clear the form

## License

MIT License

## Author

Your Name 