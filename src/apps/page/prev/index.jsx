/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import {
  Table,
  Input,
  Button,
  Icon,
  Modal,
  Radio,
  List,
  Spin,
  Card,
  DatePicker,
  Select,
  Tabs,
  Form,
  TreeSelect
} from 'antd';
import 'moment/locale/zh-cn'

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const defaultState = {
  goods: [],
  preAsset: '',
  tmpAsset: ''
};

class Prev extends Component {

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset !== this.props.asset)
      this.setState({
        asset: nextProps.asset
      });
  }

  handleTab(value) {
    console.log(value);
  }

  handleSelect(e) {
    // console.log(e.target.value);
    this.setState({preAsset: e.target.value, tmpAsset: e.target.value})
  }

  handleSubmit(e) {

    this.props.changeAsset({preAsset: this.state.preAsset, tmpAsset: this.state.tmpAsset})

  }


  componentDidMount() {
    this.props.fetchAsset();
  }

  render() {
    const {asset} = this.props;

    return (

      <div className="prev">
        <div className="buttonclub">
          <Button type="primary" onClick={this.handleSubmit}>完成</Button>
          <Link to="/mail">
            <Button type="primary">上一步</Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    asset: state.asset.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchAsset: (payload) => dispatch({
    type: actionTypes.FETCH_ASSET,
  }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Prev));





