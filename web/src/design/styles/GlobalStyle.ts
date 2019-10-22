import { createGlobalStyle } from 'styled-components';
import { Color } from '@web/design/styles/color';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${Color.LightGray};
  }
`;

export { GlobalStyle };
