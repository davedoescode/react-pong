import { FOREGROUND_COLOR } from '../../constants';

class Scoreboard {
  constructor(position, size, scores) {
    this.position = position;
    this.size = size;
    this.scores = scores;
  }

  setScore(scoreIndex, score) {
    this.scores[scoreIndex] = score;
  }

  incrementScore(scoreIndex) {
    this.scores[scoreIndex] += 1;
  }

  draw(ctx) {
    const width = this.size;
    const height = this.size;
    const { x, y } = this.position;

    // draw box
    ctx.strokeStyle = FOREGROUND_COLOR;
    ctx.strokeRect(x - width, y, width, height);
    ctx.strokeRect(x, y, width, height);

    // draw scores
    ctx.fillStyle = FOREGROUND_COLOR;
    ctx.font = `${this.size / 2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.scores[0],
      x - (width / 2),
      y + (height / 2),
    );
    ctx.fillText(
      this.scores[1],
      x + (width / 2),
      y + (height / 2),
    );
  }
}

export default Scoreboard;
