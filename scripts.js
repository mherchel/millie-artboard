(function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const inputHue = document.querySelector('.hue');
  const inputLineWidth = document.querySelector('.width');
  const buttonClear = document.querySelector('.btn-clear');
  const hueCurrent = document.querySelector('.hue-current');
  const widthCurrent = document.querySelector('.width-current');
  const quickButtons = document.querySelectorAll('.btn-quick');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 80;

  let hue = inputHue.valueAsNumber;
  let lineWidth = 20;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function draw(e) {
    if (!isDrawing) return;

    e.preventDefault();

    positionX = (e.touches) ? e.touches['0'].clientX : e.offsetX;
    positionY = (e.touches) ? e.touches['0'].clientY : e.offsetY;

    ctx.beginPath();
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(positionX, positionY);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    [lastX, lastY] = [positionX, positionY]
  }

  function updateLineWidth(e) {
    lineWidth = (e) ? e.target.valueAsNumber : inputLineWidth.valueAsNumber;
    widthCurrent.textContent = lineWidth;
  }

  function updateHue(e) {
    hue = (e) ? e.target.valueAsNumber : inputHue.valueAsNumber;
    hueCurrent.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
  }

  function quickColorChange(e) {
    hslValue = e.target.dataset.hsl;
    e.target.style.backgroundColor = 'hsl(' + hslValue + ', 100%, 50%)';

    hue =  hslValue;
    hueCurrent.style.backgroundColor = 'hsl(' + hslValue + ', 100%, 50%)';

  }

  document.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]
  });

  updateHue();
  updateLineWidth();

  canvas.addEventListener('mouseenter', (e) => [lastX, lastY] = [e.offsetX, e.offsetY]);
  document.addEventListener('mouseup', () => isDrawing = false);

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchmove', draw);

  inputLineWidth.addEventListener('input', updateLineWidth);
  buttonClear.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  inputHue.addEventListener('input', updateHue);

  quickButtons.forEach(function(el) {
    el.addEventListener('click', quickColorChange);

    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });

    el.dispatchEvent(event);
  });



})();
