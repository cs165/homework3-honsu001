// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.startOver = this.startOver.bind(this);
    this.Continue = this.Continue.bind(this);
    this.toMenu = this.toMenu.bind(this);
    this.reset = this.reset.bind(this);
    document.addEventListener('reset', this.rest);
  }

  reset() {
    const startOver = document.querySelector('#results .continue');
    startOver.removeEventListener('click', this.startOver);
    startOver.removeEventListener('click', this.Continue);
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');

    this.percentCorrect = document.querySelector('#results .percent');
    this.correct = document.querySelector('#results .correct');
    this.wrong = document.querySelector('#results .incorrect');

    const percentage = Math.ceil((numberCorrect/(numberCorrect+numberWrong))*100);
    this.percentCorrect.textContent = percentage + ' ';
    this.correct.textContent = numberCorrect + ' ';
    this.wrong.textContent = numberWrong + ' ';

    const toMenu = document.querySelector('#results .to-menu');
    toMenu.addEventListener('click', this.toMenu);

    if (percentage === 100) {
      const startOver = document.querySelector('#results .continue');
      startOver.textContent = 'Start Over?';
      startOver.addEventListener('click', this.startOver);
    } else {
      const Continue = document.querySelector('#results .continue');
      Continue.textContent = 'Continue';
      Continue.addEventListener('click', this.Continue);
    }

  }

  toMenu() {
    const toMenu = document.querySelector('#results .to-menu');
    toMenu.removeEventListener('click', this.toMenu);
    this.reset();
    document.dispatchEvent(new CustomEvent('toMenu'));
  }

  Continue() {
    const Continue = document.querySelector('#results .continue');
    Continue.removeEventListener('click', this.Continue);
    this.reset();
    document.dispatchEvent(new CustomEvent('continue'));
  }

 startOver() {
   const startOver = document.querySelector('#results .continue');
   startOver.removeEventListener('click', this.startOver);
   this.reset();
   document.dispatchEvent(new CustomEvent('doOver'));
 }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
