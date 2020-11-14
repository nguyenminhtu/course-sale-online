import { Switch } from "react-router-dom";

import AuthenticatedRoute from "routes/AuthenticatedRoute";

import { ListCourse, NewCourse, EditCourse } from "domain/admin/Courses";
import { ListLesson, NewLesson, EditLesson } from "domain/admin/Lessons";
import { ListRequest } from "domain/admin/Requests";
import { ListUser, NewUser, EditUser } from "domain/admin/Users";
import {
  ListCategory,
  NewCategory,
  EditCategory,
} from "domain/admin/Categories";
import AdminHomePage from "domain/admin/HomePage";
import MainLayout from "domain/admin/layouts/MainLayout";

function App() {
  return (
    <Switch>
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

        <AuthenticatedRoute
          exact
          path="/admin/lessons"
          component={ListLesson}
        />
        <AuthenticatedRoute
          exact
          path="/admin/lessons/new"
          component={NewLesson}
        />
        <AuthenticatedRoute
          exact
          path="/admin/lessons/:lessonId/edit"
          component={EditLesson}
        />

        <AuthenticatedRoute
          exact
          path="/admin/courses"
          component={ListCourse}
        />
        <AuthenticatedRoute
          exact
          path="/admin/courses/new"
          component={NewCourse}
        />
        <AuthenticatedRoute
          exact
          path="/admin/courses/:categoryId/edit"
          component={EditCourse}
        />

        <AuthenticatedRoute exact path="/admin/users" component={ListUser} />
        <AuthenticatedRoute exact path="/admin/users/new" component={NewUser} />
        <AuthenticatedRoute
          exact
          path="/admin/users/:userId/edit"
          component={EditUser}
        />
      </MainLayout>
    </Switch>
  );
}

export default App;
