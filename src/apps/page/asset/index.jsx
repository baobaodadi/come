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

class Asset extends Component {

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
        this.props.changeAsset({preAsset: this.state.preAsset, tmpAsset: this.state.tmpAsset});
        this.props.updateOver({over:[this.props.over[0],1]})
    }


    componentDidMount() {
        this.props.fetchAsset();
    }

    render() {
        const {asset} = this.props;

        return (

            <div className="asset">
                <Tabs defaultActiveKey="1" onChange={this.handleTab}>
                    <TabPane tab="笔记本" key="1">
                        <div className="find">
                            {
                                asset ?
                                    <RadioGroup defaultValue={asset.dftNt[0].code} size="large"
                                                onChange={this.handleSelect}>
                                        <List
                                            grid={{gutter: 16, column: 3}}
                                            dataSource={asset.dftNt}
                                            renderItem={(item, i) => (
                                                <List.Item>
                                                    <Card style={{width: 300}}>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <RadioButton value={item.code}>{item.code}</RadioButton>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        /> </RadioGroup> : null
                            }

                        </div>
                    </TabPane>
                    <TabPane tab="台式机" key="2">
                        <div className="find">
                            {
                                asset ?
                                    <RadioGroup defaultValue={asset.dftUn[0].code} size="large"
                                                onChange={this.handleSelect}>
                                        <List
                                            grid={{gutter: 16, column: 3}}
                                            dataSource={asset.dftUn}
                                            renderItem={(item, i) => (
                                                <List.Item>
                                                    <Card style={{width: 300}}>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <RadioButton value={item.code}>{item.code}</RadioButton>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        /> </RadioGroup>
                                    : null
                            }

                            {
                                asset ?
                                    <RadioGroup defaultValue={asset.dftMn[0].code} size="large"
                                                onChange={this.handleSelect}>
                                        <List
                                            grid={{gutter: 16, column: 3}}
                                            dataSource={asset.dftMn}
                                            renderItem={(item, i) => (
                                                <List.Item>
                                                    <Card style={{width: 300}}>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <p>{item.categoryName}:asdasdasddsass</p>
                                                        <RadioButton value={item.code}>{item.code}</RadioButton>
                                                    </Card>
                                                </List.Item>
                                            )}
                                        />
                                    </RadioGroup>
                                    : null
                            }

                        </div>
                    </TabPane>
                    <TabPane tab="一体机" key="3">
                        {
                            asset ?
                                <RadioGroup defaultValue={asset.dftHt[0].code} size="large"
                                            onChange={this.handleSelect}>
                                    <List
                                        grid={{gutter: 16, column: 3}}
                                        dataSource={asset.dftHt}
                                        renderItem={(item, i) => (
                                            <List.Item>
                                                <Card style={{width: 300}}>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <p>{item.categoryName}:asdasdasddsass</p>
                                                    <RadioButton value={item.code}>{item.code}</RadioButton>
                                                </Card>
                                            </List.Item>
                                        )}
                                    /> </RadioGroup> : null
                        }

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





