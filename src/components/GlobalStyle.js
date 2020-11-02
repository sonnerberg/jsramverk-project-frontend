import { createGlobalStyle } from 'styled-components'
import normalize from 'normalize.css'

export default createGlobalStyle`
  ${normalize}
  body {
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.primaryLight};
    padding: 5px;
  }

  #root {
    position: relative;
    min-height: 95.9vh;
  }
`
