import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./components/main";
import Login from "./components/login";
import UsersSwitch from "./components/usersSwitch";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersSwitch} />
            </Switch>
        </div>
    );
}

export default App;
