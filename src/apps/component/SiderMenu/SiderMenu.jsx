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
        over:[0,0]
};

class SiderMenu extends Component {

  constructor(props) {
    super(props);
      this.state = {...defaultState};
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.over !== this.props.over) {
            console.log(nextProps.over)
            this.setState({over:nextProps.over})
        }
    }

    componentDidMount(){
      // this.props.over()
    }



  render() {
    const {location,over} = this.props;
    console.log(over)
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
                          <span>{item.content} {this.state.over&&this.state.over[i]?<Icon type="check" theme="outlined" />:<Icon type="warning" theme="outlined" />}</span>
                      </Link>
                  </Menu.Item>)
          }
          <Menu.Item key='prev'>
            <Link
              to='/prev'
            >
              <span>总览  </span>
            </Link>
          </Menu.Item>
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
    updateOver: (payload) => dispatch({
        type: actionTypes.UPDATE_OVER,
        payload
    }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderMenu));
