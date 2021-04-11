import {configureStore} from '@reduxjs/toolkit'

import {authReducer, tokenReducer, commentsReducer, postsReducer, categoriesReducer, usersReducer} from './reducers'

const store = configureStore({
  reducer: { authReducer, tokenReducer, commentsReducer, postsReducer, categoriesReducer, usersReducer }
})

export default store