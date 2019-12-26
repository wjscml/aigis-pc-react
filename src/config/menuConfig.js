const menuList = [
    {
        title: '首页',
        key: '/index',
        name: 'index'
    },
    {
        title: '精选策略',
        key: '/algorithm',
        name: 'algorithm'
    },
    {
        title: '市场报告',
        key: '/report',
        name: 'report'
    },
    {
        title: '行情数据',
        key: '/market',
        name: 'market'
    },
    {
        title: '专享报告',
        key: '/vip/report',
        name: 'vip_report',
        btnList: [
            {
                title: '报告详情',
                key: '/admin/detail'
            },
            {
                title: '结束订单',
                key: '/admin/finish'
            }
        ]
    },
    {
        title: '跟单指引',
        key: '/vip/follow',
        name: 'vip_follow'
    },
    {
        title: '委托资管',
        key: '/vip/value',
        name: 'vip_value'
    },
    {
        title: '问题咨询',
        key: '/vip/question',
        name: 'vip_question'
    }
];
export default menuList;