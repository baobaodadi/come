/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import Asset from './asset/index.jsx';
import Mail from './mail/index.jsx';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

class Routes extends Component {

  render() {
    return (
      <Switch>

        <Route exact path="/asset" component={Asset}/>
        <Route exact path="/mail" component={Mail}/>
        <Redirect from="/" to="asset"/>
      </Switch>
    );
  }
}

export default Routes;