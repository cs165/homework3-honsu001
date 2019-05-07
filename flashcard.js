// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    let key = 0;
    this.containerElement = containerElement;

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);

    this.word = frontText;
    this.def = backText;

    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragStarted = false;
    this._flipCard = this._flipCard.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.flashcardElement.addEventListener('click', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this.onDragStart);
    this.flashcardElement.addEventListener('pointerup', this.onDragEnd);
    this.flashcardElement.addEventListener('pointermove', this.onDragMove);
  }

  onDragStart() {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.transition = "0s";
  }

  onDragMove(event) {
    if (!this.dragStarted) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const translateX = deltaX;
    const translateY = deltaY;
    const rotation = 0.2*deltaX;

    event.currentTarget.style.transform = 'translate(' +
    translateX + 'px, ' + translateY + 'px)' + 'rotate(' + rotation + 'deg)';

    const body = document.querySelector('body');

    if (deltaX >= 150) {
      const eventInfo = {
        correct: 1
      };
      body.style.backgroundColor = '#97b7b7';
      document.dispatchEvent(new CustomEvent('updateTemp', {detail: eventInfo}));
    } else if (deltaX <= -150) {
      const eventInfo = {
        correct: 2
      };
      body.style.backgroundColor = '#97b7b7';
      document.dispatchEvent(new CustomEvent('updateTemp', {detail: eventInfo}));
    } else {
      const eventInfo = {
        correct: 3
      };
      body.style.backgroundColor = '#d0e6df';
      document.dispatchEvent(new CustomEvent('updateTemp', {detail: eventInfo}));
    }
  }

  onDragEnd(event) {
    const body = document.querySelector('body');
    body.style.backgroundColor = '#d0e6df';
    this.dragStarted = false;
    this.offsetX = event.clientX - this.originX;
    this.offsetY = event.clientY - this.originY;
    if (this.offsetX >= 150) {
      const eventInfo = {
        word: this.word,
        correct: true
      };
      document.dispatchEvent(new CustomEvent('update', {detail: eventInfo}));
      document.dispatchEvent(new CustomEvent('updateDeck', {detail: eventInfo}));
    } else if (this.offsetX <= -150) {
      const eventInfo = {
        word: this.word,
        correct: false
      };
      event.currentTarget.style.transform = 'translate(' +
       0 + 'px, ' + 0 + 'px)';
      document.dispatchEvent(new CustomEvent('update', {detail: eventInfo}));
      document.dispatchEvent(new CustomEvent('updateDeck', {detail: eventInfo}));
    } else {
      event.currentTarget.style.transition = "0.6s";
      event.currentTarget.style.transform = 'translate(' +
       0 + 'px, ' + 0 + 'px)';
    }
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

}
