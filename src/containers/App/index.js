import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConnectedPong from '../Pong';
import Results from '../Results';

import {
  WIDTH,
  HEIGHT,
} from '../../constants';

const App = ({ status }) => (
  <div id="App">
    {
    status
      ? (
        <Results />
      )
      : (
        <center>
          <ConnectedPong width={WIDTH} height={HEIGHT} />
        </center>
      )
    }
  </div>
);

App.propTypes = {
  status: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ status: state.status });

export default connect(mapStateToProps)(App);
