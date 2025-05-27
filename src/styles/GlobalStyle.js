import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

.poster .swiper-button-prev::after,
.poster .swiper-button-next::after {
  display: none !important;
  content: '' !important;
}

`;

export default GlobalStyle;
