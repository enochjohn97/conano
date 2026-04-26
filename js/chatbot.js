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
const responses = {
  "say hi": [
    "Hello! Great to meet you 😊 What brings you here today?",
    "Hi there! How can I make your day better?"
  ],
  // ... (keep all the existing FAQ entries from your previous code, I'll abbreviate)
  // For brevity, I'll keep a few important ones; you can paste the full object from earlier.
  "contact us": [
    "You can reach our team at ejidoko75@gmail.com or call +2348188416922. We're available 24/7. 📞"
  ],
  "what can you do": [
    "I can answer questions about Conano's services, experience, portfolio, and guide you through our capabilities."
  ],
};

/* ─── Get bot reply: FAQ → backend API with full history ─── */
async function getReply(text) {
  const t = text.toLowerCase().trim();
  // Try FAQ first
  for (const [key, val] of Object.entries(responses)) {
    if (t.includes(key.toLowerCase())) {
      const arr = Array.isArray(val) ? val : [val];
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }

  // Backend call with full history
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      if (res.status === 401) throw new Error("Invalid API key");
      if (res.status === 429) throw new Error("Rate limited");
      throw new Error(`Server error (${res.status})`);
    }
    const data = await res.json();
    return data.reply?.trim() || "I'm not sure how to answer that. Could you rephrase? 😊";
  } catch (err) {
    clearTimeout(timeout);
    console.error("Backend fetch error:", err.message);
    if (err.name === "AbortError") return "Hmm, my brain is taking a bit long today. Could you try again? ⏳";
    if (err.message.includes("Invalid API key") || err.message.includes("401"))
      return "I'm having a little trouble accessing my knowledge base right now. Please try again in a moment.";
    return "I'm experiencing a hiccup. Could you try asking that again? 🤖";
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