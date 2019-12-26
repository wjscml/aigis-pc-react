import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import LoginPsw from './pages/login/login_password'
import LoginMobile from './pages/login/login_mobile'
import Forget from './pages/login/forget'
import Admin from './admin'
import Index from './pages/index'
import Algorithm from './pages/algorithm'
import Report from './pages/report'
import Market from './pages/market'
import VipReport from './pages/vip_report'
import VipFollow from './pages/vip_follow'
import VipValue from './pages/vip_value'
import VipQuestion from './pages/vip_question'
import Common from './common'
import ReportDetail from './pages/report_detail'
import MarketDetail from './pages/market_detail'
import DownLoad from './pages/download'

export default class IRouter extends React.Component{
    render () {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path="/download" component={DownLoad} />
                        
                        <Route path="/login" render={() => 
                            <Login>
                                <Switch>
                                    <Route path="/login/psw" component={LoginPsw} />
                                    <Route path="/login/mobile" component={LoginMobile} />
                                    <Route path="/login/forget" component={Forget} />
                                    
                                    <Redirect to="/login/psw" />
                                </Switch>           
                            </Login>
                        } />

                        <Route path="/common" render={() => 
                            <Common>
                                <Switch>
                                    <Route path='/common/report/:reportId' component={ReportDetail} />
                                    <Route path='/common/market/:marketName' component={MarketDetail} />
                                    <Redirect to="/index" />
                                </Switch> 
                            </Common>
                        } />

                        <Route path="/" render={() => 
                            <Admin>
                                <Switch>
                                    <Route path='/index' component={Index} />
                                    <Route path='/algorithm' component={Algorithm} />
                                    <Route path='/report' component={Report} />
                                    <Route path='/market' component={Market} />
                                    <Route path='/vip/report' component={VipReport} />
                                    <Route path='/vip/follow' component={VipFollow} />
                                    <Route path='/vip/value' component={VipValue} />
                                    <Route path='/vip/question' component={VipQuestion} />

                                    <Redirect to="/index" />
                                </Switch>     
                            </Admin>
                        } /> 
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}