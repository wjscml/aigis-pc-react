import React from 'react';
import { Button } from 'antd';
import './index.styl';

export default class ReportList extends React.Component {
    state = {}
    enterLoading = () => {
        this.props.loadmore()
    }
    toDetail = (url) => {
        window.open(`/common/report/${url}`, '_blank')
    }
    render() {
        var listData = [];
        var timeKey = [];
        if (this.props.data) { 
            for (let i in this.props.data) {
                listData.push(this.props.data[i])
            };
            let time = Object.keys(this.props.data);
            timeKey = time.map(item => (
                item.replace(/-/g, '年') + '月'
            ))
        }
        return (
            <div className="report-column">
                {
                    listData.map((items, index) => 
                        <div className="report-column-content" key={index} >
                            <div className="report-column-time">
                                <div className="title">
                                    {timeKey[index]}
                                </div>
                            </div>
                            <div className="report-column-main">
                                {
                                    items.map((item, index) => 
                                    <div className="column" key={index} >
                                        <h1 onClick={()=>this.toDetail(item.id)} className="title">{item.title}</h1>
                                        <div className="content">
                                            <div className="image" title={item.title} style={this.props.hasImg?{backgroundImage: 'url('+item.thumb+')'}:{display:'none'}}></div>
                                            <div className="summary"><p className="text">{item.summary}</p></div>
                                            <span onClick={()=>this.toDetail(item.id)} className="enter">查看全文 ></span>
                                            <span className="time">{item.publish_time}</span>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    )          
                }
                <div className="loadmore-wrap" style={this.props.data ? {}: {display: 'none'}}>
                    <Button type="primary" loading={this.props.loading} onClick={this.enterLoading}>{this.props.tips}</Button>
                </div>
            </div>
        );
    }
}