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
    --c-secondary: #212327;
    --c-highlight: #2bc08e;
    --c-light: #f3f3f3;
  }

  body {
    background-color: var(--c-primary);
    color: var(--c-secondary)
  }
`
export default GlobalStyle
