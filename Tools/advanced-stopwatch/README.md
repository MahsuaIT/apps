# ⏱️ Advanced Stopwatch

A feature-rich, responsive stopwatch application built with HTML, CSS, and JavaScript. This stopwatch includes forward/reverse timing, lap functionality, and a beautiful light/dark mode interface.

## ✨ Features

### Core Functionality
- **Start/Pause/Reset** - Standard stopwatch controls with smooth operation
- **Forward Timer** - Count up from 00:00:00
- **Reverse Timer** - Set custom countdown time and count down to zero
- **Lap Times** - Record multiple lap times while the timer is running
- **Time Alert** - Get notified when reverse timer reaches zero

### User Interface
- **Light/Dark Mode** - Toggle between themes with moon/sun icons
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Beautiful Animations** - Smooth transitions and hover effects
- **Professional Styling** - Clean, modern interface with gradient backgrounds

### Advanced Features
- **Theme Persistence** - Your preferred theme is saved and restored
- **Keyboard Support** - Press Enter in popup inputs for quick actions
- **Visual Feedback** - Clear status indicators and button states
- **Error Handling** - Input validation and user-friendly alerts

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Download the HTML file
2. Open it in your web browser
3. Start using the stopwatch immediately!

### Usage

#### Basic Stopwatch
1. Click **Start** to begin timing
2. Click **Pause** to temporarily stop
3. Click **Resume** to continue from where you paused
4. Click **Reset** to clear the timer

#### Reverse Timer
1. Click **Reverse** button
2. Enter minutes and seconds in the popup
3. Click **Start Timer** to set the countdown
4. Click **Start** to begin countdown
5. Get alerted when time reaches zero

#### Lap Times
1. Start the timer (forward or reverse mode)
2. Click **Lap** to record current time
3. Continue timing and add more laps as needed
4. Click **Clear All Laps** to remove all recorded times

#### Theme Toggle
- Click the **🌙** icon to switch to dark mode
- Click the **☀️** icon to switch to light mode
- Your preference is automatically saved

## 🛠️ Technical Details

### Built With
- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **Vanilla JavaScript** - All functionality and interactions
- **Local Storage** - Theme preference persistence

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```bash
advanced-stopwatch/
│
├── index.html          # Complete application (HTML + CSS + JS)
└── README.md          # This file
```

## 📱 Responsive Design

The stopwatch is fully responsive and adapts to different screen sizes:

- **Desktop (1200px+)**: Full layout with all features visible
- **Tablet (768px-1199px)**: Optimized button spacing and layout
- **Mobile (320px-767px)**: Stacked controls and touch-friendly buttons

## 🎨 Customization

### Colors
The application uses a carefully selected color palette:
- **Primary**: Blue gradient background
- **Success**: Green for start/forward actions
- **Warning**: Orange for pause actions
- **Danger**: Red for reset actions
- **Info**: Blue for lap functionality
- **Secondary**: Purple for reverse mode

### Fonts
- **Display**: Courier New (monospace) for timer display
- **UI**: Segoe UI system font for interface elements

## 🔧 Features in Detail

### Timer Accuracy
- Updates every 10 milliseconds for smooth display
- Precise timing using `Date.now()` for accuracy
- Handles pause/resume without time drift

### Data Persistence
- Theme preference saved to localStorage
- Survives browser restarts and page refreshes

### Error Handling
- Input validation for reverse timer
- Prevents invalid time entries
- User-friendly error messages

## 🤝 Contributing

This is a standalone project, but suggestions for improvements are welcome! Some ideas for future enhancements:

- Sound notifications for timer completion
- Multiple timer presets
- Export lap times to CSV
- Keyboard shortcuts
- Custom color themes

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🙏 Acknowledgments

- Icons: Unicode emoji characters
- Fonts: System fonts for optimal performance
- Design inspiration: Modern stopwatch applications

## 📞 Support

If you encounter any issues or have questions:
1. Check that you're using a modern web browser
2. Ensure JavaScript is enabled
3. Try refreshing the page
4. Clear browser cache if theme switching isn't working