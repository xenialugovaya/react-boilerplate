import { RootState } from '@store';

/**
 * Заглушка состояния приложения, используется в юнит тестах
 */
export const mockState: RootState = { router: null };

/**
 * Создание мокового состояния стора
 * @param state - состояние стора
 * @returns состояние стора приложения
 */
export const createMockState = (state?: Partial<RootState>): RootState => ({
  ...mockState,
  ...state,
});
