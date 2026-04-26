/* ─── Element refs ─── */
const fab = document.getElementById("chat-fab");
const panel = document.getElementById("chat-panel");
const closeBtn = document.getElementById("close-panel");
const messages = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const quickWrap = document.getElementById("quick-replies");
const iconChat = document.getElementById("icon-chat");
const iconClose = document.getElementById("icon-close");
const notifBadge = document.getElementById("notif-badge");
const fabTip = document.getElementById("fab-tip");

let open = false;
let firstOpen = true;
let chatHistory = [];      // will store { role, content }
let userName = null;       // extracted from conversation

/* ─── Show tooltip briefly on load ─── */
setTimeout(() => {
  fabTip.classList.add("show");
  setTimeout(() => fabTip.classList.remove("show"), 3800);
}, 1200);

/* ─── Toggle panel ─── */
function togglePanel() {
  open = !open;
  panel.classList.toggle("visible", open);
  fab.classList.toggle("open", open);
  iconChat.classList.toggle("hide", open);
  iconClose.classList.toggle("hide", !open);

  if (open) {
    notifBadge.style.display = "none";
    fabTip.classList.remove("show");
    if (firstOpen) {
      firstOpen = false;
      greet();
    }
    setTimeout(() => input.focus(), 320);
  }
}
fab.addEventListener("click", togglePanel);
closeBtn.addEventListener("click", togglePanel);

/* ─── Bot greeting ─── */
function greet() {
  const greeting = "Hey there! 👋 I'm ConanoAI, your assistant. What can I help you with today?";
  addMsg("bot", greeting);
  chatHistory.push({ role: "assistant", content: greeting });
  showContextualQuickReplies("greeting");
}

/* ─── Add message bubble ─── */
function addMsg(role, text) {
  const wrap = document.createElement("div");
  wrap.className = `msg ${role}`;

  if (role === "bot") {
    const av = document.createElement("div");
    av.className = "msg-avatar";
    av.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="13" rx="4" fill="white" fill-opacity="0.85"/>
          <circle cx="9" cy="12" r="1.8" fill="#00d4aa"/>
          <circle cx="15" cy="12" r="1.8" fill="#0099ff"/>
        </svg>`;
    wrap.appendChild(av);
  }

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;
  wrap.appendChild(bubble);
  messages.appendChild(wrap);
  scrollBottom();
  return wrap;
}

/* ─── Typing effect for bot messages ─── */
async function typeOut(bubble, text, speed = 25) {
  for (let i = 0; i < text.length; i++) {
    bubble.textContent += text.charAt(i);
    scrollBottom();
    await new Promise(r => setTimeout(r, speed));
  }
}

/* ─── Add typing indicator (returns wrapper so we can remove later) ─── */
function addTyping() {
  const wrap = document.createElement("div");
  wrap.className = "msg bot";
  const av = document.createElement("div");
  av.className = "msg-avatar";
  av.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="4" fill="white" fill-opacity="0.85"/>
        <circle cx="9" cy="12" r="1.8" fill="#00d4aa"/>
        <circle cx="15" cy="12" r="1.8" fill="#0099ff"/>
      </svg>`;
  wrap.appendChild(av);
  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  wrap.appendChild(bubble);
  messages.appendChild(wrap);
  scrollBottom();
  return wrap;
}

/* ─── Scroll to bottom ─── */
function scrollBottom() {
  requestAnimationFrame(() => {
    messages.scrollTop = messages.scrollHeight;
  });
}

/* ─── Detect user's name from message ─── */
function extractName(text) {
  const patterns = [
    /my name is (\w+)/i,
    /i'm (\w+)/i,
    /i am (\w+)/i,
    /call me (\w+)/i,
  ];
  for (const p of patterns) {
    const match = text.match(p);
    if (match) return match[1];
  }
  return null;
}

/* ─── Show relevant quick replies after bot response ─── */
function showContextualQuickReplies(topic) {
  quickWrap.innerHTML = '';
  const sets = {
    greeting: [
      'What services do you offer?',
      'Tell me about Conano',
      'How much experience do you have?',
      'I have a project in mind'
    ],
    services: [
      'Full-stack development details',
      'UI/UX design details',
      'Mobile app development',
      'Cloud & DevOps'
    ],
    experience: [
      'How many projects have you done?',
      'What technologies do you use?',
      'Are you available for freelance?'
    ],
    contact: [
      'How can I reach you?',
      'WhatsApp number',
      'Email address'
    ],
    default: [
      'Tell me more about Conano',
      'What is your pricing?',
      'How do you handle deadlines?'
    ]
  };
  const buttons = sets[topic] || sets.default;
  buttons.forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'quick-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => {
      sendMessage(text);
    });
    quickWrap.appendChild(btn);
  });
}

/* ─── FAQ responses (still used as first line of defence) ─── */
/* ─── FAQ responses (Knowledge Base) ─── */
const responses = {
  "say hi": [
    "Hello! Great to meet you 😊 I'm ConanoAI. What brings you here today?",
    "Hi there! How can I make your day better? I'm here to help with any project inquiries."
  ],
  "what services do you offer?": [
    "Conano specializes in high-end Full-stack Development, UI/UX Design, Mobile App Development, and Cloud/DevOps solutions. We build everything from sleek websites to complex enterprise systems."
  ],
  "tell me about conano": [
    "Conano is a software development power-house founded by Enoch John. We focus on delivering premium digital experiences with a focus on performance, scalability, and stunning aesthetics."
  ],
  "how much experience do you have?": [
    "Our team has over 5 years of industry experience, having successfully delivered 50+ projects ranging from fintech apps to creative portfolios."
  ],
  "i have a project in mind": [
    "That's exciting! 🚀 We'd love to hear more. Are you looking for web development, a mobile app, or a complete brand design?"
  ],
  "full-stack development details": [
    "We use modern stacks like React, Next.js, Node.js, and Python to build robust, scalable applications. Whether it's a custom CRM or a social platform, we've got you covered."
  ],
  "ui/ux design details": [
    "Our design philosophy is 'Aesthetics meets Function'. We create intuitive, high-fidelity interfaces that wow users and drive engagement."
  ],
  "mobile app development": [
    "We build native and cross-platform apps (Flutter/React Native) that feel smooth and professional on both iOS and Android."
  ],
  "cloud & devops": [
    "From AWS/Azure setup to Dockerizing your workflow, we ensure your applications are secure, fast, and always online."
  ],
  "how many projects have you done?": [
    "To date, we've completed over 50 projects across various industries including E-commerce, Healthcare, and Creative Arts."
  ],
  "what technologies do you use?": [
    "Our toolkit includes JavaScript (React, Vue), Python, Kotlin, Flutter, and cloud platforms like AWS and Firebase. We always pick the best tool for the specific job."
  ],
  "are you available for freelance?": [
    "Yes! We are currently open for new projects. Feel free to reach out via the contact form or WhatsApp."
  ],
  "how can i reach you?": [
    "You can reach us directly via email at ejidoko75@gmail.com, or call/WhatsApp us at +2348188416922. We're also active on LinkedIn!"
  ],
  "whatsapp number": [
    "You can reach Enoch John on WhatsApp at +2348188416922 for a quick chat about your project."
  ],
  "email address": [
    "Our official contact email is ejidoko75@gmail.com. We typically respond within 24 hours."
  ],
  "contact us": [
    "You can reach our team at ejidoko75@gmail.com or call +2348188416922. We're available 24/7 to discuss your next big idea. 📞"
  ],
  "what can you do": [
    "I can answer questions about Conano's services, experience, and portfolio. I can also help you start a project or find contact details!"
  ],
  "pricing": [
    "Our pricing is project-based. We provide custom quotes after a brief discovery call to understand your specific needs and timeline."
  ],
  "deadlines": [
    "We take deadlines very seriously. Our process includes clear milestones and regular updates to ensure everything stays on track."
  ]
};

/* ─── Get bot reply: FAQ → backend API with full history ─── */
async function getReply(text) {
  const t = text.toLowerCase().trim();
  
  // 1. Try exact or partial matches from our Knowledge Base (responses)
  for (const [key, val] of Object.entries(responses)) {
    if (t === key || t.includes(key)) {
      const arr = Array.isArray(val) ? val : [val];
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }

  // 2. If no direct match, attempt to call the AI backend
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
      signal: controller.signal,
    });
    
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return data.reply?.trim() || "I'm processing your request. Could you please elaborate? 😊";
    }

    // Handle specific server errors gracefully
    if (res.status === 401) {
      console.warn("AI Backend: Invalid API Key.");
    } else if (res.status === 404) {
      console.warn("AI Backend: Endpoint not found. Ensure server is running.");
    }
    
    throw new Error(`Server status: ${res.status}`);

  } catch (err) {
    clearTimeout(timeout);
    console.error("Chat Error:", err.message);

    // 3. Fallback: If AI fails, provide a smart "Offline" response instead of just an error
    if (t.includes("project") || t.includes("help") || t.includes("work")) {
      return "I'd love to discuss that! While I'm having a slight connection issue with my AI brain, I can tell you that we specialize in custom digital solutions. Would you like our WhatsApp or Email?";
    }
    
    return "I'm here! My connection to the AI cloud is a bit shaky right now, but I'm still happy to chat about Conano's services or contact details. What can I help with?";
  }
}

/* ─── Handle sending a message ─── */
async function sendMessage(text) {
  text = text.trim();
  if (!text) return;

  quickWrap.innerHTML = '';
  addMsg("user", text);
  chatHistory.push({ role: "user", content: text });

  // Check if user told us their name
  const possibleName = extractName(text);
  if (possibleName && !userName) {
    userName = possibleName;
  }

  input.value = "";
  input.style.height = "auto";
  sendBtn.disabled = true;

  const typingWrap = addTyping();
  const replyText = await getReply(text);
  typingWrap.remove();

  // Add bot message and animate typing
  const botMsgWrap = addMsg("bot", "");
  const bubble = botMsgWrap.querySelector(".msg-bubble");
  await typeOut(bubble, replyText, 20);

  chatHistory.push({ role: "assistant", content: replyText });

  // Determine topic for quick replies
  let topic = "default";
  if (text.includes("service") || text.includes("offer") || text.includes("provide")) topic = "services";
  else if (text.includes("experience") || text.includes("years") || text.includes("project")) topic = "experience";
  else if (text.includes("contact") || text.includes("email")  ||text.includes("phone") || text.includes("call")  || text.includes("message") || text.includes("price/plan/pricing") || text.includes("whatsapp")) topic = "contact";
  showContextualQuickReplies(topic);

  sendBtn.disabled = false;
  input.focus();
}

/* ─── Quick reply buttons (initial static ones replaced by context) ─── */
quickWrap.querySelectorAll(".quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const clean = btn.textContent.replace(/^[\p{Emoji}\s]+/u, "").trim();
    sendMessage(clean);
  });
});

/* ─── Send button ─── */
sendBtn.addEventListener("click", () => sendMessage(input.value));

/* ─── Enter key (Shift+Enter = newline) ─── */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage(input.value);
  }
});

/* ─── Auto-resize textarea ─── */
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 100) + "px";
});