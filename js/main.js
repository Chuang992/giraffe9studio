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
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Detect hoverable/clickable elements
  document.addEventListener('mouseover', function(e) {
    var target = e.target.closest('a, button, [role="button"], .service-item-wrapper, .portfolio-item');
    if (target && cursor) {
      cursor.classList.add('active');
    }
  });

  document.addEventListener('mouseout', function(e) {
    var target = e.target.closest('a, button, [role="button"], .service-item-wrapper, .portfolio-item');
    if (target && cursor) {
      cursor.classList.remove('active');
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
      if (window.pageYOffset > 400) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

});
