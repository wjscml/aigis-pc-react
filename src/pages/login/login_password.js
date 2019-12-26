import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import { getLogin } from '../../api';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/action';
import cookie from '../../common/js/cookie';

import './index.styl'

class LoginForm extends React.Component {
    componentDidMount () {
        document.title="登录 - Aigis - 埃癸斯风险控制系统"
    }
    checkUsername = (rule, value, callback) => {
        var reg = /^[0-9]+$/;
        if (!reg.test(value)) {
            callback(' 您输入的手机号码有误 ');
        }
        callback();  
    };
    loginSubmit = (e)=> {
        e && e.preventDefault();
        const _this = this;   
        this.props.form.validateFieldsAndScroll({
            firstFields: ['username', 'password']
        }, (err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                _this.login({
                    mobileNumber: formValue.username,
                    password: formValue.password
                });
            }
        });
    };
    login = (params) => {
        getLogin(params).then(res => {
            if (res) {
                if (!res.errorMessage) {
                    const { dispatch } = this.props;
                    dispatch(saveUserInfo(res))
                    cookie.setCookie('session', res.session)
                    message.success('成功登录！');       
                    window.location.href = '/index';                   
                } else {
                    message.error(`${res.errorMessage}`)
                }
            }        
        })
    }
    handleEnterKey = (e) => {
        if (e.nativeEvent.keyCode === 13) {
            this.loginSubmit()
        }
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrapper">           
                <Form.Item style={{marginBottom: 30}}>
                    {getFieldDecorator('username', {
                        rules: [                        
                            {
                                required: true,
                                message: ' 请输入您的手机号码 '
                            },
                            {
                                len: 11,
                                message: ' 请输入11位手机号码 '
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: '您输入的手机号码有误'
                            }
                        ]
                    })(
                        <div className="input-wrapper">
                            <Input placeholder="手机号码"/>
                        </div>                      
                    )}
                </Form.Item>
                <Form.Item style={{marginBottom: 30}}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: ' 请输入您的密码 '
                            }
                        ]
                    })(
                        <div className="input-wrapper">
                            <Input type="password" placeholder="密码" onKeyPress={this.handleEnterKey}/>
                        </div>                     
                    )}
                </Form.Item>
                <div className="submit-upper">
                    <Link to="/login/mobile" className="link">短信验证码登录</Link>
                    <Link to="/login/forget" className="link">忘记密码</Link>
                </div>
                <div className="submit-btn" onClick={this.loginSubmit}><span>登录</span></div>
                
            </div>
        )
    }
}
const CustomForm =  Form.create()(LoginForm);
export default connect()(CustomForm);