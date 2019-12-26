import React from 'react';
import { connect } from 'react-redux';
import RowNav from '../../components/RowNav';
import MarketList from '../../components/MarketList';
import { getIndicators, addFavorIndicator, getFavorIndicatorList } from '../../api';
import WebSocketClass from '../../api/socket.js';
import { toDecimal, toPercent } from '../../common/js/data.js'
import { addClass, removeClass } from '../../common/js/dom.js'

import './index.styl'

var socket = null
class Market extends React.Component {
    constructor(props) {
        super(props);
        this.div = React.createRef();
    }
    state = {
        type: 0,
        subType: 0,
        marketNav: [],
        subNavData: [],
        originData: [],
        favorData: [],
        isFirst: true,
        listData: []
    }
    componentDidMount () {
        document.title="行情数据 - Aigis - 埃癸斯风险控制系统";
        this._getIndicators() 
    }
    componentWillUnmount () {
        socket.closeMyself()
    }
    _getIndicators () {
        getIndicators({
            session: this.props.userInfo.session
        }).then(res => {
            let marketNav = []
            marketNav = res.map(item => ({
                name: item.cateName
            }))
            marketNav.push({name: '自选'})

            this.setState({
                marketNav
            })
            let originData = res.map(items => {
                if (!items.exchange) {
                    return {
                        indicators: items.indicators
                    }
                }
                return {
                    exchange: items.exchange,
                    indicators: items.indicators.map(item => ({
                        indicator_id: item.id,
                        indicator_name: item.indicator_name,
                        indicator_code: item.indicator_code,
                        table_name: item.table_name,
                        favor: item.favor,
                        exchange_id: item.exchange_id
                    }))
                }
            })
            this.setState({originData})
            this._getMarketsData(this.state.type, this.state.subType)
        })
        
    }
    _getMarketsData (type, subType) {
        if (type < 3) {
            let nameData = this.state.originData[type]
            let subNavData = []
            let addTypeAll = [{ exchange_code: "全部" }]
            subNavData = addTypeAll.concat(nameData.exchange)
            this.setState({subNavData})
            
            let exchangeNameData = []
            for (let a in nameData.exchange) {
                exchangeNameData[a] = []
                for (let b in nameData.indicators) {
                    if (nameData.exchange[a].id === nameData.indicators[b].exchange_id) {
                        exchangeNameData[a].push(nameData.indicators[b])
                    }
                }
            }
            exchangeNameData.unshift(nameData.indicators)
            //this.nameData = exchangeNameData[this.subType]
            this.sendSocketData(exchangeNameData[subType])        
            this.setState({
                nameData: exchangeNameData[subType]
            })
        } else {
            getFavorIndicatorList({
                session: this.props.userInfo.session,
                isShowLoading: false
            }).then(res => {
                if (res && res.length !== 0) {
                    let favorData = res
                    this.sendSocketData(favorData)
                    this.setState({
                        nameData: favorData,
                        subNavData: []
                    }) 
                } else {
                    let favorData = []
                    this.sendSocketData(favorData)
                    this.setState({
                        nameData: favorData,
                        subNavData: []
                    }) 
                }
            })
        }
    }
    sendSocketData = (data) => {
        if (data.length !== 0) {
            var agentData = []
            agentData = data.map(item => (
                item.table_name
            ))
            
            socket = new WebSocketClass('markets', agentData, this.getConfigResult)
            socket.connect()
        } else {
            this.setState({
                listData: []
            })
        }
    }
    getConfigResult = (res) => {
        //console.log(res)
        if (res.length) {
            let valueData = res.map(item => {
                if (item !== '--') return ({
                    price: toDecimal(item[0]),
                    high: toDecimal(item[1]),
                    low: toDecimal(item[2]),
                    open: toDecimal(item[3]),
                    change: toDecimal(item[6]),
                    changePer: toPercent(item[7])
                })
                return '--'
            })
            
            if (this.state.isFirst) {
                this.setState({
                    isFirst: false
                })
                let listData = []
                for (let n in this.state.nameData) {
                    listData.push({
                        name: this.state.nameData[n].indicator_name,
                        code: this.state.nameData[n].indicator_code,
                        id: this.state.nameData[n].indicator_id,
                        favor: this.state.nameData[n].favor,
                        value: valueData[n]
                    })
                }
                this.setState({
                    listData
                })
            } else { 
                let listData = this.state.listData
                for (let n in this.state.nameData) {
                    if (valueData[n] !== '--') {
                        let oldValue = parseFloat(this.state.listData[n].value.change)
                        let newValue = parseFloat(valueData[n].change)
                        let m = parseFloat(n) + 1
                        let changeDom = this.div.current.content.current.children[m]

                        if (oldValue < newValue) {   
                            listData[n].value = valueData[n]
                            this.setState({ listData })
                            addClass(changeDom, 'shadowUp')
                            setTimeout(() => {
                                removeClass(changeDom, 'shadowUp')
                            }, 500)
                        } else {
                            listData[n].value = valueData[n]
                            this.setState({ listData })
                            addClass(changeDom, 'shadowDown')
                            setTimeout(() => {
                                removeClass(changeDom, 'shadowDown')
                            }, 500)
                        }
                    }
                }
            }
        }
    }
    change = (i) => {
        socket.closeMyself()
        this.setState({
            type: i,
            subType: 0,
            isFirst: true
        })
        this._getMarketsData(i, 0)
    }
    subNavChange = (i) => {
        socket.closeMyself()
        this.setState({
            subType: i,
            isFirst: true
        })
        this._getMarketsData(this.state.type, i)
    }
    toggleFavor = (item, n) => {
        addFavorIndicator({
            indicatorId: item.id,
            session: this.props.userInfo.session,
            action: n
        }).then(res => {
            //item.favor = res.favor
            socket.closeMyself()
            this.setState({
                isFirst: true
            })
            this._getIndicators()
        })
    }
    addFavor = (item) => {
        this.toggleFavor(item, 1)
    }
    deleteFavor = (item) => {
        this.toggleFavor(item, 2)
    }
    render() {
        return (
            <div className="market">
                <div className="market-nav" >
                    <RowNav type={this.state.type} navlist={this.state.marketNav} handleSelect={this.change}/>
                </div>        
                <MarketList 
                    data={this.state.listData}
                    subNavData={this.state.subNavData}
                    type={this.state.subType}
                    handleSelect={this.subNavChange}
                    ref={this.div}
                    addFavor={this.addFavor}
                    deleteFavor={this.deleteFavor}
                />
            </div>
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(Market);