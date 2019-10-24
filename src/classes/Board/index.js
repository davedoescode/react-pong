class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drawBackground(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);
  }

  drawDivider(ctx) {
    ctx.strokeStyle = 'white';

    ctx.beginPath();
    ctx.moveTo(this.width / 2, 0);
    ctx.lineTo(this.width / 2, this.height);
    ctx.stroke();
  }

  draw(ctx) {
    this.drawBackground(ctx);
    this.drawDivider(ctx);
  }
}

export default Board;