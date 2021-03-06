import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// *Functions
import PrivateRoute from './PrivateRoute';

// *Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import Instruct from './components/Instruct';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignin'
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import ConfirmDelete from './components/ConfirmDelete';

function App() {
  return (
    <BrowserRouter>
      <div className="bgContainer--header">
        <Nav />
        <Switch>
          <Route exact path="/" component={Courses}></Route>
          <PrivateRoute path="/courses/create" component={CreateCourse}></PrivateRoute>
          <PrivateRoute path="/courses/:id/update" component={UpdateCourse}></PrivateRoute>
          <Route exact path="/courses/:id" component={CourseDetail}></Route>
          <PrivateRoute exact path="/courses/:id/delete" component={ConfirmDelete}></PrivateRoute>
          <Route exact path="/signin" component={UserSignIn}></Route>
          <Route exact path="/signup" component={UserSignUp}></Route>
          <Route exact path="/signout" component={UserSignOut}></Route>
          {/* Handle errors */}
          <Route exact path="/forbidden" component={Forbidden} />
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/error" component={UnhandledError} />
          {/* 404 */}
          <Route render={() => <Redirect to={'/notfound'} />} />
        </Switch>
        <Instruct />
        <Footer />
      </div>

    </BrowserRouter>
  );
}

export default App;
