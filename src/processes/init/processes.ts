/* eslint-disable @typescript-eslint/no-empty-function */
import { SagaIterator } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';

import { actions as initProcessActions } from './actions';

/**
 * Процесс инициализации приложения
 * @returns {void}
 */
function* initProcess(): SagaIterator<void> {}

/**
 * Вотчер процесса инициализации приложения
 * @returns {SagaIterator<void>} итератор
 */
export function* initProcessWatcher(): SagaIterator<void> {
  yield all([takeEvery(initProcessActions.initApp, initProcess)]);
}
