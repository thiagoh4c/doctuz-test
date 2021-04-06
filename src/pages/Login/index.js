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
            .required('Obrigatório'),
        password: Yup.string().required('Obrigatório'),
    }),
};

const DefaultContent = {
    title: 'Faça seu Login para entrar no App.',
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.content = {
            ...DefaultContent,
            ...this.props.content,
        };
    }

    signup(values) {
        Firebase.auth()
            .createUserWithEmailAndPassword(FormValues.initialValues.email, FormValues.initialValues.password)
            .then(() => { 
                console.log('ok');
            })
            .catch(error => console.log(error))
    }

    register() {
        NavigationService.navigate('Register');
    }

    login(values) {
        this.props.login(values).then(({ payload }) => {
            let result = payload.data;
            if (result.status) {
                this.props.setUser(result.data);
                NavigationService.navigate('TaskList');
            } else {
                this.props.toggleAlert(true, {
                    message: result.data,
                });
            }
        });
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
                                />
                            </View>
                        )}
                    </Formik>
                </View>
                <View style={styles.segment}>
                    <Button
                        style={styles.registerButton}
                        text="QUERO ME CADASTRAR"
                        theme="orange"
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
