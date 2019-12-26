import React from 'react';
import './index.styl'

export default class RowNav extends React.Component {
    render () {
        const data = this.props.navlist
        const type = this.props.type
        return (
            <div className="row-nav">
                {
                    data.map((item, index) => {
                        if (item.name === 'WTI原油当月连续') {
                            return <div className={index===type?'nav-btn-s nav-btn':'nav-btn'} onClick={()=>this.props.handleSelect(index)} key={index}>
                                原油
                            </div>
                        }
                        return <div className={index===type?'nav-btn-s nav-btn':'nav-btn'} onClick={()=>this.props.handleSelect(index)} key={index}>
                            {item.name.match(/[\u4e00-\u9fa5]/g).join('')}
                        </div>
                    })
                }
            </div>
        )
    }
}