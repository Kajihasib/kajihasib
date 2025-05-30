/*---- Default JS INDEXING

    01.serviceWidget();
    02.swiperJs();
    03.wowActive();
    04.wowActive();
    05.counterUp();
    06.tmpVedioActivation();
    07.stickyHeader();
    08.smoothScroll();
    09.menuCurrentLink();
    11.fonklsAnimation();
    13.onePageNav();
    14.tpm_mobileMenuActive();
    16.tmpcustomAnimation();
    17.popupMobileMenu();
    18.contactForm();

----*/

(function ($) {
  "use strict";

  var tmPk = {
    m: function (e) {
      tmPk.d();
      tmPk.methods();
    },

    d: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },

    methods: function (e) {
      tmPk.serviceWidget();
      tmPk.swiperJs();
      tmPk.wowActive();
      tmPk.stickyHeader();
      tmPk.smoothScroll();
      tmPk.menuCurrentLink();
      tmPk.fonklsAnimation();
      tmPk.onePageNav();
      tmPk.tpm_mobileMenuActive();
      tmPk.tmpcustomAnimation();
      tmPk.popupMobileMenu();
      tmPk.animationOnHover();
      tmPk.odoMeter();
    },

    serviceWidget: function () {
      function serviceAnimation() {
        var $servicesWidget = $(".services-widget");
        var $activeBg = $servicesWidget.find(".active-bg");

        function updateActiveService($element) {
          if (!$element.length) return;

          var rect = $element[0].getBoundingClientRect();
          var topOff =
            rect.top - $servicesWidget[0].getBoundingClientRect().top;
          var height = $element.outerHeight();

          var $closestServiceItem = $element.closest(".service-item");
          if ($closestServiceItem.length) {
            $closestServiceItem.removeClass("mleave");
          }

          $servicesWidget.find(".service-item").each(function () {
            var $item = $(this);
            if (!$item.is($closestServiceItem)) {
              $item.addClass("mleave");
            }
          });

          $activeBg.css({
            top: topOff + "px",
            height: height + "px",
          });
        }

        $servicesWidget.on("mouseenter", ".service-item", function () {
          updateActiveService($(this));
        });

        $servicesWidget.on("mouseleave", function () {
          var $currentElement = $servicesWidget.find(".current");
          updateActiveService($currentElement);

          $servicesWidget.find(".service-item").each(function () {
            var $item = $(this);
            if (!$item.is($currentElement.closest(".service-item"))) {
              $item.removeClass("mleave");
            }
          });
        });

        // Initial call
        updateActiveService($servicesWidget.find(".current"));

        $servicesWidget.on("click", ".service-item", function () {
          $servicesWidget.find(".service-item").removeClass("current");
          $(this).addClass("current");
        });
      }

      // Initialize serviceAnimation
      serviceAnimation();
    },

    swiperJs: function () {
      $(document).ready(function () {
        var swiper = new Swiper(".testimonial-swiper", {
          // slidesPerView: 2,
          spaceBetween: 50,
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            800: {
              slidesPerView: 2,
            },
          },
        });
      });
    },

    wowActive: function () {
      new WOW().init();
    },

    // sticky header activation
    menuCurrentLink: function () {
      var currentPage = location.pathname.split("/"),
        current = currentPage[currentPage.length - 1];
      $(".mainmenu li a").each(function () {
        var $this = $(this);
        if ($this.attr("href") === current) {
          $this.addClass("active");
          $this.parents(".has-dropdown").addClass("menu-item-open");
        }
      });
    },

    stickyHeader: function (e) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $(".header--sticky").addClass("sticky");
        } else {
          $(".header--sticky").removeClass("sticky");
        }
      });
    },

    popupMobileMenu: function (e) {
      $(".humberger_menu_active").on("click", function (e) {
        $(".popup-mobile-menu").addClass("active");
      });

      $(".close-menu").on("click", function (e) {
        $(".popup-mobile-menu").removeClass("active");
        $(".popup-mobile-menu .mainmenu .has-dropdown > a")
          .siblings(".submenu")
          .removeClass("active")
          .slideUp("400");
        $(".popup-mobile-menu .mainmenu .has-dropdown > a").removeClass("open");
      });

      $(".popup-mobile-menu .mainmenu .has-dropdown > a").on(
        "click",
        function (e) {
          e.preventDefault();
          $(this).siblings(".submenu").toggleClass("active").slideToggle("400");
          $(this).toggleClass("open");
        }
      );

      $(".popup-mobile-menu, .popup-mobile-menu .mainmenu.onepagenav li a").on(
        "click",
        function (e) {
          e.target === this &&
            $(".popup-mobile-menu").removeClass("active") &&
            $(".popup-mobile-menu .mainmenu .has-dropdown > a")
              .siblings(".submenu")
              .removeClass("active")
              .slideUp("400") &&
            $(".popup-mobile-menu .mainmenu .has-dropdown > a").removeClass(
              "open"
            );
        }
      );

      $(".onepagenav-click a").on("click", function (e) {
        $(".popup-mobile-menu").removeClass("active");
        tmPk._html.css({
          overflow: "",
        });
      });
    },

    tpm_mobileMenuActive: function (e) {
      $(".tmp_button_active").on("click", function (e) {
        e.preventDefault();
        $(".tmp_side_bar").addClass("tmp_side_bar_open");
        $("body").addClass("sidemenu-active");
        // tmPk._html.css({
        //   overflow: "hidden",
        // });
      });

      $(".close_side_menu_active").on("click", function (e) {
        e.preventDefault();
        $(".tmp_side_bar").removeClass("tmp_side_bar_open");
        $("body").removeClass("sidemenu-active");
        tmPk._html.css({
          overflow: "",
        });
      });
    },

    smoothScroll: function (e) {
      $(document).on("click", '.onepage a[href^="#"]', function (event) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top,
          },
          2000
        );
      });
    },

    tmpcustomAnimation: function () {
      return {
        init: function () {
          this.animates();
        },
        animates: function () {
          var animates = $(".scroll-trigger");
          if (animates.length > 0) {
            animates.each(function () {
              $(this).on("animationend", function (e) {
                setTimeout(function () {
                  $(e.target).attr("animation-end", "");
                }, 1000);
              });
            });
          }
        },
      };
    },

    onePageNav: function () {
      $(".onepagenav").onePageNav({
        currentClass: "current",
        changeHash: false,
        scrollSpeed: 500,
        scrollThreshold: 0.2,
        filter: ":not(.external)",
        easing: "swing",
      });
    },
    odoMeter: function () {
      $(document).ready(function () {
        function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight)
          );
        }

        function triggerOdometer(element) {
          const $element = $(element);
          if (!$element.hasClass("odometer-triggered")) {
            const countNumber = $element.attr("data-count");
            $element.html(countNumber);
            $element.addClass("odometer-triggered"); // Add a class to prevent re-triggering
          }
        }

        function handleOdometer() {
          $(".odometer").each(function () {
            if (isInViewport(this)) {
              triggerOdometer(this);
            }
          });
        }

        // Check on page load
        handleOdometer();

        // Check on scroll
        $(window).on("scroll", function () {
          handleOdometer();
        });
      });
    },
    // two scroll spy
    smothScroll: function () {
      $(document).on("click", ".smoth-animation", function (event) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top - 50,
          },
          300
        );
      });
    },

    fonklsAnimation: function () {
      let endTl = gsap.timeline({
        repeat: -1,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".end",
          start: "bottom 100%-=50px",
        },
      });
      gsap.set(".end", {
        opacity: 0,
      });
      gsap.to(".end", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".end",
          start: "bottom 100%-=50px",
          once: true,
        },
      });
      let mySplitText = new SplitText(".end", {
        type: "words,chars",
      });
      let chars = mySplitText.chars;
      endTl.to(chars, {
        duration: 0.5,
        scaleY: 0.9,
        ease: "power3.out",
        stagger: 0.04,
        transformOrigin: "center bottom",
      });
      endTl.to(
        chars,
        {
          yPercent: -10,
          ease: "elastic",
          stagger: 0.03,
          duration: 0.8,
        },
        0.5
      );
      endTl.to(
        chars,
        {
          scaleY: 1,
          ease: "elastic.out(2.5, 0.2)",
          stagger: 0.03,
          duration: 1.5,
        },
        0.5
      );
      endTl.to(
        chars,
        {
          ease: "power2.out",
          stagger: 0.03,
          duration: 0.3,
        },
        0.5
      );
      endTl.to(
        chars,
        {
          yPercent: 0,
          ease: "back",
          stagger: 0.03,
          duration: 0.8,
        },
        0.7
      );
      endTl.to(chars, {
        duration: 1.4,
        stagger: 0.05,
      });
    },

    animationOnHover: function () {
      let cards = document.querySelectorAll(".tmponhover");
      cards.forEach((tmpOnHover) => {
        tmpOnHover.onmousemove = function (e) {
          let x = e.pageX - tmpOnHover.offsetLeft;
          let y = e.pageY - tmpOnHover.offsetTop;
          tmpOnHover.style.setProperty("--x", x + "px");
          tmpOnHover.style.setProperty("--y", y + "px");
        };
      });
    },
  };

  tmPk.m();
})(jQuery, window);

// Back To Top style here
function updateDimensions() {
  windowHeight = window.innerHeight;
  documentHeight = document.documentElement.scrollHeight - windowHeight;
}

// Initialize dimensions
updateDimensions();

// Add resize event listener to update dimensions
window.addEventListener("resize", updateDimensions);

document.addEventListener("DOMContentLoaded", function () {
  var box = document.querySelector(".scrollToTop");
  if (box) {
    var water = box.querySelector(".water");

    window.addEventListener("scroll", function () {
      var scrollPosition = window.scrollY;
      var percent = Math.min(
        Math.floor((scrollPosition / documentHeight) * 100),
        100
      );
      water.style.transform = "translate(0," + (100 - percent) + "%)";

      if (scrollPosition >= 200) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });

    // Add click event listener to scroll to top
    box.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Preloader functionality
  function removePreloader() {
    document.body.classList.remove("preloader-active");
  }

  document.body.classList.add("preloader-active");
  window.addEventListener("load", function () {
    removePreloader();
  });
});
