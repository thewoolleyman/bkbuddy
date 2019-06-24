export interface SystemState {
  loggedIn: boolean
  bkApiToken: string
  userName: string
  connected: boolean
}

export const initialState: SystemState = {
  loggedIn: false,
  bkApiToken: '',
  userName: '',
  connected: false,
}

