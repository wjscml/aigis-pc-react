import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import SearchBox from '../../components/SearchBox';
import Suggest from '../../components/Suggest';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/action';
import './index.styl';
import cookie from '../../common/js/cookie';

const { confirm } = Modal;

class Header extends React.Component {
    state = {
    }
    search = (query) => {
        this.refs.suggestList._getSearchData(query);
    }
    showConfirm = () => {
        const _this = this;
        confirm({
            title: '确定要退出登陆吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                const { dispatch } = _this.props;
                dispatch(saveUserInfo(null));
                cookie.delCookie('session')
                window.location.href = '/login';
                //this.$router.push({ path: '/login' })
            }
        })
    }
    render () {
        return (    
            <div className="top-content">
                <div className="search-box-wrapper">
                    <SearchBox search={query => this.search(query)} />
                    <div className="search-result">
                        <Suggest ref="suggestList"/>
                    </div>
                </div>             
                <div className="user-box-wrapper"> 
                    <div className="userinfo">       
                        <img className="avatar" src={this.props.userInfo.avatar} alt="avatar" />
                        <span className="name">{this.props.userInfo.nickname}</span>
                        <div className="user-pulldown">
                            <ul>
                                <Link to="/login/forget"><li>修改密码</li></Link>
                                <li onClick={this.showConfirm}>退出登录</li>
                            </ul>
                            <div className="pulldown-bg"></div>
                        </div>
                    </div>
                    <i className="icon-mobile_fill">
                        <div className="download">
                            <img src="./assets/download.svg" alt="example" />
                            <div className="pulldown-bg"></div>
                            <p className="text">扫码下载APP</p>
                        </div>
                    </i>  
                </div>
            </div>  
        )
    }
}

export default connect( state => ({
    userInfo: state.userInfo
}))(Header);