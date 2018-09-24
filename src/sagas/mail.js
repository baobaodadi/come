/**
 * Created by dady on 2017/12/15.
 */
import {takeLatest, put} from 'redux-saga/effects';
import service from '../utils/serviceMail';
import API from '../config/api';
import * as actionTypes from '../config/actionTypes';
import {ENTITY_MAIL} from '../config/constants';


function* fetchMail(action) {
    const {payload} = action;
    try {

        const data = yield service.post(API[ENTITY_MAIL], {
            mailAcc: payload.mail,
            mailPwd: payload.password,
        });

        console.log(data)

        yield put({
            type: actionTypes.UPDATE_MAIL,
            payload: {
                data: data,
            },
        });

    }
    catch (e) {
        console.log(e)
    }
}

export default function* () {
    yield [
        takeLatest(actionTypes.FETCH_MAIL, fetchMail),
    ];
}
