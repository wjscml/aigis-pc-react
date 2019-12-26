import React from 'react';
import News from '../../components/News';
import ChartsMarket from '../../components/ChartsMarket';
import ChartsAlgo from '../../components/ChartsAlgo';
import { connect } from 'react-redux';
import { saveIndexBar } from '../../redux/action';

import './index.styl'

class Index extends React.Component {
    state = {
        screenHeight: window.innerHeight
    }
    componentWillMount () {
        const { dispatch } = this.props;
        dispatch(saveIndexBar(true));
    }
    componentWillUnmount () {
        const { dispatch } = this.props;
        dispatch(saveIndexBar(false));
    }
    render() {
        return (
            <div className="index-wrapper">     
                <div className="index-left">
                    <div className="index-algorithm">
                        <ChartsAlgo />
                    </div>
                    <div className="index-news">
                        <News></News>
                    </div>
                </div>
                <div className="index-right">
                    <ChartsMarket/>
                </div>
            </div>   
        );
    }
}
export default connect()(Index)
