import React, { Component } from 'react';

import { Formik } from 'formik';
import { Text, View } from 'react-native';
import Input from '@components/Form/Input';
import Button from '@components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import Page from '@components/Page';
import main from '@styles/main';
import * as Yup from 'yup';

import styles from './styles';

import { getTaskListDetails, update, register } from '@store/tasklist';
import Loading from '@components/Loading';
import { toggleAlert } from '@store/alert';

const FormValues = {
    initialValues: {
        id: '',
        title: '',
        text: '',
    },
    schema: Yup.object().shape({
        title: Yup.string()
            .required('Obrigatório'),
    }),
};

class TaskListDetails extends Component {
    state = {
       
    };

    constructor(props) {
        super(props);

        let { params } = props.route;

        FormValues.initialValues = {
            id: this.props.details.id,
            title: this.props.details.title,
            text: this.props.details.text,
        };

        console.log('FormValues',FormValues.initialValues );
        console.log('props',this.props.details);

        let add = false;
        if(params?.task)
            this.props.getTaskListDetails(params.task);
        else
            add = true            

        this.state = {
            editing: add,
            register: add
        }
    }

    submit(values) {
        console.log('submit save');

        if(this.state.editing){
            this.setState({ 
                editing: false
            });


            this.props[this.props.register ? 'register' : 'update'](values).then(async action => {
                let result = action.payload.data;
    
                if (!result.status) {
                    this.props.toggleAlert(true, {
                        message: result.data,
                    });
                } else {
                    this.props.toggleAlert(true, {
                        title: 'Sucesso!',
                        message: this.state.register ? 'Sua tarefa foi criada com sucesso.' : 'Sua tarefa foi atualizada.',
                    });
                }
            });
        }
    }

    setEditing(){
        if(!this.state.editing){
            this.setState({ 
                editing: true
            })
        }
    }
    remove(){
        this.props.toggleAlert(true, {
            title: 'Atenção!',
            message: 'Deseja remover esta tarefa?',
            showCancelButton: true,
        })
    }

    render() {
        const { details } = this.props;
        FormValues.initialValues = {...details};
        console.log('FormValues2',FormValues.initialValues );
        console.log('props2',this.state);
        return (
            <Page
                theme="orange"
                headerProps={{
                    showBackButton: true,
                    showLogoutButton: true,
                }}>
                {this.props.loading ? (
                    <Loading />
                ) : (
                    <>
                        <Formik
                            validateOnChange={false}
                            validateOnBlur={true}
                            initialValues={FormValues.initialValues}
                            validationSchema={FormValues.schema}
                            onSubmit={values => this.submit(values)}>
                            {Form => (
                                <View style={main.fullWidth}>
                                    <Input
                                        form={Form}
                                        name="title"
                                        placeholder="Nome da Task"
                                        editable={this.state.editing}
                                    />
                                    <Input
                                        form={Form}
                                        name="text"
                                        type="textarea"
                                        multiline={true}
                                        numberOfLines={4}
                                        placeholder="Descrição"
                                        editable={this.state.editing}
                                        style={styles.textArea}
                                    />
                                    <View style={styles.containerButtons}>
                                        {(!this.state.register && !this.state.editing) && 
                                            <Button
                                                icon={<FontAwesome name="edit" size={15} color="#FFFFFF" />}
                                                loading={this.props.loading}
                                                style={styles.buttonEdit}
                                                onPress={() => this.setEditing()}
                                            />
                                        }
                                        {(this.state.editing || this.state.register) &&
                                            <Button
                                                text="Salvar"
                                                loading={this.props.loading}
                                                style={styles.buttonSave}
                                                onPress={Form.handleSubmit}
                                            />
                                        }
                                        {!this.state.editing && !this.state.register &&
                                            <Button
                                                icon={<FontAwesome name="trash" size={15} color="#FFFFFF" />}
                                                loading={this.props.loading}
                                                style={styles.buttonRemove}
                                                onPress={() => this.remove()}
                                            />
                                        }
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </>
                )}
            </Page>
        );
    }
}

const mapStateToProps = ({ tasklist }) => ({
    loading: tasklist.loading?.details,
    details: tasklist.data,
});

const mapDispatchToProps = {
    toggleAlert,
    getTaskListDetails,
    update, 
    register
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskListDetails);
