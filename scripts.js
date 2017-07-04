(function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const inputHue = document.querySelector('.hue');
  const inputLineWidth = document.querySelector('.width');
  const buttonClear = document.querySelector('.btn-clear');
  const hueCurrent = document.querySelector('.hue-current');
  const widthCurrent = document.querySelector('.width-current');

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

    ctx.beginPath();
    ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function updateLineWidth(e) {
    lineWidth = (e) ? e.target.valueAsNumber : inputLineWidth.valueAsNumber;
    widthCurrent.textContent = lineWidth;
  }

  function updateHue(e) {
    hue = (e) ? e.target.valueAsNumber : inputHue.valueAsNumber;
    hueCurrent.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
  }

  document.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  updateHue();
  updateLineWidth();

  canvas.addEventListener('mouseenter', (e) => [lastX, lastY] = [e.offsetX, e.offsetY] );
  canvas.addEventListener('mousemove', draw);
  document.addEventListener('mouseup', () => isDrawing = false);
  inputLineWidth.addEventListener('input', updateLineWidth);
  buttonClear.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
  inputHue.addEventListener('input', updateHue);

})();
