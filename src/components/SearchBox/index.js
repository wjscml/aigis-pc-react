import React from 'react';
import './index.styl';

export default class SearchBox extends React.Component {
    state = {
        query: ''
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
        this.props.search(e.target.value)
    }
    clear = () => {
        this.setState({
            query: ''
        })
        this.props.search('')
    }
    render () {
        
        return (
            <div className="search-box">
                <i className="icon-search"></i>
                <input 
                    className="box"
                    placeholder="请输入商品代码..."
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange} 
                 />
                <i onClick={this.clear} className="icon-dismiss" style={this.state.query?{display:'block'}:{display:'none'}}></i>
            </div>
        )
    }
}