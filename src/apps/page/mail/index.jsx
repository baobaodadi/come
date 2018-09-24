/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import mailimg from '../../../images/mail.png';
import passwordimg from '../../../images/password.png';
import confirmimg from '../../../images/confirm.png';
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

const FormItem = Form.Item;
const defaultState = {
    confirmDirty: true,
    eye: false
};

class Mail extends Component {

    constructor(props) {
        super(props);
        this.state = {...defaultState};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateMail = this.validateMail.bind(this);
        this.eye = this.eye.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.asset !== this.props.asset)
            this.setState({
                asset: nextProps.asset
            });
        if (nextProps.mail !== this.props.mail) {
            // this.setState({
            //     mail: nextProps.mail
            // });
            if (nextProps.mail) {
                this.props.form.setFields({
                    email: {
                        value: '',
                        errors: [new Error(nextProps.mail)],
                    },
                });
            }
        }


    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.fetchMail({mail: values.email, password: values.password})
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (!/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/.test(value)) {
            callback( <div className="title">
                <img src={passwordimg} alt=""/>
                <span>设置邮箱密码</span>
            </div>);
        }
        else if (form.getFieldValue('password').indexOf(form.getFieldValue('email')) !== -1) {
            callback('密码不能包含邮箱');
        }
        // else if (value && this.state.confirmDirty) {
        //     form.validateFields(['confirm'], {force: true});
        // }
        else {
            callback();
        }

    }

    validateMail(rule, value, callback) {

        const form = this.props.form;
        if (!/^(?=.*[a-zA-Z-])[0-9a-zA-Z][a-zA-Z0-9-]{0,13}[0-9a-zA-Z]$/.test(value)) {
            callback('密码不符合规则');
        } else {
            callback();
        }
    }

    eye() {
        this.setState({eye: !this.state.eye});
    }


    componentDidMount() {
        this.props.fetchAsset();
    }

    render() {
        const {asset, mail} = this.props;
        const {getFieldDecorator} = this.props.form;
        const suffix = <Icon type="eye" theme="filled" style={{color: this.state.eye ? '#007FFF ' : '#B7BBC2'}} onClick={this.eye}/>;

        return (

            <div className="mail">
                <div className="find">
                    <Form onSubmit={this.handleSubmit}>
                        <div className='mailinfo'>
                            <div className="title">
                                <img src={mailimg} alt=""/>
                                <span>邮箱信息</span>
                            </div>
                            <div className="formitem">
                                <FormItem
                                    hasFeedback
                                    style={{'display': 'inline-block', 'width': '217px'}}
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            required: true, message: '请输入邮箱',
                                        },
                                            {
                                                validator: this.validateMail
                                            }],
                                    })(
                                        <Input size="large"/>
                                    )}
                                </FormItem>
                                <div className='zhui'>
                                    @sogou-inc.com
                                </div>
                            </div>
                        </div>

                        <div className='passwordinfo'>
                            <div className="title">
                                <img src={passwordimg} alt=""/>
                                <span>设置邮箱密码</span>
                            </div>
                        <div className="formitem">
                        <FormItem
                            hasFeedback
                            style={{'display': 'inline-block', 'width': '380px'}}
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入密码',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input size="large" type={this.state.eye ? 'text' : 'password'} suffix={suffix}/>
                            )}
                        </FormItem>
                        </div>
                        </div>

                        <div className='confirminfo'>
                            <div className="title">
                                <img src={confirmimg} alt=""/>
                                <span>确认密码</span>
                            </div>
                            <div className="formitem">
                        <FormItem
                            hasFeedback
                            style={{'display': 'inline-block', 'width': '380px'}}
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认你的密码',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                            </div>
                        </div>
                    </Form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        asset: state.asset.data,
        mail: state.mail.data,

    })
};


const mapDispatchToProps = dispatch => ({
    fetchMail: (payload) => dispatch({
        type: actionTypes.FETCH_MAIL,
        payload
    }),
    fetchAsset: (payload) => dispatch({
        type: actionTypes.FETCH_ASSET,
    }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Mail)));





