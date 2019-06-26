export interface SystemState {
  bkApiToken: string
  userName: string
  logoutLink: string
  connected: boolean
}

export const initialState: SystemState = {
  bkApiToken: '',
  userName: '',
  logoutLink: '',
  connected: false,
}

