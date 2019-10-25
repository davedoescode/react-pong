/* eslint-disable max-classes-per-file */

export class RightEdgeHit extends Error {}
export class LeftEdgeHit extends Error {}

class PongBall {
  constructor(color, radius, position, delta, maxHeight, maxWidth) {
    this.color = color;
    this.radius = radius;
    this.position = position;
    this.delta = delta;
    this.deltaInitial = { ...delta };
    this.maxHeight = maxHeight;
    this.maxWidth = maxWidth;
  }

  move(leftPaddle, rightPaddle) {
    let hitLeftPaddle = false;
    let hitRightPaddle = false;

    this.position.x += this.delta.x;
    this.position.y += this.delta.y;

    // check if ball has hit the top or bottom of gameboard
    if (this.position.y <= this.radius || this.position.y >= this.maxHeight - this.radius) {
      this.delta.y = -this.delta.y;
    }

    if (this.position.x <= this.radius) {
      throw new LeftEdgeHit('LEFT_EDGE_HIT');
    }

    if (this.position.x >= this.maxWidth - this.radius) {
      throw new RightEdgeHit('RIGHT_EDGE_HIT');
    }

    if (leftPaddle) {
      // check if ball has hit the left paddle
      hitLeftPaddle = this.position.x - this.radius <= leftPaddle.position.x + leftPaddle.width
        && this.position.y + this.radius > leftPaddle.position.y
        && this.position.y - this.radius < leftPaddle.position.y + leftPaddle.height;
    }

    if (rightPaddle) {
      hitRightPaddle = this.position.x + this.radius >= rightPaddle.position.x
        && this.position.y + this.radius > rightPaddle.position.y
        && this.position.y - this.radius < rightPaddle.position.y + rightPaddle.height;
    }

    if (hitLeftPaddle || hitRightPaddle) {
      const xSign = Math.sign(this.delta.x);
      const ySign = Math.sign(this.delta.y);
      this.delta.x = -xSign * (Math.abs(this.delta.x) + 1);
      this.delta.y = ySign * (Math.abs(this.delta.y) + 1);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  reset(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.delta = { ...this.deltaInitial };
  }
}

export default PongBall;
