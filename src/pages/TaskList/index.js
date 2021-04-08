import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import main from '@styles/main';
import Page from '@components/Page';
import Button from '@components/Button';

import { getTaskList, setCompletedTask } from '@store/tasklist';
import { setUser } from '@store/user';
import { toggleAlert } from '@store/alert';

import styles from './styles';
import Loading from '@components/Loading';
import { colors } from '@styles/_variables';
import NavigationService from '@services/NavigationService';
//Services
import Utils from '@services/Utils';

const DefaultContent = {
    title: 'Lista de Tarefas',
};

class TaskList extends Component {
    state = {
        items: [],
        loading: true,
    };

    constructor(props) {
        super(props);
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this._getTaskList();
        });

        this.content = {
            ...DefaultContent,
        };
    }

    _getTaskList() {
        this.props.getTaskList(1).then(({ payload }) => {
            let result = payload.data;

            this.setState({
                items: [],
            });

            if (result.status) {
                this.setState({
                    items: [...this.state.items, ...result.data.tasklist],
                    loading: false,
                });
            }
        }).catch((err) => {
            this.props.toggleAlert(true, {
                title: 'Ops!',
                message: 'Não foi possível recuperar suas tarefas. Tente mais tarde.',
            });
        });
   
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    seeDetails(item) {
        NavigationService.navigate('TaskListDetails', { task: item.id });
    }

    addTask() {
        NavigationService.navigate('TaskListDetails');
    }

    setCompleted(item){
        this.props.setCompletedTask(item.id).then(action => {
            let result = action.payload.data;
            this._getTaskList();
        });
    }

    render() {
        const { items, loading } = this.state;

        return (
            <Page
                theme="orange"
                headerProps={{
                    showLogoutButton: true,
                }}>
                <Text style={main.pageTitle}>{this.content.title}</Text>
                <View style={styles.wrapper}>
                    {items.length
                        ? items.map(item => (
                              <View style={styles.tasks} key={item.id}>
                                    <TouchableOpacity 
                                        style={styles.containerTask}
                                        onPress={() => this.seeDetails(item)}
                                        activeOpacity={0.9}>
                                            <Text style={styles.tasksTitle}>
                                                {item.title}
                                            </Text>
                                            <Text
                                                style={styles.tasksText}>
                                                {item.text}
                                            </Text>
                                    </TouchableOpacity>
                                    {item.is_complete == 1
                                        ? 
                                                <FontAwesome name="check-circle" size={30} color={colors.green.default} />
                                        : 
                                        <TouchableOpacity
                                            onPress={() => this.setCompleted(item)}
                                            activeOpacity={1}>
                                        <FontAwesome name="check-circle" size={30} color={colors.gray.superLight} />
                                        </TouchableOpacity>
                                    }
                              </View>
                          ))
                        : 
                        <Text style={styles.pageSubTitle}>Você ainda não tem tarefas.</Text>
                        }
                    {loading || this.props.loading ? (
                        <Loading
                            color={
                                loading ? colors.white : colors.orange.default
                            }
                        />
                    ) : null}
                </View>

                <Button
                    text=" + Adicionar Nova Tarefa"
                    style={styles.btnAdd}
                    onPress={() => this.addTask()}
                />
            </Page>
        );
    }
}

const mapStateToProps = ({ tasklist, user }) => ({
    loading: tasklist.loading?.list,
    user: user
});

const mapDispatchToProps = {
    getTaskList,
    setCompletedTask,
    toggleAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskList);
