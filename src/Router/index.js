import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/index";
import Navbar from "../common/Navigation/Navbar";
import { CustomTheme } from "../common/Themes";
import { ThemeProvider } from "@material-ui/styles";
import LoaderProvider from "../hoc/LoaderProvider";

const Router = () => {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <ThemeProvider theme={CustomTheme}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} />
          </Switch>
        </ThemeProvider>
      </LoaderProvider>
    </BrowserRouter>
  );
};

export default Router;
