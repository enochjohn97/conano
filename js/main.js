/* ── CURSOR ── */
var cur = document.getElementById("cursor"),
  ring = document.getElementById("cursorRing");
var mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouch) {
  document.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
    cur.style.transform = "translate3d(" + mx + "px, " + my + "px, 0)";
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = "translate3d(" + rx + "px, " + ry + "px, 0)";
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
} else {
  if (cur) cur.style.display = "none";
  if (ring) ring.style.display = "none";
}

/* ── PRELOADER ── */
var pct = 0;
var pctEl = document.getElementById("prePct");
var pctInt = setInterval(function () {
  pct += Math.floor(Math.random() * 12) + 4;
  if (pct >= 100) {
    pct = 100;
    clearInterval(pctInt);
  }
  if (pctEl) pctEl.textContent = pct + "%";
}, 120);
window.addEventListener("load", function () {
  setTimeout(function () {
    var preloader = document.getElementById("preloader");
    if (preloader) preloader.classList.add("done");
  }, 2400);
});

/* ── NAVBAR & SCROLL ── */
var nb = document.getElementById("navbar"),
  btt = document.getElementById("btt");
var sections = [];
var navLinks = [];

function updateScrollData() {
  sections = Array.from(document.querySelectorAll("section[id]")).map(function(s) {
    return { id: s.id, offset: s.offsetTop };
  });
  navLinks = document.querySelectorAll(".nav-links a");
}

window.addEventListener("load", updateScrollData);
window.addEventListener("resize", updateScrollData);

var scrollTicking = false;
window.addEventListener("scroll", function () {
  if (!scrollTicking) {
    window.requestAnimationFrame(function() {
      var y = window.scrollY;
      if (nb) nb.classList.toggle("stuck", y > 60);
      if (btt) btt.classList.toggle("show", y > 400);
      
      var currentSec = "";
      for (var i = 0; i < sections.length; i++) {
        if (y >= sections[i].offset - 140) {
          currentSec = sections[i].id;
        }
      }
      
      navLinks.forEach(function (l) {
        l.classList.remove("active");
        if (l.getAttribute("href") === "#" + currentSec) l.classList.add("active");
      });
      
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

/* ── MOBILE MENU ── */
var hbg = document.getElementById("hbg"),
  mob = document.getElementById("mobNav"),
  isOpen = false;
function openMob() {
  isOpen = true;
  if (mob) mob.classList.add("open");
  if (hbg) {
    hbg.classList.add("open");
    hbg.setAttribute("aria-expanded", "true");
  }
  document.body.style.overflow = "hidden";
}
function closeMob() {
  isOpen = false;
  if (mob) mob.classList.remove("open");
  if (hbg) {
    hbg.classList.remove("open");
    hbg.setAttribute("aria-expanded", "false");
  }
  document.body.style.overflow = "";
}
if (hbg) {
  hbg.addEventListener("click", function (e) {
    e.stopPropagation();
    isOpen ? closeMob() : openMob();
  });
}
if (mob) {
  mob.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMob);
  });
}
document.addEventListener("click", function (e) {
  if (isOpen && mob && !mob.contains(e.target) && hbg && !hbg.contains(e.target)) closeMob();
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
if (codeEl) {
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
}

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
  if (btn) btn.classList.add("active");
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
        if (!cats.split(" ").includes(cat) && btn && btn.classList.contains("active"))
          item.style.display = "none";
      }, 310);
    }
  });
}

/* ── TESTIMONIALS CAROUSEL ── */
var tTrack = document.getElementById("testiTrack");
var tcards = tTrack ? tTrack.querySelectorAll(".tcard") : [];
var tDotsEl = document.getElementById("tDots");
var ti = 0;

function getTvis() {
  return window.innerWidth <= 700 ? 1 : window.innerWidth <= 900 ? 1 : 2;
}

function setTCardWidths() {
  if (!tTrack) return;
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
  if (!tDotsEl) return;
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
  if (!tTrack || tcards.length === 0) return;
  var vis = getTvis(),
    pages = Math.ceil(tcards.length / vis);
  ti = Math.max(0, Math.min(i, pages - 1));
  var w = tcards[0].offsetWidth + 24;
  tTrack.style.transform = "translateX(-" + ti * vis * w + "px)";
  document.querySelectorAll(".tcdot").forEach(function (d, idx) {
    d.classList.toggle("active", idx === ti);
  });
}

var tPrevBtn = document.getElementById("tPrev");
if (tPrevBtn) {
  tPrevBtn.addEventListener("click", function () {
    goTesti(ti - 1);
  });
}
var tNextBtn = document.getElementById("tNext");
if (tNextBtn) {
  tNextBtn.addEventListener("click", function () {
    goTesti(ti + 1);
  });
}

var tAuto = setInterval(function () {
  goTesti((ti + 1) % Math.ceil(tcards.length / getTvis()));
}, 5000);

if (tTrack) {
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
}

window.addEventListener("load", function () {
  setTCardWidths();
});
window.addEventListener("resize", function () {
  setTCardWidths();
});

/* ── CONTACT FORM (EMAIL ONLY) ── */
if (typeof emailjs !== 'undefined') {
  (function () {
    emailjs.init("crnq9Em4AJPFtVoeQ");
  })();
}

function submitForm() {
  var name    = document.getElementById("fName").value.trim();
  var email   = document.getElementById("fEmail").value.trim();
  var subject = document.getElementById("fSubject").value;
  var message = document.getElementById("fMessage").value.trim();

  // Basic validation
  if (!name) {
    document.getElementById("fName").style.borderColor = "rgba(244,244,244,.4)";
    document.getElementById("fName").focus();
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

  // Prepare email params
  var emailParams = {
    from_name: name,
    reply_to: email,
    subject: subject,
    message: message
  };

  var submitBtn = document.querySelector(".fsub");
  var originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
  submitBtn.disabled = true;

  emailjs.send("service_ijqcqy8", "template_36qqoqc", emailParams)
    .then(function () {
      document.getElementById("contactForm").style.display = "none";
      document.getElementById("formOk").style.display = "block";
    })
    .catch(function (error) {
      console.error("Email send failed:", error);
      alert("Oops! Something went wrong. Please try again.");
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    });
}