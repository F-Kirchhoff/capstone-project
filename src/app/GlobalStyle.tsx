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
    --c-gray-50: #E2E0DE;
    --c-gray-100:#bdbbb8;
    --c-gray-200:#999794;
    --c-gray-300:#8f8d8b;
    --c-gray-400:#8f8c88;
    --c-gray-500:#64625f;
    --c-gray-600:#585654;
    --c-gray-700:#3d3c3a;
    --c-gray-800:#252524;
    --c-gray-900:#141414;
    --c-primary: #211641;
    --c-secondary: #af3e77;
    --c-light: #f1ede8;
    --c-dark:#130c18;
    --c-alert: #a70e3c;
    --c-success: #12bb66;
    --c-warning: #cf9924;
  }

  body {
    padding: 0;
    color: var(--c-dark);
    background-color: var(--c-gray-100) ;
    font-family: 'Lato',Arial;
  }
`
export default GlobalStyle
