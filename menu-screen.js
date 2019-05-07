// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    const deckContainer = document.querySelector('#choices');
    for (let key in FLASHCARD_DECKS) {
       const deck = FLASHCARD_DECKS[key];
       const text = deck.title;
       const newDiv = document.createElement('div');
       this.deckSelected = this.deckSelected.bind(this);
       newDiv.textContent = text;
       newDiv.addEventListener('click', this.deckSelected);
       deckContainer.appendChild(newDiv);
    }
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  deckSelected(event) {
    const deck = event.currentTarget;
    const eventInfo = {
      title: deck.textContent
    };
    document.dispatchEvent(new CustomEvent('deckChosen', {detail: eventInfo}));
  }

}
