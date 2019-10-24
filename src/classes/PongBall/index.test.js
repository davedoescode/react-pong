import Ball, { RightEdgeHit, LeftEdgeHit } from '.';

describe('Ball', () => {
  let color;
  let radius;
  let position;
  let delta;
  let maxHeight;
  let maxWidth;

  beforeEach(() => {
    color = '';
    radius = 5;
    position = { x: 100, y: 100 };
    delta = { x: 0, y: 0 };
    maxHeight = 600;
    maxWidth = 800;
  });

  const createBallInstance = () => new Ball(color, radius, position, delta, maxHeight, maxWidth);

  describe('constructor', () => {
    it('can create a new instance', () => {
      const ball = createBallInstance();
      expect(ball).toBeDefined();
    });

    it('sets color', () => {
      color = 'red';
      const ball = createBallInstance();
      expect(ball.color).toEqual('red');
    });

    it('sets radius', () => {
      radius = 5;
      const ball = createBallInstance();
      expect(ball.radius).toEqual(5);
    });

    it('sets position', () => {
      position = { x: 4, y: 10 };
      const ball = createBallInstance();
      expect(ball.position).toEqual({ x: 4, y: 10 });
    });

    it('sets delta', () => {
      delta = { x: 5, y: 5 };
      const ball = createBallInstance();
      expect(ball.delta).toEqual({ x: 5, y: 5 });
    });

    it('sets maxHeight', () => {
      maxHeight = 1000;
      const ball = createBallInstance();
      expect(ball.maxHeight).toEqual(1000);
    });

    it('sets maxWidth', () => {
      maxWidth = 1000;
      const ball = createBallInstance();
      expect(ball.maxWidth).toEqual(1000);
    });
  });

  describe('move method', () => {
    it('exists', () => {
      const ball = createBallInstance();
      expect(ball.move).toBeDefined();
    });

    it('adds the delta values to the position to move the ball', () => {
      position = { x: 10, y: 10 };
      delta = { x: 5, y: 5 };
      const ball = createBallInstance();
      ball.move();
      expect(position).toEqual({ x: 15, y: 15 });
    });

    it('bounces off the top of the gameboard', () => {
      position.y = 10;
      delta = { x: 0, y: -5 };
      const ball = createBallInstance();
      ball.move();
      expect(ball.delta).toEqual({ x: 0, y: 5 });
    });

    it('bounces off the bottom of the gameboard', () => {
      position.y = 95;
      delta = { x: 0, y: 5 };
      maxHeight = 100;
      const ball = createBallInstance();
      ball.move();
      expect(ball.delta).toEqual({ x: 0, y: -5 });
    });

    it('throws a LEFT_EDGE_HIT exception if it hits the left edge', () => {
      let exception;
      position = { x: 10, y: 100 };
      delta.x = -5;
      const ball = createBallInstance();

      try {
        ball.move();
      } catch (e) {
        exception = e;
      }

      expect(exception).toBeInstanceOf(LeftEdgeHit);
    });

    it('throws a RIGHT_EDGE_HIT exception if it hits the right edge', () => {
      let exception;
      position = { x: 90, y: 50 };
      maxWidth = 100;
      delta.x = 5;
      const ball = createBallInstance();

      try {
        ball.move();
      } catch (e) {
        exception = e;
      }

      expect(exception).toBeInstanceOf(RightEdgeHit);
    });

    it('does NOT bounce off the left paddle (upper edge)', () => {
      const leftPaddle = {
        position: { x: 10, y: 50 },
        width: 5,
        height: 50,
      };
      position = { x: 20, y: 45 };
      delta = { x: -5, y: 0 };

      const ball = createBallInstance();
      ball.move(leftPaddle);
      expect(ball.delta).toEqual({ x: -5, y: 0 });
    });

    it('bounces off the left paddle (upper edge)', () => {
      const leftPaddle = {
        position: { x: 10, y: 50 },
        width: 5,
        height: 50,
      };
      position = { x: 20, y: 46 };
      delta = { x: -5, y: 1 };

      const ball = createBallInstance();
      ball.move(leftPaddle);
      expect(ball.delta).toEqual({ x: 6, y: 2 });
    });

    it('does NOT bounce off the left paddle (lower edge)', () => {
      const leftPaddle = {
        position: { x: 10, y: 50 },
        width: 5,
        height: 50,
      };
      position = { x: 20, y: 105 };
      delta = { x: -5, y: 0 };

      const ball = createBallInstance();
      ball.move(leftPaddle);

      expect(ball.delta).toEqual({ x: -5, y: 0 });
    });

    it('does NOT bounces off the right paddle (upper edge)', () => {
      const rightPaddle = {
        position: { x: 90, y: 50 },
        width: 5,
        height: 50,
      };
      position = { x: 80, y: 45 };
      delta = { x: 5, y: 0 };
      const ball = createBallInstance();

      ball.move(null, rightPaddle);
      expect(ball.delta).toEqual({ x: 5, y: 0 });
    });

    it('bounces off the right paddle (upper edge)', () => {
      const rightPaddle = {
        position: { x: 90, y: 50 },
        width: 5,
        height: 50,
      };
      position = { x: 80, y: 46 };
      delta = { x: 5, y: 1 };
      const ball = createBallInstance();

      ball.move(null, rightPaddle);
      expect(ball.delta).toEqual({ x: -6, y: 2 });
    });

    it('does NOT bounce off the right paddle (lower edge)', () => {
      const rightPaddle = {
        position: { x: 90, y: 50 },
        width: 5,
        height: 50,
      };
      position = { x: 80, y: 105 };
      delta = { x: 5, y: 0 };
      const ball = createBallInstance();

      ball.move(null, rightPaddle);
      expect(ball.delta).toEqual({ x: 5, y: 0 });
    });
  });

  describe('draw method', () => {
    let ctx;

    beforeEach(() => {
      ctx = {
        beginPath: jest.fn(),
        arc: jest.fn(),
        fillStyle: '',
        fill: jest.fn(),
      };
    });

    it('exists', () => {
      const ball = createBallInstance();
      expect(ball.draw).toBeDefined();
    });

    it('calls beginPath()', () => {
      const ball = createBallInstance();
      ball.draw(ctx);
      expect(ctx.beginPath).toHaveBeenCalled();
    });

    it('creates a circle with the correct dimensions', () => {
      position = { x: 100, y: 100 };
      radius = 10;
      const ball = createBallInstance();
      ball.draw(ctx);
      expect(ctx.arc).toHaveBeenCalledWith(100, 100, 10, 0, 2 * Math.PI);
    });

    it('sets fill color', () => {
      color = 'red';
      const ball = createBallInstance();
      ball.draw(ctx);
      expect(ctx.fillStyle).toEqual('red');
    });

    it('fills the circle', () => {
      const ball = createBallInstance();
      ball.draw(ctx);
      expect(ctx.fill).toHaveBeenCalled();
    });
  });

  describe('Reset Ball', () => {
    it('resets the ball position correctly', () => {
      const ball = createBallInstance();
      ball.reset(400, 300);
      expect(ball.position).toEqual({ x: 400, y: 300 });
    });

    it('resets the ball delta correctly', () => {
      const ball = createBallInstance();
      delta = { x: 5, y: 10 };
      ball.reset(400, 300);
      expect(ball.delta).toEqual({ x: 0, y: 0 });
    });
  });
});
