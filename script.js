// DOM Elements
const button = document.getElementById("factButton");
const factText = document.getElementById("factText");
const factImage = document.getElementById("factImage");
const counter = document.getElementById("counter");
const secretBtn = document.getElementById("secretBtn");

// Game State
let attempts = 0;
let caughtCount = 0;

// Facts with corresponding AI image URLs
const factData = [
  {
    fact: "The average cloud weighs less than your regrets.",
    image: "image/img1.jpg"
  },
  {
    fact: "Octopuses have nine lives but forget how to use eight of them.",
    image: "image/img2.jpg"
  },
  {
    fact: "Wi-Fi signals get stronger if you compliment your router.",
    image: "image/img3.jpg"
  },
  {
    fact: "Cows moo in different accents depending on their mood.",
    image: "image/img4.jpg"
  },
  {
    fact: "The moon is just Earth's mood ring.",
    image: "image/img5.jpg"
  },
  {
    fact: "Avocados were invented by hipsters in 1864.",
    image: "image/img6.jpg"
  },
  {
    fact: "Every time you sneeze, your skeleton briefly logs out.",
    image: "image/img7.jpg"
  },
  {
    fact: "Carrots scream silently when you grate them.",
    image: "image/img8.jpg"
  },
  {
    fact: "Rainbows are just skyworms doing yoga.",
    image: "image/img9.jpg"
  },
  {
    fact: "If you stare at your fridge long enough, it blinks.",
    image: "image/img10.jpg"
  },
  {
    fact: "Sloths invented yoga, but forgot to name it.",
    image: "image/img11.jpg"
  },
  {
    fact: "Pigeons are government-issued feathered spies — but only on Tuesdays.",
    image: "image/img12.jpg"
  },
  {
    fact: "Humans blink in Morse code. No one knows what we're saying.",
    image: "image/img13.jpg"
  },
  {
    fact: "The Eiffel Tower is actually a giant fork for eating clouds.",
    image: "image/img14.jpg"
  },
  {
    fact: "The '404 error' was first used by cavemen when they lost rocks.",
    image: "image/img15.jpg"
  },
  {
    fact: "Butterflies are just shy moths with better PR.",
    image: "image/img16.jpg"
  },
  {
    fact: "Mirrors don't reflect you — they roast you in silence.",
    image: "image/img17.jpg"
  },
  {
    fact: "Dinosaurs went extinct because they refused to update their privacy policy.",
    image: "image/img18.jpg"
  },
  {
    fact: "Zebras are horses on airplane mode.",
    image: "image/img19.jpg"
  },
  {
    fact: "Spaghetti was invented when someone tried to knit with soup.",
    image: "image/img20.jpg"
  },
  {
    fact: "Turtles are just snails in heavy armor.",
    image: "image/img21.jpg"
  },
  {
    fact: "Koalas hold the answers to life, but they only whisper it in eucalyptus.",
    image: "image/img22.jpg"
  },
  {
    fact: "Muffins are just cupcakes that stopped believing in themselves.",
    image: "image/img23.jpg"
  },
  {
    fact: "If you whisper 'potato' to a plant, it photosynthesizes in a British accent.",
    image: "image/img24.jpg"
  },
  {
    fact: "Paperclips are failed Olympic gymnasts.",
    image: "image/img25.jpg"
  },
  {
    fact: "Gravity is just Earth giving you a permanent hug.",
    image: "image/img26.jpg"
  },
  {
    fact: "Your alarm clock screams because it hates mornings more than you do.",
    image: "image/img27.jpg"
  }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if all required elements exist
  if (!button || !factText || !factImage || !counter) {
    console.error('Missing required DOM elements!');
    return;
  }
  
  // Initialize the button position
  setInitialPosition();
  
  // Event Listeners
  button.addEventListener('click', handleButtonClick);
  button.addEventListener('mouseover', handleMouseOver);
  if (secretBtn) {
    secretBtn.addEventListener('click', handleSecretClick);
  }
  document.addEventListener('click', handleDocumentClick);
});

// Core Functions
function setInitialPosition() {
  moveButton();
}

function moveButton() {
  // Ensure button is positioned absolutely
  button.style.position = 'absolute';
  
  const maxX = Math.max(0, window.innerWidth - button.offsetWidth - 20);
  const maxY = Math.max(0, window.innerHeight - button.offsetHeight - 20);
  
  button.style.left = `${Math.random() * maxX}px`;
  button.style.top = `${Math.random() * maxY}px`;
  
  attempts++;
  counter.textContent = `Attempts: ${attempts}`;
  
  // 10% chance for special animation
  if (Math.random() < 0.1) {
    button.style.transform = 'rotate(360deg)';
    setTimeout(() => button.style.transform = '', 500);
  }
}

function handleButtonClick(e) {
  e.stopPropagation();
  caughtCount++;
  
  // Visual feedback
  button.style.transform = 'scale(0.9)';
  setTimeout(() => button.style.transform = '', 200);
  
  // Get random fact - FIXED: use factData instead of facts
  const randomIndex = Math.floor(Math.random() * factData.length);
  const selectedFact = factData[randomIndex];
  
  // Display fact and image - FIXED: use correct property names
  factText.textContent = selectedFact.fact;
  factImage.src = selectedFact.image;
  factImage.style.display = 'block';
  
  // Add error handling for images
  factImage.onerror = function() {
    console.warn(`Failed to load image: ${selectedFact.image}`);
    factImage.style.display = 'none';
    factText.textContent += " (Image not found)";
  };
  
  // Move button after delay
  setTimeout(() => {
    moveButton();
    checkEasterEggs();
  }, 1000);
}

function handleMouseOver() {
  // 60% chance to move when hovered
  if (Math.random() < 0.6) {
    moveButton();
  }
}

function handleSecretClick() {
  factText.textContent = "CHEATER MODE: The first computer bug was a real moth!";
  factImage.style.display = 'none';
}

function handleDocumentClick(e) {
  // Don't trigger if clicking on the button or image
  if (e.target === button || e.target === factImage || factImage.style.display === 'block') {
    return;
  }
  factText.textContent = "Missed! Try clicking the button!";
}

function checkEasterEggs() {
  // After 3 catches
  if (caughtCount === 3) {
    factText.textContent += " 🔥 HOT STREAK!";
  }
  
  // After 10 attempts
  if (attempts === 10) {
    factText.textContent = "Pro tip: Try moving faster! 🏃‍♂️";
  }
}