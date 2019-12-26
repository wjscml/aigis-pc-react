import React from 'react';
import BaseChart from '../BaseChart';

import './index.styl'

export default class ChartsAlgo extends React.Component {
    render () {
        const charts = [
            {
              alaya: true,
              id: '7001',
              title: '格雷厄姆数字价值投资法',
              isRecommend: 1,
              value1: 21.36,
              value2: 10.18,
              value3: 32.72,
              data: [
                { time: '2019/01/01', value: 7.0, city: '1' },
                { time: '2019/01/01', city: '2', value: 3.9 },
                { time: '2019/01/03', value: 6.9, city: '1' },
                { time: '2019/01/03', city: '2', value: 4.2 },
                { time: '2019/01/05', value: 9.5, city: '1' },
                { time: '2019/01/05', city: '2', value: 5.7 },
                { time: '2019/01/07', value: 14.5, city: '1' },
                { time: '2019/01/09', value: 20.5, city: '1' },
                { time: '2019/01/11', value: 23.3, city: '1' },
                { time: '2019/01/13', value: 18.3, city: '1' },
                { time: '2019/01/15', value: 13.9, city: '1' },
                { time: '2019/01/17', value: 11.6, city: '1' },
                { time: '2019/01/19', value: 16.3, city: '1' },
                { time: '2019/01/21', value: 18.3, city: '1' },
                { time: '2019/01/23', value: 13.9, city: '1' },
                { time: '2019/01/25', value: 14.6, city: '1' },
                { time: '2019/01/27', value: 18.4, city: '1' },
                { time: '2019/01/29', value: 21.5, city: '1' },
                { time: '2019/01/31', value: 25.2, city: '1' },
                { time: '2019/02/02', value: 26.5, city: '1' },
                { time: '2019/01/07', city: '2', value: 8.5 },
                { time: '2019/01/09', city: '2', value: 16.6 },
                { time: '2019/01/11', city: '2', value: 14.2 },
                { time: '2019/01/13', city: '2', value: 10.3 },
                { time: '2019/01/15', city: '2', value: 6.6 },
                { time: '2019/01/17', city: '2', value: 6.8 },
                { time: '2019/01/19', city: '2', value: 12.2 },
                { time: '2019/01/21', city: '2', value: 10.3 },
                { time: '2019/01/23', city: '2', value: 6.6 },
                { time: '2019/01/25', city: '2', value: 4.8 },
                { time: '2019/01/27', city: '2', value: 11.9 },
                { time: '2019/01/29', city: '2', value: 15.2 },
                { time: '2019/01/31', city: '2', value: 17.0 },
                { time: '2019/02/02', city: '2', value: 16.6 }
              ]
            },
            {
              id: '7002',
              title: '风险平价ETF配置',
              value1: 28.96,
              value2: 55.25,
              value3: 16.13,
              data: [
                { time: '2018/08/15', value: 0.1, city: '1' },
                { time: '2018/08/30', value: 2.7, city: '1' },
                { time: '2018/09/15', value: 1.7, city: '1' },
                { time: '2018/09/30', value: -0.3, city: '1' },
                { time: '2018/10/15', value: 0.9, city: '1' },
                { time: '2018/10/30', value: -12.0, city: '1' },
                { time: '2018/11/15', value: -4.9, city: '1' },
                { time: '2018/11/30', value: 8.5, city: '1' },
                { time: '2018/12/15', value: 6.7, city: '1' },
                { time: '2018/12/30', value: 11.5, city: '1' },
                { time: '2019/01/15', value: 15.6, city: '1' },
                { time: '2019/01/30', value: 37.1, city: '1' },

                { time: '2018/08/15', city: '2', value: -0.1 },
                { time: '2018/08/30', city: '2', value: -3.7 },
                { time: '2018/09/15', city: '2', value: -8.3 },
                { time: '2018/09/30', city: '2', value: -10.3 },
                { time: '2018/10/15', city: '2', value: -8.5 },
                { time: '2018/10/30', city: '2', value: -14.2 },
                { time: '2018/11/15', city: '2', value: -13.7 },
                { time: '2018/11/30', city: '2', value: -10.5 },
                { time: '2018/12/15', city: '2', value: -11.3 },
                { time: '2018/12/30', city: '2', value: -13.2 },
                { time: '2019/01/15', city: '2', value: -3.6 },
                { time: '2019/01/30', city: '2', value: 9.1 }
              ]
            },
            {
              id: '7003',
              title: '盈利倍增',
              value1: 20.64,
              value2: 87.86,
              value3: 5.08,
              data: [
                { time: '2019/01/11', value: -0.14, city: '1' },
                { time: '2019/01/12', value: -0.61, city: '1' },
                { time: '2019/01/13', value: -0.34, city: '1' },
                { time: '2019/01/14', value: -1.00, city: '1' },
                { time: '2019/01/15', value: -0.37, city: '1' },
                { time: '2019/01/16', value: -3.85, city: '1' },
                { time: '2019/01/17', value: 1.50, city: '1' },
                { time: '2019/01/18', value: 9.82, city: '1' },
                { time: '2019/01/19', value: 12.44, city: '1' },
                { time: '2019/01/20', value: 15.71, city: '1' },
                { time: '2019/01/21', value: 20.19, city: '1' },
                { time: '2019/01/22', value: 19.92, city: '1' },

                { time: '2019/01/11', city: '2', value: -1.49 },
                { time: '2019/01/12', city: '2', value: -0.46 },
                { time: '2019/01/13', city: '2', value: -6.11 },
                { time: '2019/01/14', city: '2', value: -8.98 },
                { time: '2019/01/15', city: '2', value: -5.28 },
                { time: '2019/01/16', city: '2', value: -1.95 },
                { time: '2019/01/17', city: '2', value: 2.23 },
                { time: '2019/01/18', city: '2', value: 5.77 },
                { time: '2019/01/19', city: '2', value: 8.05 },
                { time: '2019/01/20', city: '2', value: 12.91 },
                { time: '2019/01/21', city: '2', value: 18.11 },
                { time: '2019/01/22', city: '2', value: 14.53 }
              ]
            }
          ]
        return (
            <div className="charts-algo" >
                {
                    charts.map((item, index) => {
                        return <div className="charts-column" key={index}>
                                <p className="title">{item.title}</p>
                                <BaseChart
                                    data={item.data}
                                    height={154}
                                    xCount={3}
                                    yCount={4}
                                />
                                <div className="info">
                                    <p className="left"><span className={item.value1 > 0 ? 'value red' : 'value'}>{item.value1}%</span><span className="label">累计收益</span></p>
                                    <p className="center"><span className={item.value2 > 0 ? 'value red' : 'value'}>{item.value2}%</span><span className="label">年化收益</span></p>
                                    <p className="right"><span className="value">{item.value3}%</span><span className="label">最大回撤</span></p>
                                </div>
                                <div className="tag" style={item.alaya ? {display:'block'} : {display:'none'}}>Alaya 推荐</div>
                        </div>

                    })
                }
            </div>            
        )
    }
}