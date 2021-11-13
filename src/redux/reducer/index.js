import { combineReducers } from '@reduxjs/toolkit';
import candidateStore from './candidateReducer';
;
const rootReducer = combineReducers({
    candidate: candidateStore
});

export default rootReducer;