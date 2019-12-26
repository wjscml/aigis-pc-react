import React from 'react';
import { getSearch } from '../../api';
import './index.styl'

export default class Suggest extends React.Component {
    state = {
        searchData: [],
        query: ''
    }
    _getSearchData = (query) => {
        getSearch({
            q: query
        }).then(res => {
            if (res ) {
                // console.log(res, query)
                this.setState({
                    searchData: res,
                    query
                })
            }
        })
    }
    toDetail = (item) => {
        window.open(`/common/market/${item.symbol}:${item.description}`, '_blank')
    }
    render () {    
        var hasData = null;
        if (!this.state.searchData.length) {
            hasData = false
        } else {
            hasData = true
        }
        return (
            <div className="suggest">     
                {
                    hasData ?
                    this.state.searchData.map((item, index) => 
                        <div className="suggest-column" key={index} onClick={()=>this.toDetail(item)}>
                            <span className="symbol">{item.symbol}</span>
                            <span className="name">{item.cn_name}</span>
                            <span className="type">{item.type}</span>
                        </div>
                        
                    ) :
                    <div >
                        <div className="noResult" style={this.state.query===''?{display:'none'}:{display:'block'}}>没有符合您搜索条件的商品品种代码.</div>
                    </div>
                }            
            </div>
        )
    }
}