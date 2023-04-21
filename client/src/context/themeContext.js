import { createContext } from "react"

const INITIAL_STATE = {
  darkMode: false
}

export const DarkModeContext = createContext(INITIAL_STATE)

export const DarkModeContextProvider = ({ children }) => {
  return (
    <DarkModeContext.Provider value={{ darkMode: INITIAL_STATE.darkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}