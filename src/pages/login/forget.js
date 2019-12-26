import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import { getCaptcha, getMobileCode, getForget } from '../../api';
import { connect } from 'react-redux';
import { saveUserInfo } from '../../redux/action';
import cookie from '../../common/js/cookie'

//import './index.styl'

class Forget extends React.Component {
    state = {
        sendText: '发送验证码',
        count: 60,
        liked: true
    }
    componentDidMount () {
        document.title="忘记密码 - Aigis - 埃癸斯风险控制系统";
        this.refreshCode();
    }
    refreshCode = () => {
        getCaptcha({
            isShowLoading: true
        }).then((res) => {
            if (res) {
                this.setState({
                    captchaImage: res.captchaImage,
                    captchaCodeKey: res.captchaCodeKey
                })
            }
        })
    }
    handleSendCode = (e) => {     
        this.props.form.validateFields(['username', 'imgcode'], {
            firstFields: ['username', 'imgcode']
        }, (err, values) => {
            if (!err) {        
                var formValue = this.props.form.getFieldsValue();
                let params = {
                    captchaCodeKey: this.state.captchaCodeKey,
                    captchaCode: formValue.imgcode,
                    mobileNumber: formValue.username,
                    usage: 3
                }
                getMobileCode(params).then(res => {
                    if (res.errorMessage) {       
                        message.error(`${res.errorMessage}`);
                        this.refreshCode();
                    } else {
                        message.success(`${res}`);
                        let timer = setInterval(() => {
                            this.setState({
                                liked: false,
                                count: this.state.count - 1
                            }, () => {
                                if (this.state.count == 0) {
                                    clearInterval(timer);
                                    this.setState({
                                        liked: true,
                                        count: 60,
                                        sendText: '重新发送'
                                    })
                                    this.refreshCode();
                                }
                            })
                        }, 1000)                           
                    }
                })             
            }
        });    
    }

    loginSubmit = (e)=> {
        e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll({
            firstFields: ['username', 'imgcode', 'code', 'password']
        }, (err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                _this.login({
                    captchaCodeKey: this.state.captchaCodeKey,
                    captchaCode: formValue.imgcode,
                    mobileNumber: formValue.username,
                    mobileCode: formValue.code,
                    password: formValue.password
                });
            }
        });
    };
    login = (params) => {
        getForget(params).then(res => {
            if (res) {
                if (!res.errorMessage) {
                    const { dispatch } = this.props;
                    dispatch(saveUserInfo(res));
                    cookie.setCookie('session', res.session);
                    message.success('密码修改成功！');
                    setTimeout(() => {
                        window.location.href = '/index';
                    }, 1000)
                } else {
                    message.error(`${res.errorMessage}`)
                }
            }        
        })
    }  
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-wrapper">           
                <Form.Item style={{marginBottom: 30}}>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                pattern: /^[0-9]+$/,
                                message: '您输入的手机号码有误'
                            },
                            {
                                required: true,
                                message: ' 请输入您的手机号码 '
                            },
                            {
                                len: 11,
                                message: ' 请输入11位手机号码 '
                            },
                        ]
                    })(
                        <div className="input-wrapper">
                            <Input placeholder="手机号码"/>  
                        </div>
                                        
                    )}
                </Form.Item>
                <Form.Item style={{marginBottom: 30}}>
                    {getFieldDecorator('imgcode', {
                        rules: [
                            {
                                required: true,
                                message: ' 请输入您的密码 '
                            }
                        ]
                    })(
                        <div className="input-wrapper">
                            <Input placeholder="图片验证码"/>
                            <img className="imgCode" src={this.state.captchaImage} onClick={this.refreshCode} alt="图片验证码" />
                        </div>
                    )}
                </Form.Item>
                <Form.Item style={{marginBottom: 30}}>
                    {getFieldDecorator('code', {
                        rules: [
                            {
                                pattern: /^[0-9]+$/,
                                message: ' 您输入的验证码有误 '
                            },
                            {
                                required: true,
                                message: ' 请输入短信验证码 '
                            },
                            {
                                len: 4,
                                message: ' 您输入的验证码有误 '
                            },
                        ]
                    })(
                        <div className="input-wrapper">
                            <Input placeholder="短信验证码"/>
                            <div className="text" onClick={this.handleSendCode}>
                                {
                                    this.state.liked ? 
                                    <div className="send-code">{this.state.sendText}</div> : 
                                    <div>{this.state.count + 's'}</div>
                                }
                            </div>
                        </div>
                        
                    )}
                </Form.Item>
                <Form.Item style={{marginBottom: 30}}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: ' 请输入新密码 '
                            },
                            {
                                min: 6,
                                message: ' 密码不少于6位 '
                            },
                            {
                                max: 18,
                                message: ' 密码不超过18位 '
                            }
                        ]
                    })(
                        <div className="input-wrapper">
                            <Input type="password" placeholder="新密码" onKeyPress={this.handleEnterKey}/>
                        </div>
                        
                    )}
                </Form.Item>
                <div className="submit-upper">
                    <Link to="/login/psw" className="link">密码登录</Link>
                    <Link to="/login/mobile" className="link">短信验证码登录</Link>
                </div>
                <div className="submit-btn" onClick={this.loginSubmit}><span>重置密码</span></div>
                
            </div>
        )
    }
}
const CustomForm = Form.create()(Forget);
export default connect()(CustomForm);