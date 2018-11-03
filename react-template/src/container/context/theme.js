import React from 'react'

export const theme = {
  light: {
    foreground: '#000',
    background: '#eee'
  },
  dark: {
    foreground: '#fff',
    background: '#333'
  }
}

export const ThemeContext = React.createContext(
  theme.dark
)
