// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
	
	this.right = 0;
	this.wrong = 0;
	this.status_right = document.querySelector('#main .status .correct');
	this.status_wrong = document.querySelector('#main .status .incorrect');
	this.status_right.textContent = this.right;
	this.status_wrong.textContent = this.wrong;
	
	this.choose_deck = this.choose_deck.bind(this);
	document.addEventListener('choose_deck', this.choose_deck);
	
	this.status_tmp = this.status_tmp.bind(this);
	document.addEventListener('status_tmp', this.status_tmp);
	
	this.update_status = this.update_status.bind(this);
	document.addEventListener('update_status', this.update_status);
	
	this.card_empty = this.card_empty.bind(this);
	document.addEventListener('card_empty', this.card_empty);
	
	this.start_over = this.start_over.bind(this);
	document.addEventListener('start_over', this.start_over);
	
	this.to_menu = this.to_menu.bind(this);
	document.addEventListener('to_menu', this.to_menu);
	
	this._continue = this._continue.bind(this);
	document.addEventListener('_continue', this._continue);
  }
  
  choose_deck(event){
	  this.menu.hide();
	  this.flashcards.show();
  }
  
  status_tmp(event){
	  const right = event.detail.right;
	  if(right == 1){
		  this.status_right.textContent = this.right + 1;
		  this.status_wrong.textContent = this.wrong;
	  }
	  else if(right == -1){
		  this.status_right.textContent = this.right;
		  this.status_wrong.textContent = this.wrong + 1;
	  }
	  else{
		  this.status_right.textContent = this.right;
		  this.status_wrong.textContent = this.wrong;
	  }
  }
  
  update_status(event){
	  const right = event.detail.right;
	  if(right == 1){
		  this.right++;
	  }
	  else{
		  this.wrong++;
	  }
	  this.status_right.textContent = this.right;
	  this.status_wrong.textContent = this.wrong;
  }
  
  card_empty(event){
	  this.flashcards.hide();
	  this.results.show(this.right, this.wrong);
  }
  
  start_over(event){
	  this.right = 0;
	  this.wrong = 0;
	  this.status_right.textContent = this.right;
	  this.status_wrong.textContent = this.wrong;
	  this.results.hide();
	  this.flashcards.show();
	  document.dispatchEvent(new CustomEvent('choose_deck') );
  }
  
  to_menu(event){
	  this.right = 0;
	  this.wrong = 0;
	  this.status_right.textContent = this.right;
	  this.status_wrong.textContent = this.wrong;
	  this.results.hide();
	  this.menu.show();
  }
  
  _continue(event){
	  this.wrong = 0;
	  this.status_right.textContent = this.right;
	  this.status_wrong.textContent = this.wrong;
	  this.results.hide();
	  this.flashcards.show();
	  document.dispatchEvent(new CustomEvent('do_continue') );
  }
}
