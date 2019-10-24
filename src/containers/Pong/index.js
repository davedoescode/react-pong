import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setKeyPressed as setKeyPressedAction,
  initialize as initializeAction,
  endGame as endGameAction,
} from './actions';
import { LeftEdgeHit, RightEdgeHit } from '../../classes/PongBall';
import {
  FPS,
  MAX_SCORE
} from '../../constants';

export class Pong extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.interval = null;
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  async componentDidMount() {
    const { width, height, initialize } = this.props;

    document.title = 'Pong';

    await initialize(width, height);
    this.serve();
    document.addEventListener('keydown', this.handleKeyPress, false);
    document.addEventListener('keyup', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  serve() {
    this.renderGame();
    this.interval = setInterval(() => {
      this.renderGame();
    }, 1000 / FPS);
  }

  handleKeyPress(event) {
    const { setKeyPressed } = this.props;
    setKeyPressed(event.key.toLowerCase(), event.type === 'keydown');
  }

  renderGame() {
    const {
      gameboard,
      scoreboard,
      ball,
      leftPaddle,
      rightPaddle,
      keysPressed,
      onEndGame,
    } = this.props;
    const ctx = this.canvas.current.getContext('2d');

    gameboard.draw(ctx);
    scoreboard.draw(ctx);
    ball.draw(ctx);
    leftPaddle.draw(ctx);
    rightPaddle.draw(ctx);

    try {
      ball.move(leftPaddle, rightPaddle);
    } catch (e) {
      if (e instanceof RightEdgeHit) {
        scoreboard.incrementScore(0);
        ball.reset(leftPaddle.position.x + 10 + ball.radius, leftPaddle.position.y + 30);
      } else if (e instanceof LeftEdgeHit) {
        scoreboard.incrementScore(1);
        ball.reset(rightPaddle.position.x - ball.radius, rightPaddle.position.y + 30);
      }

      const [leftScore, rightScore] = scoreboard.scores;
      if (leftScore === MAX_SCORE) {
        onEndGame('Left Player Won!');
      } else if (rightScore === MAX_SCORE) {
        onEndGame('Right Player Won!');
      }
    }

    if (keysPressed.q) {
      leftPaddle.up();
    }
    if (keysPressed.a) {
      leftPaddle.down();
    }
    if (keysPressed.p) {
      rightPaddle.up();
    }
    if (keysPressed.l) {
      rightPaddle.down();
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        id="PongCanvas"
        width={width}
        height={height}
        ref={this.canvas}
      />
    );
  }
}

Pong.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  scoreboard: PropTypes.shape().isRequired,
  gameboard: PropTypes.shape().isRequired,
  ball: PropTypes.shape().isRequired,
  leftPaddle: PropTypes.shape().isRequired,
  rightPaddle: PropTypes.shape().isRequired,
  keysPressed: PropTypes.shape().isRequired,
  setKeyPressed: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onEndGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  keysPressed: state.keysPressed || {},
  scoreboard: state.scoreboard || {},
  gameboard: state.gameboard || {},
  ball: state.ball || {},
  leftPaddle: state.leftPaddle || {},
  rightPaddle: state.rightPaddle || {},
});

const mapDispatchToProps = {
  setKeyPressed: setKeyPressedAction,
  initialize: initializeAction,
  onEndGame: endGameAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pong);
