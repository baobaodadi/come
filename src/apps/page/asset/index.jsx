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
import logo from '../../../images/logo.png';
import note from '../../../images/note.png';
import notes from '../../../images/notes.png';
import ones from '../../../images/ones.png';
import one from '../../../images/one.png';
import pcs from '../../../images/pcs.png';
import pc from '../../../images/pc.png';
import rec from '../../../images/rec.png';
import bu from '../../../images/bu.png';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const defaultState = {
  goods: [],
  preAsset: '',
  tmpAsset: '',
  select: '1'
};

class Asset extends Component {

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.assetList = this.assetList.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset !== this.props.asset)
      this.setState({
        asset: nextProps.asset
      });
  }

  handleTab(value) {
    console.log(value);
    this.setState({
      select: value
    });
  }

  assetList(asset,type) {
    return(
      <div className="assetlist">
      {
        asset ?
          <RadioGroup defaultValue={asset[type][0].categoryId} value={this.state.preAsset} size="large"
                      onChange={this.handleSelect} >
            <List
              grid={{column: 3}}
              dataSource={asset[type]}
              renderItem={(item, i) => (
                <List.Item>
                  <Card style={((this.state.preAsset.toString()).indexOf(item.categoryId.toString())!==-1)?{ width:'273px',boxShadow: '0px 3px 4px #e5e5e5'}:{ width:'273px'}}>
                    <div className="asset-top">
                      <img src={logo} alt="" className="asset-image"/>
                      {console.log(item.categoryId)}
                      {

                        item.recommend?<img src={rec} alt="" className="asset-rec"/>:null

                      }
                      {
                        (item.assetKeepStock>item.assetStock)?<img src={bu} alt="" className="asset-rec"/>:null

                      }
                    </div>
                    <div className="asset-title">{item.categoryName}</div>
                    <ul className="detail">
                      <li>cpu:{item.cpu}</li>
                      <li>内存:{item.memory}</li>
                      <li>硬盘:{item.disk}</li>
                      <li>显卡:{item.card}</li>
                      <li>系统:{item.os}</li>
                      <li>分辨率:{item.resolution}</li>
                      <li>尺寸:{item.size}</li>
                    </ul>
                    <RadioButton disable={(item.assetKeepStock>item.assetStock)?true:false} value={item.categoryId}>选择</RadioButton>
                  </Card>
                </List.Item>
              )}
            /> </RadioGroup> : null
      }
      </div>
    )
  }

  handleSelect(e) {
    console.log(e.target.value);
    this.setState({preAsset: e.target.value, tmpAsset: e.target.value})
  }

  handleSubmit(e) {
    this.props.changeAsset({preAsset: this.state.preAsset, tmpAsset: this.state.tmpAsset});
    this.props.updateOver({over: [this.props.over[0], 1]})
  }


  componentDidMount() {
    this.props.fetchAsset();
  }

  render() {
    const {asset} = this.props;
    console.log(asset)

    return (

      <div className="asset">
        <Tabs defaultActiveKey="1" onChange={this.handleTab}>
          <TabPane tab={
            <div>
              <div>
                {(this.state.select === '1') ?
                  <img src={notes}/> :
                  <img src={note}/>
                }
              </div>
              <div className="name">笔记本电脑</div>
            </div>
          } key="1">
            <div className="find">
              {/*{this.assetList(asset,'dftNt')}*/}
            </div>
          </TabPane>
          <TabPane tab={
            <div>
              <div>
                {(this.state.select === '2') ?
                  <img src={pcs}/> :
                  <img src={pc}/>
                }
              </div>
              <div className="name">台式机电脑</div>
            </div>
          } key="2">
            <div className="find">
              {/*{this.assetList(asset,'dftHt')}*/}

              {this.assetList(asset,'dftMn')}

            </div>
          </TabPane>
          <TabPane tab={
            <div>
              <div>
                {(this.state.select === '3') ?
                  <img src={ones}/> :
                  <img src={one}/>
                }
              </div>
              <div className="name">一体机</div>
            </div>
          } key="3">
            {/*{this.assetList(asset,'dftUn')}*/}

          </TabPane>
        </Tabs>
        <div className="buttonclub">
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
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
    over: state.globle.over,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchAsset: (payload) => dispatch({
    type: actionTypes.FETCH_ASSET,
  }),
  changeAsset: (payload) => dispatch({
    type: actionTypes.CHANGE_ASSET,
    payload
  }),
  updateOver: (payload) => dispatch({
    type: actionTypes.UPDATE_OVER,
    payload
  }),

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Asset));





