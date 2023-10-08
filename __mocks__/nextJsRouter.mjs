jest.mock('next/router', () => ({
  useRouter() {
    return {
      isReady: true,
      asPath: '/link',
    };
  },
}));
