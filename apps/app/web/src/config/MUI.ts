import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(',')
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
            font-family: "Poppins";
            font-style: normal;
            font-display: swap;
            src: url("../fonts/Poppins/Poppins-Regular.ttf");
        }
      `
    }
  }
})
