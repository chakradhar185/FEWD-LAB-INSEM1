const quizData = [
  {
    question: "Which of the following are JavaScript data types?",
    options: ["String", "Boolean", "Number", "Table"],
    correct: [0,1,2]
  },
  {
    question: "Which CSS property controls the size of text?",
    options: ["font-size", "text-size", "font-style", "text-style"],
    correct: [0]
  },
  {
    question: "Which command creates a lightweight tag named v1.0 on the current commit?",
    options: ["git mark v1.0", "git release v1.0", "git tag v1.0", "git label v1.0"],
    correct: [2]
  },
  {
    question: "How does 'position: sticky' behave?",
    options: [
      "It is always fixed to the top of the viewport",
      "It sticks the element to its parent's left edge",
      "It behaves like relative until a scroll threshold is reached, then acts like fixed",
      "It removes the element from the document flow"
    ],
    correct: [2]
  }
];

let currentQuestion = 0;
let userAnswers = Array(quizData.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const scoreBoard = document.getElementById("scoreBoard");

function loadQuestion(index) {
  const q = quizData[index];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = i;
    if (userAnswers[index] && userAnswers[index].includes(i)) {
      checkbox.checked = true;
    }
    checkbox.addEventListener("change", () => {
      if (!userAnswers[index]) userAnswers[index] = [];
      if (checkbox.checked) {
        userAnswers[index].push(i);
      } else {
        userAnswers[index] = userAnswers[index].filter(ans => ans !== i);
      }
    });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + opt));
    optionsEl.appendChild(li);
  });
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === quizData.length - 1;
}

function calculateScore() {
  let score = 0;
  quizData.forEach((q, i) => {
    const correctSet = new Set(q.correct);
    const userSet = new Set(userAnswers[i] || []);
    if (correctSet.size === userSet.size && [...correctSet].every(val => userSet.has(val))) {
      score++;
    }
  });
  return score;
}

function showScore() {
  const score = calculateScore();
  let highest = localStorage.getItem("highestScore") || 0;
  if (score > highest) {
    localStorage.setItem("highestScore", score);
    highest = score;
  }
  scoreBoard.textContent = `Your Score: ${score}/${quizData.length} | Highest Score: ${highest}`;
}

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
});

submitBtn.addEventListener("click", showScore);

// Initialize
loadQuestion(currentQuestion);
