// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
	this.flashcards = [];
	this.wrongcards = [];
	this.title = null;
	this.flashcard_container = document.querySelector('#flashcard-container');
	
	this.choose_deck_flash = this.choose_deck_flash.bind(this);
	document.addEventListener('choose_deck', this.choose_deck_flash);
	
	this.change_card_flash = this.change_card_flash.bind(this);
	document.addEventListener('change_card', this.change_card_flash);
	
	this.to_menu_flash = this.to_menu_flash.bind(this);
	document.addEventListener('to_menu', this.to_menu_flash);
	
	this.do_continue = this.do_continue.bind(this);
	document.addEventListener('do_continue', this.do_continue);
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  
  choose_deck_flash(event){
	  this.flashcards = [];
	  if(this.title == null){
		  this.title = event.detail.title;
	  }
	  let index = 0;
	  for(let i = 0;i < FLASHCARD_DECKS.length; i++){
		  if(this.title == FLASHCARD_DECKS[i].title){
			  index = i;
			  break;
		  }
	  }
	  const deck = FLASHCARD_DECKS[index];
	  for(let words in deck.words){
		  const new_flashcard = new Flashcard(this.flashcard_container, words, deck.words[words]);
		  this.flashcards.push(new_flashcard);
	  }
	  this.pop_flashcard(0);
  }
  
  pop_flashcard(amount){
	  let total = amount;
	  if(total === this.flashcards.length){
		  document.dispatchEvent(new CustomEvent('card_empty') );
	  }
	  else{
		  const card = this.flashcards[total].flashcardElement;
		  this.flashcard_container.append(card);
	  }
  }
  
  change_card_flash(event){
	  const right = event.detail.right;
	  const word = event.detail.word;
	  let tmp = 0;
	  for(let i = 0 ;i < this.flashcards.length;i++){
		  if(this.flashcards[i] != undefined){
			  if(this.flashcards[i].front == word){
				  tmp = i;
				  break;
			  }
		  }
	  }
	  if(right == 1){
		  delete this.flashcards[tmp];  
	  }
	  else{
		  this.wrongcards.push(this.flashcards[tmp]);
	  }
	  this.flashcard_container.removeChild(this.flashcard_container.lastChild);
	  this.pop_flashcard(tmp + 1);
  }
  
  to_menu_flash(event){
	  this.flashcards = [];
	  this.wrongcards = [];
	  this.title = null;
  }
  
  do_continue(event){
	  this.flashcards = this.wrongcards;
	  this.wrongcards = [];
	  this.pop_flashcard(0);
  }
}
