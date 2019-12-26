import React from 'react';
import { NavLink } from 'react-router-dom'
import MenuConfig from '../../config/menuConfig'
import { connect } from 'react-redux'
import './index.styl'

class NavLeft extends React.Component {
    componentWillMount () {
        const menuTreeNode = this.renderMenu(MenuConfig);     
        this.setState({
            menuTreeNode
        })
    }
    renderMenu = (data) => {
        return data.map((item, index) => {
            let iconClass = `icon icon-${item.name}`
            return <div className="nav" key={index}>
                <NavLink to={item.key} activeClassName="navBtn-s" className="navBtn">
                    <i className={iconClass}></i>
                    <span className="title">{item.title}</span>
                </NavLink>
            </div>
        })
    }
    render () {
        return (
            <div className="left-wrap">
                <NavLink to="/index" className="logo">
                    <i className="icon-logo"></i>
                </NavLink>
                <div className="nav-wrapper">
                    { this.state.menuTreeNode }
                </div>
            </div>
        )
    }
}
export default connect()(NavLeft);