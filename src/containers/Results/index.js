import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startNewGame } from '../Pong/actions';

export const Results = ({ status, onStartNewGame }) => (
  <div>
    <div id="StatusText">{status}</div>
    <button
      id="NewGame"
      type="button"
      onClick={() => { onStartNewGame(); }}
    >
      New Game
    </button>
  </div>
);

Results.propTypes = {
  status: PropTypes.string.isRequired,
  onStartNewGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps, { onStartNewGame: startNewGame })(Results);
