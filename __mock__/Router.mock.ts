export const useRouterMock = (): { back: any } => {
  const back = jest.fn();

  return {
    back
  };
};
