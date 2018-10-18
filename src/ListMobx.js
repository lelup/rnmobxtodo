import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native'

import taskListStore from './store/TaskListStore';
import { observer } from 'mobx-react/native'
/* @observable, @computed @action -> decorators ES7
 npm i babel-plugin-transform-decorators-legacy --save-dev
 add in .babelrc
 {
 "presets": ["react-native"],
 "plugins": ["transform-decorators-legacy"]
 }
 create .tsconfig.json
 add:
 {
 "compilerOptions": {
 "experimentalDecorators": true,
 "allowJs": true
 }
 }
*/
@observer // khi store update component sẽ không đổi

export default class ListMobx extends Component {

    renderItem = ({ item, index }) => {
        let done = `✅`;
        let clock = `🕘`;
        let close = `❌`;
        return (
            <View style={styles.itemContainer}>
                <View>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={() => taskListStore.finishItem(index)}>
                        <Text> {(item.isFinished) ? done : clock} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'black' }}>{item.title}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={() => taskListStore.deleteItem(index)}>
                        <Text>{close}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const list = taskListStore.list.slice() // don't forget copy the list from store

        return (
            <FlatList
                style={styles.container}
                data={list}
                extraData={list}
                keyExtractor={(item, index) => `${index}`}
                renderItem={this.renderItem}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1F5FE',
        paddingTop: 20
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        borderColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowColor: 'gray',
        elevation: 2
    }
})