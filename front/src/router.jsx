import React from 'react';
import App from './board/App';
import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';
import ErrorPage from './errorPage';
import Index from './index';
import ConnectionPage, { action as connectionAction } from './user-account/connection';
import MyBoardsPage, {loader as myboardsLoader} from './user-account/myboards';
import AdminPage, {loader as adminLoader} from './admin/admin';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route
          index
          element={<Index />} />
        <Route
          path="connection"
          element={<ConnectionPage />}
          action={connectionAction} />
          <Route
          path="admin"
          element={<AdminPage/>}
          loader={adminLoader} />
        <Route
          path="myboards"
          element={<MyBoardsPage/>}
          loader={myboardsLoader} />
        <Route
          path=":boardId"
          element={<App />} />
      </Route>
    </Route>
  )
);
