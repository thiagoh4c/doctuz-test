import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Animated,
    TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

import themes from './styles';
import { colors } from '@styles/_variables';
import main from '@styles/main';
import BaseView from '@components/BaseView';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '@components/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Select extends Component {
    state = {
        value: '',
        isFieldActive: false,
        modalActive: false,
        searching: false,
        selectedItem: {
            value: null,
        },
        items: [],
        searchItems: [],
    };

    constructor(props) {
        super(props);

        const { value } = this.props;

        this.position = new Animated.Value(value ? 1 : 0);
        this.theme = this.props.theme || 'default';
        this.state.isFieldActive = value ? true : false;
        this.state.value = this.props.value;
        // this.state.items = this.props.items;
        this.form = this.props.form;
        this.name = this.props.name;

        // if(this.props.selected){
        //     this.selectItem(this.props.selected);
        // }
    }

    _returnAnimatedTitleStyles = () => {
        var { isFieldActive } = this.state;
        var { selectedItem } = this.state;

        isFieldActive = selectedItem.value ? true : isFieldActive;

        let style = isFieldActive
            ? themes.titleActive[this.theme]
            : themes.title[this.theme];

        let newStyle = {
            ...style,
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [17, 30],
            }),
        }

        return newStyle;
    };

    toggleModal(status) {
        this.setState({ modalActive: status });
    }

    selectItem(value) {
        let items = this.props.items;
        items = items.map(item => ({ ...item, selected: item.value == value }));

        let selected = items.find(x => x.value == value);

        // console.log('selected value', selected, value);

        this.setState({ selectedItem: selected, searching: false });

        if (this.form) this.form.setFieldValue(this.name, value);
        if (this.props.onSelect) this.props.onSelect(value);

        this.toggleModal(false);
    }

    onSearch(term) {
        let searchItems = this.props.items.filter(item =>
            item.label.toLowerCase().includes(term.toLowerCase()),
        );
        
        this.setState({ searching: !!term, searchItems });
    }

    render() {
        var { placeholder, selected, selectedItem, type } = this.props;
        var { selectedItem } = this.state;

        let inputStyles = [themes.input[this.theme]];
        let invalid = false;

        if (this.form && this.props.form.errors[this.name]) {
            invalid = true;
            inputStyles.push(themes.inputError);
            placeholder += ` (${this.props.form.errors[this.name]})`;
        }

        if(type == 'state' && selected && selectedItem.value == undefined){
            this.selectItem(selected);
        }

        if(type == 'city' && selectedItem.value == undefined){
            let cities = this.props.items;
            let selectedCity = cities.find(item => {return selected == item.value});

            if(selectedCity){
                this.selectItem(selectedCity.value);
            }
        }

        let items = this.state.searching
            ? this.state.searchItems
            : this.props.items;

        return (
            <>
                <Modal
                    propagateSwipe={true}
                    isVisible={this.state.modalActive}
                    style={themes.modal}>
                    <View style={themes.selectWrapper}>
                        <Text style={main.pageSubtitle}>{placeholder}</Text>
                        <View style={themes.searchWrapper}>
                            <Icon
                                name="search"
                                color={colors.gray.dark}
                                size={18}
                            />
                            <TextInput
                                onChange={({ nativeEvent: { text } }) =>
                                    this.onSearch(text)
                                }
                                placeholder="Procurar..."
                                style={themes.searchInput}
                            />
                        </View>
                        <ScrollView style={themes.selectItemsWrapper}>
                            {items.map(item => (
                                <TouchableOpacity
                                    key={item.value}
                                    style={themes.selectItem}
                                    onPress={() => this.selectItem(item.value)}
                                    activeOpacity={0.8}>
                                    <Text
                                        style={[
                                            themes.selectItemText,
                                            this.state.selectedItem.value ==
                                            item.value
                                                ? themes.selectItemTextActive
                                                : null,
                                        ]}>
                                        {item.label}
                                    </Text>
                                    {this.state.selectedItem.value ==
                                    item.value ? (
                                        <View style={themes.selectItemCheck} />
                                    ) : null}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Button
                            text="FECHAR"
                            theme="olive"
                            onPress={() => this.toggleModal(false)}
                        />
                    </View>
                </Modal>
                <View style={themes.wrapper[this.theme]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.toggleModal(true)}
                        style={inputStyles}>
                        <Animated.Text
                            style={[
                                themes.title[this.theme],
                                this._returnAnimatedTitleStyles(),
                                invalid ? themes.titleError : {},
                            ]}>
                            {placeholder}
                        </Animated.Text>
                        <Text style={themes.selectValue[this.theme]}>
                            {this.state.selectedItem?.label}
                        </Text>
                        <View style={themes.caret[this.theme]}>
                            <FontAwesome
                                name="chevron-down"
                                size={15}
                                color={themes.caretColor[this.theme]}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}
