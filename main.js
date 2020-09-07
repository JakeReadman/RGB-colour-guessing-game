let numCircles = 6;
let colours = [];
let pickedColour;
const circles = document.querySelectorAll('.circle');
const colourDisplay = document.getElementById('colour-display');
const messageDisplay = document.getElementById('message');
const h1 = document.querySelector('h1');
const resetBtn = document.querySelector('#reset');
const modeBtns = document.querySelectorAll('.mode');

const randomColour = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const changeColour = (colour) => {
  circles.forEach((circle) => {
    circle.style.backgroundColor = colour;
  });
};

const pickRandomColour = () => {
  let randomNo = Math.floor(Math.random() * colours.length);
  return colours[randomNo];
};

const generateRandomColours = (num) => {
  let colourArr = [];
  for (let i = 0; i < num; i++) {
    colourArr.push(randomColour());
  }
  return colourArr;
};

const reset = () => {
  colours = generateRandomColours(numCircles);
  pickedColour = pickRandomColour();
  colourDisplay.textContent = pickedColour;
  circles.forEach((circle, idx) => {
    colours[idx]
      ? (circle.style.display = 'block') &&
        (circle.style.backgroundColor = colours[idx])
      : (circle.style.display = 'none');
  });
  h1.style.backgroundColor = '#9c9c9c';
  messageDisplay.textContent = '';
  resetBtn.textContent = 'New Colours';
};

const setupModeBtns = () => {
  modeBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      modeBtns[0].classList.remove('selected');
      modeBtns[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent.toLowerCase() === 'easy'
        ? (numCircles = 3)
        : (numCircles = 6);
      reset();
    });
  });
};

const colourELs = () => {
  circles.forEach((circle) => {
    circle.addEventListener('click', function () {
      let clickedColour = this.style.backgroundColor;
      if (clickedColour === pickedColour) {
        messageDisplay.textContent = 'correct';
        changeColour(pickedColour);
        h1.style.backgroundColor = pickedColour;
        resetBtn.textContent = 'Play Again';
      } else {
        this.style.backgroundColor = 'inherit';
        messageDisplay.textContent = 'Try Again';
      }
    });
  });
};

const init = () => {
  setupModeBtns();
  colourELs();
  reset();
};

init();

resetBtn.addEventListener('click', reset);
