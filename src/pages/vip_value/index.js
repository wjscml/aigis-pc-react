import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import RowNav from '../../components/RowNav';
import BaseChart  from '../../components/BaseChart';
import { getValueList } from '../../api';
import { formatDate, formatNumber } from '../../common/js/data.js'
import './index.styl';

const { confirm } = Modal;
class VipValue extends React.Component {
    state = {
        type: 0,
        subType: 0,
        navlist: [],
        subNav: [
            { time: '近1月' },
            { time: '近3月' },
            { time: '近6月' },
            { time: '近1年' },
            { time: '近3年' }
        ],
        chartData: [],
        valueInfo: []
    }
    componentDidMount () {
        document.title="委托资管 - Aigis - 埃癸斯风险控制系统";
        this._getValueData(this.state.type)
    }
    toPercent = (str) => {
        return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    }
    showConfirm = () => {
        confirm({
            title: '您还没有委托资产~',
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
    _getValueData = (type) => {
        getValueList({
          session: this.props.userInfo.session
        }).then(res => {
          if (res.length !== 0) {
            // nav
            let valueNav = []
            valueNav = res.map(item => ({
                name: item.indicator_name
            }))
            this.setState({
                navlist: valueNav
            })
            // charts
            let valueList = []
            valueList = res[type].nets.map(item => ({
                time: formatDate(item.notice_time * 1000),
                value: Number(item.now_nav),
                city: '净值'
            }))
            this.setState({
                chartData: valueList
            })
            // info
            let valueInfo = []
            valueInfo = [
              {
                name: '日涨跌幅',
                value: this.toPercent(res[type].nets[0].pct_change)
              },
              {
                name: '基金净值',
                value: Number(res[type].nets[0].now_nav)
              },
              {
                name: '总资产',
                value: formatNumber(res[type].trust_amount + res[type].interest_amount)
              },
              {
                name: '委托资金',
                value: formatNumber(res[type].trust_amount)
              },
              {
                name: '累计收益率',
                value: this.toPercent(res[type].average_interest_rate)
              },
              {
                name: '年化收益',
                value: '10.18%'
              }
            ]
            this.setState({
                valueInfo
            })
          } else {
              this.showConfirm()
          }
        })
    }
    change = (i) => {
        this.setState({
            type: i
        })
        this._getValueData(i)
    }
    changeTime = (i) => {
        this.setState({
            subType: i
        })
    }
    render () {
        return (
            this.state.chartData.length !== 0 ?
            <div className="vip-value-wrapper">
                <div className="vip-value-nav">
                    <RowNav navlist={this.state.navlist} type={this.state.type} handleSelect={this.change}/>
                </div>
                <div className="vip-value-content">
                    <div className="value-subNav">
                        {
                            this.state.subNav.map((item, index) => {
                                return <span className={index==this.state.subType?'subNav-btn subNav-btn-s':'subNav-btn'} key={index} onClick={()=>this.changeTime(index)}>{item.time}</span>
                            })
                        }     
                    </div>
                    <div className="value-chart" >
                        <BaseChart 
                            data={this.state.chartData} 
                            yCount={11} 
                            xCount={5}
                        />
                    </div>
                    <div className="value-info">
                        {
                            this.state.valueInfo.map((item, index) => {
                                return <div className="item" key={index}>
                                    <span className={item.value < 0 ? 'green value' : 'red value'}>{item.value}</span>
                                    <span className="name">{item.name}</span>
                                </div>
                            })
                        }       
                    </div>
                </div>
            </div> : null   
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(VipValue);