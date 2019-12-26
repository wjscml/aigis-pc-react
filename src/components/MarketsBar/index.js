import React from 'react';
import WebSocketClass from '../../api/socket.js';
import { toDecimal } from '../../common/js/data.js'
import './index.styl'

var socket = null
export default class MarketsBar extends React.Component {
    state = {
        isFirst: true,
        nameData: [
            { table_name: 'COMMODITY_CL00Y_NYM', name: '原油', code: 'CL00Y.NYM' },
            { table_name: 'COMMODITY_GC00Y_CMX', name: '黄金', code: 'GC00Y.CMX' },
            { table_name: 'COMMODITY_LCPS_LME', name: '伦铜', code: 'LCPS.LME' },
            { table_name: 'CURRENCY_USDCNH_FX', name: '人民币汇率', code: 'USDCNH.FX' },
            { table_name: 'INDEX_000001_SH', name: '上证指数', code: '000001.SH' },
            { table_name: 'INDEX_IXIC_GI', name: '纳斯达克100', code: 'IXIC.GI' },
            { table_name: 'INDEX_SPX_GI', name: '标普500', code: 'SPX.GI' }
        ],
        scrollData: [],
        screenWidth: document.body.clientWidth
    }
    componentDidMount () {
        this._getScrollData()
        window.addEventListener('resize', this.myResize)
    }
    componentWillUnmount () {
        socket.closeMyself()
        window.removeEventListener('resize', this.myResize)
    }
    myResize = () => {
        this.setState({
            screenWidth: document.body.clientWidth
        })
    }
    _getScrollData = () => {
        var agentData = []
        for (let i in this.state.nameData) {
          agentData.push(this.state.nameData[i].table_name)
        }
        socket = new WebSocketClass('scrollmarkets', agentData, this.getConfigResult)
        socket.connect()
    }
    getConfigResult = (res) => {
        if (res.length) {
          // scrollData = res.data.map((o, i) => {
          //   return Object.assign(o, this.nameData[i])
          // })
            let marketsData = this.state.nameData
            if (this.state.isFirst) {             
                for (let o in res) {
                    marketsData[o].value = res[o]
                }
                this.setState({
                    isFirst: false,
                    scrollData: this.getScrollData(marketsData)
                }) 
            } else {
                //console.log(res)
                for (let o in res) {
                    if (res[o] !== '--') {
                        marketsData[o].value = res[o]
                    } 
                }
                this.setState({
                    scrollData: this.getScrollData(marketsData)
                }) 
            }
        }
    }
    getScrollData = (d) => {
        let data = []
        if (this.state.screenWidth < 1280) {
            data = d.slice(0, 5)
            return data
        } else if (this.state.screenWidth < 1600) {
            data = d.slice(0, 6)
            return data
        }
        return d.slice(0, 7)
    }
    toPercent = (str) => {
        return (Math.round(str * 10000) / 100).toFixed(2) + '%'
    }
    toDetail = (item) => {
        window.open(`/common/market/${item.code}:${item.name}`, '_blank')   
    }
    render () {
        return (
            this.state.scrollData.length ?
            <div className="scroll" v-show="scrollData.length">     
                {
                    this.state.scrollData.map((item, index) => {
                        return <div className="item" key={index} onClick={()=>this.toDetail(item)}>
                            <div className="item-top">
                                <span>{item.name} ·</span><span>{toDecimal(item.value[0])}</span>
                            </div>
                            <div className={item.value[6] < 0 ? 'green item-bottom' : 'red item-bottom'}>
                                <i className={item.value[6] < 0 ? 'icon-down' : 'icon-up'}></i>
                                <div>
                                    <span className="change">{this.toPercent(item.value[7])}</span><span>{toDecimal(item.value[6])}</span>
                                </div>
                            </div>
                        </div>
                    })
                } 
            </div> : null
        )
    }
}