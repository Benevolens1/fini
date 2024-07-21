import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './board/App'

import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import ErrorPage from './errorPage';
import Index, {action as indexAction} from './index';

// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      errorElement={<ErrorPage/>}
    >
      <Route errorElement={<ErrorPage/>}>
        <Route 
        index
        element={<Index/>}
        action={indexAction}/>
        <Route 
          path=":boardId"
          element={<App/>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
