import { PADDLE_SPEED } from '../../constants';

class Paddle {
  constructor(width, height, position, maxHeight, color) {
    this.height = height;
    this.width = width;
    this.position = position;
    this.maxHeight = maxHeight - this.height;
    this.color = color;
  }

  up() {
    if (this.position.y - PADDLE_SPEED <= 0) {
      this.position.y = 0;
    } else {
      this.position.y -= PADDLE_SPEED;
    }
  }

  down() {
    if (this.position.y >= this.maxHeight) {
      this.position.y = this.maxHeight;
    } else {
      this.position.y += PADDLE_SPEED;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Paddle;
