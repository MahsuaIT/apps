document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const timeDisplay = document.getElementById('time');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const soundToggle = document.getElementById('sound-toggle');
    
    // Test Variables
    let timer;
    let timeLeft = 60;
    let isTestRunning = false;
    let currentText = '';
    let currentPosition = 0;
    let totalTyped = 0;
    let correctTyped = 0;
    let currentDifficulty = 'medium';
    let isDarkMode = false;
    let isSoundOn = true;
    
    // Sample Texts
    const sampleTexts = {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "Practice makes perfect. Start slow, focus on accuracy.",
            "Coding is fun when you enjoy the learning process."
        ],
        medium: [
            "JavaScript is the world's most popular programming language.",
            "The average typing speed is around 40 WPM. Can you beat it?",
            "To become a great typist, practice daily for best results."
        ],
        hard: [
            "Complex! $ymbols, numb3rs, AND raNdom CAPitalization challenge typists! @#%^&*()",
            "According to research, typing speeds above 100WPM are in the top 1% of users.",
            "The longest word in English dictionaries: Pneumonoultramicroscopicsilicovolcanoconiosis."
        ]
    };
    
    // Initialize the app
    function init() {
        loadPreferences();
        setupEventListeners();
    }
    
    // Load saved preferences
    function loadPreferences() {
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
            isDarkMode = true;
        }
        
        if (localStorage.getItem('soundOn') === 'false') {
            soundToggle.checked = false;
            isSoundOn = false;
        }
        
        if (localStorage.getItem('difficulty')) {
            currentDifficulty = localStorage.getItem('difficulty');
            document.querySelector(`.difficulty-btn[data-difficulty="${currentDifficulty}"]`).classList.add('active');
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Difficulty selection
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentDifficulty = this.dataset.difficulty;
                localStorage.setItem('difficulty', currentDifficulty);
            });
        });
        
        // Start test
        startBtn.addEventListener('click', startTest);
        
        // Reset test
        resetBtn.addEventListener('click', resetTest);
        
        // Dark mode toggle
        darkModeToggle.addEventListener('change', function(e) {
            isDarkMode = e.target.checked;
            document.body.classList.toggle('dark-mode', isDarkMode);
            localStorage.setItem('darkMode', isDarkMode);
        });
        
        // Sound toggle
        soundToggle.addEventListener('change', function(e) {
            isSoundOn = e.target.checked;
            localStorage.setItem('soundOn', isSoundOn);
        });
        
        // Typing input
        textInput.addEventListener('input', handleInput);
    }
    
    // Start the typing test
    function startTest() {
        if (isTestRunning) return;
        
        // Get random text for selected difficulty
        const texts = sampleTexts[currentDifficulty];
        currentText = texts[Math.floor(Math.random() * texts.length)];
        renderText();
        
        // Reset counters
        totalTyped = 0;
        correctTyped = 0;
        currentPosition = 0;
        
        // Enable input and focus
        textInput.disabled = false;
        textInput.value = '';
        textInput.focus();
        
        // Start timer
        isTestRunning = true;
        startBtn.disabled = true;
        resetBtn.disabled = false;
        timeLeft = 60;
        timeDisplay.textContent = timeLeft;
        
        timer = setInterval(function() {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }, 1000);
    }
    
    // End the typing test
    function endTest() {
        clearInterval(timer);
        isTestRunning = false;
        textInput.disabled = true;
        
        // Calculate final stats
        const timeElapsed = 60 - timeLeft;
        const wpm = Math.round(((correctTyped / 5) / Math.max(timeElapsed, 1)) * 60);
        const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;
        
        // Update displays
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = accuracy;
        
        // Check high score
        checkHighScore(wpm, accuracy);
    }
    
    // Reset the typing test
    function resetTest() {
        clearInterval(timer);
        timeLeft = 60;
        isTestRunning = false;
        textInput.disabled = true;
        textInput.value = '';
        startBtn.disabled = false;
        resetBtn.disabled = true;
        timeDisplay.textContent = timeLeft;
        wpmDisplay.textContent = 0;
        accuracyDisplay.textContent = 0;
        textDisplay.innerHTML = 'Select difficulty and click START. You have 60 seconds.<br>' + 
                               '<span class="highlight">Green</span> = correct, <span class="incorrect">red</span> = mistakes, <span class="current">highlight</span> = current position.';
    }
    
    // Handle typing input
    function handleInput() {
        const inputText = this.value;
        totalTyped = inputText.length;
        correctTyped = 0;
        
        // Count correct characters
        for (let i = 0; i < inputText.length; i++) {
            if (inputText[i] === currentText[i]) {
                correctTyped++;
            }
        }
        
        currentPosition = inputText.length;
        
        // Calculate real-time stats
        const timeElapsed = 60 - timeLeft;
        const wpm = timeElapsed > 0 ? Math.round(((correctTyped / 5) / timeElapsed) * 60) : 0;
        const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;
        
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = accuracy;
        
        // Update text display
        renderText();
        
        // End test if completed
        if (inputText.length === currentText.length) {
            endTest();
        }
    }
    
    // Render the text with highlighting
    function renderText() {
        let html = '';
        
        for (let i = 0; i < currentText.length; i++) {
            let char = currentText[i];
            
            if (i < currentPosition) {
                // Already typed characters
                const isCorrect = textInput.value[i] === currentText[i];
                const className = isCorrect ? 'correct' : 'incorrect';
                html += `<span class="${className}">${char}</span>`;
            } else if (i === currentPosition) {
                // Current character
                html += `<span class="current">${char}</span>`;
            } else {
                // Upcoming characters
                html += char;
            }
        }
        
        textDisplay.innerHTML = html;
    }
    
    // Check for high score
    function checkHighScore(wpm, accuracy) {
        const highScores = JSON.parse(localStorage.getItem('typingHighScores')) || {
            easy: { wpm: 0, accuracy: 0 },
            medium: { wpm: 0, accuracy: 0 },
            hard: { wpm: 0, accuracy: 0 }
        };
        
        if (wpm > highScores[currentDifficulty].wpm) {
            highScores[currentDifficulty] = { wpm, accuracy };
            localStorage.setItem('typingHighScores', JSON.stringify(highScores));
            
            // Highlight new record
            wpmDisplay.classList.add('new-record');
            setTimeout(() => {
                wpmDisplay.classList.remove('new-record');
            }, 2000);
        }
    }
    
    // Initialize the app
    init();
});