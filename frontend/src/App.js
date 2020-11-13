import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "contexts/auth";

import SignInPage from "containers/SignIn";

import AdminRoutes from "routes/AdminRoutes";
import PublicRoute from "routes/PublicRoute";
import UserRoutes from "routes/UserRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PublicRoute exact path="/sign_in" component={SignInPage} />

          <Route exact path="/">
            <UserRoutes />
          </Route>

          <Route path="/admin">
            <AdminRoutes />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
