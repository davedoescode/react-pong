import React from 'react';
import { shallow } from 'enzyme';

import { Results } from './index';

describe('Results', () => {
  let props;

  beforeEach(() => {
    props = {
      status: '',
      onStartNewGame: jest.fn(),
    };
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderResults = () => shallow(<Results {...props} />);

  it('renders', () => {
    const results = renderResults();
    expect(results).toBeDefined();
  });

  it('displays game status', () => {
    props.status = 'Game Over';
    const results = renderResults();
    expect(results.find('#StatusText').text()).toEqual('Game Over');
  });

  it('displays a new game button', () => {
    const results = renderResults();
    expect(results.find('#NewGame').exists()).toEqual(true);
  });

  it('calls onStartNewGame action when button is clicked', () => {
    const results = renderResults();
    results.find('#NewGame').simulate('click');
    expect(props.onStartNewGame).toHaveBeenCalled();
  });
});
