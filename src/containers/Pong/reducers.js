import * as actionTypes from './actionTypes';


export const initialState = {
  keysPressed: {},
  gameboard: {},
  scoreboard: {},
  leftPaddle: {},
  rightPaddle: {},
  ball: {},
  status: '',
};

const pongReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_KEY_PRESSED:
      return {
        ...state,
        keysPressed: {
          ...state.keysPressed,
          [action.payload.key]: action.payload.isDown,
        },
      };
    case actionTypes.INITIALIZE:
      return { ...action.payload };
    case actionTypes.END_GAME:
      return {
        ...state,
        status: action.payload,
      };
    case actionTypes.NEW_GAME:
      return {
        ...state,
        status: '',
      };
    default:
      return state;
  }
};

export default pongReducer;
