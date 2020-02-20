import { createGlobalStyle } from 'styled-components';
import { Color } from '@web/design/styles/color';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${Color.Gray100};
  }

  /* Set the footer to be at the bottom */
  html, body, #root {
    height: 100%;
  }
`;

export { GlobalStyle };
