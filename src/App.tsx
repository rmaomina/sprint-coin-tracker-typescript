import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Coins from "routes/Coins";
import Coin from "routes/Coin";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;500&display=swap');
  ${reset}

  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  body {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    font-weight: 400;
    line-height: 1.5rem;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/:coinId" component={Coin} />
          <Route path="/" component={Coins} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
