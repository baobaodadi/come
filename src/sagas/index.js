import {spawn} from 'redux-saga/effects';
import asset from './asset';
import mail from './mail';



export default function* () {
  yield [
    spawn(mail),
    spawn(asset),
  ];
}