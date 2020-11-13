import { Switch } from "react-router-dom";

import AuthenticatedRoute from "routes/AuthenticatedRoute";

import UserHomePage from "domain/user/HomePage";

function App() {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/" component={UserHomePage} />
    </Switch>
  );
}

export default App;
