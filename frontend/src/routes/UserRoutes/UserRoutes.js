import { Route } from "react-router-dom";

import { CartProvider } from "contexts/cart";

import CourseDetailPage from "domain/user/CourseDetail";
import MyCoursesPage from "domain/user/MyCourses";
import MyCourseDetailPage from "domain/user/MyCourseDetail";
import UserHomePage from "domain/user/HomePage";
import UserProfilePage from "domain/user/UserProfile";

import UserLayout from "layouts/UserLayout";
import AuthenticatedRoute from "routes/AuthenticatedRoute";

function UserRoutes() {
  return (
    <CartProvider>
      <UserLayout>
        <Route exact path="/">
          <UserHomePage />
        </Route>

        <Route path="/courses/:courseId">
          <CourseDetailPage />
        </Route>

        <AuthenticatedRoute path="/user-profile" component={UserProfilePage} />

        <AuthenticatedRoute path="/my-courses" component={MyCoursesPage} />

        <AuthenticatedRoute
          path="/my-course-detail/:courseId"
          component={MyCourseDetailPage}
        />
      </UserLayout>
    </CartProvider>
  );
}

export default UserRoutes;
