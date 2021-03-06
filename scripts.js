(function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const inputHue = document.querySelector('.hue');
  const inputColor = document.querySelector('input[type="color"]');
  const inputLineWidth = document.querySelector('.width');
  const buttonClear = document.querySelector('.btn-clear');
  const hueCurrent = document.querySelector('.hue-current');
  const widthCurrent = document.querySelector('.width-current');
  const quickButtons = document.querySelectorAll('.btn-quick');
  const blendModeChanger = document.querySelector('.blend');
  const buttonErase = document.querySelector('.btn-erase');
  const toggleControlBtn = document.querySelector('.btn-controls');
  const controlsWrapper = document.querySelector('.controls');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  let hue = inputHue.valueAsNumber;
  let color = inputColor.value;
  let colorPicker = true;
  let lineWidth = 20;
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let blendMode = blendModeChanger.value;

  function draw(e) {
    if (!isDrawing) return;

    if (window.innerWidth <= 600) toggleControls('close');

    e.preventDefault();

    positionX = (e.touches) ? e.touches['0'].clientX : e.offsetX;
    positionY = (e.touches) ? e.touches['0'].clientY : e.offsetY;

    ctx.beginPath();
    if (colorPicker) {
      ctx.strokeStyle = color;
    } else {
      ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
    }
    
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(positionX, positionY);
    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = blendMode;
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
    colorPicker = false;
  }

  function updateColor(e) {
    color = (e) ? e.target.value : inputHue.value
    colorPicker = true;
  }

  function quickColorChange(e) {
    hslValue = e.target.dataset.hsl;
    e.target.style.backgroundColor = 'hsl(' + hslValue + ', 100%, 50%)';

    hue =  hslValue;
    hueCurrent.style.backgroundColor = 'hsl(' + hslValue + ', 100%, 50%)';
    inputHue.value = hue;
  }

  function enableDraw(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function eraser() {
    blendMode = 'destination-out';
    buttonErase.classList.toggle('js-enabled');

    if (!buttonErase.classList.contains('js-enabled')) blendMode = blendModeChanger.value;
  }

  function toggleControls(action) {
    if (action === 'close') {
      controlsWrapper.classList.remove('js-expanded');
      toggleControlBtn.classList.remove('js-expanded');
    }

    else if (action === 'open') {
      controlsWrapper.classList.add('js-expanded');
      toggleControlBtn.classList.add('js-expanded');
    }

    else {
      controlsWrapper.classList.toggle('js-expanded');
      toggleControlBtn.classList.toggle('js-expanded');
    }
  }

  document.addEventListener('mousedown', enableDraw);
  canvas.addEventListener('touchstart', enableDraw);
  canvas.addEventListener('mouseenter', (e) => [lastX, lastY] = [e.offsetX, e.offsetY]);
  document.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('touchmove', draw);
  inputLineWidth.addEventListener('input', updateLineWidth);
  buttonClear.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  inputHue.addEventListener('input', updateHue);
  inputColor.addEventListener('input', updateColor);
  blendModeChanger.addEventListener('change', (e) => blendMode = e.target.value);
  buttonErase.addEventListener('click', eraser);
  toggleControlBtn.addEventListener('click', toggleControls);

  for (let el of quickButtons) {
    el.addEventListener('click', quickColorChange);
    el.click();
  }

  updateHue();
  updateLineWidth();

})();
