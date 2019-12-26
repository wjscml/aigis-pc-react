import React from 'react';
import { connect } from 'react-redux';
import { getReportContent } from '../../api';

import './index.styl'

class ReportDetail extends React.Component {
    state = {
        reportDetails: []
    }
    componentDidMount () {
        let Id = this.props.match.params.reportId;
        if (Id) {
            this.getDetail(Id);
        }
    }
    getDetail (id) {
        getReportContent({
          session: this.props.userInfo.session,
          reportId: id
        }).then(res => {
            if (res && res.length!==0) {
                this.setState({
                    reportDetails: res
                })
            } else {
                window.location.href = '/index';
            }
        })
    }
    render() {
        document.title = `${this.state.reportDetails.title}`;
        return (
            <div className="report-detail" >
                <div className="report-detail-wrapper" >
                    <div className="detail-header">
                        <h1 className="title-box">{this.state.reportDetails.title}</h1>
                        <div className="issue-box">
                        <span>埃癸斯智能风控</span>
                        <span className="publish-time"> · {this.state.reportDetails.publish_time}</span>
                        </div>
                    </div>
                    <div className="detail-main" dangerouslySetInnerHTML={{__html:this.state.reportDetails.content}}></div>
                    <div className="notices">免责声明：此板块内的信息取自第三方机构研报，不代表第八识智能科技的立场或观点，不对您构成任何投资建议，据此操作，风险自担。</div>
                </div>
            </div>
        );
    }
}
export default connect(state => ({
    userInfo: state.userInfo
}))(ReportDetail);