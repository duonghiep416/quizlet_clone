const { createSlice } = require('@reduxjs/toolkit')
const initialState = {
  userData: null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        userData: action.payload
      }
    },
    removeUser: (state, action) => {
      return {}
    }
  }
})
