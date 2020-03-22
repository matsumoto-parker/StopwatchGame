'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const startButton = document.querySelector('.game-start-btn');
  const home = document.querySelector('.home');
  const nextStage = document.querySelector('.next-stage');
  const gameOver = document.querySelector('.game-over');
  const nextButton = document.querySelector('.next-start-btn');

  let number = Math.floor(Math.random() * 4) + 3;
  let i = number * 1000;
  console.log(i);

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  // タイマーの実装部分
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // タイマーのボタン切り替え用
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
  }

  setButtonStateInitial();

  // ミッションテキスト
  const homeText = document.querySelector('.modal_text');
  const text = document.createElement('p');
  text.textContent = `${number}秒で止めろ!`;
  homeText.insertBefore(text, homeText.children[0]);

  // ゲームスタート
  startButton.addEventListener('click', () => {
    home.classList.add('hidden');
  });

  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  // ストップ処理
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;

    init();
  });

  // レベル2
  function next() {
    let number2 = Math.floor(Math.random() * 4) + 3;
    let n = number2 * 1000;
    console.log(n);
    if (elapsedTime <= n + 500 && elapsedTime >= n - 500) {
      nextStage.classList.remove('hidden');
      nextButton.addEventListener('click', () => {
        nextStage.classList.add('hidden');
        timer.textContent = '00.000';
        elapsedTime = 0;
      });
    }
  }

  // レベル1の条件分岐と数値の初期化
  function init() {
    if (elapsedTime <= i + 500 && elapsedTime >= i - 500) {
      nextStage.classList.remove('hidden');
      nextButton.addEventListener('click', () => {
        nextStage.classList.add('hidden');
        timer.textContent = '00.000';
        elapsedTime = 0;
        next();
      });
    } else {
      gameOver.classList.remove('hidden');
    }
  }
}
