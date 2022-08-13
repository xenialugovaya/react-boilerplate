const createConfig = () => ({
  modules: {
    router: 'router' as const,
  },
  environment: process.env.NODE_ENV,
});

/**
 * Конфигурация приложения
 */
export const config: Readonly<ReturnType<typeof createConfig>> = createConfig();
