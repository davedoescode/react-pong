
import React from 'react';
import { mount } from 'enzyme';

import { Pong } from './index';

import { RightEdgeHit, LeftEdgeHit } from '../../classes/PongBall';

describe('Pong container', () => {
  let props;

  beforeEach(() => {
    props = {
      width: '900',
      height: '500',
      scoreboard: {
        draw: jest.fn(),
        incrementScore: jest.fn(),
        scores: [0, 0],
      },
      gameboard: {
        draw: jest.fn(),
      },
      ball: {
        draw: jest.fn(),
        move: jest.fn(),
        reset: jest.fn(),
        radius: 5,
      },
      leftPaddle: {
        draw: jest.fn(),
        up: jest.fn(),
        down: jest.fn(),
        position: { x: 10, y: 10 },
      },
      rightPaddle: {
        draw: jest.fn(),
        up: jest.fn(),
        down: jest.fn(),
        position: { x: 10, y: 10 },
      },
      keysPressed: {},
      setKeyPressed: jest.fn(),
      initialize: jest.fn(),
      onEndGame: jest.fn(),
    };
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderPong = () => mount(<Pong {...props} />);

  it('renders', () => {
    const component = renderPong();
    expect(component).toBeDefined();
  });

  it('displays a canvas', () => {
    const component = renderPong();
    expect(component.find('#PongCanvas').exists()).toEqual(true);
  });

  it('displays canvas with width', () => {
    const component = renderPong();
    expect(component.find('#PongCanvas').prop('width')).toEqual(props.width);
  });

  it('displays canvas with height', () => {
    const component = renderPong();
    expect(component.find('#PongCanvas').prop('height')).toEqual(props.height);
  });

  it('ends game if player score is 5', async () => {
    props.scoreboard.scores = [5, 0];
    props.ball.move = jest.fn(() => { throw new RightEdgeHit(); });
    await renderPong();
    expect(props.onEndGame).toHaveBeenCalledWith('Left Player Won!');
  });

  describe('Game Board', () => {
    it('the draw() method is called', async () => {
      await renderPong();
      expect(props.gameboard.draw).toHaveBeenCalled();
    });
  });

  describe('Scoreboard', () => {
    it('the draw() method is called', async () => {
      await renderPong();
      expect(props.scoreboard.draw).toHaveBeenCalled();
    });

    it('increments the right player score when the ball hit the left edge', async () => {
      props.ball.move = jest.fn(() => { throw new LeftEdgeHit(); });
      await renderPong();
      expect(props.scoreboard.incrementScore).toHaveBeenCalledWith(1);
    });

    it('increments the left player score when the ball hits the right edge', async () => {
      props.ball.move = jest.fn(() => { throw new RightEdgeHit(); });
      await renderPong();
      expect(props.scoreboard.incrementScore).toHaveBeenCalledWith(0);
    });
  });

  describe('Pong Ball', () => {
    it('calls draw on pong ball', async () => {
      await renderPong();
      expect(props.ball.draw).toHaveBeenCalled();
    });

    it('calls reset method when ball hits the left edge', async () => {
      props.ball.move = jest.fn(() => { throw new LeftEdgeHit(); });
      await renderPong();
      expect(props.ball.reset).toHaveBeenCalled();
    });

    it('calls reset method when ball hits the right edge', async () => {
      props.ball.move = jest.fn(() => { throw new RightEdgeHit(); });
      await renderPong();
      expect(props.ball.reset).toHaveBeenCalled();
    });
  });

  describe('Paddles', () => {
    it('calls draw on the left paddle', async () => {
      await renderPong();
      expect(props.leftPaddle.draw).toHaveBeenCalled();
    });

    it('moves the left paddle up', async () => {
      props.keysPressed = { q: true };
      await renderPong();
      expect(props.leftPaddle.up).toHaveBeenCalled();
    });

    it('moves the left paddle down', async () => {
      props.keysPressed = { a: true };
      await renderPong();
      expect(props.leftPaddle.down).toHaveBeenCalled();
    });

    it('calls draw on the right paddle', async () => {
      await renderPong();
      expect(props.rightPaddle.draw).toHaveBeenCalled();
    });

    it('moves the right paddle up', async () => {
      props.keysPressed = { p: true };
      await renderPong();
      expect(props.rightPaddle.up).toHaveBeenCalled();
    });

    it('moves the right paddle down', async () => {
      props.keysPressed = { l: true };
      await renderPong();
      expect(props.rightPaddle.down).toHaveBeenCalled();
    });
  });

  describe('Event Handlers', () => {
    it('detects a keydown event', async () => {
      await renderPong();
      const keyDownEvent = new KeyboardEvent('keydown', { key: 'q', type: 'keydown' });
      document.dispatchEvent(keyDownEvent);
      expect(props.setKeyPressed).toHaveBeenCalledWith('q', true);
    });

    it('detects a key up event', async () => {
      await renderPong();
      const keyDownEvent = new KeyboardEvent('keyup', { key: 'q', type: 'keyup' });
      document.dispatchEvent(keyDownEvent);
      expect(props.setKeyPressed).toHaveBeenCalledWith('q', false);
    });
  });
});
