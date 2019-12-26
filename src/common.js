import React, { Component } from 'react';
import { Modal } from 'antd';
//import Header from './components/Header';
import './common/style/common.styl';
import cookie from './common/js/cookie'

const { confirm } = Modal;
export default class Common extends Component {
  state = {
    visible: true,
    session: cookie.getCookie('session')
  }
  componentDidMount () {
      if (!this.state.session) {
          this.showConfirm()
      }    
  }
  showConfirm = () => {
    confirm({
        title: '请您先进行登录',
        okText: '去登录',
        cancelText: '关闭',
        onOk() {
            window.location.href = '/login';
        },
        onCancel() {
            window.location.href = '/login';
        },
    });
  }
  render () {
    return (
      this.state.session ?
      <div style={{padding: '0 200px', minWidth: '980px'}}>
        <div style={{overflow: 'auto'}}>
          <i className="icon-logo" style={{fontSize: 30, lineHeight: '80px', float: 'right', color: '#fff'}}></i>  
        </div>
        {this.props.children}
      </div> : null
    );
  }
}