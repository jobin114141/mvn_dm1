/* ==========================================================================
   Maven - Interactive JavaScript Logic & Scroll Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 0. SMART NAVBAR SCROLL DIRECTION LOGIC (Hide on scroll down, reveal on scroll up)
  const mainNavbar = document.querySelector('.navbar');
  if (mainNavbar) {
    let lastScrollPosition = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollPosition = window.scrollY;

      // At or near top of page (<= 60px): Keep navbar visible and remove scrolled styling
      if (currentScrollPosition <= 60) {
        mainNavbar.classList.remove('nav-hidden');
        mainNavbar.classList.remove('nav-scrolled');
        lastScrollPosition = currentScrollPosition;
        return;
      }

      // Add background shadow when scrolled
      mainNavbar.classList.add('nav-scrolled');

      // Scrolling Down past threshold (100px) -> Hide Navbar
      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
        mainNavbar.classList.add('nav-hidden');
      }
      // Scrolling Up -> Reveal / Show Navbar
      else if (currentScrollPosition < lastScrollPosition) {
        mainNavbar.classList.remove('nav-hidden');
      }

      lastScrollPosition = currentScrollPosition;
    }, { passive: true });
  }

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

  // 2. ACCORDION IN MINIMALIST ADVOCACY & COMMITMENT SECTION
  window.toggleCommitmentAcc = function (clickedItem) {
    const parentContainer = clickedItem.parentElement || document;
    const allItems = parentContainer.querySelectorAll('.accordion-item');
    const isActive = clickedItem.classList.contains('active');

    allItems.forEach(item => {
      item.classList.remove('active');
      const icon = item.querySelector('.acc-icon');
      if (icon) icon.textContent = '+';
    });

    if (!isActive) {
      clickedItem.classList.add('active');
      const icon = clickedItem.querySelector('.acc-icon');
      if (icon) icon.textContent = '−';
    }
  };

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
      videoModal.style.display = 'flex';
      videoModal.classList.add('active');
    }
  }

  function closeVideoModal() {
    if (videoModal && videoIframe) {
      videoModal.classList.remove('active');
      videoModal.style.display = 'none';
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
  const targetSelectors = [
    '.about-img-card', '.about-text-card', '.about-tall-card', '.why-us-block',
    '.showcase-left-text', '.showcase-right-img-box', '.showcase-mid-col', '.featured-card',
    '.services-header', '.services-grid', '.estimator-controls-col', '.estimator-result-card',
    '.brand-left-col', '.stat-grid-cell', '.testimonials-header', '.testimonial-card',
    '.testimonial-feature-card', '.pillar-item', '.footer-top-banner', '.footer-mid-grid', '.footer-links-grid',
    '.timeline-card', '.team-card', '.chamber-card', '.scroll-reveal',
    '.tier-card', '.flowchart-step-card', '.scope-preview-card', '.deck-content-col', '.security-card',
    '.seamless-row-item', '.mini-hero-split', '.mini-triple-bar', '.mini-gallery-card', '.mini-bottom-triple',
    '.minimal-contact-split', '.minimal-form-container',
    '.editorial-flagship-wrapper', '.blog-card', '.blog-subscribe-card'
  ];

  const revealElements = document.querySelectorAll(targetSelectors.join(', '));

  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
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

  // 6. STICKY NAVBAR CONTROLLER (ALWAYS PINNED & VISIBLE AT TOP 0)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > 20) {
        navbar.style.boxShadow = '0 6px 24px rgba(56, 39, 28, 0.1)';
      } else {
        navbar.style.boxShadow = '0 4px 20px rgba(56, 39, 28, 0.05)';
      }
    }, { passive: true });
  }

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

    const mobileNavLinks = navMenu.querySelectorAll('.nav-link:not(.nav-dropdown-trigger)');
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

  // 7b. SERVICES MEGA MENU DESKTOP & MOBILE TOGGLE SYSTEM
  const dropdownWrappers = document.querySelectorAll('.nav-dropdown-wrapper');
  dropdownWrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.nav-dropdown-trigger');
    let hoverTimeout;

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.innerWidth <= 1024) {
          wrapper.classList.toggle('active');
        }
      });
    }

    wrapper.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        clearTimeout(hoverTimeout);
        wrapper.classList.add('active');
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1024) {
        hoverTimeout = setTimeout(() => {
          wrapper.classList.remove('active');
        }, 180);
      }
    });
  });

  // 8. INTERACTIVE ADVOCACY MATRIX SWITCHER (ABOUT PAGE)
  const matrixBtns = document.querySelectorAll('.matrix-scenario-btn');
  const matrixCode = document.getElementById('matrixCode');
  const matrixTitle = document.getElementById('matrixTitle');
  const matrixDesc = document.getElementById('matrixDesc');
  const step1Title = document.getElementById('step1Title');
  const step1Desc = document.getElementById('step1Desc');
  const step2Title = document.getElementById('step2Title');
  const step2Desc = document.getElementById('step2Desc');
  const step3Title = document.getElementById('step3Title');
  const step3Desc = document.getElementById('step3Desc');
  const matrixMeterVal = document.getElementById('matrixMeterVal');
  const matrixMeterFill = document.getElementById('matrixMeterFill');
  const matrixLead = document.getElementById('matrixLead');
  const matrixCanvas = document.getElementById('matrixCanvas');

  const matrixData = {
    marital: {
      code: 'REF: MATRIMONIAL-UK-EU-902',
      title: 'Cross-Border Matrimonial Asset Division Strategy',
      desc: 'Comprehensive legal defense locking down international real estate, offshore trusts, and private equity investments under London High Court jurisdiction while securing complete NDA privacy.',
      step1Title: 'Immediate Freeze Order & NDA Protocol',
      step1Desc: '24-hour emergency injunction issued at the High Court to halt unauthorized asset transfers.',
      step2Title: 'Dual-Jurisdiction Forensic Accounting',
      step2Desc: 'Simultaneous valuation of UK & Athens holdings with zero public court exposure.',
      step3Title: 'Private Out-of-Court Settlement',
      step3Desc: 'Negotiated resolution signed in Mayfair chambers with legally binding privacy terms.',
      meterVal: 'LEVEL 5 — MAXIMUM NDA',
      meterFill: '100%',
      lead: 'Lead Counsel: Elena Rostova & Arthur Pendelton, KC'
    },
    corporate: {
      code: 'REF: CORP-DEFENSE-774',
      title: 'Corporate Hostile Takeover & Reputation Shield',
      desc: 'Shielding board directors and controlling shareholders against predatory acquisitions, defamatory media campaigns, and regulatory enforcement.',
      step1Title: 'Ex-Parte Restraining Order',
      step1Desc: 'Filing immediate gagging orders against defamatory press publications within 3 hours.',
      step2Title: 'Shareholder Rights Lock',
      step2Desc: 'Triggering poison pill defense clauses and regulatory compliance audits.',
      step3Title: 'Arbitration Resolution',
      step3Desc: 'Settling corporate disputes behind closed doors at the International Commercial Court.',
      meterVal: 'LEVEL 5 — ZERO-TRACE RETENTION',
      meterFill: '98%',
      lead: 'Lead Counsel: Julian Vance, Esq.'
    },
    estate: {
      code: 'REF: TRUST-ESTATE-310',
      title: 'International Family Office Trust Restructuring',
      desc: 'Structuring multi-generational wealth preservation trusts across Switzerland, London, and Greece to neutralize inheritance tax and probate delays.',
      step1Title: 'Cross-Border Trust Audit',
      step1Desc: 'Mapping offshore legal entities and sovereign asset titles for maximum security.',
      step2Title: 'Family Constitution Blueprint',
      step2Desc: 'Drafting binding family charters to prevent inter-generational litigation.',
      step3Title: 'Tax Neutralization & Transfer',
      step3Desc: 'Executing tax-compliant estate transitions with royal court approval.',
      meterVal: 'LEVEL 4 — HIGH ENCRYPTION',
      meterFill: '90%',
      lead: 'Lead Counsel: Senior Partner Desk'
    },
    vip: {
      code: 'REF: VIP-TRANS-505',
      title: 'Emergency High-Court Transport & Escort Protocol',
      desc: 'Tactical mobility operations combining armed executive chauffeurs, soundproof Mercedes Vito mobile consultation suites, and private jet terminal clearance.',
      step1Title: 'Rapid Dispatch & Escort',
      step1Desc: 'Dispatching luxury armored transport within 30 minutes of client call.',
      step2Title: 'Mobile Suite Privacy',
      step2Desc: 'Conducting confidential legal briefings in soundproofed, tinted vehicle suites.',
      step3Title: 'Direct Court Access',
      step3Desc: 'Bypassing public entrances via private subterranean court parking bays.',
      meterVal: 'LEVEL 5 — TACTICAL DISCRETION',
      meterFill: '96%',
      lead: 'Lead Commander: Marcus Sterling'
    }
  };

  matrixBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      matrixBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.dataset.matrix;
      const data = matrixData[key];

      if (data && matrixCanvas) {
        matrixCanvas.style.opacity = '0.4';
        matrixCanvas.style.transform = 'scale(0.98)';

        setTimeout(() => {
          if (matrixCode) matrixCode.textContent = data.code;
          if (matrixTitle) matrixTitle.textContent = data.title;
          if (matrixDesc) matrixDesc.textContent = data.desc;
          if (step1Title) step1Title.textContent = data.step1Title;
          if (step1Desc) step1Desc.textContent = data.step1Desc;
          if (step2Title) step2Title.textContent = data.step2Title;
          if (step2Desc) step2Desc.textContent = data.step2Desc;
          if (step3Title) step3Title.textContent = data.step3Title;
          if (step3Desc) step3Desc.textContent = data.step3Desc;
          if (matrixMeterVal) matrixMeterVal.textContent = data.meterVal;
          if (matrixMeterFill) matrixMeterFill.style.width = data.meterFill;
          if (matrixLead) matrixLead.textContent = data.lead;

          matrixCanvas.style.opacity = '1';
          matrixCanvas.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  // 9. RECREATED EDITORIAL SCHEDULE ACCORDION INTERACTIVITY
  const scheduleAccItems = document.querySelectorAll('.schedule-acc-item');
  scheduleAccItems.forEach(item => {
    const header = item.querySelector('.schedule-acc-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        scheduleAccItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 10. SERVICES PAGE - CUSTOM ADVISORY SCOPE BUILDER INTERACTIVITY
  const builderDiscBtns = document.querySelectorAll('.builder-disc-btn');
  const builderTierBtns = document.querySelectorAll('.builder-tier-btn');
  const urgencySlider = document.getElementById('urgencySlider');
  const urgencyVal = document.getElementById('urgencyValue');

  const scopeTitle = document.getElementById('scopeTitle');
  const scopeRef = document.getElementById('scopeRef');
  const scopeDeliverables = document.getElementById('scopeDeliverables');
  const scopeResponse = document.getElementById('scopeResponse');
  const scopeCounsel = document.getElementById('scopeCounsel');
  const scopePreviewCard = document.getElementById('scopePreviewCard');

  const builderData = {
    family: {
      title: 'Matrimonial & Estate Protection Suite',
      ref: 'REF: ADV-FAMILY-2026',
      deliverables: [
        'High Court pre-nuptial & asset freeze protection',
        'Dual-jurisdiction forensic asset valuation (UK & EU)',
        'Soundproof Mayfair suite private consultation'
      ]
    },
    corporate: {
      title: 'Corporate Governance & Defense Suite',
      ref: 'REF: ADV-CORP-5092',
      deliverables: [
        'Ex-parte gagging orders against media defamation',
        'Hostile M&A poison pill & shareholder lock',
        'International commercial arbitration representation'
      ]
    },
    vip: {
      title: 'VIP Chauffeur & Armored Mobility Suite',
      ref: 'REF: ADV-VIP-8810',
      deliverables: [
        'Armored Mercedes Vito luxury transfer dispatches',
        'Private jet terminal airport & port clearance',
        'Soundproof mobile consultation suite with Wi-Fi tint'
      ]
    },
    litigation: {
      title: 'High Court Trial & Appellate Defense Suite',
      ref: 'REF: ADV-LITIG-9941',
      deliverables: [
        'Royal Courts of Justice trial representation by KC',
        'Ex-parte injunctive relief within 3 hours',
        'Cross-border evidence gathering & witness prep'
      ]
    }
  };

  const counselData = {
    partner: 'Senior Partner Desk',
    kc: "King's Counsel Lead Advocates",
    team: 'Full Multi-Disciplinary Trial Team'
  };

  const urgencyTextData = {
    1: 'Emergency 24-Hour Dispatch',
    2: '7-Day Turnaround',
    3: 'Continuous Retainer'
  };

  const responseTimeData = {
    1: 'Within 60 Minutes',
    2: 'Within 4 Hours',
    3: 'Priority 24/7 Hotline'
  };

  let activeDisc = 'family';
  let activeTier = 'partner';
  let activeUrgency = 1;

  function updateScopeBuilder() {
    const discInfo = builderData[activeDisc];
    if (discInfo && scopePreviewCard) {
      scopePreviewCard.style.opacity = '0.5';

      setTimeout(() => {
        if (scopeTitle) scopeTitle.textContent = discInfo.title;
        if (scopeRef) scopeRef.textContent = discInfo.ref;
        if (scopeCounsel) scopeCounsel.textContent = counselData[activeTier] || 'Senior Partner Desk';
        if (scopeResponse) scopeResponse.textContent = responseTimeData[activeUrgency] || 'Within 60 Minutes';
        if (urgencyVal) urgencyVal.textContent = urgencyTextData[activeUrgency] || 'Emergency 24-Hour Dispatch';

        if (scopeDeliverables) {
          scopeDeliverables.innerHTML = discInfo.deliverables
            .map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`)
            .join('');
        }

        scopePreviewCard.style.opacity = '1';
      }, 150);
    }
  }

  builderDiscBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      builderDiscBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDisc = btn.dataset.disc;
      updateScopeBuilder();
    });
  });

  builderTierBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      builderTierBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTier = btn.dataset.tier;
      updateScopeBuilder();
    });
  });

  if (urgencySlider) {
    urgencySlider.addEventListener('input', (e) => {
      activeUrgency = parseInt(e.target.value, 10);
      updateScopeBuilder();
    });
  }

  // 11. PRACTICE SUB-DISCIPLINE DEEP-DIVE DECK (SERVICES PAGE)
  const deckTabBtns = document.querySelectorAll('.deck-tab-btn');
  const deckImg = document.getElementById('deckImg');
  const deckBadge = document.getElementById('deckBadge');
  const deckTitle = document.getElementById('deckTitle');
  const deckDesc = document.getElementById('deckDesc');
  const deckHl1 = document.getElementById('deckHl1');
  const deckHl2 = document.getElementById('deckHl2');

  const deckData = {
    family: {
      badge: '✦ MATRIMONIAL COUNSEL',
      title: 'Matrimonial & Cross-Border Estate Division',
      desc: 'Our senior matrimonial advocates manage complex divorce settlements, international asset freezing orders, and family trust preservation across UK and European courts with total discretion.',
      hl1: 'Ex-parte High Court freeze orders within 24 hours.',
      hl2: 'Dual-jurisdiction enforcement in London & Athens.',
      img: 'assets/columns.png'
    },
    corporate: {
      badge: '✦ CORPORATE SHIELD',
      title: 'Corporate Governance & Hostile Takeover Defense',
      desc: 'Protecting corporate boards against predatory acquisitions, reputational crisis, and regulatory scrutiny through proactive legal architecture.',
      hl1: 'Ex-parte injunctions against media defamation in 3 hours.',
      hl2: 'Shareholder poison pill defense clauses.',
      img: 'assets/litigation.png'
    },
    defense: {
      badge: '✦ HIGH COURT COUNSEL',
      title: 'Appellate Litigation & Commercial Trial Defense',
      desc: 'Formidable trial advocacy led by King’s Counsel in the UK Royal Courts of Justice and international commercial arbitration forums.',
      hl1: 'KC trial advocacy in high-value commercial disputes.',
      hl2: 'Cross-border evidence collection and witness protection.',
      img: 'assets/gavel.png'
    },
    vip: {
      badge: '✦ VIP MOBILITY',
      title: 'Executive VIP Transport & Armored Escort',
      desc: 'Armored Mercedes Vito vehicles serving as soundproof mobile consultation suites with direct private jet terminal clearance.',
      hl1: 'Rapid 30-minute dispatch to Mayfair and airports.',
      hl2: 'Subterranean court entrance and soundproof Wi-Fi tint.',
      img: 'assets/van.png'
    }
  };

  deckTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deckTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.dataset.deck;
      const data = deckData[key];

      if (data && deckImg) {
        deckImg.style.opacity = '0.3';
        setTimeout(() => {
          deckImg.src = data.img;
          if (deckBadge) deckBadge.textContent = data.badge;
          if (deckTitle) deckTitle.textContent = data.title;
          if (deckDesc) deckDesc.textContent = data.desc;
          if (deckHl1) deckHl1.textContent = data.hl1;
          if (deckHl2) deckHl2.textContent = data.hl2;
          deckImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 12. SEAMLESS PATH EXPANDABLE ROWS INTERACTIVITY
  const seamlessRowItems = document.querySelectorAll('.seamless-row-item');
  seamlessRowItems.forEach(item => {
    const header = item.querySelector('.seamless-row-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        seamlessRowItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
  const contactFaqItems = document.querySelectorAll('.contact-faq-item');
  contactFaqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        contactFaqItems.forEach(i => {
          i.classList.remove('active');
          const toggle = i.querySelector('.faq-toggle-icon');
          if (toggle) toggle.textContent = '+';
        });
        if (!isActive) {
          item.classList.add('active');
          const toggle = item.querySelector('.faq-toggle-icon');
          if (toggle) toggle.textContent = '−';
        }
      });
    }
  });

  // 14. CONTACT INQUIRY FORM SUBMISSION FEEDBACK
  const contactInquiryForm = document.getElementById('contactInquiryForm');
  const formStatusMsg = document.getElementById('formStatusMsg');
  if (contactInquiryForm && formStatusMsg) {
    contactInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactInquiryForm.querySelector('.submit-inquiry-btn');
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ENCRYPTING & TRANSMITTING...';
        submitBtn.style.opacity = '0.7';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> INQUIRY TRANSMITTED';
          submitBtn.style.backgroundColor = 'var(--brand-gold)';
          submitBtn.style.color = '#FFFFFF';
        }

        formStatusMsg.style.display = 'block';
        formStatusMsg.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Confidential Briefing Received under Level 5 NDA. Senior Advocate assigned within 60 minutes.';
        contactInquiryForm.reset();
      }, 1200);
    });
  }
  // 15. BLOG CATEGORY FILTER CONTROLLER
  const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogFilterBtns.length > 0 && blogCards.length > 0) {
    blogFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        blogFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        blogCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 16. OUR EXPERTISE INTERACTIVE CAROUSEL SLIDER
  const globalExpertiseSlides = [
    {
      heroImg: 'assets/columns.png',
      heroAlt: 'Company Formation & Licensing',
      chips: ['Company Formation', 'Licensing'],
      heroTitle: 'Strategic Setup &<br>Licensing Advisory',
      card1Title: 'Offshore Structures',
      card1Desc: 'Support for businesses exploring offshore company formation and international corporate structures.',
      card1Img: 'assets/cliffs.png',
      card1Icon: 'fa-globe',
      card2Title: 'Corporate Services',
      card2Desc: 'Professional assistance with government procedures, documentation and ongoing administration.',
      card2Img: 'assets/litigation.png',
      card2Icon: 'fa-briefcase',
      bottomDesc: '<strong>Accounting, VAT & Compliance:</strong> Complete financial organization, bookkeeping, and regulatory management to keep your business fully compliant.'
    },
    {
      heroImg: 'assets/cliffs.png',
      heroAlt: 'Accounting & VAT Support',
      chips: ['Accounting & VAT', 'Compliance'],
      heroTitle: 'Financial Governance &<br>VAT Compliance',
      card1Title: 'Accounting & VAT',
      card1Desc: 'Accounting, bookkeeping and VAT support to help businesses stay financially organised.',
      card1Img: 'assets/gavel.png',
      card1Icon: 'fa-calculator',
      card2Title: 'Compliance Support',
      card2Desc: 'Support in understanding and managing relevant corporate and regulatory requirements.',
      card2Img: 'assets/columns.png',
      card2Icon: 'fa-shield-halved',
      bottomDesc: '<strong>Company Formation & Licensing:</strong> Guidance across standard and specialised licensing requirements for selected business activities.'
    },
    {
      heroImg: 'assets/litigation.png',
      heroAlt: 'Company Formation',
      chips: ['Entity Setup', 'Specialised Licenses'],
      heroTitle: 'Business Formation &<br>Specialised Licensing',
      card1Title: 'Company Formation',
      card1Desc: 'Helping businesses understand suitable structures and jurisdictions for establishing their operations.',
      card1Img: 'assets/van.png',
      card1Icon: 'fa-building',
      card2Title: 'Specialised Licensing',
      card2Desc: 'Guidance across standard and specialised licensing requirements for selected business activities.',
      card2Img: 'assets/cliffs.png',
      card2Icon: 'fa-file-signature',
      bottomDesc: '<strong>Unified Business Partner:</strong> Essential business services integrated under one professional consultancy.'
    }
  ];

  let currentExpertiseIdx = 0;

  window.changeExpertiseSlide = function (direction) {
    currentExpertiseIdx = (currentExpertiseIdx + direction + globalExpertiseSlides.length) % globalExpertiseSlides.length;
    const slide = globalExpertiseSlides[currentExpertiseIdx];

    const prevBtn = document.getElementById('expertisePrevBtn');
    const nextBtn = document.getElementById('expertiseNextBtn');
    if (direction > 0 && nextBtn) { nextBtn.classList.add('active'); if (prevBtn) prevBtn.classList.remove('active'); }
    if (direction < 0 && prevBtn) { prevBtn.classList.add('active'); if (nextBtn) nextBtn.classList.remove('active'); }

    const heroImg = document.getElementById('expertiseHeroImg');
    const chipsWrap = document.getElementById('expertiseChips');
    const heroTitle = document.getElementById('expertiseHeroTitle');
    const card1Title = document.getElementById('expertiseCard1Title');
    const card1Desc = document.getElementById('expertiseCard1Desc');
    const card1Img = document.getElementById('expertiseCard1Img');
    const card1Icon = document.getElementById('expertiseCard1Icon');
    const card2Title = document.getElementById('expertiseCard2Title');
    const card2Desc = document.getElementById('expertiseCard2Desc');
    const card2Img = document.getElementById('expertiseCard2Img');
    const card2Icon = document.getElementById('expertiseCard2Icon');
    const bottomDesc = document.getElementById('expertiseBottomDesc');
    const card1 = document.getElementById('expertiseCard1');
    const card2 = document.getElementById('expertiseCard2');

    if (card1 && card2) {
      card1.style.opacity = '0';
      card2.style.opacity = '0';
      if (heroImg) heroImg.style.opacity = '0';

      setTimeout(() => {
        if (heroImg) { heroImg.src = slide.heroImg; heroImg.alt = slide.heroAlt; heroImg.style.opacity = '1'; }
        if (chipsWrap) { chipsWrap.innerHTML = slide.chips.map(c => `<span class="program-chip">${c}</span>`).join(''); }
        if (heroTitle) { heroTitle.innerHTML = slide.heroTitle; }
        if (card1Title) { card1Title.textContent = slide.card1Title; }
        if (card1Desc) { card1Desc.textContent = slide.card1Desc; }
        if (card1Img) { card1Img.src = slide.card1Img; }
        if (card1Icon) { card1Icon.className = `fa-solid ${slide.card1Icon}`; }
        if (card2Title) { card2Title.textContent = slide.card2Title; }
        if (card2Desc) { card2Desc.textContent = slide.card2Desc; }
        if (card2Img) { card2Img.src = slide.card2Img; }
        if (card2Icon) { card2Icon.className = `fa-solid ${slide.card2Icon}`; }
        if (bottomDesc) { bottomDesc.innerHTML = slide.bottomDesc; }

        card1.style.opacity = '1';
        card2.style.opacity = '1';
      }, 200);
    }
  };

  // 17. OUR APPROACH SCHEDULE ACCORDION CONTROLLER
  window.toggleApproachStep = function (clickedItem) {
    const parentContainer = clickedItem.parentElement || document;
    const allItems = parentContainer.querySelectorAll('.schedule-acc-item');
    const isActive = clickedItem.classList.contains('active');

    if (!isActive) {
      allItems.forEach(i => i.classList.remove('active'));
      clickedItem.classList.add('active');

      const newImg = clickedItem.getAttribute('data-img');
      const scheduleLeftImg = document.querySelector('.schedule-left-img');
      if (scheduleLeftImg && newImg) {
        scheduleLeftImg.style.opacity = '0.3';
        setTimeout(() => {
          scheduleLeftImg.src = newImg;
          scheduleLeftImg.style.opacity = '1';
        }, 150);
      }
    }
  };

  // 18. CLIENT TRUST TESTIMONIAL CAROUSEL SLIDER
  const testimonialPrevBtn = document.getElementById('testimonialPrevBtn');
  const testimonialNextBtn = document.getElementById('testimonialNextBtn');

  if (testimonialPrevBtn && testimonialNextBtn) {
    const testimonialSlides = [
      {
        thumbImg: 'assets/gavel.png',
        card1BadgeIcon: 'fa-building-columns',
        card1BadgeText: 'Sterling Office',
        card1Avatar: 'assets/cliffs.png',
        card1Quote: '"Maven handled our cross-border family estate and asset protection with unmatched discretion and precision. They gave us complete peace of mind."',
        card1Author: 'Lord Alistair Sterling',
        card1Role: 'Managing Trustee, Private Family Office',
        card2BadgeIcon: 'fa-shield-halved',
        card2BadgeText: 'Rostova Ventures',
        card2Avatar: 'assets/columns.png',
        card2Quote: '"Formidable advocates in high-court litigation and strategic corporate advisory. Their guidance proved instrumental during our acquisition."',
        card2Author: 'Elena Rostova',
        card2Role: 'Senior Vice President, Global Ventures'
      },
      {
        thumbImg: 'assets/columns.png',
        card1BadgeIcon: 'fa-earth-americas',
        card1BadgeText: 'Vance Global Trading',
        card1Avatar: 'assets/van.png',
        card1Quote: '"Setting up our regional hub in Dubai Free Zone was seamless with Maven. Their understanding of licensing and corporate compliance saved us weeks."',
        card1Author: 'Marcus Vance',
        card1Role: 'Chief Executive Officer, Vance Global',
        card2BadgeIcon: 'fa-award',
        card2BadgeText: 'Thorne Healthcare Group',
        card2Avatar: 'assets/litigation.png',
        card2Quote: '"From initial health authority licensing to full corporate structuring, Maven delivered concise guidance and flawless execution."',
        card2Author: 'Dr. Sophia Thorne',
        card2Role: 'Managing Director, Thorne Group'
      },
      {
        thumbImg: 'assets/litigation.png',
        card1BadgeIcon: 'fa-landmark',
        card1BadgeText: 'Al-Mansoor Capital',
        card1Avatar: 'assets/cliffs.png',
        card1Quote: '"Maven provided exceptional counsel on our DIFC holding company structure and cross-border investment vehicles. Truly a trusted partner."',
        card1Author: 'Tariq Al-Mansoor',
        card1Role: 'Founding Partner, Al-Mansoor Capital',
        card2BadgeIcon: 'fa-briefcase',
        card2BadgeText: 'Beauchamp Holdings',
        card2Avatar: 'assets/gavel.png',
        card2Quote: '"Their ongoing corporate retainer services give us total confidence across VAT filings, visa processing, and annual corporate audits."',
        card2Author: 'Claire Beauchamp',
        card2Role: 'Head of International Compliance'
      }
    ];

    let currentTestimonialIdx = 0;

    function renderTestimonialSlide(index) {
      const slide = testimonialSlides[index];
      const thumb = document.getElementById('testimonialThumbImg');
      const card1 = document.getElementById('testimonialCard1');
      const card2 = document.getElementById('testimonialCard2');

      const card1Badge = document.getElementById('testimonialCard1Badge');
      const card1Avatar = document.getElementById('testimonialCard1Avatar');
      const card1Quote = document.getElementById('testimonialCard1Quote');
      const card1Author = document.getElementById('testimonialCard1Author');
      const card1Role = document.getElementById('testimonialCard1Role');

      const card2Badge = document.getElementById('testimonialCard2Badge');
      const card2Avatar = document.getElementById('testimonialCard2Avatar');
      const card2Quote = document.getElementById('testimonialCard2Quote');
      const card2Author = document.getElementById('testimonialCard2Author');
      const card2Role = document.getElementById('testimonialCard2Role');

      if (card1 && card2) {
        card1.style.opacity = '0';
        card2.style.opacity = '0';

        setTimeout(() => {
          if (card1Badge) card1Badge.innerHTML = `<i class="fa-solid ${slide.card1BadgeIcon}" style="color: var(--brand-gold);"></i> ${slide.card1BadgeText}`;
          if (card1Avatar) card1Avatar.src = slide.card1Avatar;
          if (card1Quote) card1Quote.textContent = slide.card1Quote;
          if (card1Author) card1Author.textContent = slide.card1Author;
          if (card1Role) card1Role.textContent = slide.card1Role;

          if (card2Badge) card2Badge.innerHTML = `<i class="fa-solid ${slide.card2BadgeIcon}" style="color: var(--brand-gold);"></i> ${slide.card2BadgeText}`;
          if (card2Avatar) card2Avatar.src = slide.card2Avatar;
          if (card2Quote) card2Quote.textContent = slide.card2Quote;
          if (card2Author) card2Author.textContent = slide.card2Author;
          if (card2Role) card2Role.textContent = slide.card2Role;

          card1.style.opacity = '1';
          card2.style.opacity = '1';
        }, 200);
      }
    }

    testimonialNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentTestimonialIdx = (currentTestimonialIdx + 1) % testimonialSlides.length;
      testimonialNextBtn.classList.add('active');
      testimonialPrevBtn.classList.remove('active');
      renderTestimonialSlide(currentTestimonialIdx);
    });

    testimonialPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentTestimonialIdx = (currentTestimonialIdx - 1 + testimonialSlides.length) % testimonialSlides.length;
      testimonialPrevBtn.classList.add('active');
      testimonialNextBtn.classList.remove('active');
      renderTestimonialSlide(currentTestimonialIdx);
    });
  }

  // DYNAMIC MEGA MENU HOVER PREVIEW LOGIC (Scoped per dropdown panel)
  const megaPanels = document.querySelectorAll('.mega-dropdown-panel');

  megaPanels.forEach(panel => {
    const hoverLinks = panel.querySelectorAll('.jurisdiction-hover-link');
    const infoPanels = panel.querySelectorAll('.jurisdiction-info-panel');

    if (hoverLinks.length > 0 && infoPanels.length > 0) {
      hoverLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const targetId = link.getAttribute('data-target');

          // Scoped link active toggle
          hoverLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          // Scoped panel active toggle
          infoPanels.forEach(info => {
            if (info.id === targetId) {
              info.classList.add('active');
            } else {
              info.classList.remove('active');
            }
          });
        });
      });
    }
  });

});
