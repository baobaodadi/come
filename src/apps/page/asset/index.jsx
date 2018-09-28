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
import alert from '../../../images/alert.png';
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
  visible: 0,
  tmpAsset: '',
  select: 'NOTEBOOK'
};

class Asset extends Component {

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.assetList = this.assetList.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset !== this.props.asset)
      this.setState({
        asset: nextProps.asset
      });
  }

    handleOk () {
        this.setState({ visible: false });
    }

    handleCancel () {
        this.setState({ visible: false });
    }

  handleTab(value) {
    this.setState({
      select: value
    });
  }

  assetList(asset,type) {
    return(
      <div className="assetlist">
      {
        asset ?
          <RadioGroup  value={this.state.preAsset} size="large"
                      onChange={this.handleSelect} >
            <List
              grid={{column: 3}}
              dataSource={asset[type]}
              renderItem={(item, i) => (
                <List.Item>
                  <Card style={((this.state.preAsset.toString()).indexOf(item.categoryId.toString())!==-1)?{ width:'273px',boxShadow: '0px 3px 4px #e5e5e5'}:{ width:'273px'}}>
                    <div className="asset-top">
                      <img src={item.assetPicture} alt="" className="asset-image"/>
                      {

                        i===0?<img src={rec} alt="" className="asset-rec"/>:null

                      }
                      {
                        (item.assetKeepStock>item.assetStock)?<img src={bu} alt="" className="asset-bu"/>:null

                      }
                    </div>
                    <div className="asset-title">{item.categoryName}</div>
                    <ul className="detail">
                      <li>cpu：{item.brand}</li>
                      <li>cpu：{item.cpu}</li>
                      <li>内存：{item.memory}</li>
                      <li>硬盘：{item.disk}</li>
                      <li>显卡：{item.card}</li>
                      <li>系统：{item.os}</li>
                      <li>分辨率：{item.resolution}</li>
                      <li>接口：{item.adapter}</li>
                      <li>尺寸：{item.size}</li>
                    </ul>
                    <RadioButton className={(item.assetKeepStock > item.assetStock)?'1':'2'} value={[item.categoryId,item.deviceType,+(item.assetKeepStock > item.assetStock)].toString()}>选择</RadioButton>
                  </Card>
                </List.Item>
              )}
            /> </RadioGroup> : null
      }
      </div>
    )
  }

  handleSelect(e) {
    if(+e.target.value.split(',')[2]){
        this.setState({visible: true})
    }
    this.setState({preAsset: e.target.value, tmpAsset: e.target.value})
  }

  handleSubmit(e) {
    this.props.changeAsset(
      {
        preAsset: [
          {
            "categoryId":this.state.preAsset.split(',')[0],
            "deviceType": this.state.preAsset.split(',')[1]
          }
        ]
      }
    );
    this.props.updateOver({over: [this.props.over[0], 1]})
  }


  componentDidMount() {
    this.props.fetchAsset();
  }

  render() {
    const {asset} = this.props;

    return (

      <div className="asset">
          <Modal
              visible={this.state.visible}
              title="Title"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                  <div  className='tong' onClick={this.handleCancel}>同意等待，暂时使用临时机</div>,
                  <div  className='qi' onClick={this.handleOk}>放弃公司配置自行携带电脑</div>,
              ]}
          >
              <div className="modal-inner">
               <img src={alert} alt="" className='modal-alert'/>
                <div className="modal-word">
                    <p>补货需要一定周期，</p>
                    <p>是否继续选择补货资产为标配办公资产！</p>
                </div>
              </div>

          </Modal>
        <Tabs defaultActiveKey="NOTEBOOK" onChange={this.handleTab}>
          <TabPane tab={
            <div>
              <div>
                {(this.state.select === 'NOTEBOOK') ?
                  <img src={notes}/> :
                  <img src={note}/>
                }
              </div>
              <div className="name">笔记本电脑</div>
            </div>
          } key="NOTEBOOK">
            <div className="find">
              {this.assetList(asset,'dftNt')}
            </div>
          </TabPane>
          <TabPane tab={
            <div>
              <div>
                {(this.state.select === 'MONITOR') ?
                  <img src={pcs}/> :
                  <img src={pc}/>
                }
              </div>
              <div className="name">台式机电脑</div>
            </div>
          } key="MONITOR">
            <div className="find">
              {this.assetList(asset,'dftHt')}
              {this.assetList(asset,'dftMn')}

            </div>
          </TabPane>
          <TabPane tab={
            <div>
              <div>
                {this.state.select === 'UIONMAC' ?
                  <img src={ones}/> :
                  <img src={one}/>
                }
              </div>
              <div className="name">一体机</div>
            </div>
          } key="UIONMAC">
            {this.assetList(asset,'dftUn')}
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





