import React, { ReactNode } from 'react';

import { errorLogger } from '@common/utils';

interface Props {
  /** Дочерний элемент */
  children: ReactNode;
}

interface State {
  /** Флаг наличия ошибки */
  hasError: boolean;
}

/**
 * Компонент-перехватчик ошибок всего дерева react
 */
export class AppErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error): void {
    errorLogger(error);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h3>Что-то пошло не так</h3>
          <p>Попробуйте обновить страницу или зайти в сервис позднее</p>
          <button type="button" onClick={() => window.location.reload()}>
            Обновить
          </button>
        </div>
      );
    }

    return children;
  }
}
