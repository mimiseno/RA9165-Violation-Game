const questionElement = document.getElementById('question');
const optionElement = document.getElementById('options');
const questionContainer = document.getElementById('questionContainer');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart');
const penaltyDetailsElement = document.getElementById('penaltyDetails');
const categorySelectElement = document.getElementById('categorySelect');

// Dictionary of violations and penalties based on RA 9165
const dictionary = {
    'Sec.4': { desc: 'Importation of dangerous drugs', fine: 'Life imprisonment to death, ₱500,000–₱10,000,000', imprisonment: 'Life to Death' },
    'Sec.5': { desc: 'Sale, trading, transport, or distribution of dangerous drugs', fine: 'Life imprisonment, ₱500,000–₱10,000,000', imprisonment: 'Life' },
    'Sec.6': { desc: 'Maintaining a den, dive, or resort for drug use', fine: 'Life imprisonment, ₱500,000–₱10,000,000', imprisonment: 'Life' },
    'Sec.7': { desc: 'Employees or visitors of drug dens', fine: '12 years and 1 day to 20 years', imprisonment: '12–20 years' },
    'Sec.8': { desc: 'Manufacture of dangerous drugs', fine: 'Life imprisonment, ₱500,000–₱10,000,000', imprisonment: 'Life' },
    'Sec.11': { desc: 'Possession of dangerous drugs', fine: '12 years to life depending on quantity', imprisonment: '12 years to Life' },
    'Sec.12': { desc: 'Possession of drug paraphernalia', fine: '6 months and 1 day to 4 years', imprisonment: '6 months to 4 years' },
    'Sec.15': { desc: 'Use of dangerous drugs', fine: 'Minimum of 6 months rehabilitation', imprisonment: '6 months rehab or more' },
    'Sec.16': { desc: 'Cultivation of plants classified as dangerous drugs', fine: 'Life imprisonment, ₱500,000–₱10,000,000', imprisonment: 'Life' },
    'Sec.19': { desc: 'Unauthorized prescription practices', fine: '12 years and 1 day to life', imprisonment: '12 years to Life' },
    'Sec.21': { desc: 'Custody and disposition of confiscated drugs', fine: 'Administrative penalties', imprisonment: 'N/A' },
    'Sec.22': { desc: 'Financing drug operations', fine: 'Life imprisonment, ₱500,000–₱10,000,000', imprisonment: 'Life' },
    'Sec.25': { desc: 'Drug use in public or by professionals', fine: 'Enhanced penalties', imprisonment: 'Enhanced penalties' },
    'Sec.26': { desc: 'Attempt or conspiracy to commit drug crimes', fine: 'Two degrees lower than crime', imprisonment: 'Two degrees lower' },
    'Sec.27': { desc: 'Accessory to drug crimes', fine: 'Two degrees lower than crime', imprisonment: 'Two degrees lower' },
    'Sec.36': { desc: 'Drug testing requirements', fine: 'Administrative and regulatory penalties', imprisonment: 'N/A' }
};

// Categories with questions
const categories = [
    {   
        id: 'dangerous_drugs',
        name: 'Dangerous Drugs',
        general: 'Have you ever used, carried, or been around illegal drugs?',
        questions: [
            { question: "Were they caught with illegal drugs in their pockets?", section: "Sec.11" },
            { question: "Did they have drugs for personal use or maybe for selling?", section: "Sec.11" },
            { question: "Were they holding way more than a small amount?", section: "Sec.11" },
            { question: "Tested positive for drugs in a test?", section: "Sec.15" },
            { question: "Caught in the act of using drugs?", section: "Sec.15" },
            { question: "Were they high at work or in public?", section: "Sec.25" },
            { question: "Did they use drugs around kids or while on the job?", section: "Sec.25" },
            { question: "Refused to take a drug test when required?", section: "Sec.36" }
        ]
    },
    {   
        id: 'manufacturing',
        name: 'Manufacturing & Distribution',
        general: 'Have you been involved in making or selling illegal drugs?',
        questions: [
            { question: "Did they try to cook up illegal drugs like in a Netflix series?", section: "Sec.8" },
            { question: "Were they caught running a secret lab or 'breaking bad' in real life?", section: "Sec.8" },
            { question: "Tried to make drugs but failed completely?", section: "Sec.26" },
            { question: "Were they selling illegal drugs like a sketchy online store?", section: "Sec.5" },
            { question: "Did they trade drugs for money, stuff, or other items?", section: "Sec.5" },
            { question: "Delivered drugs to someone or acted as a courier?", section: "Sec.5" },
            { question: "Were they the 'middleman' — not the boss, but definitely involved?", section: "Sec.5" },
            { question: "Used texts or apps to set up a drug deal?", section: "Sec.5" },
            { question: "Tried to smuggle drugs across borders like in the movies?", section: "Sec.4" }
        ]
    },
    {
        id: 'other',
        id: 'paraphernalia',
        name: 'Drug Paraphernalia',
        general: 'Have you ever possessed or handled tools used for taking drugs?',
        questions: [
            { question: "Were they carrying syringes, pipes, or foil — not for legitimate uses?", section: "Sec.12" },
            { question: "Were the tools found next to actual drugs?", section: "Sec.12" },
            { question: "Did they give a weird excuse for having those tools?", section: "Sec.12" },
            { question: "Modified the tools to be sneaky or conceal their true purpose?", section: "Sec.12" },
            { question: "Had these things at school or in public places?", section: "Sec.12" }
        ]
    },
    {
        name: 'Other Violations',
        general: 'Have you been involved in other drug-related activities?',
        questions: [
            { question: "Were they bankrolling a drug deal like a shady investor?", section: "Sec.22" },
            { question: "Tried to help someone avoid arrest for drug crimes?", section: "Sec.27" },
            { question: "Faked a medical prescription to get drugs?", section: "Sec.19" },
            { question: "Maintained a place where people use drugs?", section: "Sec.6" },
            { question: "Were they a visitor or employee at a known drug den?", section: "Sec.7" },
            { question: "Growing plants that are classified as dangerous drugs?", section: "Sec.16" }
        ]
    }
];
// RA 9165 Fun Facts - keeping from original script
const funFacts = [
    "RA 9165 has a \"funny\" side… if your idea of fun is a lifetime in prison.",
    "The law covers not just users, but also pushers, manufacturers, and protectors.",
    "Yes, even your favorite K-drama idol would get arrested under this law if caught using shabu in the Philippines.",
    "The law has something called the \"PDEA\" — nope, not a K-pop group. It's the Philippine Drug Enforcement Agency.",
    "Random drug tests are allowed in schools and workplaces. Surprise! ",
    "The law includes penalties for planting evidence — don't even *think* about being sneaky.",
    "Shabu (methamphetamine) is the most commonly mentioned illegal drug in the law. Also the least welcome.",
    "RA 9165 was passed in 2002, which makes it older than most Gen Z TikTokers.",
    "Just being caught near a school while dealing drugs doubles the penalty.",
    "There's a penalty for maintaining a drug den — even if you call it a chill spot.",
    "Even if you're not high, if you're in the act of selling, you're toast.",
    "There's such a thing as a Dangerous Drugs Board — they sound dangerous, but they're actually the good guys.",
    "The law talks about drug syndicates — which is not a cool gang name.",
    "Rehabilitation is available — the law believes in second chances (just not unlimited ones).",
    "If you use drugs and snitch, you might get some legal mercy. But don't rely on it.",
    "There's a section on chemical precursors — basically, if you're cooking like Heisenberg, they'll catch you.",
    "Students caught using drugs can face expulsion, rehab, or worse. Stay sharp and clean!",
    "There's an actual list of dangerous drugs — and no, caffeine and sugar aren't on it.",
    "Life imprisonment or even death penalty used to be a possibility (until it was repealed). Still, not worth the risk.",
    "In the eyes of RA 9165, funny business with drugs isn't funny at all — so stay safe, stay legal, and stay smart!"
];

// Global variables
let selectedCategory = "";
let currentIndex = 0;
let yesAnswers = [];
let involves_minors = false;
let committed_near_schools = false;
let large_quantity = false;
let has_multiple_violations = false;

// Track GIFs used to avoid repetition
const usedGifs = {
    'yes_img': new Set(),
    'no_img': new Set(),
    'question_img': new Set()
};

// Function to get a random GIF without repetition
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

// Show random fun fact
function showRandomFact() {
    const factText = document.getElementById('fact-text');
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    factText.textContent = funFacts[randomIndex];
}

// Start assessment by asking the initial question
function startAssessment() {
    // Reset variables
    yesAnswers = [];
    currentIndex = 0;
    selectedCategory = "";
    involves_minors = false;
    committed_near_schools = false;
    large_quantity = false;
    has_multiple_violations = false;
    
    // Show initial question
    categorySelectElement.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    resultElement.classList.add("hidden");
    restartButton.classList.add("hidden");
    
    // Display first general question - "Did someone commit a drug violation?"
    const questionGif = getRandomGif('question_img');
    questionElement.innerHTML = `
        <img src="${questionGif}" class="w-48 h-48 mx-auto mb-4" alt="Question">
        <div>Did someone commit a violation related to dangerous drugs?</div>
    `;
    
    optionElement.innerHTML = "";
    
    // Yes/No buttons for initial question
    ["Yes", "No"].forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.className = "px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded-full shadow";
        btn.onclick = () => {
            if (choice === "Yes") {
                // If Yes, show categories
                showThinking(() => {
                    displayQuestion(categoryObj);
                }, 'yes_img');
            } else {
                // If No, show clean result
                showThinking(() => {
                    displayCleanResult();
                }, 'no_img');
            }
        };
        optionElement.appendChild(btn);
    });
}

// Show thinking animation
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

// Show category selection
function showCategories() {

    
    optionElement.innerHTML = "";
    
    // Create buttons for each category
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category.name;
        btn.className = "w-full mb-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow";
        btn.onclick = () => {
            selectCategory(category.name);
        };
        optionElement.appendChild(btn);
    });
}

// Select a category and start questions
function selectCategory(categoryId) {
    // Find the selected category
    const categoryObj = categories.find(cat => cat.id === categoryId);
    if (!categoryObj) return;

    selectedCategory = categoryId;
    currentIndex = 0;
    yesAnswers = [];

    // Hide category selection and show question container
    document.getElementById("categorySelect").classList.add("hidden");
    document.getElementById("questionContainer").classList.remove("hidden");
    
    // Show general question for the category
    const questionGif = getRandomGif('question_img');
    questionElement.innerHTML = `
        <img src="${questionGif}" class="w-48 h-48 mx-auto mb-4" alt="Question">
        <div class="text-xl mb-4">${categoryObj.general}</div>
    `;
    
    optionElement.innerHTML = "";
    
    // Yes/No buttons for general question
    ["Yes", "No"].forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.className = "px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded-full shadow-md transition-all duration-200";
        btn.onclick = () => {
            if (choice === "Yes") {
                // If Yes, proceed to specific questions
                showThinking(() => {
                    displayQuestion(categoryObj);
                }, 'yes_img');
            } else {
                // If No, go back to categories
                showThinking(() => {
                    displayQuestion(categoryObj);
                }, 'no_img');
            }
        };
        optionElement.appendChild(btn);
    });
}

// Update the displayQuestion function
function displayQuestion(categoryObj) {
    if (!categoryObj || currentIndex >= categoryObj.questions.length) {
        displaySummaryResult();
        return;
    }

    const current = categoryObj.questions[currentIndex];
    
    // Display question with GIF
    const questionGif = getRandomGif('question_img');
    questionElement.innerHTML = `
        <img src="${questionGif}" class="w-48 h-48 mx-auto mb-4 rounded-lg" alt="Question">
        <div class="mt-4 text-xl">${current.question}</div>
    `;
    
    // Clear and create option buttons
    optionElement.innerHTML = "";
    ["Yes", "No"].forEach(choice => {
        const btn = document.createElement("button");
        btn.innerText = choice;
        btn.className = "px-6 py-3 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded-full shadow-md transition-all duration-200";
        btn.onclick = () => {
            showThinking(() => {
                if (choice === "Yes") {
                    yesAnswers.push(current.section);
                }
                currentIndex++;
                displayQuestion(categoryObj);
            }, choice === "Yes" ? 'yes_img' : 'no_img');
        };
        optionElement.appendChild(btn);
    });
}

// Display result for someone with no violations
function displayCleanResult() {
    questionContainer.classList.add("hidden");
    resultElement.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    
    const funnyMessages = [
        "Clean as a whistle! Either you're a saint or you've got plot armor.",
        "Hero status: unlocked. No shady business detected.",
        "You passed! Not even a parking ticket on your record.",
        "The cops are bored because of you. Go live your best law-abiding life.",
        "Innocent vibes only. You could teach ethics at this point."
    ];
    
    const finalMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    
    penaltyDetailsElement.innerHTML = finalMessage;
}

// Display summary of violations
function displaySummaryResult() {
    questionContainer.classList.add("hidden");
    resultElement.classList.remove("hidden");
    restartButton.classList.remove("hidden");

    // Check for multiple violations
    if (yesAnswers.length > 1) {
        has_multiple_violations = true;
    }

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
            "Just one? A lil' spicy, but we'll let it slide. Maybe.",
            "Someone's *dabbling* in danger. Stay cute, not criminal.",
            "One slip, huh? We'll pretend we didn't see it... this time.",
            "Minor red flag detected. Could be worse. Could be jail.",
            "We've seen worse. But we're watching you 👀."
        ],
        2: [
            "Two strikes! Someone's playing with fire.",
            "Starting to feel warm? That's the legal heat creeping in.",
            "You're on a watchlist. Probably. Maybe.",
            "We're picking up some *suspicious* signals.",
            "Get the extinguisher, this story's heating up."
        ],
        3: [
            "Okay, that's three... You got a hobby or what?",
            "Call your lawyer. Better yet, memorize their number.",
            "Your innocence is dropping like crypto in 2022.",
            "Bad decisions were made, huh?",
            "Three? That's... not great."
        ],
        4: [
            "Four violations? That's almost a full Netflix crime doc.",
            "Chapter 4: How It All Fell Apart.",
            "You've officially lost your 'main character' privilege.",
            "Sip your last juice box – you're going in.",
            "Four? That's... commitment."
        ],
        5: [
            "woah.. You trying to speedrun prison?",
            "You didn't break the law. You KARATE-CHOPPED it.",
            "You're a legend in crime circles already.",
            "Medal of dishonor unlocked.",
            "The police are typing up your name as we speak."
        ]
    };

    const messageArray = funnyMessages[Math.min(count, 5)];
    const finalMessage = messageArray[Math.floor(Math.random() * messageArray.length)];

    // Determine severity for RA 9165 context
    let severity_level = "Standard";
    if (large_quantity && involves_minors && committed_near_schools) {
        severity_level = "Critical";
    } else if (large_quantity || involves_minors || committed_near_schools) {
        severity_level = "High";
    } else if (has_multiple_violations) {
        severity_level = "Elevated";
    }

    if (count === 0) {
        penaltyDetailsElement.innerHTML = finalMessage;
    } else {
        // Show violations with sections and penalties
        let violationsHtml = sections.map(s => {
            const section = dictionary[s] || { desc: 'Unknown violation' };
            return `• ${s}: ${section.desc}<br>- Penalty: ${section.imprisonment}, ${section.fine}`;
        }).join("<br>");
        
        // Add special considerations if applicable
        let considerationsHtml = '';
        if (large_quantity || involves_minors || committed_near_schools || has_multiple_violations) {
            considerationsHtml = '<br><br><strong>Special Considerations:</strong><br>';
            if (large_quantity) considerationsHtml += '• Large quantity of drugs (increased penalty)<br>';
            if (involves_minors) considerationsHtml += '• Involvement of minors (aggravating circumstance)<br>';
            if (committed_near_schools) considerationsHtml += '• Near schools or public areas (enhanced penalty)<br>';
            if (has_multiple_violations) considerationsHtml += '• Multiple violations (compounded penalties)<br>';
        }
        
        penaltyDetailsElement.innerHTML = 
            `${finalMessage}<br><br>` +
            `<strong>Severity: ${severity_level}</strong><br><br>` +
            `<strong>Violations suspected under:</strong><br>${violationsHtml}` +
            `${considerationsHtml}`;
    }
}

// Restart the system
function restartSystem() {
    window.location.reload();
    document.getElementById("categorySelect").classList.remove("hidden");
    questionContainer.classList.add("hidden");
    resultElement.classList.add("hidden");
    restartButton.classList.add("hidden");
    penaltyDetailsElement.innerHTML = "";
    questionElement.innerText = "";
    optionElement.innerHTML = "";
    showRandomFact();
    Object.keys(usedGifs).forEach(key => usedGifs[key].clear());
    
    // Go back to start assessment
    startAssessment();
}

function answerViolation(answer) {
    const violationQuestion = document.getElementById("violationQuestion");
    const categorySelect = document.getElementById("categorySelect");
    const congratsMessage = document.getElementById("congratsMessage");
    const questionContainer = document.getElementById("questionContainer");

    // Hide the initial question
    violationQuestion.classList.add("hidden");

    if (answer === "yes") {
        // Show category selection
        categorySelect.classList.remove("hidden");
    } else {
        // Show congratulations message
        congratsMessage.classList.remove("hidden");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    showRandomFact(); // Show initial fun fact when page loads
    // startAssessment(); Start assessment immediately
});