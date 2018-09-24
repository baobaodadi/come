import React, {Component} from 'react';
import {Layout} from 'antd';
const {Footer} = Layout;

class Footers extends Component {

  render() {
    return (
      <Footer style={{textAlign: 'center'}}>
        Copyright © 2018 SOGOU.COM     京ICP证050897号
      </Footer>
    )
  }
}

export default Footers;