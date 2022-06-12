import { SagaIterator } from 'redux-saga';
import { call, all, fork } from 'redux-saga/effects';

import { logger } from '@common/utils';

import { initProcessWatcher } from '@processes/init';

/**
 * Главная сага - точка входа
 *
 * @returns {void}
 */
export function* rootSaga(): SagaIterator {
  yield call(logger, 'Root Saga Runner!');

  yield all([initProcessWatcher].map(fork));
}
