import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import RowNav from '../../components/RowNav';
import BaseChart from '../../components/BaseChart';
import { getFollowList, getPeriodData, getLastTimeData } from '../../api';
import { formatDate, toDecimal, getCurrentTime } from '../../common/js/data';
import './index.styl';

const { confirm } = Modal;
class VipFollow extends React.Component {
    state = {
        type: 0,
        navlist: [],
        chartData: [],
        title: '',
        recordsData: [],
        guideData: [],
        lastData: []
    }
    componentDidMount () {
      document.title="跟单指引 - Aigis - 埃癸斯风险控制系统";
      this._getFollowList(this.state.type);
    }
    chinesize (str) {
        if (str === '01') {
          return '买开'
        }
        if (str === '10') {
          return '卖平'
        }
        if (str === '11') {
          return '卖开'
        }
        if (str === '00') {
          return '买平'
        }
    }
    showConfirm = () => {
        confirm({
            title: '您还没有开通此服务~',
            okText: '首页',
            cancelText: '返回',
            onOk() {
                window.location.href = '/index';
            },
            onCancel() {
                window.history.back(-1);
            }
        })
    }
    change = (i) => {
        this.setState({type: i})
        this._getFollowList (i)
    }
    _getFollowList (type) {
        getFollowList({
          session: this.props.userInfo.session
        }).then(res => {
          if (res && res.length !== 0) {
            let followNav = []
            followNav = res.map(item => ({
                name: item.indicator_name
            }))
            this.setState({
                navlist: followNav
            })
            let title = res[type].indicator_name
            let recordsData = res[type].purchaseLog

            let guideData = []
            guideData = recordsData.map(item => ({
                point: [formatDate(item.deal_time * 1000), Number(item.price)],
                pointValue: this.chinesize(item.is_buy + item.position)
            }))

            this.setState({
                title,
                recordsData,
                guideData
            })
            let id = res[type].indicator_id
            this.getChartData(id, guideData)
            this._getLastTimeData(id)
          } else {
              this.showConfirm()
          }
        })
    }
    getChartData = (id, data) => {
        getPeriodData({
            indicatorId: id,
            fromDate: data[0].point[0],
            toDate: formatDate(new Date())
        }).then(res => {
            let chartData = res.map(element => ({
                time: element.ftime,
                value: Number(element.CLOSE),
                city: 'value'
            }))
            this.setState({
                chartData
            })
        })
    }
    _getLastTimeData = (id) => {
        getLastTimeData({
            indicatorId: id
          }).then(res => {
              this.setState({
                  lastData: res
              })
        })
    }
    render() {
        return (
            this.state.chartData.length !== 0 ?
                <div className="vip-follow-wrapper">
                    <div className="vip-follow-nav">
                        <RowNav navlist={this.state.navlist} type={this.state.type} handleSelect={this.change}/>
                    </div>
                    <div className="vip-follow-chart" >
                        <div className="chartBox">
                            <BaseChart
                                data={this.state.chartData}
                                xCount={5}
                                yCount={7}
                                keyColor={['#fff']}
                                guideData={this.state.guideData}
                            />
                        </div>
                    </div>
                    <div className="vip-follow-content" >
                        <FollowRecord data={this.state.recordsData} />
                        <LastTimeData title={this.state.title} data ={this.state.lastData} />
                    </div> 
                </div> :
                null
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(VipFollow);

class FollowRecord extends React.Component {
    render() {
        return (
            <div className="record">
                <h1 className="record-title">
                    <i className="icon-record"></i>
                    <span>成交记录</span>
                </h1>
                <div className="record-content">
                    <div className="column">
                        <span className="item name">成交合约</span>
                        <span className="item sale">买卖</span>
                        <span className="item kaiping">开平</span>
                        <span className="item price">成交价格</span>
                        <span className="item amount">成交手数</span>
                        <span className="item time">成交时间</span>
                    </div>
                    {
                        this.props.data.map((item, index) => {
                            return <div className="column" key={index}>
                                <span className="item name">{item.indicator_name}</span>
                                <div className="item sale">
                                    <span className="left" style={item.is_buy==0?{}:{display: 'none'}}>买</span>
                                    <span className="right" style={item.is_buy==1?{}:{display: 'none'}}>卖</span>
                                </div>
                                <div className="item kaiping">
                                    <span style={item.position==0?{}:{display: 'none'}}>平仓</span>
                                    <span style={item.position==1?{}:{display: 'none'}}>开仓</span>
                                </div>
                                <span className="item price">{toDecimal(item.price)}</span>
                                <span className="item amount">{item.deal_volume}</span>
                                <span className="item time">{getCurrentTime(item.deal_time * 1000)}</span>
                            </div>
                        })
                    }  
                </div>
            </div>
        )
    }
}

class LastTimeData extends React.Component {
    toPercent = (str) => {
        return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    }
    isZero = (x, y) => {
        if (x == 0) {
          return 0
        }
        return x - y
    }
    colorClass = (val) => {
        if (val === 'y') {
          return 'yellow value'
        } else {
          if (val > 0) {
            return 'red value'
          }
          if (val < 0) {
            return 'green value'
          }
          if (val === 0) {
            return 'value'
          }
        }
    }
    render() {
        let res = this.props.data
        let data = [
            [
              {
                name: '最新',
                value: toDecimal(res.NOW),
                color: res.CHANGE
              },
              {
                name: '涨跌',
                value: toDecimal(res.CHANGE),
                color: res.CHANGE
              },
              {
                name: '幅度',
                value: this.toPercent(res.PCTCHANGE),
                color: res.PCTCHANGE
              },
              {
                name: '总手',
                value: res.VOLUME,
                color: 'y'
              },
              {
                name: '现手',
                value: res.ROUNDLOT,
                color: 'y'
              },
              {
                name: '外盘',
                value: res.OUTVOLUME,
                color: 'y'
              },
              {
                name: '内盘',
                value: res.INVOLUME,
                color: 'y'
              },
              {
                name: '基差',
                value: toDecimal(res.SPREAD),
                color: 'y'
              }
            ],
            [
              {
                name: '昨结',
                value: toDecimal(res.PRECLEAR),
                color: 0
              },
              {
                name: '昨收',
                value: toDecimal(res.PRECLOSE),
                color: this.isZero(res.PRECLOSE, res.PRECLEAR)
              },
              {
                name: '今开',
                value: toDecimal(res.OPEN),
                color: this.isZero(res.OPEN, res.PRECLEAR)
              },
              {
                name: '最高',
                value: toDecimal(res.HIGH),
                color: this.isZero(res.HIGH, res.PRECLEAR)
              },
              {
                name: '最低',
                value: toDecimal(res.LOW),
                color: this.isZero(res.LOW, res.PRECLEAR)
              },
              {
                name: '今结',
                value: toDecimal(res.CLEAR),
                color: this.isZero(res.CLEAR, res.PRECLEAR)
              },
              {
                name: '涨停',
                value: toDecimal(res.HIGHLIMIT),
                color: this.isZero(res.HIGHLIMIT, res.PRECLEAR)
              },
              {
                name: '跌停',
                value: toDecimal(res.LOWLIMIT),
                color: this.isZero(res.LOWLIMIT, res.PRECLEAR)
              }
            ]
        ]
        return (
            <div className="last-time-data">
                <h1 className="title">{this.props.title}</h1>
                <div className="content">
                    {
                        data.map((column, index)=>{
                            return <div className="column" key={index}>
                                {
                                    column.map((item, index) => {
                                        return <div className="item" key={index}>
                                            <span className="name">{item.name}</span>
                                            <span className={this.colorClass(item.color)}>{item.value}</span>
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}