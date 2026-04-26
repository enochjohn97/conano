/* ── CURSOR ── */
var cur = document.getElementById("cursor"),
  ring = document.getElementById("cursorRing");
var mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", function (e) {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();
document
  .querySelectorAll(
    "a,button,.skill-card,.svc-card,.port-item,.art-card,.tcard",
  )
  .forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      cur.classList.add("expand");
      ring.classList.add("expand");
    });
    el.addEventListener("mouseleave", function () {
      cur.classList.remove("expand");
      ring.classList.remove("expand");
    });
  });

/* ── PRELOADER ── */
var pct = 0;
var pctEl = document.getElementById("prePct");
var pctInt = setInterval(function () {
  pct += Math.floor(Math.random() * 12) + 4;
  if (pct >= 100) {
    pct = 100;
    clearInterval(pctInt);
  }
  pctEl.textContent = pct + "%";
}, 120);
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("preloader").classList.add("done");
  }, 2400);
});

/* ── NAVBAR ── */
var nb = document.getElementById("navbar"),
  btt = document.getElementById("btt");
window.addEventListener("scroll", function () {
  var y = window.scrollY;
  nb.classList.toggle("stuck", y > 60);
  btt.classList.toggle("show", y > 400);
  var secs = document.querySelectorAll("section[id]");
  var links = document.querySelectorAll(".nav-links a");
  var cur = "";
  secs.forEach(function (s) {
    if (y >= s.offsetTop - 140) cur = s.id;
  });
  links.forEach(function (l) {
    l.classList.remove("active");
    if (l.getAttribute("href") === "#" + cur) l.classList.add("active");
  });
});

/* ── MOBILE MENU ── */
var hbg = document.getElementById("hbg"),
  mob = document.getElementById("mobNav"),
  isOpen = false;
function openMob() {
  isOpen = true;
  mob.classList.add("open");
  hbg.classList.add("open");
  hbg.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeMob() {
  isOpen = false;
  mob.classList.remove("open");
  hbg.classList.remove("open");
  hbg.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}
hbg.addEventListener("click", function (e) {
  e.stopPropagation();
  isOpen ? closeMob() : openMob();
});
mob.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", closeMob);
});
document.addEventListener("click", function (e) {
  if (isOpen && !mob.contains(e.target) && !hbg.contains(e.target)) closeMob();
});
window.addEventListener("resize", function () {
  if (window.innerWidth > 900) closeMob();
});

/* ── HERO CODE ANIMATION ── */
var codeLines = [
  '<span class="c-kw">const</span> <span class="c-fn">developer</span> = {',
  '  name: <span class="c-str">"Enoch John"</span>,',
  '  studio: <span class="c-str">"Conano"</span>,',
  '  <span class="c-kw">role</span>: <span class="c-str">"Full-Stack Developer"</span>,',
  '  experience: <span class="c-num">5</span> + <span class="c-str">" years"</span>,',
  '  skills: [<span class="c-str">"Java"</span>, <span class="c-str">"Kotlin"</span>, <span class="c-str">"C#.."</span>],',
  '  <span class="c-fn">build</span>: (idea) => <span class="c-fn">elegantSolution</span>(idea),',
  '  available: <span class="c-kw">true</span>,  <span class="c-cm">// hire me!</span>',
  "};",
];
var codeEl = document.getElementById("heroCode");
codeLines.forEach(function (line, i) {
  var span = document.createElement("span");
  span.className = "code-line";
  span.innerHTML = line || "&nbsp;";
  codeEl.appendChild(span);
  setTimeout(
    function () {
      span.classList.add("visible");
    },
    1400 + i * 180,
  );
});

/* ── SCROLL REVEAL ── */
var rvEls = document.querySelectorAll(".rv,.rvl,.rvr");
var rvObs = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add("v");
    });
  },
  { threshold: 0.1 },
);
rvEls.forEach(function (el) {
  rvObs.observe(el);
});

/* ── SKILL BARS ── */
var skObs = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var bar = e.target.querySelector(".sk-level-bar");
        var lvl = e.target.dataset.level;
        if (bar && lvl) bar.style.width = lvl + "%";
        skObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll(".skill-card").forEach(function (c) {
  skObs.observe(c);
});

/* ── PORTFOLIO FILTER ── */
function filterPort(cat, btn) {
  document.querySelectorAll(".pf").forEach(function (b) {
    b.classList.remove("active");
  });
  btn.classList.add("active");
  document.querySelectorAll(".port-item").forEach(function (item) {
    var cats = item.dataset.cat || "";
    var show = cat === "all" || cats.split(" ").includes(cat);
    item.style.transition = "opacity .3s,transform .3s";
    if (show) {
      item.style.opacity = "1";
      item.style.transform = "";
      item.style.display = "";
    } else {
      item.style.opacity = "0";
      setTimeout(function () {
        if (!cats.split(" ").includes(cat) && btn.classList.contains("active"))
          item.style.display = "none";
      }, 310);
    }
  });
}

/* ── TESTIMONIALS CAROUSEL ── */
var tTrack = document.getElementById("testiTrack");
var tcards = tTrack.querySelectorAll(".tcard");
var tDotsEl = document.getElementById("tDots");
var ti = 0;

function getTvis() {
  return window.innerWidth <= 700 ? 1 : window.innerWidth <= 900 ? 1 : 2;
}

function setTCardWidths() {
  var vis = getTvis(),
    gap = 24;
  var total = tTrack.parentElement.offsetWidth;
  var w = (total - (vis - 1) * gap) / vis;
  tcards.forEach(function (c) {
    c.style.width = w + "px";
  });
  buildTDots();
  goTesti(0);
}

function buildTDots() {
  tDotsEl.innerHTML = "";
  var vis = getTvis();
  var pages = Math.ceil(tcards.length / vis);
  for (var i = 0; i < pages; i++) {
    (function (idx) {
      var d = document.createElement("button");
      d.className = "tcdot" + (idx === 0 ? " active" : "");
      d.addEventListener("click", function () {
        goTesti(idx);
      });
      tDotsEl.appendChild(d);
    })(i);
  }
}

function goTesti(i) {
  var vis = getTvis(),
    pages = Math.ceil(tcards.length / vis);
  ti = Math.max(0, Math.min(i, pages - 1));
  var w = tcards[0].offsetWidth + 24;
  tTrack.style.transform = "translateX(-" + ti * vis * w + "px)";
  document.querySelectorAll(".tcdot").forEach(function (d, idx) {
    d.classList.toggle("active", idx === ti);
  });
}

document.getElementById("tPrev").addEventListener("click", function () {
  goTesti(ti - 1);
});
document.getElementById("tNext").addEventListener("click", function () {
  goTesti(ti + 1);
});

var tAuto = setInterval(function () {
  goTesti((ti + 1) % Math.ceil(tcards.length / getTvis()));
}, 5000);
tTrack.addEventListener("mouseenter", function () {
  clearInterval(tAuto);
});
tTrack.addEventListener("mouseleave", function () {
  tAuto = setInterval(function () {
    goTesti((ti + 1) % Math.ceil(tcards.length / getTvis()));
  }, 5000);
});

// touch
var tsx = 0;
tTrack.addEventListener(
  "touchstart",
  function (e) {
    tsx = e.touches[0].clientX;
  },
  { passive: true },
);
tTrack.addEventListener("touchend", function (e) {
  var d = tsx - e.changedTouches[0].clientX;
  if (Math.abs(d) > 40) d > 0 ? goTesti(ti + 1) : goTesti(ti - 1);
});

window.addEventListener("load", function () {
  setTCardWidths();
});
window.addEventListener("resize", function () {
  setTCardWidths();
});

/* ── CONTACT FORM (EMAIL + WHATSAPP) ── */
(function () {
  // Initialize EmailJS with your public key
  emailjs.init("crnq9Em4AJPFtVoeQ");
})();


//submit message function
function submitForm() {
  // --- Grab values ---
  var name    = document.getElementById("fName").value.trim();
  var email   = document.getElementById("fEmail").value.trim();
  var subject = document.getElementById("fSubject").value;
  var budget  = document.getElementById("fBudget").value;
  var message = document.getElementById("fMessage").value.trim();

  // --- Basic validation ---
  var nameInput = document.getElementById("fName");
  if (!name) {
    nameInput.style.borderColor = "rgba(244,244,244,.4)";
    nameInput.focus();
    return;
  }
  if (!email) {
    document.getElementById("fEmail").style.borderColor = "rgba(244,244,244,.4)";
    document.getElementById("fEmail").focus();
    return;
  }
  if (!subject) {
    document.getElementById("fSubject").style.borderColor = "rgba(244,244,244,.4)";
    return;
  }
  if (!message) {
    document.getElementById("fMessage").style.borderColor = "rgba(244,244,244,.4)";
    document.getElementById("fMessage").focus();
    return;
  }

  // --- Prepare email data ---
  var emailParams = {
    from_name: name,
    reply_to: email,
    subject: subject,
    budget: budget,
    message: message
  };

  // --- Prepare WhatsApp message (detailed version) ---
  var whatsappText =
    "📩 *New Contact Form Message* %0A" +
    "👤 *Name:* " + encodeURIComponent(name) + "%0A" +
    "📧 *Email:* " + encodeURIComponent(email) + "%0A" +
    "📌 *Subject:* " + encodeURIComponent(subject) + "%0A" +
    "💰 *Budget:* " + encodeURIComponent(budget) + "%0A" +
    "💬 *Message:* " + encodeURIComponent(message);

  // --- Replace this with your actual CallMeBot API key ---
  // var callMeBotKey = "YOUR_CALLMEBOT_API_KEY";

  // --- Show loading state ---
  var submitBtn = document.querySelector(".fsub");
  var originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
  submitBtn.disabled = true;

  // --- Send both in parallel ---
  var emailPromise = emailjs.send("service_ijqcqy8", "template_36qqoqc", emailParams);

  // var whatsappPromise = fetch(
  //   "https://api.callmebot.com/whatsapp.php?" +
  //   "phone=2348188416922" +          // <-- your number, no + sign
  //   "&text=" + whatsappText +
  //   "&apikey=" + callMeBotKey
  // );

  Promise.all([emailPromise, whatsappPromise])
    .then(function () {
      // Success – show the thank-you message
      document.getElementById("contactForm").style.display = "none";
      document.getElementById("formOk").style.display = "block";
    })
    .catch(function (error) {
      console.error("Send failed:", error);
      // Restore button and optionally show an error message
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      alert("Oops! Something went wrong. Please try again.");
    });
}
