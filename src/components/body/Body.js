import React from 'react'
import {Switch, Route} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import {useSelector} from "react-redux";
import NotFound from "./NotFound";
import Posts from "./posts/Posts";
import PostPage from "./posts/PostPage";
import Categories from "./categories/Categories";
import Users from "./users/Users";
import Profile from "./users/Profile";
import PostsByCategory from "./posts/PostsByCategory";
import EditProfile from "./users/EditProfile";
import PostEdit from "./posts/PostEdit";
import PostCreate from "./posts/PostCreate";
import CategoryCreate from "./categories/CategoryCreate";

function Body() {
  const auth = useSelector(state => state.authReducer)
  const {isLogged, isAdmin} = auth
  return(
    <section>
      <Switch>
        <Route path={'/'} component={Posts} exact/>
        <Route path={'/login'} component={!isLogged ? Login : NotFound} exact />
        <Route path={'/register'} component={!isLogged ? Register : NotFound} exact/>
        <Route path={'/forgotPassword'} component={!isLogged ? ForgotPassword : NotFound} exact/>
        <Route path={'/activation/:activation_token'} component={!isLogged ? ActivationEmail : NotFound} exact/>
        <Route path={'/resetPassword/:reset_token'} component={!isLogged ? ResetPassword : NotFound} exact/>
        <Route path={'/posts'} component={Posts} exact/>
        <Route path={'/posts/create'} component={isLogged ? PostCreate : NotFound} exact/>
        <Route path={'/posts/:post_id/edit'} component={isLogged ? PostEdit : NotFound} exact/>
        <Route path={'/posts/:post_id'} component={isLogged ? PostPage : NotFound} />
        <Route path={'/categories'} component={Categories} exact/>
        <Route path={'/categories/create'} component={isLogged ? CategoryCreate : NotFound} />
        <Route path={'/users'} component={Users} exact/>
        <Route path={'/users/:user_id'} component={isLogged ? Profile : NotFound} exact/>
        <Route path={'/users/:user_id/edit'} component={isLogged ? EditProfile : NotFound} />
        <Route path={'/postsByCategory/:category_id'} component={isLogged ? PostsByCategory : NotFound} exact/>
      </Switch>
    </section>
  )
}
export default Body