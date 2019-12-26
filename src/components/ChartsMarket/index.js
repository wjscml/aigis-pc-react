import React from 'react';
import BaseChart from '../BaseChart';
import { getFavorIndicatorList, getDaysData } from '../../api';
import { connect } from 'react-redux'
import { saveStickNumber } from '../../redux/action'
import './index.styl'

const default1 = { id: 1, indicator_id: 3, indicator_name: 'WTI原油当月连续', indicator_code: 'CL00Y.NYM', status: 1 }
const default2 = { id: 9, indicator_id: 5, indicator_name: 'COMEX黄金', indicator_code: 'GC00Y.CMX', status: 1 }
const default3 = { id: 10, indicator_id: 6, indicator_name: 'COMEX铜', indicator_code: 'HG00Y.CMX', status: 1 }
class ChartsMarket extends React.Component {
    state = {
        nameList: [],
        chartsData: [],
        limit: -1,
        num: this.props.stickNumber
    }
    componentWillMount() {
        this.getData()
    }
    _getDaysData = (nameList, num) => {
        let chartsData = []
        nameList.map(name => {
            if (name.indicator_id !== num) {         
                getDaysData({
                    indicatorId: name.indicator_id
                }).then(res=> {
                    let data = res.map(item => ({
                        time: item.ftime,
                        value: Number(item.CLOSE),
                        city: name.indicator_name,
                        id: name.indicator_id,
                        isTop: false
                    }))
                    chartsData.push(data)              
                    this.setState({
                        chartsData
                    })
                })
            } else {
                getDaysData({
                    indicatorId: name.indicator_id
                }).then(res=> {
                    let data = res.map(item => ({
                        time: item.ftime,
                        value: Number(item.CLOSE),
                        city: name.indicator_name,
                        isTop: true
                    }))
                    chartsData.unshift(data)              
                    this.setState({
                        chartsData
                    })
                })
            }
        })      
    }
    getData = () => {
        getFavorIndicatorList({
          session: this.props.userInfo.session
        }).then(res => {         
            if (res) {
                if (res.length > 1) {
                    this._getDaysData(res, this.props.stickNumber)
                    this.setState({
                        nameList: res
                    })
                } else {
                    for (var i in res) {
                        if (res[i] === (default1 || default2 || default3)) {
                          res.splice(i, 1)
                        }
                    }
                    res.push(default1, default2, default3)
                    this._getDaysData(res, this.props.stickNumber)
                    this.setState({
                        nameList: res
                    })
                }
            }
        })
    }
    unstick (index) {
        this.toggleLayer(index)
        const { dispatch } = this.props;
        dispatch(saveStickNumber(0));
        this._getDaysData(this.state.nameList, 0)
    }
    stick (id, index) {
        this.toggleLayer(index)
        const { dispatch } = this.props;
        dispatch(saveStickNumber(id));
        this._getDaysData(this.state.nameList, id)
    }
    hideLayer = () => {
        this.setState({
            limit: -1
        })
    }
    toggleLayer = (i) => {
        if (i === this.state.limit) {
            this.setState({
                limit: -1
            })
        } else {
            this.setState({
                limit: i
            })
        }
    }
    render () {
        return (
            <div className="charts-market" >
                {
                    this.state.chartsData.map((item, index) => {
                        return <div className="charts-column" key={index}>
                            <div className="column-wrapper" >
                                <div className="column-title">
                                    <i className="icon-ignore" style={item[0].isTop?{}:{display:'none'}}></i>
                                    <p className="name">{item[0].city}</p>

                                    <i className="icon-more" onClick={()=>this.toggleLayer(index)}></i>
                                    <div className="layer_menu_list" style={index==this.state.limit?{display:'block'}:{}}>
                                        <ul>
                                            <li onClick={()=>this.stick(item[0].id, index)} style={!item[0].isTop?{}:{display:'none'}}>置顶</li>
                                            <li onClick={()=>this.unstick(index)} style={item[0].isTop?{}:{display:'none'}}>取消置顶</li>
                                        </ul>
                                    </div>
                                    <div className="mask" onClick={this.hideLayer} style={index==this.state.limit?{display:'block'}:{}}></div>
                                </div>
                                <BaseChart data={item} height={186} textColor={'#fff'} keyColor={['#fff']}/>
                            </div>
                        </div>
                    })
                }
            </div>            
        )
    }
}
export default connect(state => ({
    userInfo: state.userInfo,
    stickNumber: state.stickNumber
}))(ChartsMarket);