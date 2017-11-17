import React from 'react';
import {Router,Route} from 'react-router';

import Home from './components/Home';
import Project from './components/Project';
import ProjectCreate from './components/Project/create';
import Discover from './components/Discover';
import My from './components/My';
import Login from './components/Account/login';
import Register from './components/Account/register';
import NotFound from './components/Public/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Home} />
    <Route path="/project/id/:id" component={Project} />
    <Route path="/project/create" component={ProjectCreate} />
    <Route path="/discover" component={Discover} />
    <Route path="/my" component={My} />
    <Route path="/account/regsiter" components={Register} />
    <Route path="/account/login" components={Login} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
