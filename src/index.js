import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './error-page';
import Root from './routes/root';
import CompanySearch from './components/CompanySearch';
import CompanyListView from './components/CompanyListView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/search',
        element: <CompanySearch />,
      },
      {
        path: '/lists',
        element: <CompanyListView />,
      },
      {
        path: '/lists/:listId',
        element: <CompanySearch />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
