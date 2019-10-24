import Board from './index';
import { BACKGROUND_COLOR, FOREGROUND_COLOR } from '../../constants';

describe('Board', () => {
  let width;
  let height;

  beforeEach(() => {
    width = 200;
    height = 100;
  });

  const createBoardInstance = () => new Board(width, height);

  describe('draw', () => {
    let ctx;

    beforeEach(() => {
      ctx = {
        fillRect: jest.fn(),
        fillStyle: '',
        strokeStyle: '',
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
      };
    });

    it('makes a rectangle with dimensions (width, height)', () => {
      createBoardInstance().draw(ctx);
      expect(ctx.fillRect.mock.calls[0])
        .toEqual([0, 0, width, height]);
    });

    it('makes the rectangle black', () => {
      createBoardInstance().draw(ctx);
      expect(ctx.fillStyle).toBe(BACKGROUND_COLOR);
    });


    describe('drawDivider', () => {
      let startingPoint;
      let endingPoint;

      beforeEach(() => {
        startingPoint = [width / 2, 0];
        endingPoint = [width / 2, height];
      });

      it('sets line color to white', () => {
        createBoardInstance().draw(ctx);
        expect(ctx.strokeStyle).toBe(FOREGROUND_COLOR);
      });

      it('starts drawing', () => {
        createBoardInstance().draw(ctx);
        expect(ctx.beginPath).toHaveBeenCalled();
      });

      it('moves to starting point of line', () => {
        createBoardInstance().draw(ctx);
        expect(ctx.moveTo.mock.calls[0]).toEqual(startingPoint);
      });

      it('makes a line to the ending point', () => {
        createBoardInstance().draw(ctx);
        expect(ctx.lineTo.mock.calls[0]).toEqual(endingPoint);
      });

      it('sets the line to have stroke', () => {
        createBoardInstance().draw(ctx);
        expect(ctx.stroke).toHaveBeenCalled();
      });
    });
  });
});
