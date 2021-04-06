import React, { Component } from 'react';
import styles from './Alert.style';

import { connect } from 'react-redux';
import { toggleAlert } from '../../store/ducks/alert';

import AwesomeAlert from 'react-native-awesome-alerts';

class Alert extends Component {
    render() {
        const {
            show,
            settings
        } = this.props;

        if(settings && settings.customView && settings.customView._owner)
            delete settings.customView;

        return <AwesomeAlert
                    show={show}
                    showProgress={false}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    onCancelPressed={() => {
                        this.props.toggleAlert(false, settings);
                    }}
                    onConfirmPressed={() => {
                        this.props.toggleAlert(false, settings);
                    }}
                    titleStyle={styles.title}
                    messageStyle={styles.message}
                    cancelButtonStyle={styles.buttonCancel}
                    cancelButtonTextStyle={styles.buttonCancelText}
                    confirmButtonStyle={styles.buttonConfirm}
                    confirmButtonTextStyle={styles.buttonConfirmText}
                    contentContainerStyle={styles.container}
                    alertContainerStyle={styles.wrapper}
                    overlayStyle={styles.layer}
 
                    {...settings}
            />;
    };
};

const mapStateToProps = ({ alert }) => ({
    show: alert.show,
    settings: alert.settings
});

const mapDispatchToProps = {
    toggleAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);