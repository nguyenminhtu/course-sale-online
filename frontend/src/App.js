import { BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthProvider } from "contexts/auth";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import PublicRoute from "components/PublicRoute";

import { ListRequest } from "domain/admin/Requests";
import {
  ListCategory,
  NewCategory,
  EditCategory,
} from "domain/admin/Categories";
import AdminHomePage from "domain/admin/HomePage";
import HomePage from "domain/user/HomePage";
import SignInPage from "containers/SignIn";
import MainLayout from "domain/admin/layouts/MainLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PublicRoute exact path="/sign_in" component={SignInPage} />

          <MainLayout>
            <AuthenticatedRoute exact path="/admin" component={AdminHomePage} />

            <AuthenticatedRoute
              exact
              path="/admin/requests"
              component={ListRequest}
            />

            <AuthenticatedRoute
              exact
              path="/admin/categories"
              component={ListCategory}
            />

            <AuthenticatedRoute
              exact
              path="/admin/categories/new"
              component={NewCategory}
            />

            <AuthenticatedRoute
              exact
              path="/admin/categories/:categoryId/edit"
              component={EditCategory}
            />

            <AuthenticatedRoute exact path="/" component={HomePage} />
          </MainLayout>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
