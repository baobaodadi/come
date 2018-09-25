/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom"
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
import './index.less';
import menus from '../../../config/menus'
import {Affix} from 'antd';
import {connect} from "react-redux";
import * as actionTypes from "../../../config/actionTypes";
const defaultState = {
    over:[1,0],
};

class SiderMenu extends Component {

  constructor(props) {
    super(props);
      this.state = {...defaultState};
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.over !== this.props.over) {
            this.setState({over})
        }
    }



  render() {
    const {location} = this.props;
    console.log(this.state.over)
    return (
        <Menu
          inlineIndent="40"
          className="aside-container menu-site"
          mode="inline"
          defaultSelectedKeys={['mail']}
          selectedKeys={[location.pathname.slice(1,location.pathname.length)]}
        >
          {
              menus && menus.map((item, i) =>
                  <Menu.Item key={item.key}>
                      <Link
                          to={'/' + item.key}
                      >
                          <span>{item.content} {this.state.over[i]?'2':'1'}</span>
                      </Link>
                  </Menu.Item>)
          }
        </Menu>
    );
  }
}

const mapStateToProps = state => {
    return ({
        over: state.globle.over,
    })
};


const mapDispatchToProps = dispatch => ({
    over: (payload) => dispatch({
        type: actionTypes.UPDATE_OVER,
        payload
    }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderMenu));
