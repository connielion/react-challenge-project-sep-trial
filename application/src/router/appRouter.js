import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Main, Login, OrderFormHook, ViewOrdersHook } from '../components';
import NotFound from '../components/NotFound/NotFound'
import { GuardProvider, GuardedRoute} from 'react-router-guards';
import guardsList from './guards/guards';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <Router>
      <GuardProvider guards={guardsList}>
        <GuardedRoute path="/" exact component={Main} />
        <GuardedRoute path="/login" exact component={Login} />
        <GuardedRoute path="/order" exact component={OrderFormHook} meta={{ auth: true, token }}/>
        <GuardedRoute path="/view-orders" exact component={ViewOrdersHook} meta={{ auth: true, token}}/>
        <GuardedRoute path="*" component={NotFound} />
      </GuardProvider>
    </Router>
  );
}

export default AppRouter;
