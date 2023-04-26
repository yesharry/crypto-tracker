import { ThemeProvider, createGlobalStyle } from "styled-components";
// createGlobalStyle은 한 컴포넌트를 만들 수 있게 해준다.
// 렌더링 될 떄, 그 컴포넌트는 전역 스코프에 스타일을 올려준다.
import Router from "./Router";

import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
// react query는 Devtools(Developer Tools, 개발자도구)라는 것을 가지고 있는데
// Devtools는 render할 수 있는 component이고 이건 뭘 보여주냐면
// react query에 있는 devtools를 import 해오면 나의 캐시에 있는 query를 볼 수 있다.

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor}
}
a {
  text-decoration: none;
  color: inherit;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  // useRecoilValue를 atom의 value를 가져온다.

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

// toggleDark: App -> Router -> Coins
// isDark: App -> Router -> Coin -> Chart
// state management를 사용하면 이런 복잡하고 귀찮은 과정을 생략할 수 있어.

// Header -> (isDark) <- Chart
// App -> ()

export default App;

// react-query는 우리가 스스로 실행하고 있던 로직들을 축약해준다.
// react-query를 사용하기 위해서 우리는 첫 단계로 fetcher 함수를 만들어야 한다.
