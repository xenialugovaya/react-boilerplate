import { createAction } from '@reduxjs/toolkit';

/**
 * Экшен для запуска процесса инициализации приложения
 */
const initApp = createAction('process-initApp');

export const actions = {
  initApp,
};
