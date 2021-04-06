import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import main from '@styles/main';
import Page from '@components/Page';
import Button from '@components/Button';

import { getTaskList } from '@store/tasklist';
import { setUser } from '@store/user';

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
                });
        });

        this.content = {
            ...DefaultContent,
        };
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
                              <TouchableOpacity
                                  style={styles.tasks}
                                  key={item.id}
                                  onPress={() => this.seeDetails(item)}
                                  activeOpacity={0.9}>
                                  <View style={styles.containerTask}>
                                    <Text style={styles.tasksTitle}>
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={styles.tasksText}>
                                        {item.text}
                                    </Text>
                                  </View>
                                  <Text>Ver</Text>
                              </TouchableOpacity>
                          ))
                        : null}
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
                    theme="transparent"
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
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TaskList);
