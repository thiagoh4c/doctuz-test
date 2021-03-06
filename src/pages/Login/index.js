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
        password: Yup.string().required('Obrigatório'),
    }),
};

const DefaultContent = {
    title: 'ToDo App',
};

class Login extends Component {
    
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

    forgot() {
        NavigationService.navigate('ForgotPassword');
    }

    login(values) {
        this.setState({loading: true});
        Firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((response) => {
            this.props.setUser(response.user);
            NavigationService.navigate('TaskList');
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
                    errorMessage = 'Muitas tentativas. Acesso bloqueado.';
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
            <Page style={styles.wrapper} noExtraBottomPadding={true} theme="white" headerProps={ { white:false, showBackButton: false}}>
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
                                <Input
                                    form={Form}
                                    name="password"
                                    placeholder="Senha"
                                    type="password"
                                />
                                <Button
                                    text="ENTRAR"
                                    onPress={Form.handleSubmit}
                                    loading={this.state.loading}
                                />
                            </View>
                        )}
                    </Formik>
                    <TouchableOpacity
                        onPress={() => this.forgot()}
                        activeOpacity={0.8}>
                        <Text style={styles.forget}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.segment}>
                    <Button
                        style={styles.registerButton}
                        text="QUERO ME CADASTRAR"
                        onPress={() => this.register()}
                    />
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
)(Login);
