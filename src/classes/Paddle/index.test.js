import Paddle from './index';

describe('Paddle Component', () => {
  let height;
  let width;
  let position;
  let maxHeight;
  let color;

  beforeEach(() => {
    height = 50;
    width = 5;
    position = { x: 10, y: 50 };
    maxHeight = 800;
    color = 'white';
  });

  const createPaddleInstance = () => new Paddle(height, width, position, maxHeight, color);

  describe('Constructor Method', () => {
    it('creates a new paddle instance', () => {
      const paddle = createPaddleInstance();
      expect(paddle).toBeDefined();
    });

    it('sets height with constructor method', () => {
      const paddle = createPaddleInstance();
      expect(paddle.height).toEqual(height);
    });

    it('sets width with constructor method', () => {
      const paddle = createPaddleInstance();
      expect(paddle.width).toEqual(width);
    });

    it('sets position with constructor method', () => {
      const paddle = createPaddleInstance();
      expect(paddle.position).toEqual(position);
    });

    it('sets maxHeight with constructor method', () => {
      const paddle = createPaddleInstance();
      expect(paddle.maxHeight).toEqual(maxHeight - height);
    });

    it('sets color with constructor method', () => {
      const paddle = createPaddleInstance();
      expect(paddle.color).toEqual(color);
    });
  });

  describe('Move Method', () => {
    it('Moves the paddle up by v(y) when up() method is called', () => {
      const paddle = createPaddleInstance();
      paddle.up();
      expect(position).toEqual({ x: 10, y: 45 });
    });

    it('Moves the paddle down by v(y) when down() method is called', () => {
      const paddle = createPaddleInstance();
      paddle.down();
      expect(position).toEqual({ x: 10, y: 55 });
    });

    it('does not move the paddle off the top of the screen', () => {
      position = { x: 10, y: 0 };

      const paddle = createPaddleInstance();
      paddle.up();
      expect(position).toEqual({ x: 10, y: 0 });
    });

    it('does not move the paddle off the bottom of the screen', () => {
      position = { x: 10, y: 750 };

      const paddle = createPaddleInstance();
      paddle.down();
      expect(position).toEqual({ x: 10, y: 750 });
    });
  });

  describe('Draw Method', () => {
    let ctx;

    beforeEach(() => {
      ctx = {
        beginPath: jest.fn(),
        rect: jest.fn(),
        fillStyle: '',
        fill: jest.fn(),
      };
    });

    it('calls beginPath', () => {
      const paddle = createPaddleInstance();
      paddle.draw(ctx);
      expect(ctx.beginPath).toHaveBeenCalled();
    });

    it('draws the paddle with correct parameters', () => {
      const paddle = createPaddleInstance();
      paddle.draw(ctx);
      expect(ctx.rect).toHaveBeenCalledWith(position.x, position.y, width, height);
    });

    it('colors the paddle correctly', () => {
      const paddle = createPaddleInstance();
      paddle.draw(ctx);
      expect(ctx.fillStyle).toEqual(color);
    });

    it('calls fill function for the paddle', () => {
      const paddle = createPaddleInstance();
      paddle.draw(ctx);
      expect(ctx.fill).toHaveBeenCalled();
    });
  });
});
