import * as actionTypes from './actionTypes';

import Board from '../../classes/Board';
import Scoreboard from '../../classes/Scoreboard';
import Paddle from '../../classes/Paddle';
import PongBall from '../../classes/PongBall';
import {
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  INITIAL_BALL_SPEED,
  SCOREBOARD_SIZE,
  FOREGROUND_COLOR,
} from '../../constants';

export const setKeyPressed = (key, isDown) => ({
  type: actionTypes.SET_KEY_PRESSED,
  payload: { key, isDown },
});

const getGameboardDefault = (width, height) => new Board(width, height);
const getScoreboardDefault = (width) => new Scoreboard({ x: width / 2, y: 10 }, SCOREBOARD_SIZE, [0, 0]);
const getPaddleDefault = (width, height, isLeftPaddle) => {
  const x = isLeftPaddle ? 5 : width - PADDLE_WIDTH - 5;
  const y = (height - PADDLE_HEIGHT) / 2;

  return new Paddle(PADDLE_WIDTH, PADDLE_HEIGHT, { x, y }, height, FOREGROUND_COLOR);
};
const getBallDefault = (width, height) => new PongBall(
  FOREGROUND_COLOR,
  INITIAL_BALL_SPEED,
  { x: 40, y: height / 2 },
  { x: 3, y: 3 },
  height,
  width,
);

export const initialize = (
  width,
  height,
  getGameboard = getGameboardDefault,
  getScoreboard = getScoreboardDefault,
  getLeftPaddle = (h) => getPaddleDefault(null, h, true),
  getRightPaddle = getPaddleDefault,
  getBall = getBallDefault,
) => ({
  type: actionTypes.INITIALIZE,
  payload: {
    gameboard: getGameboard(width, height),
    scoreboard: getScoreboard(width),
    leftPaddle: getLeftPaddle(height),
    rightPaddle: getRightPaddle(width, height),
    ball: getBall(width, height),
  },
});

export const endGame = (status) => ({
  type: actionTypes.END_GAME,
  payload: status,
});

export const startNewGame = () => ({
  type: actionTypes.NEW_GAME,
});
