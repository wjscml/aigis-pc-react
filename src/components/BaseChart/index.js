import React from 'react';
import { Chart, Geom, Axis, Tooltip, Guide } from 'bizcharts';

const { DataMarker } = Guide;
export default class BaseChart extends React.Component {
    render () {
        // 定义度量
        const cols = {
            time: { 
                type: 'time',
                tickCount: this.props.xCount || 2
            },
            value: {
                tickCount: this.props.yCount || 5
            }
        };
        return (
            <Chart 
                height={this.props.height || 300} 
                data={this.props.data} 
                scale={cols} 
                forceFit={true} 
                padding={[10, 10, 26, 36]} 
            >
                <Axis 
                    name="time"
                    label={{
                        textStyle: {
                            fill: this.props.textColor || '#bfbfbf',
                            fontSize: 11
                        }
                    }}
                    line={{
                        lineWidth: 1,
                        stroke: 'rgba(255, 255, 255, 0.17)'
                    }}
                    tickLine={null}
                />
                <Axis 
                    name="value" 
                    label={{
                        formatter: this.props.formatter || null,
                        offset: 36,
                        textStyle: {
                            textAlign: 'left',
                            fill: this.props.textColor || '#bfbfbf'
                        }
                    }}
                    grid={{
                        type: 'line',
                        lineStyle: {
                            stroke: 'rgba(255, 255, 255, 0.17)',
                            lineWidth: 1,
                            lineDash: [1, 0]
                        }
                    }}
                    line={{
                        lineWidth: 1,
                        stroke: 'rgba(255, 255, 255, 0.17)'
                    }}
                    
                />
                
                <Tooltip 
                    crosshairs={{
                        type: "y",
                        style: {
                            stroke: '#fff',
                            lineWidth: 1,
                            lineDash: [2, 3]
                        }
                    }}
                />
                <Geom 
                    type="line" 
                    position="time*value" 
                    size={2}
                    color={["city", this.props.keyColor || ['rgb(6, 238, 254)', 'rgb(109, 81, 255)']]}
                    shape={"smooth"}
                />
                {
                    this.props.guideData ?
                    <Guide>
                        {     
                            this.props.guideData.map((item, index) => {
                                return <DataMarker 
                                    position={item.point}
                                    content={item.pointValue}
                                    style={{
                                        text: {
                                            textAlign: 'left',
                                            fill: '#fff',
                                            stroke: 'rgb(67, 67, 128)',
                                            lineWidth: 2
                                        }
                                    }}
                                    key={index}
                                />
                            })
                        }
                    </Guide> : null
                }
            </Chart>
        )
    }
}