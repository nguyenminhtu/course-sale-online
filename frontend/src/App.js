import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "contexts/auth";

import ActiveAccountPage from "containers/ActiveAccount";
import SignInPage from "containers/SignIn";
import SignUpPage from "containers/SignUp";
import ForgotPasswordPage from "containers/ForgotPassword";
import ResetPasswordPage from "containers/ResetPassword";

import PublicRoute from "routes/PublicRoute";
import AdminRoutes from "routes/AdminRoutes";
import UserRoutes from "routes/UserRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PublicRoute exact path="/sign_in" component={SignInPage} />

          <PublicRoute exact path="/sign_up" component={SignUpPage} />

          <PublicRoute
            exact
            path="/forgot-password"
            component={ForgotPasswordPage}
          />

          <PublicRoute
            exact
            path="/active-account"
            component={ActiveAccountPage}
          />

          <PublicRoute
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />

          <Route path="/admin">
            <AdminRoutes />
          </Route>

          <Route path="/">
            <UserRoutes />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
