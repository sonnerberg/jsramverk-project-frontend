// import createGlobalStyle and normalize
import { createGlobalStyle } from 'styled-components'
import normalize from 'normalize.css'

// we can write our CSS as a JS template literal
export default createGlobalStyle`
  ${normalize}`
