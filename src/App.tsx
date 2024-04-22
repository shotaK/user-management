import '@fontsource/inter'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from 'config/router/routes'
import { CssBaseline, CssVarsProvider, extendTheme } from '@mui/joy'
import Body from 'components/layout/Body'
import { primary, primaryHover, primaryText } from 'config/styles/colors'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          300: primary,
          400: primary,
          500: primary,
          solidHoverBg: primaryHover,
        },
        text: {
          primary: primaryText,
        },
      },
    },
  },
})

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Body>
        <RouterProvider router={routes} />
      </Body>
    </CssVarsProvider>
  )
}

export default App
