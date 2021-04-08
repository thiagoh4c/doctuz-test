import React, { Component } from 'react';

import { Formik } from 'formik';
import { Text, View } from 'react-native';
import Input from '@components/Form/Input';
import CustomDateTimePicker from '@components/Form/DatePicker';
import Button from '@components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import Page from '@components/Page';
import main from '@styles/main';
import * as Yup from 'yup';

import styles from './styles';

import { getTaskListDetails, updateTask, registerTask, removeTask } from '@store/tasklist';
import Loading from '@components/Loading';
import { toggleAlert } from '@store/alert';

import NavigationService from '@services/NavigationService';

const FormValues = {
    initialValues: {
        id: '',
        title: '',
        text: '',
        date: new Date(1598051730000),
    },
    schema: Yup.object().shape({
        title: Yup.string()
            .required('Obrigatório'),
    }),
};

class TaskListDetails extends Component {
    state = {
        editing: false,
        register: false
    }

    constructor(props) {
        super(props);

        let { params } = props.route;

        let add = false;
        if(params?.task){
            this.props.getTaskListDetails(params.task);

            FormValues.initialValues = {
                id: 0,
                title: this.props.details.title,
                text: this.props.details.text,
                date: new Date(),
            };
        }else
            add = true;           

            this.state = {
                editing: add,
                register: add
            };
    }

    submit(values) {
        if(this.state.editing){
            this.setState({ 
                editing: false
            });

            this.props[this.state.register ? 'registerTask' : 'updateTask'](values).then(async action => {
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
                    NavigationService.back();
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
            message: 'Deseja excluir esta tarefa?',
            cancelText:"Cancelar",
            confirmText:"Excluir",
            showCancelButton: true,
            onConfirmPressed: () => {
                this.props.removeTask(FormValues.initialValues.id).then(async action => {
                    let result = action.payload.data;
            
                    if (!result.status) {
                        this.props.toggleAlert(true, {
                            message: result.data,
                        });
                    } else {
                        this.props.toggleAlert(true, {
                            title: 'Sucesso!',
                            message: 'Tarefa excluida com sucesso.',
                        });
                        NavigationService.back();
                    }
                });
            }
        }); 
    }

    render() {
        const { details } = this.props;
        if(!this.state.register){
            FormValues.initialValues = {...details, date: new Date()};
        }
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
                                    <CustomDateTimePicker
                                        form={Form}
                                        isDatePicker={true}
                                        name="date"
                                        placeholder="Data de Entrega da Task"
                                        editable={this.state.editing}
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
                                                text={this.state.register ? "Criar Task" : "Salvar"}
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
    updateTask, 
    registerTask,
    removeTask
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskListDetails);
