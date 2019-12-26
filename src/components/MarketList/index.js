import React from 'react';
import { Popconfirm } from 'antd';
import NoResult from '../../components/NoResult';

import './index.styl'

export default class MarketList extends React.Component {
    constructor(props) {
        super(props);
        this.content= React.createRef()
    }
    state = {

    }  
    toDetail = (item) => {
        if (item.name !== '资产') {
            window.open(`/common/market/${item.code}:${item.name}`, '_blank')
        }
    }
    render () {
        var listData = []
        if (this.props.data && this.props.data.length !== 0) {
            let tipsData = [{
                name: '资产',
                value: { price: '最新价', high: '最高价', low: '最低价', open: '开盘价', change: '涨跌额', changePer: '涨跌幅' }
            }]
            listData = tipsData.concat(this.props.data)
        }
        return (
            <div className="market-wrapper"> 
                {
                    this.props.subNavData.length !== 0 ?
                    <div className="subNav" >
                        {
                            this.props.subNavData.map((item, index) =>
                                <div className={index==this.props.type ? 'subNavItem subNavItem-s' : 'subNavItem'} key={index} onClick={()=>this.props.handleSelect(index)} >
                                    <span>{item.exchange_code}</span>
                                </div>
                            )
                        }
                    </div> : null
                }
                <div className="content" ref={this.content}>
                    {
                        listData.length !== 0 ?
                        listData.map((item, index) =>
                            <div className="column" key={index}>
                                <span className="item name" onClick={()=>this.toDetail(item)}>
                                    <a className="name-z">{item.name}</a><br/>{item.code}
                                </span>
                                <span className="item price">{item.value.price}</span>
                                <span className={item.value.change > 0 ? 'red item changePer' : (item.value.change == 0 ? 'item changePer' : 'green item changePer')}>{item.value.changePer}</span>
                                <span className={item.value.change > 0 ? 'red item change' : (item.value.change == 0 ? 'item change' : 'green item change')}>{item.value.change}</span>
                                <span className="item high">{item.value.high}</span>
                                <span className="item low">{item.value.low }</span>
                                <span className="item open">{item.value.open}</span>
                                <div className="item add" onClick={()=>this.props.addFavor(item)} style={item.favor !== 1 ? {} : {display:'none'}} v-show="item.favor !== 1"><span>加自选</span></div>
                                <Popconfirm 
                                    placement="topRight"
                                    title={`是否不再关注'${item.name}'`}
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={()=>this.props.deleteFavor(item)}
                                >
                                    <div className="item delete" style={item.favor == 1 ? {} : {display:'none'}}>删自选</div>
                                </Popconfirm>
                            </div>
                        ) : 
                        <NoResult
                            tips="暂无数据~"
                        />
                    }        
                </div>     
            </div>
        )
    }
}