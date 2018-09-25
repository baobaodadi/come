/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import Asset from './asset/index.jsx';
import Mail from './mail/index.jsx';
import Prev from './prev/index.jsx';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/mail" component={Mail}/>
        <Route exact path="/asset" component={Asset}/>
        {/*<Route exact path="/prev" component={Prev}/>*/}
        <Redirect from="/" to="mail"/>
      </Switch>
    );
  }
}

export default Routes;