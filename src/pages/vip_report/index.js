import React from 'react';
import { connect } from 'react-redux';
import ReportList from '../../components/ReportList';
import RowNav from '../../components/RowNav';
import NoResult from '../../components/NoResult/'
import { getSpecialList } from '../../api';
import { extend } from '../../common/js/data';
import './index.styl'

const COUNT = 9
class VipReport extends React.Component {
    state = {
        listData: null,
        tips: '点击加载更多',
        page: 0,
        navlist: []
    }
    componentDidMount () {
        document.title = '专享报告 - Aigis - 埃癸斯风险控制系统';
        this._getSpecialList()
    }

    _getSpecialList = () => {
        getSpecialList({
          session: this.props.userInfo.session,
          page: 0,
          limit: COUNT
        }).then((res) => {
          if (res && res.length!==0) {
                this.setState({
                    listData: res,
                    tips: '点击加载更多'
                })
          } else {
            
          }
        })
    }
    loadmore = () => {
        this.setState({
            page: this.state.page + 1
        })
        getSpecialList({
            session: this.props.userInfo.session,
            page: this.state.page + 1,
            limit: COUNT
        }).then(res => {
            if (res && res.length !== 0) {
                let moreListData = extend(this.state.listData, res)
                this.setState({
                    listData: moreListData,
                    tips: '点击加载更多'
                })
            } else {
                this.setState({
                    tips: '没有更多数据了'
                })
            }
        })
    }
    render() {
        return (
            <div className="vip-report-wrapper">
                <RowNav navlist={this.state.navlist}/>
                {
                    this.state.listData ?
                    <ReportList 
                        data={this.state.listData} 
                        tips={this.state.tips} 
                        loadmore={this.loadmore}
                        hasImg={false}
                    /> :
                    <div style={{marginTop: 100}} >
                        <NoResult tips='暂无报告~' />
                    </div>
                }  
            </div>
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(VipReport);