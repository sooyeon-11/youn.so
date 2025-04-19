// fullpage 초기화
$('#fullpage').fullpage({
  autoScrolling: true,
  fitToSection: true,
  responsiveWidth: 1024, // 1024 이하에선 autoScrolling false로 자동 전환
  responsiveHeight: 600, // 높이 작으면 fitToSection 비활성화
  navigation: true,
  navigationPosition: 'left',
  anchors: ['menu1', 'menu2', 'menu3', 'menu4', 'menu5', 'menu6'],
  showActiveTooltip: true,
});

/* 메인 비디오 재생 */
const videoWrapper = document.querySelector('.visual_video');
const video = videoWrapper.querySelector('video');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      video.play().catch(e => {
        console.log('Autoplay error:', e);
      });
    }
  });
}, {
  threshold: 0.5 // 영상이 50% 이상 보이면 play
});
observer.observe(videoWrapper);


/* 메인 비주얼 텍스트 애니메이션 */
function playAnimation() {
  let typeSplit = new SplitType(".text", {
    types: "lines, words, chars",
  });
  gsap.set(".text .push-down", {
    y: 40, // 이게 translateY(40px)랑 같아
    rotate: 5
  });

  gsap.from(".text .word", {
    y: "100%",
    opacity: 1,
    duration: 1,
    ease: "circ.out",
    stagger: 0.3,
  });
}

// 페이지 로드 후 애니메이션 자동 실행
window.onload = playAnimation;

/* 마우스 cursor */
$(document).on("mousemove", function (e) {
  const size = $("#cursor").width() / 2;
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  $("#cursor").css({
    left: (mouseX - size) + "px",
    top: (mouseY - size) + "px"
  })
});

$(".web .web_list").on("mouseenter mouseleave", function (e) {
  var type = e.type
  if (type == "mouseenter") {
    $("#cursor").addClass("fade");
  } else if (type == "mouseleave") {
    $("#cursor").removeClass("fade");
  }
});

/* licence_popup */
$(".licence_popup").hide();
$(".licence_more").click(function () {
  $(".licence_popup").fadeIn();
});
$(".licence_popup .close").click(function () {
  $(".licence_popup").fadeOut();
});

/* 탭 메뉴 */
$(".contact_btn").click(function () {
  $(".contact").toggleClass("open");
});

/* 포트폴리오 그래픽 슬라이드 */
const graphic_list = new Swiper(".graphic_list", {
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  loop: true, // 슬라이드 반복 여부
  speed: 1000, // 슬라이드 동작 속도
  breakpoints: {
    0: { //분기점 
      slidesPerView: 1,
      spaceBetween: 15,
    },
    501: { //분기점 
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 35,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar", // 버튼 종류 설정 'bullets' | 'fraction' | 'progressbar'
    clickable: true, // 버튼 클릭 여부
  },
});

/* epilogue 그라데이션 배경 */
const colors = [
  [240, 255, 245], // 기존 230,254,239 → 더 밝게
  [210, 225, 240], // 기존 174,190,216 → 푸른빛 유지하면서 밝게
  [220, 255, 255], // 기존 194,254,254 → 더 희게
  [250, 255, 255], // 거의 흰색 (기존도 거의 흰색이었음)
  [240, 255, 255]  // 청록톤+화이트 느낌
];


let step = 0;

// color table indices:
// current color left, next color left,
// current color right, next color right
let colorIndices = [0, 1, 2, 3];

// transition speed
const gradientSpeed = 0.002;

function updateGradient() {
  if (typeof $ === 'undefined') return;

  const c0_0 = colors[colorIndices[0]];
  const c0_1 = colors[colorIndices[1]];
  const c1_0 = colors[colorIndices[2]];
  const c1_1 = colors[colorIndices[3]];

  const istep = 1 - step;
  const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  const color1 = `rgb(${r1},${g1},${b1})`;

  const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  const color2 = `rgb(${r2},${g2},${b2})`;

  $('.gradient').css({
    background: `-webkit-gradient(linear, left top, right top, from(${color1}), to(${color2}))`
  }).css({
    background: `-moz-linear-gradient(left, ${color1} 0%, ${color2} 100%)`
  });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    // pick two new target color indices
    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
  }
}

setInterval(updateGradient, 10);


