/**
 * Template Name: MyResume
 * Updated: Nov 17 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("7obile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 70,
      backSpeed: 30,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  document
    .getElementById("webDevServ")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior

      // Navigate to the contact section
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

      // Fill the input box with the id 'subject' with some text
      document.getElementById("subject").value =
        "Request for Web Development Services";
    });

  document
    .getElementById("webDesServ")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior

      // Navigate to the contact section
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

      // Fill the input box with the id 'subject' with some text
      document.getElementById("subject").value =
        "Request for Web Design Services";
    });

  document
    .getElementById("prAIServ")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior

      // Navigate to the contact section
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

      // Fill the input box with the id 'subject' with some text
      document.getElementById("subject").value =
        "Request for Programming and AI Services";
    });

  document
    .getElementById("grDesServ")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior

      // Navigate to the contact section
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

      // Fill the input box with the id 'subject' with some text
      document.getElementById("subject").value =
        "Request for Graphics Design Services";
    });

  document
    .getElementById("logoDesServ")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior

      // Navigate to the contact section
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

      // Fill the input box with the id 'subject' with some text
      document.getElementById("subject").value =
        "Request for Logo Design Services";
    });

  document
    .getElementById("photoEdServ")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor behavior

      // Navigate to the contact section
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

      // Fill the input box with the id 'subject' with some text
      document.getElementById("subject").value =
        "Request for Photo Editing Services";
    });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

/* ---------- Scripts moved from templates/base.html and templates/user_dashboard.html ---------- */
document.addEventListener('DOMContentLoaded', function() {
  // Password visibility (moved from templates/base.html)
  try {
    const passwordCheckboxes = document.querySelectorAll('.password-checkbox');
    passwordCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const passwordWrapper = this.closest && this.closest('.checkbox-wrapper');
        const formGroup = passwordWrapper ? passwordWrapper.closest('.form-group') : null;
        const passwordInput = formGroup ? formGroup.querySelector('input[type="password"], input[type="text"]') : null;
        if (passwordInput) {
          passwordInput.type = this.checked ? 'text' : 'password';
        }
      });
    });
  } catch (e) {
    // ignore if DOM not structured as expected on some pages
  }

  // Persian Calendar (moved from templates/user_dashboard.html)
  if (!document.getElementById('calendarGrid')) return;

  class PersianCalendar {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('userTasks')) || {};
      this.selectedDate = null;
      this.currentDate = this.getCurrentPersianDate();
      this.init();
    }

    init() {
      this.renderCalendar();
      this.setupEventListeners();
      this.renderTasksList();
    }

    getCurrentPersianDate() {
      const now = new Date();
      return this.gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
    }

    gregorianToJalali(gy, gm, gd) {
      if (gy instanceof Date) {
        gd = gy.getDate();
        gm = gy.getMonth() + 1;
        gy = gy.getFullYear();
      }
      var g_y = gy - 1600;
      var g_m = gm - 1;
      var g_d = gd - 1;
      var g_day_no = 365 * g_y + Math.floor((g_y + 3) / 4) - Math.floor((g_y + 99) / 100) + Math.floor((g_y + 399) / 400);
      var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      for (var i = 0; i < g_m; ++i) g_day_no += g_days_in_month[i];
      g_day_no += g_d;
      var j_day_no = g_day_no - 79;
      var j_np = Math.floor(j_day_no / 12053);
      j_day_no = j_day_no % 12053;
      var jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
      j_day_no = j_day_no % 1461;
      if (j_day_no >= 366) {
        jy += Math.floor((j_day_no - 1) / 365);
        j_day_no = (j_day_no - 1) % 365;
      }
      var jm = (j_day_no < 186) ? 1 + Math.floor(j_day_no / 31) : 7 + Math.floor((j_day_no - 186) / 30);
      var jd = 1 + ((j_day_no < 186) ? (j_day_no % 31) : ((j_day_no - 186) % 30));
      return { day: jd, month: jm, year: jy };
    }

    jalaliToGregorian(jy, jm, jd) {
      var j_y = jy - 979;
      var j_m = jm - 1;
      var j_d = jd - 1;
      var j_day_no = 365 * j_y + Math.floor(j_y / 33) * 8 + Math.floor((j_y % 33 + 3) / 4);
      for (var i = 0; i < j_m; ++i) j_day_no += (i < 6 ? 31 : 30);
      j_day_no += j_d;
      var g_day_no = j_day_no + 79;
      var gy = 1600 + 400 * Math.floor(g_day_no / 146097);
      g_day_no = g_day_no % 146097;
      var leap = true;
      if (g_day_no >= 36525) {
        g_day_no--;
        gy += 100 * Math.floor(g_day_no / 36524);
        g_day_no = g_day_no % 36524;
        if (g_day_no >= 365) g_day_no++; else leap = false;
      }
      gy += 4 * Math.floor(g_day_no / 1461);
      g_day_no = g_day_no % 1461;
      if (g_day_no >= 366) {
        leap = false;
        gy += Math.floor((g_day_no - 1) / 365);
        g_day_no = (g_day_no - 1) % 365;
      }
      var gd = g_day_no + 1;
      var sal_a = [0, 31, (leap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var gm = 0;
      for (var i = 0; i < 13; i++) {
        var v = sal_a[i];
        if (gd <= v) { gm = i; break; } else gd -= v;
      }
      return { year: gy, month: gm, day: gd };
    }

    isJalaliLeap(year) {
      var a = year - ((year > 0) ? 474 : 473);
      var b = a % 2820 + 474;
      return (((b + 38) * 682) % 2816) < 682;
    }

    getPersianMonthDays(year, month) {
      if (month <= 6) return 31;
      if (month <= 11) return 30;
      return this.isJalaliLeap(year) ? 30 : 29;
    }

    getPersianMonthName(month) {
      const months = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
      return months[month - 1];
    }

    getGregorianMonthName(month) {
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return months[month - 1];
    }

    renderCalendar() {
      const year = this.currentDate.year;
      const month = this.currentDate.month;
      const monthName = this.getPersianMonthName(month);
      const gFirst = this.jalaliToGregorian(year, month, 1);
      const gregorianMonth = this.getGregorianMonthName(gFirst.month);
      const currentMonthEl = document.getElementById('currentMonth');
      if (currentMonthEl) currentMonthEl.textContent = `${monthName} ${year} / ${gregorianMonth} ${gFirst.year}`;

      const gDateFirst = this.jalaliToGregorian(year, month, 1);
      const firstDay = (new Date(gDateFirst.year, gDateFirst.month - 1, gDateFirst.day).getDay() + 1) % 7;

      const daysInMonth = this.getPersianMonthDays(year, month);
      const calendarGrid = document.getElementById('calendarGrid');
      if (!calendarGrid) return;
      calendarGrid.innerHTML = '';

      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      const daysInPrevMonth = this.getPersianMonthDays(prevYear, prevMonth);
      for (let i = daysInPrevMonth - firstDay + 1; i <= daysInPrevMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day other-month';
        dayEl.textContent = i;
        calendarGrid.appendChild(dayEl);
      }

      const today = this.gregorianToJalali(new Date());
      for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        const dateKey = `${year}-${month}-${i}`;
        const isToday = year === today.year && month === today.month && i === today.day;
        const solarDiv = document.createElement('div');
        solarDiv.className = 'solar-date';
        solarDiv.textContent = i;
        dayEl.appendChild(solarDiv);
        const gregDateObj = this.jalaliToGregorian(year, month, i);
        const gregDiv = document.createElement('div');
        gregDiv.className = 'gregorian-date';
        gregDiv.textContent = gregDateObj.day;
        dayEl.appendChild(gregDiv);
        if (isToday) { dayEl.classList.add('today'); dayEl.setAttribute('title','Today'); }
        if (this.tasks[dateKey]) dayEl.classList.add('has-task');
        dayEl.addEventListener('click', () => this.selectDate(year, month, i, dayEl));
        calendarGrid.appendChild(dayEl);
      }

      const remainingDays = 42 - calendarGrid.children.length;
      for (let i = 1; i <= remainingDays; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day other-month';
        dayEl.textContent = i;
        calendarGrid.appendChild(dayEl);
      }
    }

    selectDate(year, month, day, element) {
      document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
      element.classList.add('selected');
      this.selectedDate = { year, month, day };
      this.updateSelectedDateDisplay();
      const taskInput = document.getElementById('taskInput');
      if (taskInput) { taskInput.focus(); taskInput.scrollIntoView({ behavior:'smooth', block:'center' }); }
    }

    updateSelectedDateDisplay() {
      const display = document.getElementById('selectedDateDisplay');
      if (this.selectedDate && display) {
        const monthName = this.getPersianMonthName(this.selectedDate.month);
        const gregDate = this.jalaliToGregorian(this.selectedDate.year, this.selectedDate.month, this.selectedDate.day);
        const gregorianMonth = this.getGregorianMonthName(gregDate.month);
        display.textContent = `Selected: ${monthName} ${this.selectedDate.day}, ${this.selectedDate.year} / ${gregorianMonth} ${gregDate.day}, ${gregDate.year}`;
      }
    }

    setupEventListeners() {
      const prev = document.getElementById('prevMonth');
      const next = document.getElementById('nextMonth');
      const addBtn = document.getElementById('addTaskBtn');
      const taskInput = document.getElementById('taskInput');
      if (prev) prev.addEventListener('click', () => this.previousMonth());
      if (next) next.addEventListener('click', () => this.nextMonth());
      if (addBtn) addBtn.addEventListener('click', () => this.addTask());
      if (taskInput) taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.addTask(); });
    }

    previousMonth() { if (this.currentDate.month === 1) { this.currentDate.month = 12; this.currentDate.year--; } else { this.currentDate.month--; } this.renderCalendar(); }
    nextMonth() { if (this.currentDate.month === 12) { this.currentDate.month = 1; this.currentDate.year++; } else { this.currentDate.month++; } this.renderCalendar(); }

    addTask() {
      if (!this.selectedDate) { alert('Please select a date first'); return; }
      const taskInput = document.getElementById('taskInput');
      const taskText = taskInput ? taskInput.value.trim() : '';
      if (!taskText) return;
      const dateKey = `${this.selectedDate.year}-${this.selectedDate.month}-${this.selectedDate.day}`;
      if (!this.tasks[dateKey]) this.tasks[dateKey] = [];
      this.tasks[dateKey].push({ id: Date.now(), text: taskText, completed: false });
      localStorage.setItem('userTasks', JSON.stringify(this.tasks));
      if (taskInput) taskInput.value = '';
      this.renderCalendar();
      this.renderTasksList();
    }

    renderTasksList() {
      const tasksList = document.getElementById('tasksList');
      if (!tasksList) return;
      tasksList.innerHTML = '';
      let allTasks = [];
      for (const [dateKey, tasks] of Object.entries(this.tasks)) { tasks.forEach(task => allTasks.push({ ...task, dateKey })); }
      if (allTasks.length === 0) { tasksList.innerHTML = '<p style="color: #999; text-align: center;">No tasks yet. Add one by selecting a date!</p>'; return; }
      allTasks.forEach(task => {
        const [year, month, day] = task.dateKey.split('-');
        const monthName = this.getPersianMonthName(parseInt(month));
        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskEl.innerHTML = `
          <span class="task-text">${task.text}</span>
          <span class="task-date">${monthName} ${day}</span>
          <div class="task-actions">
            <button class="task-btn toggle" onclick="calendar.toggleTask('${task.dateKey}', ${task.id})">${task.completed ? '↩' : '✓'}</button>
            <button class="task-btn delete" onclick="calendar.deleteTask('${task.dateKey}', ${task.id})">×</button>
          </div>
        `;
        tasksList.appendChild(taskEl);
      });
    }

    toggleTask(dateKey, id) {
      const task = this.tasks[dateKey].find(t => t.id === id);
      if (task) { task.completed = !task.completed; localStorage.setItem('userTasks', JSON.stringify(this.tasks)); this.renderTasksList(); }
    }

    deleteTask(dateKey, id) {
      this.tasks[dateKey] = this.tasks[dateKey].filter(t => t.id !== id);
      if (this.tasks[dateKey] && this.tasks[dateKey].length === 0) delete this.tasks[dateKey];
      localStorage.setItem('userTasks', JSON.stringify(this.tasks));
      this.renderCalendar();
      this.renderTasksList();
    }
  }

  // Initialize and expose globally so inline handlers work
  const calendar = new PersianCalendar();
  window.calendar = calendar;

});

/* End moved scripts */
