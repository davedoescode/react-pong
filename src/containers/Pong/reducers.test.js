import * as actionTypes from './actionTypes';
import pongReducer from './reducers';


describe('pongReducer', () => {
  it('handles SET_KEY_PRESSED action types', () => {
    const state = { keysPressed: { q: false } };
    const key = 'q';
    const isDown = true;
    const action = {
      type: actionTypes.SET_KEY_PRESSED,
      payload: { key, isDown },
    };

    expect(pongReducer(state, action))
      .toEqual({ keysPressed: { ...state.keysPressed, [key]: isDown } });
  });

  it('handles INITIALIZE action types', () => {
    const state = {};
    const gameboard = 'gameboard';
    const scoreboard = 'scoreboard';
    const ball = 'ball';
    const leftPaddle = 'leftPaddle';
    const rightPaddle = 'rightPaddle';
    const keysPressed = {};
    const action = {
      type: actionTypes.INITIALIZE,
      payload: {
        gameboard,
        scoreboard,
        ball,
        leftPaddle,
        rightPaddle,
        keysPressed,
      },
    };

    expect(pongReducer(state, action))
      .toEqual({
        gameboard,
        scoreboard,
        ball,
        leftPaddle,
        rightPaddle,
        keysPressed,
      });
  });

  it('handles END_GAME action types', () => {
    const state = { status: '' };
    const status = 'new status';
    const action = {
      type: actionTypes.END_GAME,
      payload: status,
    };

    expect(pongReducer(state, action)).toEqual({ status });
  });

  it('handles NEW_GAME action types', () => {
    const state = { status: 'Player has won' };
    const action = { type: actionTypes.NEW_GAME };
    expect(pongReducer(state, action)).toEqual({ status: '' });
  });
});
