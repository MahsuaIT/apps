# 🧮 Modern Calculator

A sleek, feature-rich calculator web application with advanced functionality, beautiful animations, and responsive design. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### 🎨 Design & Interface
- **Glass-morphism Design**: Modern translucent interface with backdrop blur effects
- **Dark/Light Mode**: Toggle between themes with automatic preference saving
- **Ripple Animations**: Interactive button feedback with smooth ripple effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Visual Feedback**: Active operator highlighting and smooth transitions

### 🔢 Calculator Functions
- **Basic Operations**: Addition, subtraction, multiplication, division
- **Advanced Functions**: Square root (√) and percentage (%) calculations
- **Memory Operations**: Memory Recall (MR), Memory Clear (MC), Memory Add (M+)
- **Error Handling**: Division by zero protection and invalid input handling
- **History Display**: Shows calculation history above the main display

### ⌨️ User Experience
- **Full Keyboard Support**: Use your keyboard for all operations
- **Visual Error Messages**: Clear error feedback with auto-recovery
- **Smooth Animations**: Hover effects, button press animations, and transitions
- **Memory Indicator**: Visual indicator when memory contains a value

## 🚀 Demo

Simply open the `index.html` file in any modern web browser to start using the calculator.

## 📱 Screenshots

### Light Mode
- Clean, professional interface with gradient background
- Glass-morphism effect with subtle shadows and blur

### Dark Mode
- Elegant dark theme with blue-purple gradients
- All elements properly styled for comfortable nighttime use

## 🛠️ Usage

### Basic Operations
1. **Numbers**: Click number buttons (0-9) or use keyboard
2. **Operators**: Click +, −, ×, ÷ buttons or use keyboard (+, -, *, /)
3. **Decimal**: Click the decimal point (.) button
4. **Calculate**: Click equals (=) or press Enter
5. **Clear All**: Click AC or press Escape
6. **Clear Entry**: Click CE or press Backspace

### Advanced Functions
- **Square Root**: Click √ button to calculate square root of current number
- **Percentage**: Click % button to convert current number to percentage
- **Memory Recall**: Click MR to recall stored memory value
- **Memory Clear**: Click MC to clear memory storage
- **Memory Add**: Click M+ to add current number to memory

### Keyboard Shortcuts
| Key | Function |
|-----|----------|
| `0-9` | Number input |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `.` | Decimal point |
| `Enter` or `=` | Calculate result |
| `Escape` | Clear all |
| `Backspace` | Clear entry |

## 🔧 Technical Details

### Built With
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript**: No external dependencies
- **Local Storage**: Theme preference persistence

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Lightweight (single HTML file)
- Fast loading and responsive interactions
- Smooth 60fps animations
- Efficient DOM manipulation

## 📁 File Structure

modern-calculator/
│
├── index.html          # Main HTML file with embedded CSS and JavaScript
└── README.md          # Project documentation


## 🎨 Customization

### Changing Theme Colors

#### Light Mode Colors
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Calculator background */
background: rgba(255, 255, 255, 0.95);

/* Button colors */
.btn-operator { background: #667eea; }
.btn-equals { background: #28a745; }
.btn-clear { background: #e74c3c; }

Dark Mode Colors

/* Dark gradient */
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);

/* Dark calculator background */
background: rgba(30, 30, 50, 0.95);

Adding New Functions

To add new calculator functions, extend the 
inputFunction()
 method:

function inputFunction(func) {
    const inputValue = parseFloat(currentInput);
    let result;

    switch (func) {
        case 'sqrt':
            result = Math.sqrt(inputValue);
            break;
        case 'percent':
            result = inputValue / 100;
            break;
        // Add your new function here
        case 'square':
            result = inputValue * inputValue;
            updateHistory(`${inputValue}² =`);
            break;
        default:
            return;
    }
    
    currentInput = String(result);
    waitingForOperand = true;
    updateDisplay();
}

Modifying Button Layout

The calculator uses CSS Grid for button layout:

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
}

/* Special button spanning multiple columns */
.btn-zero {
    grid-column: span 2;
}

🔒 Security & Privacy

Client-Side Only
: All calculations performed locally
No Data Collection
: No user data is sent to external servers
Local Storage
: Only theme preference is stored locally
No External Dependencies
: Self-contained application
📱 Responsive Design

Breakpoints

Desktop
: Full-featured interface (400px+ width)
Mobile
: Optimized layout with adjusted button sizes (<480px width)
Mobile Optimizations

Reduced button heights for touch interaction
Adjusted font sizes for readability
Optimized spacing for thumb navigation
Maintained full functionality on all screen sizes
🌙 Theme System

The calculator includes a sophisticated theme system:

Automatic Detection
: Respects user's system preference
Manual Toggle
: Moon/sun button for manual switching
Persistence
: Remembers choice between sessions
Smooth Transitions
: All elements animate between themes
Complete Coverage
: Every UI element properly themed
🚀 Installation & Deployment

Local Development

Download or clone the repository
Open 
index.html
 in your web browser
No build process or dependencies required
Web Deployment

Upload 
index.html
 to your web server
No additional configuration needed
Works with any static hosting service
Offline Usage

Fully functional offline
No internet connection required
Perfect for local development or air-gapped environments
🤝 Contributing

Contributions are welcome! Here are some ways you can help:

Bug Reports
: Report any issues or unexpected behavior
Feature Requests
: Suggest new calculator functions or UI improvements
Code Improvements
: Submit pull requests for optimizations
Documentation
: Help improve this README or add code comments
Development Guidelines

Maintain vanilla JavaScript (no frameworks)
Follow existing code style and structure
Test on multiple browsers and devices
Ensure accessibility compliance
📄 License

This project is open source and available under the 
LICENSE
.

🙏 Acknowledgments

Design Inspiration
: Modern calculator apps and glass-morphism trends
Icons
: Unicode symbols for cross-platform compatibility
Color Palette
: Carefully selected for accessibility and aesthetics
Animation Principles
: Smooth, purposeful transitions following Material Design
📊 Features Comparison

| Feature | Basic Calculator | Modern Calculator |
|---------|------------------|-------------------|
| Basic Operations | ✅ | ✅ |
| Memory Functions | ❌ | ✅ |
| Keyboard Support | ❌ | ✅ |
| Dark/Light Mode | ❌ | ✅ |
| History Display | ❌ | ✅ |
| Error Handling | ❌ | ✅ |
| Responsive Design | ❌ | ✅ |
| Animations | ❌ | ✅ |
| Advanced Functions | ❌ | ✅ |

Made with ❤️ for modern arithmetic computing

Version 1.0 - Built with vanilla web technologies for maximum compatibility and performance

