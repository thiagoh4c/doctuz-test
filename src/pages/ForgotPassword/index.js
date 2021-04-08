import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Page from '@components/Page';
import Button from '@components/Button';

import styles from './styles';
import Input from '@components/Form/Input';
import main from '@styles/main';

import { login } from '@store/auth';
import { setUser } from '@store/user';
import { toggleAlert } from '@store/alert';
import NavigationService from '@services/NavigationService';
import Firebase from '@services/firebase';

const FormValues = {
    initialValues: {
        email: '',
        password: '',
    },
    schema: Yup.object().shape({
        email: Yup.string()
            .email('E-mail inválido')
            .min(6, 'Inválido')
            .required('Obrigatório'),
    }),
};

const DefaultContent = {
    title: 'Recuperar senha',
};

class ForgotPassword extends Component {
    
    state = {
        loading: false
    }

    constructor(props) {
        super(props);

        this.content = {
            ...DefaultContent,
            ...this.props.content,
        };

    }

    register() {
        NavigationService.navigate('Register');
    }

    login(values) {
        this.setState({loading: true});
        Firebase.auth().sendPasswordResetEmail(values.email).then((response) => {
            this.props.toggleAlert(true, {
                title: 'Está tudo bem!',
                message: 'Uma nova senha foi enviada para seu e-mail',
            });
            this.setState({loading: false});
        }).catch(error => {
            let errorMessage;
            console.log('error',error.code);
            switch(error.code){
                case 'auth/user-not-found':
                    errorMessage = 'Nenhum usuário encontrado';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Senha incorreta';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Muitas tentativas. Acesso bloqueado';
                    break;
                default: 
                    errorMessage = 'Houve algum erro ao efetuar login';
                break;
            }
            this.props.toggleAlert(true, {
                title: 'Ops!',
                message: errorMessage,
            });
            this.setState({loading: false});
        });
    
    }

    render() {
        return (
            <Page style={styles.wrapper} headerProps={ { white:false, showBackButton: true}}>
                <View style={styles.segment}>
                    <Text style={main.pageTitleBlack}>{this.content.title}</Text>
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={true}
                        initialValues={FormValues.initialValues}
                        validationSchema={FormValues.schema}
                        onSubmit={values => this.login(values)}>
                        {Form => (
                            <View style={main.fullWidth}>
                                <Input
                                    form={Form}
                                    name="email"
                                    placeholder="Usuário"
                                />
                                <Button
                                    text="Recuperar senha"
                                    onPress={Form.handleSubmit}
                                    loading={this.state.loading}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </Page>
        );
    }
}

const mapStateToProps = ({ auth,  }) => ({
    loading: auth.loading?.login,
});

const mapDispatchToProps = {
    login,
    toggleAlert,
    setUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgotPassword);
