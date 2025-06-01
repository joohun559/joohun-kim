const crtBox = document.querySelector('.crt-box');
const blinkLight = document.querySelector('.blink-light');
const crtButton = document.getElementById('crt-button');

let powerState = 'on';
let pressTimer = null;

// CRT 버튼 눌렀을 때 스캔라인 효과 (PC + 모바일)
function activateCRT() {
  crtBox.classList.add('crt-active');
}
function deactivateCRT() {
  crtBox.classList.remove('crt-active');
}

crtButton.addEventListener('mousedown', activateCRT);
crtButton.addEventListener('mouseup', deactivateCRT);
crtButton.addEventListener('mouseleave', deactivateCRT);
crtButton.addEventListener('touchstart', activateCRT);
crtButton.addEventListener('touchend', deactivateCRT);

// 전원 끄기 효과
function powerOff() {
  crtBox.classList.remove('power-on');
  crtBox.classList.add('power-off');
  powerState = 'off';
  blinkLight.classList.remove('green');
  blinkLight.classList.add('red');
}

// 전원 켜기 효과
function powerOn() {
  crtBox.classList.remove('power-off');
  crtBox.classList.add('power-on');
  powerState = 'on';
  blinkLight.classList.remove('red');
  blinkLight.classList.add('green');
}

// 전원 끄기 타이머 시작 (2초 누름)
function startPressTimer() {
  if (powerState === 'on') {
    pressTimer = setTimeout(powerOff, 2000);
  }
}

// 타이머 취소
function cancelPressTimer() {
  clearTimeout(pressTimer);
}

// 초록불 2초간 눌렀을 때 꺼짐 (PC + 모바일)
blinkLight.addEventListener('mousedown', startPressTimer);
blinkLight.addEventListener('mouseup', cancelPressTimer);
blinkLight.addEventListener('mouseleave', cancelPressTimer);
blinkLight.addEventListener('touchstart', startPressTimer);
blinkLight.addEventListener('touchend', cancelPressTimer);

// 빨간불 클릭 또는 터치 시 전원 켜짐
blinkLight.addEventListener('click', () => {
  if (powerState === 'off') {
    powerOn();
  }
});
