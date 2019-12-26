import React from 'react';
import { Modal, message } from 'antd';
import E from 'wangeditor';
import './index.styl';

const { confirm } = Modal;
export default class Editor extends React.Component {
    state = {
        editorContent: ''
    }
    componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        editor.customConfig.zIndex = 100
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            })
        }
        editor.customConfig.uploadImgServer = '/apis/site/index?method=user.uploadImage&format=json'
        editor.customConfig.uploadImgParams = {
            session: this.props.session
        }
        editor.customConfig.uploadFileName = 'img'
        editor.customConfig.menus = [
            'bold',
            'italic',
            'underline',
            'justify',
            'image',
            'undo',
            'redo'
        ]
        editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                var url = result.data
                insertImg(url)
            },
            before: function (xhr, editor, files) { // 图片上传之前触发
                console.log(xhr, editor, files)
            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //   prevent: true,
            //   msg: '放弃上传'
            // }
            },
            success: function (xhr, editor, result) { // 图片上传并返回结果，图片插入成功之后触发
                console.log(result)
            },
            fail: function (xhr, editor, result) { // 图片上传并返回结果，但图片插入错误时触发
                console.log(xhr, editor, result)
            },
            error: function (xhr, editor) { // 图片上传出错时触发
                console.log(xhr, editor)
            },
            timeout: function (xhr, editor) { // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            }
        }

        editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024
        editor.customConfig.pasteIgnoreImg = true
        editor.create()
    }
    showConfirm = () => {
        var _this = this
        confirm({
            title: '确定发布内容吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                let content = _this.state.editorContent
                if (content && content!=='' && content !== '<p><br></p>') {
                    _this.props.submit(_this.state.editorContent)
                } else {
                    message.error('内容不能为空')
                }        
            }
        })
    }

    clickHandle () {
        //console.log(this.state.editorContent)
        this.showConfirm()
    }
    render () {
        return (
            <div className="editor" >     
                <div ref="editorElem"></div>
                <button className="editor-submit" onClick={this.clickHandle.bind(this)}>确认提交</button>
            </div>            
        )
    }
}
