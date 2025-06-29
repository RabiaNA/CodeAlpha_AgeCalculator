// Page Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);

    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    document.getElementById(targetId).classList.add('active');
    link.classList.add('active');
  });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Previous Mode' : 'Next Mode';
});

// Age Calculator
function calculateAge() {
  const dob = new Date(document.getElementById("dob").value);
  const today = new Date();
  if (isNaN(dob)) {
    document.getElementById("ageResult").textContent = "Please enter a valid date.";
    document.getElementById("milestone").textContent = "";
    document.getElementById("ageCelebration").style.display = "none";
    return;
  }
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("ageResult").textContent = `You are ${years} year(s), ${months} month(s), and ${days} day(s) old.`;
  let milestone = "";
  if (years < 18) milestone = "You're a young explorer! ⏰";
  else if (years < 30) milestone = "You're a rising star! 🚀";
  else if (years < 50) milestone = "You're a wise leader! 🧠";
  else milestone = "You're a legendary sage! 🎉";
  document.getElementById("milestone").textContent = milestone;

  // Fun Age Celebration Feature
  const ageCelebration = document.getElementById("ageCelebration");
  ageCelebration.style.display = "block";
  ageCelebration.innerHTML = `<h3>Celebrating You!</h3><p>This age calculator is your timekeeper</p>`;
}

// BMI Calculator
function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    document.getElementById("bmiResult").textContent = "Please enter valid height and weight.";
    document.getElementById("running-man").style.display = "none";
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  document.getElementById("bmiResult").textContent = `Your BMI is ${bmi.toFixed(1)} (${category})`;
  document.getElementById("running-man").style.display = "block";
}

// Days to Next Birthday
function daysToBirthday() {
  const input = new Date(document.getElementById("bday").value);
  const today = new Date();
  const thisYearBirthday = new Date(today.getFullYear(), input.getMonth(), input.getDate());
  let nextBirthday = thisYearBirthday > today ? thisYearBirthday : new Date(today.getFullYear() + 1, input.getMonth(), input.getDate());

  const diff = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  document.getElementById("bdayResult").textContent = `Only ${diff} day(s) left until your next birthday! 🎂`;

  const canvas = document.getElementById("countdownClock");
  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;

  function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fill();
    ctx.strokeStyle = "#ffcc00";
    ctx.lineWidth = 5;
    ctx.stroke();

    const now = new Date();
    const seconds = now.getSeconds();
    const angle = (seconds / 60) * 2 * Math.PI - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + radius * 0.8 * Math.cos(angle), centerY + radius * 0.8 * Math.sin(angle));
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.stroke();

    requestAnimationFrame(drawClock);
  }
  drawClock();
}

// Zodiac Finder
function getZodiac() {
  const date = new Date(document.getElementById("zodiacInput").value);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const zodiacSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19], traits: "Ambitious, disciplined, and practical." },
    { sign: "Aquarius", start: [1, 20], end: [2, 18], traits: "Innovative, independent, and humanitarian." },
    { sign: "Pisces", start: [2, 19], end: [3, 20], traits: "Compassionate, intuitive, and dreamy." },
    { sign: "Aries", start: [3, 21], end: [4, 19], traits: "Bold, energetic, and confident." },
    { sign: "Taurus", start: [4, 20], end: [5, 20], traits: "Reliable, patient, and grounded." },
    { sign: "Gemini", start: [5, 21], end: [6, 20], traits: "Curious, adaptable, and witty." },
    { sign: "Cancer", start: [6, 21], end: [7, 22], traits: "Nurturing, sensitive, and loyal." },
    { sign: "Leo", start: [7, 23], end: [8, 22], traits: "Charismatic, confident, and passionate." },
    { sign: "Virgo", start: [8, 23], end: [9, 22], traits: "Analytical, meticulous, and kind." },
    { sign: "Libra", start: [9, 23], end: [10, 22], traits: "Charming, diplomatic, and balanced." },
    { sign: "Scorpio", start: [10, 23], end: [11, 21], traits: "Intense, passionate, and mysterious." },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21], traits: "Adventurous, optimistic, and philosophical." }
  ];

  for (let z of zodiacSigns) {
    if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) {
      document.getElementById("zodiacResult").textContent = `Your Zodiac sign is ${z.sign}`;
      document.getElementById("zodiacDetails").innerHTML = `<h3>About ${z.sign}</h3><p>${z.traits}</p>`;
      return;
    }
  }
  document.getElementById("zodiacResult").textContent = "Please enter a valid date.";
  document.getElementById("zodiacDetails").innerHTML = "";
}

// Contact Form
function sendContact() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }
  alert("Feedback sent successfully!");
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

// Neo-Type Glow Effect
function neoTypeGlow() {
  const elements = document.querySelectorAll('.neo-glow');
  elements.forEach(element => {
    let glow = 0;
    function step() {
      glow += 0.05;
      element.style.textShadow = `0 0 ${5 + Math.sin(glow) * 5}pxrgb(249, 166, 12), 0 0 ${10 + Math.cos(glow) * 5}pxrgb(241, 161, 11)`;
      requestAnimationFrame(step);
    }
    step();
  });
}

document.addEventListener('DOMContentLoaded', neoTypeGlow);

// Logo Image Neo-Type Glow
const logo = document.querySelector('.logo-img');
if (logo) {
  let glow = 0;
  function animateLogo() {
    glow += 0.05;
    logo.style.filter = `drop-shadow(0 0 ${5 + Math.sin(glow) * 5}pxrgb(246, 164, 13)) drop-shadow(0 0 ${10 + Math.cos(glow) * 5}px rgb(245, 187, 11))`;
    requestAnimationFrame(animateLogo);
  }
  animateLogo();
}