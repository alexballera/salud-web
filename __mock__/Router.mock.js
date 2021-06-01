export const useRouterMock = () => {
  const back = jest.fn()

  return {
    back
  }
}
