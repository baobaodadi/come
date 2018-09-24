import {handleActions} from 'redux-actions';
import * as actionTypes from '../config/actionTypes';


const inintialState = {
  collapsed: true,
};

export default handleActions({
  [actionTypes.UPDATE_COLLAPSED]: (state, {payload}) => ({
    ...state,
    collapsed: payload,
  }),
}, inintialState);
