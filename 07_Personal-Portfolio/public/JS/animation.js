document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => el.classList.add('visible'));
});

 
// Typing Animation with Erase Effect
const titles = [
  "Software Engineer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Stack Expert"
];

let currentIndex = 0;
let currentText = "";
let isDeleting = false;
let typingSpeed = 80;   // typing speed
let erasingSpeed = 40;  // erasing speed (faster)
let delayAfterWord = 1800; // pause after finishing a word

const typingElement = document.getElementById('typing-text');

function type() {
  const currentWord = titles[currentIndex];

  if (isDeleting) {
    // Erasing
    currentText = currentWord.substring(0, currentText.length - 1);
    typingSpeed = erasingSpeed;
  } else {
    // Typing
    currentText = currentWord.substring(0, currentText.length + 1);
    typingSpeed = 80;
  }

  typingElement.textContent = currentText;

  // If word is complete
  if (!isDeleting && currentText === currentWord) {
    isDeleting = true;
    typingSpeed = delayAfterWord; // pause before erasing
  }
  // If word is fully erased
  else if (isDeleting && currentText === "") {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % titles.length;
    typingSpeed = 400; // small pause before typing next word
  }

  setTimeout(type, typingSpeed);
}

// Start the animation when page loads
window.onload = function() {
  // Optional: Small delay before starting
  setTimeout(() => {
    type();
  }, 800);
};
 

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNavbar');
  
  if (window.scrollY > 30) {
    if (!navbar.classList.contains('scrolled')) {
      navbar.classList.add('scrolled');
    }
  } else {
    if (navbar.classList.contains('scrolled')) {
      navbar.classList.remove('scrolled');
    }
  }
}, { passive: true });