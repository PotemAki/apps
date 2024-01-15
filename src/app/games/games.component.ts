import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  
    // This code my was adjusted from vanilla JS to work on angular becouse this was originally one of my vanilla JS projects that i have decided to implement into bigger angular project.

  
  score = { wins: 0, losses: 0, ties: 0 };
  result = 'Click button to start the game.';
  isAutoPlaying = false;
  intervalId: any;
  outputPicksContent = '';
  playerPick = ``
  computerPick = ``

  playGame(pickMove: string): void {
    const computerMove = this.computerPlay();
    if (pickMove === 'paper') {
      if (computerMove === 'paper') {
        this.result = 'Tie.';
      } else if (computerMove === 'rock') {
        this.result = 'You win.';
      } else if (computerMove === 'scissors') {
        this.result = 'You lose.';
      }
    } else if (pickMove === 'rock') {
      if (computerMove === 'paper') {
        this.result = 'You lose.';
      } else if (computerMove === 'rock') {
        this.result = 'Tie.';
      } else if (computerMove === 'scissors') {
        this.result = 'You win.';
      }
    } else if (pickMove === 'scissors') {
      if (computerMove === 'paper') {
        this.result = 'You win.';
      } else if (computerMove === 'rock') {
        this.result = 'You lose.';
      } else if (computerMove === 'scissors') {
        this.result = 'Tie.';
      }
    }
    this.updateScore(this.result);
    this.playerPick = `../../assets/icons/${pickMove}-emoji.png`
    this.computerPick = `../../assets/icons/${computerMove}-emoji.png`
  }

  computerPlay(): string {
    let computerMove = '';
    const computerPick = Math.random();
    if (computerPick >= 0 && computerPick < 1/3) {
      computerMove = 'rock';
    } else if (computerPick >= 1/3 && computerPick < 2/3) {
      computerMove = 'paper';
    } else if (computerPick >= 2/3 && computerPick < 1) {
      computerMove = 'scissors';
    }
    return computerMove;
  }

  updateScore(result: string): void {
    if (result === 'You win.') {
      this.score.wins += 1;
    } else if (result === 'You lose.') {
      this.score.losses += 1;
    } else if (result === 'Tie.') {
      this.score.ties += 1;
    }
  }

  resetScore(): void {
    this.score.wins = 0;
    this.score.losses = 0;
    this.score.ties = 0;
    if (this.isAutoPlaying) {
      this.autoPlay()
    }
  }

  autoPlay(): void {
    if (!this.isAutoPlaying) {
      clearInterval(this.intervalId);
      this.isAutoPlaying = true;
      this.intervalId = setInterval(() => {
        const autoplayMove = this.computerPlay();
        this.playGame(autoplayMove);
      }, 1000);
    } else if (this.isAutoPlaying) {
      clearInterval(this.intervalId);
      this.isAutoPlaying = false;
    }
  }
}
