const QandA = document.getElementById('QandA');   // Make sure this ID exists in HTML

const QandAArr = [ {
    q: "What is viewnex?",
    a: "viewnex is a free online tool that allows you to analyze any YouTube channel. It shows detailed statistics, estimated revenue, video performance, and growth insights."
    },
    {
    q: "How accurate are the revenue estimates?",
    a: "The revenue estimates are based on real industry RPM data and view counts. They are good approximations, but actual earnings may vary depending on audience location, ad types, and other factors."
    },
    {
    q: "Is viewnex really free?",
    a: "Yes, the entire tool is completely free to use. No login or payment is required."
    },
    {
    q: "How do I find a YouTube channel's handle?",
    a: 'Go to the YouTube channel → click on the channel name or "Customize channel" → the handle is the @username shown below the banner.'
    },
    {
    q: "Does smTracker store my search history or personal data?",
    a: "No. We do not store any data. All searches are processed directly in your browser and are completely private."
    },
    {
    q: "Can I analyze any YouTube channel?",
    a: "Yes, as long as the channel has public videos and is not set to private."
    },
    {
    q: "Why are some statistics wrong or missing?",
    a: "Some statistics can appear wrong or inconsistent because channels upload videos at very different frequencies. For example, a channel that posts every day will have different averages than one that posts once a month. Some data (like total views or subscribers) is always accurate, while others (like estimated revenue or average performance) can vary depending on upload frequency and audience behavior."
    },
    {
    q: "How often is the data updated?",
    a: "The data is fetched live from YouTube every time you search, so it is always up-to-date at the moment of searching."
    },
    {
        q: "Can I use smTracker on mobile?",
        a: "Yes, the website is fully responsive and works well on phones and tablets."
    },
    {
        q: "Do you have a revenue calculator for single videos?",
        a: "Yes, when you expand any video in the results, you will see estimated revenue and subscriber gain for that specific video."
    },
    {
        q: "Will this tool work for very small or new channels?",
        a: "Yes, it works for channels of all sizes, even those with very few subscribers and videos."
    },
    {
        q: "How can I contact support?",
        a: 'You can reach us through the "Support" button in the footer or via our social media accounts.'
    }
];

for (let question of QandAArr) {
    let questionDiv = document.createElement('div');
    questionDiv.classList.add('answer');

    let questionDivTop = document.createElement('div');
    let questionDivBottom = document.createElement('div');

    let questionDivBtn = document.createElement('button');
    questionDivBtn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
    questionDivBtn.classList.add('topButtonSt');

    let questionDivQuestion = document.createElement('h3');
    questionDivQuestion.textContent = question.q;

    // Build top row
    questionDivTop.appendChild(questionDivBtn);
    questionDivTop.appendChild(questionDivQuestion);
    questionDivTop.classList.add('top');

    // Append top to main div
    questionDiv.appendChild(questionDivTop);
    questionDiv.appendChild(questionDivBottom);   // Append bottom early but hide it

    let isOpen = false;

    // Toggle logic
    questionDivBtn.addEventListener('click', (e) => {
        e.stopPropagation();   // Prevent unwanted bubbling
        isOpen = !isOpen;

        if (isOpen) {
            questionDivBtn.innerHTML = `<i class="fa-solid fa-angle-up"></i>`;
            questionDiv.classList.add('answerBigger');
            questionDivBtn.classList.remove('topButtonSt');
            questionDivBtn.classList.add('topButtonNd');
            questionDivBottom.innerHTML = `<p>${question.a}</p>`;
            questionDivBottom.style.display = 'block';
            questionDivBottom.classList.add('bottom');
        } else {
            questionDivBtn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
            questionDiv.classList.remove('answerBigger');
            questionDivBtn.classList.remove('topButtonNd');
            questionDivBtn.classList.add('topButtonSt');
            questionDivBottom.style.display = 'none';
            questionDivBottom.classList.add('bottom');
        }
    });

    // Initial state - hide answer
    questionDivBottom.style.display = 'none';

    QandA.appendChild(questionDiv);
}