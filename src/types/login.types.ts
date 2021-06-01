export type IProps = {
  handleLogin: (user: any) => void
  handleLoading: (isLoading: boolean) => void
  handleError: (open: boolean, message?: string) => void
  fetching: boolean
}
