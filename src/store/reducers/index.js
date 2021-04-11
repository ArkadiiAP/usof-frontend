import authReducer from "./authReducer"
import { login, logout } from "./authReducer"
import tokenReducer from "./tokenReducer";
import {get_token} from "./tokenReducer";
import postsReducer from "./postsReducer";
import {setPostsPage} from "./postsReducer";
import categoriesReducer from "./categoriesReducer";
import {setCategoriesPage} from "./categoriesReducer";
import usersReducer from "./usersReducer";
import {setUsersPage} from "./usersReducer";
import commentsReducer from "./commentsReducer";

export {authReducer, tokenReducer, commentsReducer, postsReducer, categoriesReducer, usersReducer}
export { login, logout, get_token, setPostsPage, setCategoriesPage, setUsersPage }