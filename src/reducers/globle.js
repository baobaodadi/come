import {handleActions} from 'redux-actions';
import * as actionTypes from '../config/actionTypes';


const inintialState = {
  collapsed: true,
  over: [0,0],
};

export default handleActions({
  [actionTypes.UPDATE_COLLAPSED]: (state, {payload}) => ({
    ...state,
    ...payload,
  }),
  [actionTypes.UPDATE_OVER]: (state, {payload}) => ({
    ...state,
    ...payload,
  }),
}, inintialState);
