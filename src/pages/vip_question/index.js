import React from 'react';
import { connect } from 'react-redux';
import Editor from '../../components/Editor';
import { Modal } from 'antd';
import NoResult from '../../components/NoResult';
import { submitQuestion, getAllQuestion, deleteQuestion } from '../../api';
import { addClass, removeClass } from '../../common/js/dom.js';
import { getCurrentTime } from '../../common/js/data';
import './index.styl';

const { confirm } = Modal;
class VipQuestion extends React.Component {
    state = {
        qusetionData: [],
        noresult: false
    }
    componentDidMount () {
        document.title="问题咨询 - Aigis - 埃癸斯风险控制系统";
        this._getAllQuestion()
    }
    _getAllQuestion = () => {
        getAllQuestion({
            session: this.props.userInfo.session
        }).then(res => {
            if (res.length) {
                let qusetionData = res.reverse()        
                qusetionData.forEach(item => {
                    item.ask_content = this.addImgBox(item.ask_content)
                    if (item.is_replied) {
                        item.reply.answer_content = this.addImgBox(item.reply.answer_content)
                    }
                })
                this.setState({
                    qusetionData,
                    noresult: false
                })
            } else {
                this.setState({
                    noresult: true
                })
            }
        })
    }
    addImgBox (str) {
        var s = ''
        if (str.length === 0) return ''
        s = str.replace(/<img(.*?)src=\"(.*?)\"(.*?)>/g,'<div class="img-wrapper"><div class="img-container"><p class="pic"><i class="icon-pic"></i><span>图片留言<span></p><p class="pull_up"><i class="icon-pull_up"></i><span>收起<span></p>$&</div><div class="cover"></div></div>')
        s = s.replace(/<br>/g, '')
        s = s.replace(/###~SITEURL~###/g, 'https://aigis.leadfintech.com:8888/')
        return s
    }
    submit = (data) => {
        let formData = new FormData()
        formData.append('session', this.props.userInfo.session)
        formData.append('question_content', data)
        submitQuestion(formData).then(res => {  
            if (res) {
                this._getAllQuestion()
            }
            // res.ask_content = this.addImgBox(res.ask_content)
            // let oldData = this.state.qusetionData
            // oldData.unshift(res)
            // this.setState({
            //     qusetionData: oldData
            // })
        })
    }
    delete = (id, index) => {
        deleteQuestion({
            session: this.props.userInfo.session,
            askId: id
        }).then(res => {
            if (res) {
                let oldData = this.state.qusetionData
                oldData.splice(index, 1)
                if (oldData.length !== 0) {
                    this.setState({
                        qusetionData: oldData
                    })
                } else {
                    this.setState({
                        qusetionData: oldData,
                        noresult: true
                    })
                }
            }   
        })
    }
    render() {
        return (
            <div className="vip-qusetion">
                <div className="editor-wrapper">
                    <p className="editor-title">
                        <i className="icon-write"></i>
                        <span>提出您的问题</span>
                    </p>
                    <Editor session={this.props.userInfo.session} submit={this.submit} />
                </div>
                <div className="comment-wrappper">
                    <p className="comment-title">
                        <i className="icon-record"></i>
                        <span>留言记录</span>
                    </p>
                    {
                        this.state.qusetionData.length 
                        ? <QuestionRecord data={this.state.qusetionData} delete={this.delete}/> 
                        : null                   
                    }
                    {
                        this.state.noresult
                        ? <NoResult tips="暂无记录~" />
                        : null
                    }         
                </div>   
            </div>
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(VipQuestion);

class QuestionRecord extends React.Component {
    state = {}
    componentDidMount () {
    }
    showConfirm = (id, index) => {
        var _this = this
        confirm({
            title: '回复内容也将一起删除，确定要删除这条问题吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                _this.props.delete(id, index)
            }
        })
    }
    showImg = (e) => {
        let target = e.target
        if (e.target.classList.length <= 1) {
            addClass(target, 'showImg')
        } else {
            removeClass(target, 'showImg')
        }
    }
    delete = (id, index) => {
        this.showConfirm(id, index)
    }
    render() {
        return (
            <div className="comment-content">
                {
                    this.props.data.map((column, index) => {
                        return <div className="column" key={index}>
                            <div className="timeline">
                                <span>{getCurrentTime(column.created_at * 1000)}</span>
                                <i className="icon-point"></i>
                            </div>
                            <div className="content">
                                <div className="qusetion-text" dangerouslySetInnerHTML={{__html: column.ask_content}} onClick={e => this.showImg(e)}></div>
                                {
                                    column.is_replied ?
                                    <div className="sub-content">
                                        <p className="text" dangerouslySetInnerHTML={{__html: column.reply.answer_content}} onClick={e => this.showImg(e)}></p>
                                        <p className="time">{column.reply.answer_name} · {getCurrentTime(column.reply.created_at * 1000)}</p>
                                    </div> : null
                                }
                            </div>
                            <div className="delete" onClick={()=>this.delete(column.id, index)}>
                                <i className="icon-delete"></i>
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}