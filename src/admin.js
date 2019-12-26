import React from 'react'
import { Modal } from 'antd';
import { connect } from 'react-redux';
import Header from './components/Header';
//import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
import MarketsBar from './components/MarketsBar';
import './common/style/common.styl';
import cookie from './common/js/cookie.js'

const { confirm } = Modal;
class Admin extends React.Component {
    state = {
        visible: true,
        session: cookie.getCookie('session')
    }
    componentDidMount () {
        if (!this.state.session) {
            this.showConfirm()
        }
        //console.log(this.refs.adminChildren.firstChild.classList[0])    
    }
    componentDidUpdate () {
        // if (!this.props.userInfo) {
        //     this.showConfirm()
        // } 
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
    render() { 
        return (
            <div className="Admin" style={this.props.indexBar?{paddingTop: 66}:{}}>  
                {
                    this.props.indexBar ?
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
                        <MarketsBar />
                    </div> : null
                }
                <NavLeft />
                {
                    this.state.session ?
                    <div className="main-wrap" >
                        <Header />
                        <div >
                            { this.props.children }
                        </div>  
                    </div> : null
                }
            </div>
        );
    }
}
export default connect( state => ({
    userInfo: state.userInfo,
    indexBar: state.indexBar
}))(Admin);