import { Switch, Route } from "react-router-dom";

import AuthenticatedRoute from "routes/AuthenticatedRoute";
import UserLayout from "layouts/UserLayout";

import UserHomePage from "domain/user/HomePage";

function App() {
  return (
    <Switch>
      <UserLayout>
        <Route exact path="/" component={UserHomePage} />
      </UserLayout>
    </Switch>
  );
}

export default App;
