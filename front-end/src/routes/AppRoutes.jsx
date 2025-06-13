import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import VerifyAuth from './VerifyAuth';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Loading from '../components/Loading';
import NotFound from '../pages/NotFound';

import HomeLayout from '../layouts/HomeLayout';
import EventsLayout from '../layouts/EventsLayout';

/* AUTHENTICATED PAGES */
const Events = lazy(() => import('../pages/Events'))
const MyEvents = lazy(() => import('../pages/MyEvents'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const CreateEvent = lazy(() => import('../pages/CreateEvent'))



const AppRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path='/' element={<VerifyAuth />}>

        <Route element={<HomeLayout />}>

          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>

        </Route>

        <Route element={<EventsLayout />}>

          <Route path='events' element={<Events />}></Route>
          <Route path='my-events' element={<MyEvents />}></Route>
          <Route path='create-event' element={<CreateEvent />}></Route>
          <Route path='dashboard' element={<Dashboard />}></Route>

        </Route>

      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;