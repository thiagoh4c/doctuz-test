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
import { persistor, store } from '../../store';

const FormValues = {
    initialValues: {
        name:'',
        email: '',
        password: '',
    },
    schema: Yup.object().shape({
        email: Yup.string()
            .required('Obrigatório'),
        password: Yup.string().required('Obrigatório'),
    }),
};

const DefaultContent = {
    title: 'Faça seu Login para entrar no App.',
};

class Register extends Component {

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

    async register(values) {
        this.setState({loading: true});
        Firebase.auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(async (user) => { 
                // user.updateProfile({
                //     displayName: values.name
                // }).then(() => {
                    
                // }, (error) => {
                // }); 
                store.dispatch(this.props.setUser(user.data));
                NavigationService.navigate('TaskList');
                this.setState({loading: false});
            })
            .catch(error => {
                let errorMessage;
                console.log('error',error.code);
                switch(error.code){
                    case 'auth/email-already-in-use':
                        errorMessage = 'E-mail já cadastrado';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Senha incorreta';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Muitas tentativas. Acesso bloqueado.';
                        break;
                    default: 
                        errorMessage = 'Houve algum erro ao tentar se cadastrar';
                    break;
                }
                this.props.toggleAlert(true, {
                    title: 'Ops!',
                    message: errorMessage,
                });
                this.setState({loading: false});
            })
    }

    login() {
        NavigationService.navigate('Login');
    }

    render() {
        return (
            <Page style={styles.wrapper} noExtraBottomPadding={true} theme="white" headerProps={ { white:false, showBackButton: false}}>
                <View style={styles.segment}>
                    <Text style={main.pageTitle}>{this.content.title}</Text>
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={true}
                        initialValues={FormValues.initialValues}
                        validationSchema={FormValues.schema}
                        onSubmit={values => this.register(values)}>
                        {Form => (
                            <View style={main.fullWidth}>
                                <Input
                                    form={Form}
                                    name="name"
                                    placeholder="Seu Nome"
                                />
                                <Input
                                    form={Form}
                                    name="email"
                                    placeholder="E-mail"
                                />
                                <Input
                                    form={Form}
                                    name="password"
                                    placeholder="Senha"
                                    type="password"
                                />
                                <Button
                                    text="CADASTRAR"
                                    loading={this.state.loading}
                                    onPress={Form.handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </View>
                <View style={styles.segment}>
                    <Button
                        style={styles.registerButton}
                        text="FAZER LOGIN"
                        theme="orange"
                        onPress={() => this.login()}
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
)(Register);
