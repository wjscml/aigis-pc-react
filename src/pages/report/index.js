import React from 'react';
import { connect } from 'react-redux';
import ReportList from '../../components/ReportList';
import { getNomalList } from '../../api';
import { extend } from '../../common/js/data';
import './index.styl';

const COUNT = 7
class Report extends React.Component {
    state = {
        listData: null,
        tips: '点击加载更多',
        page: 0
    }
    componentDidMount () {
        document.title = '市场报告 - Aigis - 埃癸斯风险控制系统'
        this._getNomalList()
    }
    _getNomalList = () => {
        getNomalList({
          session: this.props.userInfo.session,
          page: 0,
          limit: COUNT
        }).then((res) => {
          if (res) {
                this.setState({
                    listData: res,
                    tips: '点击加载更多'
                })
          } 
        })
    }
    loadmore = () => {
        this.setState({
            page: this.state.page + 1
        })
        getNomalList({
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
            <div className="report-wrapper">
                <ReportList data={this.state.listData} tips={this.state.tips} loadmore={this.loadmore} hasImg={true}/>
                
            </div>
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(Report);