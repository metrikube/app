import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(',')
  },
  spacing: 8,
  palette: {
    primary: {
      main: '#283F88'
    },
    secondary: {
      main: '#FFC107'
    },
    error: {
      main: '#FF5252'
    },
    warning: {
      main: '#FFC107'
    },
    info: {
      main: '#2196F3'
    },
    success: {
      main: '#4CAF50'
    },
    background: {
      paper: '#fff',
      default: '#F2F2F7'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: "Poppins";
            font-style: normal;
            font-display: swap;
            src: url("../assets/fonts/Poppins/Poppins-Regular.ttf");
        }
      `
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '16px'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    }
  }
})
