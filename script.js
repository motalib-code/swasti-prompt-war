const electionSteps = [
    {
        id: 'registration',
        title: 'Voter Registration',
        shortDesc: 'Ensure you are eligible to vote.',
        icon: 'fa-id-card',
        dates: 'Varies by state (Usually 15-30 days before election)',
        content: 'Voter registration is the first step in the election process. You must be a U.S. citizen, meet your state\'s residency requirements, and be 18 years old on or before Election Day.',
        actions: [
            'Check your current registration status online at Vote.org.',
            'Register to vote via mail, online, or in-person at local election offices.',
            'Update your registration immediately if you have moved or changed your name.'
        ]
    },
    {
        id: 'research',
        title: 'Research Candidates',
        shortDesc: 'Learn about who is running.',
        icon: 'fa-magnifying-glass',
        dates: 'Months leading up to the election',
        content: 'Take time to understand the candidates\' platforms, voting records, and stances on key issues. This applies to local, state, and federal elections. Knowledgeable voting makes democracy stronger.',
        actions: [
            'Watch local and national debates and town halls.',
            'Read non-partisan voter guides from organizations like the League of Women Voters.',
            'Review sample ballots for your specific district to know exactly what to expect.'
        ]
    },
    {
        id: 'early-voting',
        title: 'Early & Mail-in Voting',
        shortDesc: 'Cast your ballot before Election Day.',
        icon: 'fa-envelope',
        dates: 'Usually starts 2-4 weeks before Election Day',
        content: 'Many states offer early voting in person or via absentee/mail-in ballots. This provides flexibility and helps avoid long lines on Election Day. Rules vary significantly between states.',
        actions: [
            'Request an absentee ballot before your state\'s deadline.',
            'Find your early voting locations and their operating hours.',
            'Follow instructions carefully when filling out and returning a mail ballot, especially signature requirements.'
        ]
    },
    {
        id: 'election-day',
        title: 'Election Day',
        shortDesc: 'The final day to cast your vote.',
        icon: 'fa-person-booth',
        dates: 'First Tuesday after the first Monday in November',
        content: 'If you haven\'t voted early or by mail, this is your last chance. Polls are open all day, and as long as you are in line before polls close, you have the legally protected right to vote.',
        actions: [
            'Verify your designated polling place (it may have changed since the last election).',
            'Bring necessary identification if required by your state\'s voter ID laws.',
            'If your eligibility is challenged, ask for a provisional ballot.'
        ]
    },
    {
        id: 'results',
        title: 'Counting & Results',
        shortDesc: 'Votes are tallied and certified.',
        icon: 'fa-chart-pie',
        dates: 'Election night and following weeks',
        content: 'After polls close, election officials begin counting votes. Unofficial results are often reported on election night, but the official certification process takes several weeks as mail-in and provisional ballots are verified.',
        actions: [
            'Follow results via trusted, verified news organizations.',
            'Understand that close races may take days or weeks to officially call.',
            'Wait for the official certification of results by state election officials.'
        ]
    }
];

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    setupChat();
});

function renderTimeline() {
    const timelineEl = document.getElementById('timeline');
    
    electionSteps.forEach((step, index) => {
        const li = document.createElement('li');
        li.className = 'timeline-step';
        li.dataset.id = step.id;
        
        li.innerHTML = `
            <div class="dot"></div>
            <h3>${step.title}</h3>
            <p>${step.shortDesc}</p>
        `;
        
        li.addEventListener('click', () => {
            document.querySelectorAll('.timeline-step').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            displayStepContent(step);
        });
        
        timelineEl.appendChild(li);
    });
}

function displayStepContent(step) {
    const displayEl = document.getElementById('content-display');
    
    let actionsHtml = step.actions.map(action => `
        <li>
            <i class="fa-solid fa-circle-check"></i> 
            <span>${action}</span>
        </li>
    `).join('');
    
    displayEl.innerHTML = `
        <div class="info-card">
            <h2><i class="fa-solid ${step.icon}"></i> ${step.title}</h2>
            <div class="dates"><i class="fa-regular fa-calendar"></i> <strong>Timeline:</strong> ${step.dates}</div>
            <p>${step.content}</p>
            <h3 style="margin-bottom: 16px; font-size: 1.1rem; color: var(--text-primary); font-weight: 600;">Action Checklist:</h3>
            <ul class="action-list">
                ${actionsHtml}
            </ul>
        </div>
    `;

    // Add automated message from assistant
    addMessage(`I can help you with details about "${step.title}". What would you like to know?`, 'assistant');
}

function setupChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    
    const sendMessage = () => {
        const text = input.value.trim();
        if (text) {
            addMessage(text, 'user');
            input.value = '';
            
            showTypingIndicator();
            
            // Simulate AI typing and response
            setTimeout(() => {
                removeTypingIndicator();
                respondToUser(text);
            }, 1000 + Math.random() * 1000);
        }
    };
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    
    const icon = sender === 'assistant' ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>';
    
    msgDiv.innerHTML = `
        <div class="avatar">${icon}</div>
        <div class="bubble">${text}</div>
    `;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message assistant typing-msg`;
    msgDiv.id = 'typing-indicator';
    
    msgDiv.innerHTML = `
        <div class="avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="bubble" style="padding: 10px 16px;">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function respondToUser(text) {
    const lowerText = text.toLowerCase();
    let response = "That's a great question about the election process. To give you the most accurate answer, could you specify which state you're in? Election rules vary widely by state.";
    
    if (lowerText.includes('register') || lowerText.includes('registration') || lowerText.includes('sign up')) {
        response = "To register to vote, you typically need to be a U.S. citizen, meet your state's residency requirements, and be 18 by Election Day. Many states allow online registration through vote.gov. Check your local state guidelines for exact deadlines!";
    } else if (lowerText.includes('early') || lowerText.includes('mail') || lowerText.includes('absentee')) {
        response = "Early voting and mail-in voting rules depend heavily on your state. Some states mail ballots to all registered voters automatically, while others require you to request an absentee ballot with a valid excuse. Be sure to check your state's specific deadlines for requesting and returning ballots.";
    } else if (lowerText.includes('day') || lowerText.includes('when is') || lowerText.includes('date')) {
        response = "Election Day is officially the first Tuesday following the first Monday in November. On this day, polls are open across the country for in-person voting. If you are in line when polls close, you legally must be allowed to vote.";
    } else if (lowerText.includes('id') || lowerText.includes('identification') || lowerText.includes('bring')) {
        response = "Voter ID laws vary. About two-thirds of states require some form of identification at the polls. Some require a photo ID, some accept non-photo ID, and others require no ID at all to vote in person. Always check your local election office website before heading to the polls.";
    } else if (lowerText.includes('provisional')) {
        response = "A provisional ballot is used to record a vote when there are questions about a given voter's eligibility that must be resolved before the vote can count. If your name isn't on the roster, you have the right to request one!";
    }

    addMessage(response, 'assistant');
}
