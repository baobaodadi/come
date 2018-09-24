/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/service';
import serviceMail from '../utils/serviceMail';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_ASSET,ENTITY_CHANGE} from '../config/constants';


function* fetchAsset(action) {
  const {payload} = action;
  try {


    const data=yield service.get(API[ENTITY_ASSET]);

    yield put({
      type: actionTypes.UPDATE_ASSET,
      payload:  {
        data: data,
      },
    });

  }
  catch (e) {
    console.log(e)
  }
}

function* changeAsset(action) {
    const {payload} = action;
    try {
        const data=yield serviceMail.post(API[ENTITY_CHANGE], {
            preAsset: payload.preAsset,
            tmpAsset: payload.tmpAsset,
        });
        console.log(data)

    }
    catch (e) {
        console.log(e)
    }
}

export default function* () {
  yield [
    takeLatest(actionTypes.FETCH_ASSET, fetchAsset),
    takeLatest(actionTypes.CHANGE_ASSET, changeAsset),
  ];
}
