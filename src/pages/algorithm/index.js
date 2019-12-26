import React from 'react'
import RowNav from '../../components/RowNav'
import ChartsAlgo from '../../components/ChartsAlgo';
import { connect } from 'react-redux'

import './index.styl'

class Algorithm extends React.Component {
    state = {
        type: 0,
        algoNav: [{name: '策略评分'}, {name:'累计收益'}, {name:'年化收益'}]
    }
    componentDidMount () {
        document.title="精选策略 - Aigis - 埃癸斯风险控制系统"
    }
    handleSelect = (i) => {
        this.setState({
            type: i
        })
    }
    render() {
        return (
            <div className="algorithm-wrapper">
                <div className="algorithm-nav">
                    <RowNav navlist={this.state.algoNav} type={this.state.type} handleSelect={this.handleSelect} />
                </div>
                <ChartsAlgo />
                
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}
export default connect(mapStateToProps)(Algorithm);