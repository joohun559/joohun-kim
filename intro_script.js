const crtButton = document.getElementById('crt-button');
const crtBox = document.querySelector('.crt-box');
const blinkLight = document.querySelector('.blink-light');

let powerState = 'on';
let pressTimer = null;
let wasLongPressed = false;

// 스캔라인 효과 (PC)
crtButton.addEventListener('mousedown', () => {
  if (powerState === 'on') crtBox.classList.add('crt-active');
});
crtButton.addEventListener('mouseup', () => {
  crtBox.classList.remove('crt-active');
});
crtButton.addEventListener('mouseleave', () => {
  crtBox.classList.remove('crt-active');
});

// 스캔라인 효과 (모바일)
crtButton.addEventListener('touchstart', () => {
  if (powerState === 'on') crtBox.classList.add('crt-active');
});
crtButton.addEventListener('touchend', () => {
  crtBox.classList.remove('crt-active');
});

// 전원 끄기
function powerOff() {
  crtBox.classList.remove('power-on');
  crtBox.classList.add('power-off');
  blinkLight.classList.remove('green');
  blinkLight.classList.add('red');
  powerState = 'off';
  wasLongPressed = true;
}

// 전원 켜기
function powerOn() {
  crtBox.classList.remove('power-off');
  crtBox.classList.add('power-on');
  blinkLight.classList.remove('red');
  blinkLight.classList.add('green');
  powerState = 'on';
}

// 길게 눌렀는지 체크
function startPressTimer() {
  if (powerState === 'on') {
    pressTimer = setTimeout(() => {
      powerOff();
    }, 2000);
  }
}

function cancelPressTimer() {
  if (pressTimer !== null) {
    clearTimeout(pressTimer);
    pressTimer = null;
  }
}

// 이벤트 연결
['mousedown', 'touchstart'].forEach(evt => {
  blinkLight.addEventListener(evt, startPressTimer);
});
['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(evt => {
  blinkLight.addEventListener(evt, cancelPressTimer);
});

// 클릭 시 전원 켜기
blinkLight.addEventListener('click', () => {
  if (powerState === 'off') {
    if (wasLongPressed) {
      wasLongPressed = false; // 첫 클릭 무시 후 플래그 초기화
    } else {
      powerOn(); // 정상 켜기
    }
  }
});
