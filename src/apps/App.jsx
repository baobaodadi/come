/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import Main from './page/index'
import Headers from './component/header'

class App extends Component {

  render() {

    return (
      <div>
        <Headers/>
        <Main/>
        {/*<Footers/>*/}
      </div>
    );
  }
}


export default App;