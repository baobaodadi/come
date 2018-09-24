import {combineReducers} from 'redux';
import asset from './asset';
import mail from './mail';
import globle from './globle';



export default combineReducers({
    asset,
    mail,
    globle,
});
