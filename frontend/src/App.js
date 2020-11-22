import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "contexts/auth";
import { CartProvider } from "contexts/cart";

import SignInPage from "containers/SignIn";
import SignUpPage from "containers/SignUp";

import UserHomePage from "domain/user/HomePage";
import CourseDetailPage from "domain/user/CourseDetail";

import UserLayout from "layouts/UserLayout";

import PublicRoute from "routes/PublicRoute";
import AdminRoutes from "routes/AdminRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PublicRoute exact path="/sign_in" component={SignInPage} />

          <PublicRoute exact path="/sign_up" component={SignUpPage} />

          <Route path="/admin">
            <AdminRoutes />
          </Route>

          <CartProvider>
            <UserLayout>
              <Route exact path="/">
                <UserHomePage />
              </Route>

              <Route path="/courses/:courseId">
                <CourseDetailPage />
              </Route>
            </UserLayout>
          </CartProvider>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
