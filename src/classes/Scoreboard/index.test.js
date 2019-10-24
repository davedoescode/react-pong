import Scoreboard from './index';
import { FOREGROUND_COLOR } from '../../constants';

describe('Scoreboard', () => {
  let position;
  let size;
  let scores;

  beforeEach(() => {
    position = { x: 0, y: 0 };
    size = 100;
    scores = [0, 0];
  });

  const createScoreboardInstance = () => new Scoreboard(position, size, scores);

  describe('setScore', () => {
    it('updates first score', () => {
      const scoreboard = createScoreboardInstance();
      const score = 1;

      scoreboard.setScore(0, score);

      expect(scoreboard.scores).toEqual([score, 0]);
    });

    it('updates second score', () => {
      const scoreboard = createScoreboardInstance();
      const score = 1;

      scoreboard.setScore(1, score);

      expect(scoreboard.scores).toEqual([0, score]);
    });
  });

  describe('draw', () => {
    let ctx;

    beforeEach(() => {
      ctx = {
        strokeStyle: '',
        strokeRect: jest.fn(),
        fillStyle: '',
        font: '',
        textAlign: '',
        textBaseLine: '',
        fillText: jest.fn(),
      };
    });

    it('exists', () => {
      const scoreboard = createScoreboardInstance();
      expect(scoreboard.draw).toBeDefined();
    });

    it('sets rectangle stroke to white', () => {
      createScoreboardInstance().draw(ctx);
      expect(ctx.strokeStyle).toBe(FOREGROUND_COLOR);
    });

    it('draws two rectangles', () => {
      const scoreboard = createScoreboardInstance();

      scoreboard.draw(ctx);

      expect(ctx.strokeRect.mock.calls.length).toBe(2);
    });

    it('draws the first rectangle at the x position offset by the width', () => {
      position = { x: 200, y: 200 };
      size = 50;

      const scoreboard = createScoreboardInstance();

      scoreboard.draw(ctx);
      expect(ctx.strokeRect.mock.calls[0][0]).toBe(position.x - size);
    });

    it('draws a second rectangle at the x position', () => {
      // so it looks like two divided squares
      position = { x: 200, y: 200 };
      size = 50;

      const scoreboard = createScoreboardInstance();

      scoreboard.draw(ctx);
      expect(ctx.strokeRect.mock.calls[1][0]).toBe(position.x);
    });

    it('sets text color to white', () => {
      createScoreboardInstance().draw(ctx);
      expect(ctx.fillStyle).toBe(FOREGROUND_COLOR);
    });

    it('sets font to half the size Arial font', () => {
      size = 50;
      createScoreboardInstance().draw(ctx);
      expect(ctx.font).toBe(`${size / 2}px Arial`);
    });

    it('centers the text vertically in rectangles', () => {
      createScoreboardInstance().draw(ctx);
      const textIsCenteredHorizontally = (ctx.textAlign === 'center') && (ctx.textBaseline === 'middle');
      expect(textIsCenteredHorizontally).toBe(true);
    });

    it('centers the first score in the first square', () => {
      position = { x: 100, y: 200 };
      size = 30;
      scores = [2, 6];

      createScoreboardInstance().draw(ctx);

      expect(ctx.fillText.mock.calls[0])
        .toEqual([scores[0], position.x - size / 2, position.y + size / 2]);
    });

    it('centers the second score in the second square', () => {
      position = { x: 150, y: 100 };
      size = 45;
      scores = [8, 5];

      createScoreboardInstance().draw(ctx);

      expect(ctx.fillText.mock.calls[1])
        .toEqual([scores[1], position.x + (size / 2), position.y + (size / 2)]);
    });
  });

  describe('Increment Score', () => {
    it('increments the player score by 1', () => {
      const scoreboard = createScoreboardInstance();
      scoreboard.incrementScore(0);
      expect(scoreboard.scores[0]).toEqual(1);
    });
  });
});
