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
	const deck_choice = document.querySelector('#choices');
	
	for (const deck of FLASHCARD_DECKS){
		const choice = document.createElement('div');
		this.selected = this.selected.bind(this);
		choice.textContent = deck.title;
		choice.addEventListener('click', this.selected);
		deck_choice.appendChild(choice);
	}
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  
  selected(event){
	  const current = event.currentTarget;;
	  const eventInfo = {
      title:current.textContent
    };
    document.dispatchEvent(new CustomEvent('choose_deck', {detail:eventInfo} ) );
  }
}
