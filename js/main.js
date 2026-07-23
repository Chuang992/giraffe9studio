document.addEventListener('DOMContentLoaded', function() {

  // ===== Custom Cursor =====
  var cursor = document.querySelector('.cursor-dot');
  var mouseX = 0, mouseY = 0;
  var cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.08;
    cursorY += (mouseY - cursorY) * 0.08;
    if (cursor) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    }
    if (tooltip) {
      var cursorSize = cursor.classList.contains('active') ? 36 : 20;
      tooltip.style.left = cursorX + 'px';
      tooltip.style.top = (cursorY + cursorSize / 2 + 12) + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Detect hoverable/clickable elements
  var tooltip = document.querySelector('.cursor-tooltip');
  var currentTooltipTarget = null;
  var tooltipTimeout = null;

  document.addEventListener('mouseover', function(e) {
    var target = e.target.closest('a, button, [role="button"], .service-item-wrapper, .portfolio-item:not(.portfolio-text), .banner-grid-letter, .banner-grid-item');
    if (target && cursor) {
      cursor.classList.add('active');
    }
    // Tooltip
    var tipTarget = e.target.closest('[data-tooltip]');
    if (tipTarget && tooltip) {
      if (tipTarget !== currentTooltipTarget) {
        clearTimeout(tooltipTimeout);
        tooltip.classList.remove('visible');
        tooltipTimeout = setTimeout(function() {
          tooltip.textContent = tipTarget.getAttribute('data-tooltip');
          tooltip.classList.add('visible');
        }, 250);
        currentTooltipTarget = tipTarget;
      }
    }
  });

  document.addEventListener('mouseout', function(e) {
    var target = e.target.closest('a, button, [role="button"], .service-item-wrapper, .portfolio-item:not(.portfolio-text), .banner-grid-letter, .banner-grid-item');
    if (target && cursor) {
      cursor.classList.remove('active');
    }
    // Tooltip
    var tipTarget = e.target.closest('[data-tooltip]');
    if (tipTarget && tooltip) {
      clearTimeout(tooltipTimeout);
      tooltip.classList.remove('visible');
      currentTooltipTarget = null;
    }
  });

  // ===== Mobile Menu Toggle =====
  var menuToggle = document.querySelector('.menu-toggle');
  var headerNav = document.querySelector('.header-nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      if (headerNav) {
        headerNav.classList.toggle('open');
      }
      menuToggle.classList.toggle('active');
    });
  }

  if (headerNav) {
    var links = headerNav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        headerNav.classList.remove('open');
        if (menuToggle) menuToggle.classList.remove('active');
      });
    }
  }

  // ===== Header scroll effect =====
  var header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 200) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===== Banner grid scale on resize =====
  var bannerGrid = document.querySelector('.banner-grid');

  function updateBannerScale() {
    if (!bannerGrid) return;
    if (window.innerWidth > 1300) {
      bannerGrid.style.setProperty('--banner-scale', 1);
      return;
    }
    var bannerHeight = window.innerWidth * 0.6308;
    var gridHeight = 975; // 325 * 3
    var scale = bannerHeight / gridHeight;
    if (scale > 1) scale = 1;
    bannerGrid.style.setProperty('--banner-scale', scale);
  }

  window.addEventListener('resize', updateBannerScale);
  updateBannerScale();

  // ===== Services Scroll Reveal =====
  var serviceItems = document.querySelectorAll('.service-item-wrapper');
  var servicesSection = document.querySelector('.services');

  function checkServicesVisible() {
    if (!servicesSection) return;
    var rect = servicesSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.4) {
      serviceItems.forEach(function(el) {
        el.classList.add('revealed');
      });
      window.removeEventListener('scroll', checkServicesVisible);
    }
  }

  window.addEventListener('scroll', checkServicesVisible);
  checkServicesVisible();

  // ===== Portfolio Scroll Reveal =====
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  var portfolioSection = document.querySelector('.portfolio-grid-wrapper');

  function checkPortfolioVisible() {
    if (!portfolioSection) return;
    var rect = portfolioSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.6) {
      portfolioItems.forEach(function(el) {
        el.classList.add('revealed');
      });
      window.removeEventListener('scroll', checkPortfolioVisible);
    }
  }

  window.addEventListener('scroll', checkPortfolioVisible);
  checkPortfolioVisible();

  // ===== Banner Letter Entrance Animation =====
  var entranceEls = document.querySelectorAll('.banner-letter-g, .banner-letter-i, .banner-letter-r, .letter-ae-group, .banner-letter-f, .banner-letter-e2');

  entranceEls.forEach(function(el) {
    el.classList.add('entrance');
    el.addEventListener('animationend', function() {
      el.classList.remove('entrance');
    });
  });

  // ===== Typewriter Effect =====
  var typeDelay = 1500;
  var typeGroups = document.querySelectorAll('.banner-grid-text, .banner-grid-text-dark, .banner-f-text');

  typeGroups.forEach(function(group) {
    var items = group.querySelectorAll('.typewriter');
    var currentIndex = 0;

    function typeNext() {
      if (currentIndex >= items.length) return;
      var el = items[currentIndex];
      var text = el.getAttribute('data-text');
      var charIndex = 0;

      var interval = setInterval(function() {
        charIndex++;
        el.textContent = text.substring(0, charIndex);
        if (charIndex >= text.length) {
          clearInterval(interval);
          currentIndex++;
          typeNext();
        }
      }, 35);
    }

    setTimeout(function() {
      typeNext();
    }, typeDelay);
  });

});
