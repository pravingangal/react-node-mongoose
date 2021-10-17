import React, { Component } from 'react';
import PopModal from '../../utilities/PopModal/PopModal';

const withErrorCatcher = ( ReferringComp, axios ) => {
    return class extends Component {
        state = {
            err: false,
            errFlag:false
        }
        //if componentWillMount is unsafe(not supported) initiate interceptors in constructor
        //thus interceptors are initiated when component instance is created
        UNSAFE_componentWillMount  () {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({err: false,errFlag:false});
                return req;
            });
            
            this.responseInterceptor = axios.interceptors.response.use(
                res => { 				
				return res; },
                error => {
               
                this.setState({ err: error,errFlag:true });                
                    return error;                     
            })           
        }
        //for hooks  eject in return of useState hook to cleanup
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errHandler = () => {
            this.setState({err: false});
        }
        render() {            
            let errMsg = this.state.err.response?this.state.err.response.data.empsError:(this.state.err?this.state.err.message:null);
            return (
                <React.Fragment>
                    <PopModal 
                        showPopModal={this.state.err}
                        closePopModal={this.errHandler}>
                        {errMsg}
                    </PopModal>
                    <ReferringComp {...this.props} errFlag={this.state.errFlag} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorCatcher;
