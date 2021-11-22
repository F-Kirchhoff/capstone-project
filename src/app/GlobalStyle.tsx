import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *,*::after,*::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  ul,ol {
    list-style: none;
  }

  :root {
    --c-primary: #aaa18e;
    --c-primary-70:#868072;
    --c-secondary: #1d222e;
    --c-highlight: #2bc08e;
    --c-light: #f3f3f3;
  }

  body {
    padding: 0;
    background-color: var(--c-primary);
    color: var(--c-secondary);
    font-family: 'Poppins',Arial;
  }
`
export default GlobalStyle
