// CRT 버튼에 마우스 누르면 스캔라인 켜기
const crtButton = document.getElementById('crt-button');
crtButton.addEventListener('mousedown', () => {
  crtBox.classList.add('crt-active');
});
crtButton.addEventListener('mouseup', () => {
  crtBox.classList.remove('crt-active');
});
crtButton.addEventListener('mouseleave', () => {
  crtBox.classList.remove('crt-active');
});

const blinkLight = document.querySelector('.blink-light');
const crtBox = document.querySelector('.crt-box');
let powerState = 'on';
let pressTimer = null;

// 전원 끄기 효과
function powerOff() {
  crtBox.classList.remove('power-on');
  crtBox.classList.add('power-off');
  powerState = 'off';

  // 초록불을 빨간불로 변경
  blinkLight.classList.remove('green');
  blinkLight.classList.add('red');
}

// 전원 켜기 효과
function powerOn() {
  crtBox.classList.remove('power-off');
  crtBox.classList.add('power-on');
  powerState = 'on';

  // 빨간불을 초록불로 변경
  blinkLight.classList.remove('red');
  blinkLight.classList.add('green');
}

// 초록불 2초 누르면 꺼짐
blinkLight.addEventListener('mousedown', () => {
  if (powerState === 'on') {
    pressTimer = setTimeout(powerOff, 2000);
  }
});
blinkLight.addEventListener('mouseup', () => {
  clearTimeout(pressTimer);
});
blinkLight.addEventListener('mouseleave', () => {
  clearTimeout(pressTimer);
});

// 빨간불 클릭하면 켜짐
blinkLight.addEventListener('click', () => {
  if (powerState === 'off') {
    powerOn();
  }
});
