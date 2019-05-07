// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;
	this.origin_X = 0;
	this.origin_Y = 0;
	this.current_X = 0;
	this.current_Y = 0;
	this.drag = false;
	this.front = frontText;
	this.back = backText;
	this.flip = 0;
	
    this._flipCard = this._flipCard.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
	
	this._pointer_down = this._pointer_down.bind(this);
    this.flashcardElement.addEventListener('pointerdown', this._pointer_down);
	this._pointer_up = this._pointer_up.bind(this);
    this.flashcardElement.addEventListener('pointerup', this._pointer_up);
	this._pointer_move = this._pointer_move.bind(this);
    this.flashcardElement.addEventListener('pointermove', this._pointer_move);
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
	this.flip++;
  }
  
  _pointer_down(event){
	  this.origin_X = event.clientX;
	  this.origin_Y = event.clientY;
	  this.drag = true;
	  event.target.setPointerCapture(event.pointerId);
	  event.currentTarget.style.transition = "0s";
  }
  
  _pointer_up(event){
	  this.drag = false;
	  document.querySelector("body").classList.remove('darker_background');
	  
	  this.current_X = event.clientX - this.origin_X;
	  this.current_Y = event.clientY - this.origin_Y;
	  
	  if(this.current_X >= 150){
		  const eventInfo = {
			  word:this.front,
			  right:1
		  };
		  document.dispatchEvent(new CustomEvent('update_status', {detail:eventInfo} ) );
		  document.dispatchEvent(new CustomEvent('change_card', {detail:eventInfo} ) );
	  }
	  else if(this.current_X <= -150){
		  const eventInfo = {
			  word:this.front,
			  right:-1
		  };
		  
		  if(this.flip % 2 == 1 ) { this._flipCard(event); }
		  event.currentTarget.style.transition = "0s";
		  event.currentTarget.style.transform = 'translateX(' + 0 + 'px)' + 'translateY(' + 0 + 'px)';
		  
		  document.dispatchEvent(new CustomEvent('update_status', {detail:eventInfo} ) );
		  document.dispatchEvent(new CustomEvent('change_card', {detail:eventInfo} ) );
	  }
	  else{
		  this._flipCard(event);
		  event.currentTarget.style.transition = "0.6s";
		  event.currentTarget.style.transform = 'translateX(' + 0 + 'px)' + 'translateY(' + 0 + 'px)';
	  }
  }
  
  _pointer_move(event){
	  if(!this.drag){ return; }
	  event.preventDefault();
	  
	  const direction_X = event.clientX - this.origin_X;
	  const direction_Y = event.clientY - this.origin_Y;
	  const rotate = 0.2 * direction_X;
	  
	  event.currentTarget.style.transform = 'translateX(' + direction_X + 'px)' + 'translateY(' + direction_Y + 'px)' + 'rotate(' + rotate + 'deg)';
	  
	  if(direction_X >= 150){
		  document.querySelector("body").classList.add('darker_background');
		  const eventInfo = {
			  right:1
		  };
		  document.dispatchEvent(new CustomEvent('status_tmp', {detail:eventInfo} ) );
	  }
	  else if(direction_X <= -150){
		  document.querySelector("body").classList.add('darker_background');
		  const eventInfo = {
			  right:-1
		  };
		  document.dispatchEvent(new CustomEvent('status_tmp', {detail:eventInfo} ) );
	  }
	  else{
		  document.querySelector("body").classList.remove('darker_background');
		  const eventInfo = {
			  right:0
		  };
		  document.dispatchEvent(new CustomEvent('status_tmp', {detail:eventInfo} ) );
	  }
  }
}
