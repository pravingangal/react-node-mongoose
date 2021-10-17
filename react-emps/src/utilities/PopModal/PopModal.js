import React, { Component } from 'react';
import classes from './PopModal.module.css';
import ScreenCover from '../ScreenCover/ScreenCover';
import { Link } from 'react-router-dom';

class PopModal extends Component {

    shouldComponentUpdate(nextProps, nextState) {        
        return nextProps.showPopModal !== this.props.showPopModal || nextProps.children !== this.props.children;                
    }

    render() {
        
        const modalClasses =  this.props.showPopModal  && !!this.props.showPopModal  ? classes.showModal : classes.hideModal;               
        return (
            <React.Fragment>
                <ScreenCover displayScreenCover={this.props.showPopModal} onClick={this.props.closePopModal} />
                 <div
                    className={classes.outerDiv + ' ' + modalClasses} >                    
                    <div className={classes.popModal}>
                        <Link                            
                            to="#"
                            className={classes.clCls}
                            onClick={this.props.closePopModal}                            
                            >
                            &times;
                            </Link>                            
                        {this.props.children}
                    </div> 
                </div>
            </React.Fragment>
        )
    }
}

export default PopModal;
