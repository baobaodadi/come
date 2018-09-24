/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Row, Col, Icon, Avatar} from 'antd';
import {enquireScreen} from 'enquire-js';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from '../component/SiderMenu/index'
import Routes from './routes'
import {withRouter} from 'react-router-dom';
import * as actionTypes from "../../config/actionTypes";


let isMobile;
enquireScreen(b => {
    isMobile = b;
});

const defaultState = {
    isMobile
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {...defaultState};
        this.toggle = this.toggle.bind(this);
        this.onCollapse = this.onCollapse.bind(this);
    }

    toggle() {
        this.onCollapse(!this.props.collapsed)
    }

    componentDidMount() {
        enquireScreen(mobile => {
            this.setState({
                isMobile: mobile,
            });
        });

    }

    onCollapse(collapsed) {
        this.props.menuCollapse(collapsed);
    };


    render() {
        const {history, collapsed} = this.props;
        return (
            <div className="main-wrapper">
                <Row>
                    {isMobile ? (
                        <DrawerMenu
                            open={!this.props.collapsed}
                            onMaskClick={() => {
                                this.onCollapse(true);
                            }}
                            onIconClick={() => {
                                this.onCollapse(!this.props.collapsed);
                            }}
                            width="200px"
                        >
                            <SiderMenu
                                location={history.location}
                                onCollapse={this.onCollapse}
                            />
                        </DrawerMenu>) : (
                        <Col span={3} className="main-menu">
                            <SiderMenu
                                location={history.location}
                                onCollapse={this.onCollapse}
                            />
                        </Col>
                    )
                    }
                    <Col span={21} className="main-container">
                        <Routes />
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    collapsed: state.globle.collapsed,
});

const mapDispatchToProps = dispatch => ({

    menuCollapse: (payload) => dispatch({
        type: actionTypes.UPDATE_COLLAPSED,
        payload
    }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));