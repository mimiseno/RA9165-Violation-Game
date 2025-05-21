const questionElement = document.getElementById('question');
const optionElement = document.getElementById('options');
const questionContainer = document.getElementById('questionContainer');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart');
const penaltyDetailsElement = document.getElementById('penaltyDetails');

const allQuestions = {
  manufacture: [
    { question: "Did this person try to cook up illegal drugs like they’re in a Netflix series?", section: "Sec 8/16" },
    { question: "Were they caught running a secret lab or 'breaking bad' in real life?", section: "Sec 8" },
    { question: "Tried to make drugs but totally failed? Like, not even a little success?", section: "Sec 26" }
  ],
  distribution: [
    { question: "Were they selling illegal drugs like a sketchy online store?", section: "Sec 5" },
    { question: "Did they trade drugs for money, stuff, or... pizza?", section: "Sec 5" },
    { question: "Delivered drugs to someone? Maybe posing as UberEats?", section: "Sec 5" },
    { question: "Were they the 'middleman' — not the boss, but definitely involved?", section: "Sec 5" },
    { question: "Used text, DMs, or secret apps to set up a drug deal?", section: "Sec 5/26" },
    { question: "Tried to sneak drugs inside food, gadgets, or toys?", section: "Sec 5" }

  ],
  possession: [
    { question: "Were they caught with illegal drugs just chilling in their pockets?", section: "Sec 11" },
    { question: "Did they have drugs for 'personal vibes' or maybe for selling?", section: "Sec 11" },
    { question: "Were they holding way more than the 'oops I forgot' amount?", section: "Sec 11" },
    { question: "Were they part of a bigger operation — like a 'team effort'?", section: "Sec 11/5" },
    { question: "Drugs found during a checkpoint or random search? Classic mistake.", section: "Sec 21" }

  ],
  use: [
    { question: "Tested positive for drugs? That ‘random test’ didn’t go well...", section: "Sec 15" },
    { question: "Caught red-handed, in the act of using? Oops.", section: "Sec 15" },
    { question: "Have a history of drug use? Like, not just a phase?", section: "Sec 15" },
    { question: "Were they high at work or in public like it’s casual Friday?", section: "Sec 25" },
    { question: "Used drugs around kids or while on the job? Yikes.", section: "Sec 5/25" },
    { question: "Refused to take a drug test like it’s an escape room?", section: "Sec 36" }

  ],
  paraphernalia: [
    { question: "Were they carrying syringes, pipes, or foil — and not for arts & crafts?", section: "Sec 12" },
    { question: "Were the tools found next to actual drugs? Suspicious much?", section: "Sec 12" },
    { question: "Did they give a really weird excuse for having those tools?", section: "Sec 12" },
    { question: "Modified the tools to be sneaky? Like a DIY spy kit?", section: "Sec 10" },
    { question: "Had these things at school or in public? Bold move.", section: "Sec 14" }

  ],
  other: [
    { question: "Were they bankrolling a drug deal like a shady investor?", section: "Sec 22" },
    { question: "Tried to help someone avoid arrest? Hero or accomplice?", section: "Sec 27" },
    { question: "Faked a medical prescription to score drugs? Naughty.", section: "Sec 19" },
    { question: "Carrying weird chemicals for 'totally not making drugs'?", section: "Sec 10" },
    { question: "Tried to smuggle drugs across borders like in the movies?", section: "Sec 4" }

  ]
};

let selectedCategory = "";
let currentIndex = 0;
let yesAnswers = [];


// RA 9165 Fun Facts
const funFacts = [
  "RA 9165 has a \"funny\" side… if your idea of fun is a lifetime in prison.",
  "The law covers not just users, but also pushers, manufacturers, and protectors.",
  "Yes, even your favorite K-drama idol would get arrested under this law if caught using shabu in the Philippines.",
  "The law has something called the \"PDEA\" — nope, not a K-pop group. It’s the Philippine Drug Enforcement Agency.",
  "Random drug tests are allowed in schools and workplaces. Surprise! ",
  "The law includes penalties for planting evidence — don’t even *think* about being sneaky.",
  "Shabu (methamphetamine) is the most commonly mentioned illegal drug in the law. Also the least welcome.",
  "RA 9165 was passed in 2002, which makes it older than most Gen Z TikTokers.",
  "Just being caught near a school while dealing drugs doubles the penalty.",
  "There’s a penalty for maintaining a drug den — even if you call it a “chill spot.”",
  "Even if you're not high, if you're in the act of selling, you're toast.",
  "There’s such a thing as a “Dangerous Drugs Board” — they sound dangerous, but they’re actually the good guys.",
  "The law talks about “drug syndicates” — which is not a cool gang name.",
  "Rehabilitation is available — the law believes in second chances (just not unlimited ones).",
  "If you use drugs and snitch, you might get some legal mercy. But don't rely on it.",
  "There’s a section on chemical precursors — basically, if you’re cooking like Heisenberg, they’ll catch you.",
  "Students caught using drugs can face expulsion, rehab, or worse. Stay sharp and clean!",
  "There’s an actual list of dangerous drugs — and no, caffeine and sugar aren't on it.",
  "Life imprisonment or even death penalty used to be a possibility (until it was repealed). Still, not worth the risk.",
  "In the eyes of RA 9165, “funny” business with drugs isn’t funny at all — so stay safe, stay legal, and stay smart!"
];

const usedGifs = {
    'yes_img': new Set(),
    'no_img': new Set(),
    'question_img': new Set()
};


// Function to show a random fun fact
function getRandomGif(folder) {
    const gifCount = {
        'yes_img': 4,
        'no_img': 5,
        'question_img': 8
    };
    
    const count = gifCount[folder];
    const used = usedGifs[folder];
    
    // If all GIFs have been used, clear the set and start over
    if (used.size >= count) {
        used.clear();
    }
    
    // Keep trying until we find an unused GIF
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * count) + 1;
    } while (used.has(randomNum));
    
    // Add this GIF to used set
    used.add(randomNum);
    
    return `imgs/${folder}/${randomNum.toString().padStart(2, '0')}.gif`;
}

function showRandomFact() {
    const factText = document.getElementById('fact-text');
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    factText.textContent = funFacts[randomIndex];
}

function selectCategory(category) {
    selectedCategory = category;
    currentIndex = 0;
    yesAnswers = [];

    document.getElementById("categorySelect").classList.add("hidden");
    questionContainer.classList.remove("hidden");
    document.querySelector('.bg-blue-100').classList.add('hidden');
    displayQuestion();
}


function displayQuestion() {
    const questions = allQuestions[selectedCategory];
    const current = questions[currentIndex];
    
    // Add random question GIF
    const questionGif = getRandomGif('question_img');
    questionElement.innerHTML = `
        <img src="${questionGif}" class="w-48 h-48 mx-auto mb-4" alt="Question">
        <div>${current.question}</div>
    `;
    
    optionElement.innerHTML = "";

    ["Yes", "No"].forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.className = "px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded-full shadow";
        btn.onclick = () => {
            showThinking(() => {
                if (choice === "Yes") yesAnswers.push(current.section);
                currentIndex++;
                if (currentIndex < questions.length) {
                    displayQuestion();
                } else {
                    displaySummaryResult();
                }
            }, choice === "Yes" ? 'yes_img' : 'no_img');
        };
        optionElement.appendChild(btn);
    });
}

function showThinking(callback, responseType) {
    const thinkingGif = getRandomGif(responseType);
    questionElement.innerText = "Thinking...";
    optionElement.innerHTML = `
        <div class="animate-pulse text-center">
            <img src="${thinkingGif}" class="w-48 h-48 mx-auto mb-4" alt="Thinking">
            <div class="text-gray-500">🧠 Neural net doing backflips...</div>
        </div>
    `;

    setTimeout(callback, 1500); // Set a consistent delay of 1.5 seconds
}

function displaySummaryResult() {
  questionContainer.classList.add("hidden");
  resultElement.classList.remove("hidden");
  restartButton.classList.remove("hidden");

  const count = yesAnswers.length;
  const sections = [...new Set(yesAnswers)];

  const funnyMessages = {
    0: [
      "Clean as a whistle! Either you're a saint or you've got plot armor.",
      "Hero status: unlocked. No shady business detected.",
      "You passed! Not even a parking ticket on your record.",
      "The cops are bored because of you. Go live your best law-abiding life.",
      "Innocent vibes only. You could teach ethics at this point."
    ],
    1: [
      "Just one? A lil' spicy, but we’ll let it slide. Maybe.",
      "Someone’s *dabbling* in danger. Stay cute, not criminal.",
      "One slip, huh? We'll pretend we didn’t see it... this time.",
      "Minor red flag detected. Could be worse. Could be jail.",
      "We’ve seen worse. But we’re watching you 👀."
    ],
    2: [
      "Two strikes! Someone’s playing with fire.",
      "Starting to feel warm? That’s the legal heat creeping in.",
      "You're on a watchlist. Probably. Maybe.",
      "We’re picking up some *suspicious* signals.",
      "Get the extinguisher, this story’s heating up."
    ],
    3: [
      "Okay, that’s three... You got a hobby or what?",
      "Call your lawyer. Better yet, memorize their number.",
      "Your innocence is dropping like crypto in 2022.",
      "Bad decisions were made, huh?",
      "Three? That’s... not great."
    ],
    4: [
      "Four violations? That’s almost a full Netflix crime doc.",
      "Chapter 4: How It All Fell Apart.",
      "You’ve officially lost your ‘main character’ privilege.",
      "Sip your last juice box – you’re going in.",
      "Four? That’s... commitment."
    ],
    5: [
      "FIVE?! You trying to speedrun prison?",
      "You didn't break the law. You KARATE-CHOPPED it.",
      "You’re a legend in crime circles already.",
      "Medal of dishonor unlocked.",
      "The police are typing up your name as we speak."
    ]
  };

  const messageArray = funnyMessages[Math.min(count, 5)];
  const finalMessage = messageArray[Math.floor(Math.random() * messageArray.length)];

  if (count === 0) {
    penaltyDetailsElement.innerHTML = finalMessage;
  } else {
    penaltyDetailsElement.innerHTML = `${finalMessage}<br><br><strong>Violations suspected under:</strong><br>${sections.map(s => `• ${s}`).join("<br>")}`;
  }
}

function restartSystem() {
  document.getElementById("categorySelect").classList.remove("hidden");
  document.querySelector('.bg-blue-100').classList.remove('hidden');
  questionContainer.classList.remove("hidden");
  resultElement.classList.add("hidden");
  restartButton.classList.add("hidden");
  penaltyDetailsElement.innerHTML = "";
  questionElement.innerText = "";
  optionElement.innerHTML = "";
  showRandomFact();
  Object.keys(usedGifs).forEach(key => usedGifs[key].clear());

}

document.addEventListener('DOMContentLoaded', () => {
    showRandomFact(); // Show initial fun fact when page loads
});