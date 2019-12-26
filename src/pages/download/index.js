import React from 'react';

export default class Download extends React.Component {
    state = {
 
    }
    componentDidMount () {
        document.title = 'APP下载 - Aigis - 埃癸斯风险控制系统';
        this.goDownload();
    }
    goDownload = () => {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        // 这里是安卓浏览器
        if (isAndroid) {       
            window.location.href = 'https://aigis.leadfintech.com/release/aigis-release.apk'; // 跳安卓端下载地址
        }
        // 这里是iOS浏览器
        if (isIOS) {
            window.location.href = 'http://itunes.apple.com/cn/app/id1475231419?mt=8'; // 跳AppStore下载地址
        }

        // 是微信内部webView
        if (this.isWeixn()) {
            alert("请点击右上角按钮, 点击使用浏览器打开");
        }

        // 是PC端
        if (this.isPC()) {
            window.location.href = './index';
        }
    }
    // 是微信浏览器
    isWeixn = () => {
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    isPC = () => {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    render() {
        return (
            <div>       
            </div>
        );
    }
}