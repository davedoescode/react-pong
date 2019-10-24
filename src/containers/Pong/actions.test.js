import { setKeyPressed, initialize, endGame, startNewGame } from './actions';
import * as actionTypes from './actionTypes';


describe('setKeyPressed', () => {
  it('creates a setKeyPressed action', () => {
    const key = 'a';
    const isDown = true;
    expect(setKeyPressed(key, isDown)).toEqual({
      type: actionTypes.SET_KEY_PRESSED,
      payload: { key, isDown },
    });
  });
});

describe('initialize', () => {
  let actions;
  let width;
  let height;

  beforeEach(() => {
    width = 900;
    height = 500;
    actions = {
      getGameboard: jest.fn(),
      getScoreboard: jest.fn(),
      getLeftPaddle: jest.fn(),
      getRightPaddle: jest.fn(),
      getBall: jest.fn(),
    };
  });

  const initializeGame = () => initialize(
    width,
    height,
    actions.getGameboard,
    actions.getScoreboard,
    actions.getLeftPaddle,
    actions.getRightPaddle,
    actions.getBall,
  );

  it('puts game board in action payload', () => {
    const gameboard = 'gameBoard';
    actions.getGameboard = jest.fn(() => gameboard);

    expect(initializeGame()).toEqual({
      type: actionTypes.INITIALIZE,
      payload: { gameboard },
    });
  });

  it('puts scoreboard in action payload', () => {
    const scoreboard = 'scoreboard';
    actions.getScoreboard = jest.fn(() => scoreboard);
    expect(initializeGame()).toEqual({
      type: actionTypes.INITIALIZE,
      payload: { scoreboard },
    });
  });

  it('puts leftPaddle in the action payload', () => {
    const leftPaddle = 'leftPaddle';
    actions.getLeftPaddle = jest.fn(() => leftPaddle);
    expect(initializeGame()).toEqual({
      type: actionTypes.INITIALIZE,
      payload: { leftPaddle },
    });
  });

  it('puts rightPaddle in the action payload', () => {
    const rightPaddle = 'rightPaddle';
    actions.getRightPaddle = jest.fn(() => rightPaddle);
    expect(initializeGame()).toEqual({
      type: actionTypes.INITIALIZE,
      payload: { rightPaddle },
    });
  });

  it('puts a ball in the action payload', () => {
    const ball = 'ball';
    actions.getBall = jest.fn(() => ball);
    expect(initializeGame()).toEqual({
      type: actionTypes.INITIALIZE,
      payload: { ball },
    });
  });
});

describe('endGame', () => {
  it('creates endGame action object with status payload', () => {
    const status = 'new status';
    expect(endGame(status)).toEqual({
      type: actionTypes.END_GAME,
      payload: status,
    });
  });
});

describe('start new game action', () => {
  it('creates new game action', () => {
    expect(startNewGame()).toEqual({
      type: actionTypes.NEW_GAME,
    });
  });
});
