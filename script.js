// FLAMES Calculator Logic
const flamesMap = {
    'F': { name: 'Friends', emoji: '🤝', description: 'You two are meant to be friends!' },
    'L': { name: 'Love', emoji: '❤️', description: 'Love is in the air!' },
    'A': { name: 'Affection', emoji: '💕', description: 'There\'s a special affection between you two!' },
    'M': { name: 'Marriage', emoji: '💍', description: 'Marriage bells are ringing!' },
    'E': { name: 'Enemy', emoji: '⚔️', description: 'Watch out for each other!' },
    'S': { name: 'Sister', emoji: '👭', description: 'You\'re like sisters!' }
};

// Initialize continuous falling hearts
function initializeFallingHearts() {
    const container = document.body; // Changed to body for full screen coverage
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`; // Random starting position
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heart.style.opacity = `${Math.random() * 0.5 + 0.3}`;
        heart.style.fontSize = `${Math.random() * 0.8 + 0.8}rem`;
        container.appendChild(heart);
        
        // Create a new heart after a random delay
        setTimeout(() => {
            createHeart();
        }, Math.random() * 2000 + 1000); // New heart every 1-3 seconds
    }
    
    // Start with 20 hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 200); // Stagger the initial hearts
    }
}

function removeCommonLetters(name1, name2) {
    const name1Array = name1.toLowerCase().split('');
    const name2Array = name2.toLowerCase().split('');
    
    for (let i = 0; i < name1Array.length; i++) {
        const index = name2Array.indexOf(name1Array[i]);
        if (index !== -1) {
            name1Array[i] = '';
            name2Array[index] = '';
        }
    }
    
    return name1Array.join('').length + name2Array.join('').length;
}

function calculateFlames(count) {
    const flames = ['F', 'L', 'A', 'M', 'E', 'S'];
    let currentIndex = 0;
    
    while (flames.length > 1) {
        currentIndex = (currentIndex + count - 1) % flames.length;
        flames.splice(currentIndex, 1);
    }
    
    return flames[0];
}

function showResult(result) {
    const resultElement = document.getElementById('result');
    const descriptionElement = document.getElementById('description');
    const container = document.querySelector('.container');
    
    // Remove existing result classes
    container.classList.remove('love', 'friend', 'enemy', 'affection', 'marriage', 'sister');
    
    // Add appropriate class based on result
    container.classList.add(result.toLowerCase());
    
    // Store the pair in Firebase
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;
    
    database.ref('pairs').push({
        name1: name1,
        name2: name2,
        result: result,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    
    resultElement.textContent = `${flamesMap[result].name} ${flamesMap[result].emoji}`;
    descriptionElement.textContent = flamesMap[result].description;
    
    document.getElementById('result-container').style.display = 'block';
}

function resetForm() {
    document.getElementById('name1').value = '';
    document.getElementById('name2').value = '';
    document.getElementById('result-container').style.display = 'none';
    
    // Remove result classes
    const container = document.querySelector('.container');
    container.classList.remove('love', 'friend', 'enemy', 'affection', 'marriage', 'sister');
}

function validateInputs() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (!name1 || !name2) {
        alert('Please enter both names');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name1) || !/^[a-zA-Z\s]+$/.test(name2)) {
        alert('Names should contain only letters and spaces');
        return false;
    }
    
    return true;
}

// Initialize Firebase Messaging
function initializeMessaging() {
    messaging.requestPermission()
        .then(() => {
            console.log('Notification permission granted.');
            return messaging.getToken();
        })
        .then((token) => {
            console.log('FCM Token:', token);
        })
        .catch((err) => {
            console.log('Unable to get permission to notify.', err);
        });
}

// Listen for new pairs in Firebase
database.ref('pairs').limitToLast(1).on('child_added', (snapshot) => {
    const pair = snapshot.val();
    if (pair.name1 && pair.name2) {
        const notificationTitle = 'New FLAMES Calculation!';
        const notificationOptions = {
            body: `${pair.name1} and ${pair.name2} are ${flamesMap[pair.result].name}!`
        };
        
        if (Notification.permission === 'granted') {
            new Notification(notificationTitle, notificationOptions);
        }
    }
});

// Handle foreground messages
messaging.onMessage((payload) => {
    console.log('Message received:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    };
    
    new Notification(notificationTitle, notificationOptions);
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeMessaging();
    initializeFallingHearts(); // Start continuous falling hearts
    
    document.getElementById('calculate-btn').addEventListener('click', () => {
        if (validateInputs()) {
            const name1 = document.getElementById('name1').value.trim();
            const name2 = document.getElementById('name2').value.trim();
            const count = removeCommonLetters(name1, name2);
            const result = calculateFlames(count);
            showResult(result);
        }
    });
    
    document.getElementById('reset-btn').addEventListener('click', resetForm);
    
    // Allow calculation on pressing Enter key
    document.getElementById('name2').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && validateInputs()) {
            const name1 = document.getElementById('name1').value.trim();
            const name2 = document.getElementById('name2').value.trim();
            const count = removeCommonLetters(name1, name2);
            const result = calculateFlames(count);
            showResult(result);
        }
    });
}); 