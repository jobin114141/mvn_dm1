/* ==========================================================================
   Floristy - Interactive JavaScript Logic & Scroll Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SERVICES INTERACTIVE TABBED SWITCHER
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceImg = document.getElementById('serviceImg');
  const serviceBadge = document.getElementById('serviceBadge');
  const serviceTitle = document.getElementById('serviceTitle');
  const serviceDesc = document.getElementById('serviceDesc');
  const serviceHighlight = document.getElementById('serviceHighlight');

  const servicesData = {
    private: {
      badgeIcon: 'fa-shield-halved',
      badgeText: 'AS YOU WISH',
      title: 'Tailored <em>Private Consultations</em> & VIP Advocacy',
      desc: 'Enjoy discreet, personalized legal advocacy with our senior partners. Our consultations offer complete confidentiality and bespoke strategies built around your individual goals.',
      highlightIcon: 'fa-gem',
      highlightText: 'Dedicated partner assigned for high-net-worth clients.',
      imgSrc: 'assets/van.png',
      imgAlt: 'Mercedes Vito Luxury Vehicle'
    },
    scheduled: {
      badgeIcon: 'fa-building-columns',
      badgeText: 'CORPORATE ADVISORY',
      title: 'Corporate Governance & <em>Estate Management</em>',
      desc: 'Strategic legal counsel for enterprise restructuring, international asset protection, and multi-jurisdictional estate planning.',
      highlightIcon: 'fa-handshake',
      highlightText: 'Full compliance & NDA audits across UK & EU law.',
      imgSrc: 'assets/columns.png',
      imgAlt: 'Classical Judicial Architecture Columns'
    },
    transfers: {
      badgeIcon: 'fa-car-rear',
      badgeText: 'EXECUTIVE TRAVEL',
      title: 'Seamless <em>VIP Executive Transfers</em> & Chauffeur Services',
      desc: 'From private jet terminals to high court hearings – travel in luxury Mercedes Vito vans with privacy tint, Wi-Fi, and executive security.',
      highlightIcon: 'fa-clock',
      highlightText: '24/7 priority airport & port transfer dispatches.',
      imgSrc: 'assets/van.png',
      imgAlt: 'Mercedes Vito Executive Transport'
    },
    accessibility: {
      badgeIcon: 'fa-wheelchair',
      badgeText: 'ACCESSIBLE CARE',
      title: 'Accessible Travel & <em>Universal Care Options</em>',
      desc: 'Wheelchair-accessible luxury vehicles and step-free legal consultation suites designed so every client enjoys total dignity and comfort.',
      highlightIcon: 'fa-heart',
      highlightText: 'Specially trained ramp & mobility assistance staff.',
      imgSrc: 'assets/cliffs.png',
      imgAlt: 'Accessible Heritage Grounds'
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabKey = btn.dataset.tab;
      const data = servicesData[tabKey];

      if (data && serviceImg) {
        // Fade out
        serviceImg.style.opacity = '0';
        
        setTimeout(() => {
          serviceImg.src = data.imgSrc;
          serviceImg.alt = data.imgAlt;

          if (serviceBadge) {
            serviceBadge.innerHTML = `<i class="fa-solid ${data.badgeIcon} tag-icon"></i> ${data.badgeText}`;
          }
          if (serviceTitle) {
            serviceTitle.innerHTML = data.title;
          }
          if (serviceDesc) {
            serviceDesc.textContent = data.desc;
          }
          if (serviceHighlight) {
            serviceHighlight.textContent = data.highlightText;
          }

          serviceImg.style.opacity = '1';
        }, 200);
      }
    });
  });

  // 2. ACCORDION IN MINIMALIST ADVOCACY SECTION
  const accItems = document.querySelectorAll('.accordion-item');
  accItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. ULTRA-INTERACTIVE LEGAL STRATEGY ESTIMATOR
  const domainBtns = document.querySelectorAll('.estimator-domain-btn');
  const scopeBtns = document.querySelectorAll('.estimator-scope-btn');
  const timelineSlider = document.getElementById('timelineSlider');
  const timelineVal = document.getElementById('timelineValue');
  
  const resTimeline = document.getElementById('resTimeline');
  const resTeam = document.getElementById('resTeam');
  const resJurisdiction = document.getElementById('resJurisdiction');
  const resTier = document.getElementById('resTier');
  const resTitle = document.getElementById('resTitle');

  const estimatorData = {
    family: {
      title: 'Family Law & Matrimonial Advisory',
      jurisdiction: 'London High Court & Athens Courts',
      teamBase: 'Specialist Matrimonial Advocate',
      tier: 'Private Family Office Tier'
    },
    corporate: {
      title: 'Corporate Governance & M&A Defense',
      jurisdiction: 'UK Companies House & International Commercial Court',
      teamBase: 'Corporate Senior Partner + Tax Counsel',
      tier: 'Enterprise Advisory Tier'
    },
    vip: {
      title: 'VIP Executive Transport & Transfer Support',
      jurisdiction: 'Global Airports, Private Ports & Mayfair Suite',
      teamBase: 'Logistics Commander + Chauffeur Captain',
      tier: 'VIP Logistics & Transfer Tier'
    },
    defense: {
      title: 'High Court Defense & Complex Litigation',
      jurisdiction: 'UK Royal Courts of Justice & EU Appellate Court',
      teamBase: 'Lead QC Barrister + Trial Advocate',
      tier: 'High Stakes Defense Tier'
    }
  };

  let activeDomain = 'family';
  let activeScope = 'individual';

  function updateEstimator() {
    if (!timelineSlider) return;
    const months = parseInt(timelineSlider.value, 10);
    timelineVal.textContent = `${months} ${months === 1 ? 'Month' : 'Months'}`;

    const data = estimatorData[activeDomain] || estimatorData.family;
    
    if (resTitle) resTitle.textContent = data.title;
    if (resTimeline) resTimeline.textContent = `${months} Months (Dedicated Timeline Focus)`;
    if (resJurisdiction) resJurisdiction.textContent = data.jurisdiction;
    if (resTier) resTier.textContent = data.tier;

    if (resTeam) {
      if (activeScope === 'corporate') {
        resTeam.textContent = `Senior Partner + ${data.teamBase} + 2 Corporate Associates`;
      } else if (activeScope === 'estate') {
        resTeam.textContent = `2 Senior Partners + ${data.teamBase} + Cross-Border Counsel`;
      } else {
        resTeam.textContent = `Lead Partner + ${data.teamBase}`;
      }
    }
  }

  domainBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      domainBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDomain = btn.dataset.domain;
      updateEstimator();
    });
  });

  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scopeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeScope = btn.dataset.scope;
      updateEstimator();
    });
  });

  if (timelineSlider) {
    timelineSlider.addEventListener('input', updateEstimator);
  }

  // Initial calculation
  updateEstimator();

  // 4. VIDEO MODAL FUNCTIONALITY
  const playVideoBtn = document.getElementById('playVideoBtn');
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const videoIframe = document.getElementById('videoIframe');

  const videoUrl = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1';

  function openVideoModal() {
    if (videoModal && videoIframe) {
      videoIframe.src = videoUrl;
      videoModal.classList.add('active');
    }
  }

  function closeVideoModal() {
    if (videoModal && videoIframe) {
      videoModal.classList.remove('active');
      videoIframe.src = '';
    }
  }

  if (playVideoBtn) {
    playVideoBtn.addEventListener('click', openVideoModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeVideoModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeVideoModal);
  }

  // 5. SMOOTH SCROLL REVEAL ANIMATION CONTROLLER
  const revealElements = document.querySelectorAll(
    '.about-img-card, .about-text-card, .about-tall-card, .why-us-block, ' +
    '.showcase-left-text, .showcase-right-img-box, .showcase-mid-col, .featured-card, ' +
    '.services-header, .services-grid, .estimator-controls-col, .estimator-result-card, ' +
    '.brand-left-col, .stat-grid-cell, .testimonials-header, .testimonial-card, ' +
    '.testimonial-feature-card, .pillar-item, .footer-top-banner, .footer-mid-grid, .footer-links-grid'
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal once smoothly
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    scrollObserver.observe(el);
  });

  // 6. NAVBAR ACTIVE LINK SCROLL SPY
  const sections = document.querySelectorAll('section[id], footer[id], div[id="home"]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 7. RESPONSIVE MOBILE NAVIGATION TOGGLE
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    const mobileNavLinks = navMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

});
