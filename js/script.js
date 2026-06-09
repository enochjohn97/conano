(function() {
  // ---------- IMAGES PATH ----------
  const IMG_BASE = './assets/work/';   // adjust if your images are elsewhere

  // ---------- PROJECT DATA (40+ items, only allowed tech stacks) ----------
  const projectsData = [
    { name: "Productivity Dashboard", cat: "UI/UX", img: "Clean & Modern App UI Concept for Digital Products.jpg", desc: "Task management with calendar & progress tracker.", tech: ["Figma", "Flutter", "PostgreSQL"] },
    { name: "Coffee Ordering App", cat: "Mobile", img: "Coffee Shop Mobile App UIUX Design _ Coffee Ordering Mobile App UIUX Design _ App UIUX Design.jpg", desc: "Seamless ordering with e-receipt & cart.", tech: ["Flutter", "Firebase", "Stripe"] },
    { name: "Consulting Theme", cat: "Web", img: "Consulting WordPress Theme.jpg", desc: "Business consulting service showcase.", tech: ["HTML", "Bootstrap/CSS", "JavaScript"] },
    { name: "Sign-Up Flow", cat: "Design", img: "Crafting Seamless Sign-Ups_ UI Design Mobile  Experience.jpg", desc: "Minimal mobile sign-up experience.", tech: ["Figma", "Flutter", "MySQL"] },
    { name: "Admin Dashboard", cat: "Web", img: "dashboard.jpg", desc: "Event management dashboard with analytics.", tech: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"] },
    { name: "Account Creation", cat: "Desktop", img: "design.jpg", desc: "Multi-step registration form.", tech: ["Figma", "Java", "PostgreSQL", "Google APIs"] },
    { name: "eCourse Platform", cat: "Desktop", img: "desktop.jpg", desc: "Online learning management system.", tech: ["C#", "MySQL", "Entity Framework", "Figma"] },
    { name: "Workspace Tasks", cat: "Desktop", img: "desktop2.jpg", desc: "Project tracking & task lists.", tech: ["Java", "MySQL", "Figma"] },
    { name: "Google Drive Clone", cat: "Desktop", img: "desktop3.jpg", desc: "Cloud storage file manager.", tech: ["Java", "PostgreSQL", "Google APIs", "Socket"] },
    { name: "Doctor Booking", cat: "Mobile", img: "download.jpg", desc: "Appointment scheduler with calendar.", tech: ["Flutter", "Paystack", "Socket"] },
    { name: "English School Landing", cat: "Web", img: "English school — landing page design - Irina Nenasheva.jpg", desc: "Language learning promo site.", tech: ["HTML", "JavaScript", "Bootstrap/CSS"] },
    { name: "Health Enrollment", cat: "Mobile", img: "Enrollment Health App UI Front Black Flag Creative_jpg by Black Flag Creative.jpg", desc: "Insurance verification & appointments.", tech: ["Figma", "Flutter", "Kotlin", "Firebase"] },
    { name: "Real Estate Holiday", cat: "Web", img: "Get Your Real Estate Agency Website – Bold & Professional Design.jpg", desc: "Vacation property showcase.", tech: ["PHP", "MySQL", "CSS", "JavaScript", "HTMl"] },
    { name: "Healthcare Patient", cat: "Mobile", img: "Healthcare UI_UX Design_ Enhancing Patient Engagement _.jpg", desc: "Doctor search & appointment UI.", tech: ["Flutter", "Google APIs", "Stripe"] },
    { name: "Legal Services", cat: "Web", img: "High Conversion Landing Page Design Ideas (1).jpg", desc: "Law firm conversion landing page.", tech: ["HTML", "CSS", "JavaScript"] },
    { name: "Roofing Services", cat: "Web", img: "High Conversion Landing Page Design Ideas.jpg", desc: "Construction & repair services.", tech: ["Bootstrap/CSS", "PHP", "PostgreSQL", "JavaScript", "HTML"] },
    { name: "Service App", cat: "Mobile", img: "Landing Page Design Tips for High Conversions.jpg", desc: "On-demand home services app UI.", tech: ["Figma", "Flutter", "PostgreSQL", "Google APIs" ] },
    { name: "Engineering & Construction", cat: "Web", img: "Luxury Engineering & Construction Brand Design _ Corporate Website.jpg", desc: "Corporate brand site.", tech: ["HTML", "CSS", "JavaScript", "Google APIs"] },
    { name: "Travel Chat App", cat: "Mobile", img: "mobile.jpg", desc: "Social travel planning & chat.", tech: ["Flutter", "Socket", "Firebase"] },
    { name: "Watch Product", cat: "E-commerce", img: "mobile2.jpg", desc: "Luxury watch store UI.", tech: ["Figma", "Stripe", "PostgreSQL", "Google APIs"] },
    { name: "Coffee Drink Finder", cat: "Mobile", img: "Modern design idea Coffee.jpg", desc: "Beverage search & ordering.", tech: ["Flutter", "Paystack", "Google APIs"] },
    { name: "Banking App", cat: "Mobile", img: "Mulia Ningsih_Mahasiswa Unpix.jpg", desc: "Digital wallet & transactions.", tech: ["Kotlin", "Firebase", "Socket", "Flutter"] },
    { name: "Organic Food Store", cat: "E-commerce", img: "Ogenix - Organic Food Store WordPress Theme.jpg", desc: "Fresh produce e-commerce.", tech: ["PHP", "MySQL", "Stripe", "CSS", "HTML"] },
    { name: "Pest Control", cat: "Web", img: "Pest Control Website Design — Safe & Reliable Extermination UI Inspiration.jpg", desc: "Service booking platform.", tech: ["HTML", "CSS", "Bootstrap", "Paystack"] },
    { name: "Project Management", cat: "Mobile", img: "Professional Management Application.jpg", desc: "Team progress dashboard.", tech: ["Flutter", "PostgreSQL", "Figma", "Socket"] },
    { name: "Dream Homes", cat: "Web", img: "Real Estate Landing Page - Hero Section.jpg", desc: "Luxury property search.", tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"] },
    { name: "Real Estate Search", cat: "Web", img: "Real Estate Web Design _ Web Site Design.jpg", desc: "Advanced property filtering.", tech: ["PHP", "MySQL", "JavaScript", "HTMl", "Bootstrap/CSS"] },
    { name: "Expert Realtors", cat: "Web", img: "realestate.jpg", desc: "Agent profiles & listings.", tech: ["Bootstrap", "Python", "PostgreSQL"] },
    { name: "Banking Card Dashboard", cat: "Design", img: "The PixBow - Graphic design _ T-shirt design _ Book cover design _ Trifold design in Dhaka, Bangladesh.jpg", desc: "Virtual card & spending stats.", tech: ["Figma", "Flutter", "MySQL"] },
    { name: "Wellness Sign Up", cat: "Design", img: "User-Friendly Sign Up for Aether Wellness App.jpg", desc: "Smooth onboarding for health app.", tech: ["Figma", "Flutter", "MySQL"] },
    { name: "Furniture Store", cat: "E-commerce", img: "Visit Now_ Transform Your Space with Our Figma Furniture Templates.jpg", desc: "Modern furniture store.", tech: ["HTML", "CSS", "JavaScript", "Stripe", "PHP", "MySQL"] },
    { name: "Freelance Portfolio", cat: "Design", img: "website2.jpg", desc: "Creative developer showcase.", tech: ["Figma", "HTML", "Bootstrap/CSS", "JavaScript"] },
    { name: "Nigerian Food Delivery", cat: "Web", img: "website3.png", desc: "Authentic cuisine ordering.", tech: ["HTML", "CSS", "JavaScript"] },
    { name: "Life Skills Academy", cat: "Web", img: "website4.png", desc: "Youth leadership courses.", tech: ["HTML", "JavaScript", "CSS"] },
    { name: "Headphone Store", cat: "E-commerce", img: "#ui #ux #design #interface #Adobe #AdobeIlustrator….jpg", desc: "Product page with reviews.", tech: ["Figma", "Flutter", "MySQL", "Stripe"] },
    { name: "Finance Dashboard", cat: "Desktop", img: "48695239716042903.jpg", desc: "Crypto & spending analytics.", tech: ["Java", "MySQL", "Google APIs", "Socket"] },
    { name: "Justice Campaign", cat: "Web", img: "725361083767111845.jpg", desc: "Non-profit awareness site.", tech: ["Figma", "HTML", "JavaScript", "CSS"] },
    { name: "Learn House", cat: "Web", img: "1103100502508615460.jpg", desc: "Online course platform.", tech: ["PHP (Symfony)", "MySQL", "Socket"] },
    { name: "Restaurant Finder", cat: "Web", img: "Beautiful Restaurant Finder Web Template.jpg", desc: "Nearby dining discovery.", tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"] },
    { name: "Travel Booking", cat: "Mobile", img: "941674603352362773.jpg", desc: "Flight & hotel reservations.", tech: ["Flutter", "MySQL", "Socket", "Paystack",] },
  ];

  // Helper: encode image filename for URL safety
  function encodeImgName(name) {
    return encodeURIComponent(name);
  }

  // Build slides: group projects into chunks of 4
  function buildSlides() {
    const slides = [];
    for (let i = 0; i < projectsData.length; i += 4) {
      slides.push(projectsData.slice(i, i + 4));
    }
    return slides;
  }

  let slides = buildSlides();
  let currentIndex = 0;
  let slideAnimations = ['slide-animation-pop', 'slide-animation-fade', 'slide-animation-blur', 'slide-animation-rotate'];
  let currentAnimClass = '';

  // DOM elements
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  // Render all slides into track
  function renderCarousel() {
    if (!track) return;
    track.innerHTML = '';
    slides.forEach((slideProjects, idx) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'carousel-slide';
      slideDiv.setAttribute('data-slide-index', idx);
      // add cards
      slideProjects.forEach((proj, cardIdx) => {
        const card = createCard(proj, cardIdx);
        slideDiv.appendChild(card);
      });
      track.appendChild(slideDiv);
    });
    updateCarouselPosition();
    updateDots();
  }

  // Create a single project card
  function createCard(proj, cardIdx) {
    const card = document.createElement('div');
    card.className = 'port-item';
    // set custom property for animation delay
    card.style.setProperty('--card-index', cardIdx);
    const imgSrc = IMG_BASE + encodeImgName(proj.img);
    const techHtml = proj.tech.map(t => `<span class="pt">${escapeHtml(t)}</span>`).join('');
    card.innerHTML = `
      <div class="port-img"><img src="${imgSrc}" alt="${escapeHtml(proj.name)}" loading="lazy"></div>
      <div class="port-info">
        <div class="port-cat">${escapeHtml(proj.cat.toUpperCase())}</div>
        <div class="port-name">${escapeHtml(proj.name)}</div>
        <div class="port-desc">${escapeHtml(proj.desc)}</div>
        <div class="port-tech">${techHtml}</div>
      </div>
    `;
    return card;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Update track transform
  function updateCarouselPosition() {
    if (!track) return;
    const slideWidth = track.clientWidth;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Dots
  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (idx === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  // Apply dynamic animation to cards in the new slide
  function animateCurrentSlide() {
    const currentSlideDiv = track?.children[currentIndex];
    if (!currentSlideDiv) return;
    const cards = currentSlideDiv.querySelectorAll('.port-item');
    // pick a random animation class (or cycle)
    let newAnim = slideAnimations[Math.floor(Math.random() * slideAnimations.length)];
    // avoid same animation twice in a row? optional
    if (newAnim === currentAnimClass && slideAnimations.length > 1) {
      newAnim = slideAnimations.find(a => a !== currentAnimClass);
    }
    currentAnimClass = newAnim;
    cards.forEach(card => {
      card.classList.add(currentAnimClass);
      setTimeout(() => {
        card.classList.remove(currentAnimClass);
      }, 600);
    });
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slides.length) index = slides.length - 1;
    if (index === currentIndex) return;
    currentIndex = index;
    updateCarouselPosition();
    updateDots();
    animateCurrentSlide();
  }

  function nextSlide() {
    if (currentIndex + 1 < slides.length) {
      goToSlide(currentIndex + 1);
    } else {
      // optional loop: go to first
      goToSlide(0);
    }
  }

  function prevSlide() {
    if (currentIndex - 1 >= 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(slides.length - 1);
    }
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Initial render
  renderCarousel();

  // Animate first slide on load
  setTimeout(() => {
    animateCurrentSlide();
  }, 200);

  // Parallax background effect
  const parallaxBg = document.getElementById('parallaxLayer');
  window.addEventListener('scroll', () => {
    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${window.scrollY * 0.1}px)`;
    }
  });

  // Reveal section title on scroll
  const portHead = document.getElementById('portHead');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        portHead.classList.add('reveal');
        observer.unobserve(portHead);
      }
    });
  }, { threshold: 0.2 });
  if (portHead) observer.observe(portHead);

  // Handle window resize to reposition track
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarouselPosition();
    }, 100);
  });
})();