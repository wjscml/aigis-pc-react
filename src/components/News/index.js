import React from 'react';
import { List, Button, Skeleton } from 'antd';
import { getCategories, getNewsList } from '../../api';
import RowNav from '../RowNav'
import './index.styl'

const count = 6
export default class News extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        navlist: [],
        page: 0,
        type: 0
    };
    componentWillMount () {
        this._getNewsList()
        this._getNavList(this.state.type)    
    };
    _getNavList = () => {
        getCategories().then(res => {
            if (res) {
                this.setState({
                    navlist: res.slice(0, 5)
                })
            }
        })
    }
    handleSelect = (index) => {
        this.setState({
            type: index
        })
        this._getNewsList(index)
    }
    _getNewsList = (type) => {
        getNewsList({
            page: 0,
            type: type
        }).then((res) => {
            if (res) {
                this.setState({
                    initLoading: false,
                    data: res,
                    list: res
                })
            }
        })
    };
    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({
                loading: true,
                name: {}
            }))),
            page: this.state.page + 1
        })
        getNewsList({
            page: this.state.page + 1,
            type: this.state.type
        }).then((res) => {
            if (res) {
                const data = this.state.data.concat(res)
                this.setState({
                    data,
                    list: data,
                    loading: false
                }, () => {
                    window.dispatchEvent(new Event('resize'))
                })
            } else {
                this.setState({
                    initLoading: true
                })
            }
        })
    }
    render() {      
        const { initLoading, loading, list } = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{
                textAlign: 'center',
                marginTop: 10,
                height: 32,
                lineHeight: '32px'
            }}>
                <Button onClick={this.onLoadMore} type="primary">点击加载更多</Button>
            </div>
        ) : null;
        return (
            <div>
                <div className="news-top">
                    <div className="title">
                        <i className="icon-news"></i>
                        <span>新闻视点</span>
                    </div>
                    <RowNav navlist={this.state.navlist} type={this.state.type} handleSelect={this.handleSelect} />
                </div>     
                <List
                    itemLayout="vertical"
                    size="large"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item className="news-item"
                            key={item.title}
                            actions={[
                                <span>{item.author_name}</span>,
                                <span>{item.publish_time}</span>
                            ]}
                            extra={
                                <div className="col-image" style={{backgroundImage: `url(${item.thumb})`}}></div>
                            }
                        >
                            <Skeleton title={false} loading={item.loading}>
                                <List.Item.Meta
                                    title={<a href={item.url}>{item.title}</a>}
                                    description={item.summary}
                                />   
                            </Skeleton>
                                    
                        </List.Item>
                    )}
                />
            </div>
        )
    };
}