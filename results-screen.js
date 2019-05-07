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
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
	const percent = document.querySelector('#results .percent');
	const right = document.querySelector('#results .correct');
	const wrong = document.querySelector('#results .incorrect');
	if(numberWrong == 0){
		percent.textContent = 100;
	}
	else{
		percent.textContent = Math.round( numberCorrect * 100 / (numberCorrect + numberWrong) );
	}
	right.textContent = numberCorrect;
	wrong.textContent = numberWrong;
	
	if(numberWrong == 0){
		const start_over = document.querySelector('#results .continue');
		start_over.textContent = "Start Over?";
		start_over.addEventListener('click', this.click_start_over);
		start_over.removeEventListener('click', this.click_continue);
	}
	else{
		const _continue = document.querySelector('#results .continue');
		_continue.textContent = "Continue";
		_continue.addEventListener('click', this.click_continue);
		_continue.removeEventListener('click', this.click_start_over);
	}
	const to_menu = document.querySelector('#results .to-menu');
	to_menu.addEventListener('click', this.click_to_menu);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  
  click_start_over(event){
	  document.dispatchEvent(new CustomEvent('start_over') );
  }
  
  click_to_menu(event){
	  document.dispatchEvent(new CustomEvent('to_menu') );
  }
  
  click_continue(event){
	  document.dispatchEvent(new CustomEvent('_continue') );
  }
}
