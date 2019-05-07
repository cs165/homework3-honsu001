
class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.currentCorrect = 0;
    this.currentWrong = 0;
    this.statusCorrect = document.querySelector('#main .status .correct');
    this.statusWrong = document.querySelector('#main .status .incorrect');
    this.statusCorrect.textContent = this.currentCorrect;
    this.statusWrong.textContent = this.currentWrong;

    this.gameEnd = this.gameEnd.bind(this);
    this.deck_chosen = this.deck_chosen.bind(this);
    this.updateTemp = this.updateTemp.bind(this);
    this.updateFinal = this.updateFinal.bind(this);
    this.Continue = this.Continue.bind(this);
    this.toMenu = this.toMenu.bind(this);
    this.doOver = this.doOver.bind(this);

    document.addEventListener('toMenu', this.toMenu);
    document.addEventListener('gameEnd', this.gameEnd);
    document.addEventListener('deckChosen', this.deck_chosen);
    document.addEventListener('updateTemp', this.updateTemp);
    document.addEventListener('update', this.updateFinal);
    document.addEventListener('continue', this.Continue);
    document.addEventListener('doOver', this.doOver);

   }

   doOver() {
     this.currentCorrect = 0;
     this.currentWrong = 0;
     this.statusCorrect.textContent = 0;
     this.statusWrong.textContent = 0;
     this.results.hide();
     this.flashcards.show();
     document.dispatchEvent(new CustomEvent('startOver'));
   }

   toMenu() {
     this.currentCorrect = 0;
     this.currentWrong = 0;
     this.statusCorrect.textContent = 0;
     this.statusWrong.textContent = 0;
     this.results.hide();
     this.menu.show();
     document.dispatchEvent(new CustomEvent('reset'));
   }

   Continue() {
     this.currentCorrect = 0;
     this.currentWrong = 0;
     this.statusCorrect.textContent = 0;
     this.statusWrong.textContent = 0;
     this.results.hide();
     this.flashcards.show();
     document.dispatchEvent(new CustomEvent('newCards'));
   }

   gameEnd() {
    this.flashcards.hide();
    this.results.show(this.currentCorrect, this.currentWrong);
   }

  deck_chosen(event) {
    const title = event.detail.title;
    this.menu.hide();
    this.flashcards.show();
  }

  updateFinal(event) {
    let correct = event.detail.correct;
    if (correct) {
      this.currentCorrect++;
      this.statusCorrect.textContent = this.currentCorrect;
    } else {
      this.currentWrong++;
      this.statusWrong.textContent = this.currentWrong;
    }
  }

  updateTemp(event) {
    let correct = event.detail.correct;
    if (correct === 3) {
      this.statusCorrect.textContent = this.currentCorrect;
      this.statusWrong.textContent = this.currentWrong;
    } else if (correct === 1) {
      let tempCorrect = this.currentCorrect;
      tempCorrect++;
      this.statusCorrect.textContent = tempCorrect;
    } else {
      let tempWrong = this.currentWrong;
      tempWrong++;
      this.statusWrong.textContent = tempWrong;
    }

  }


}
