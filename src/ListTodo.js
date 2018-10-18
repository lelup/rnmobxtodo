import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native'

export default class TaskListScreen extends Component {

    state = {
        data: [
            { title: 'Go to the office', isFinished: true },
            { title: 'Prepare tasks for today', isFinished: false },
            { title: 'Team meeting', isFinished: false },
            { title: 'Commit tasks changed', isFinished: false },
        ]
    }

    onFinishedItem = (index) => {
        const newTaskList = this.state.data
        newTaskList[index].isFinished = true
        this.setState({ data: newTaskList })
    }

    onDeleteItem = (index) => {
        const newTaskList = this.state.data.filter((item, i) => i != index)
        this.setState({ data: newTaskList })
    }

    renderItem = ({ item, index }) => {
        let done = `✅`;
        let clock = `🕘`;
        let close = `❌`;
        return (
            <View style={styles.itemContainer}>
                <View>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={() => this.onFinishedItem(index)}>
                        <Text> {(item.isFinished) ? done : clock} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'black' }}>{item.title}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={() => this.onDeleteItem(index)}>
                        <Text>{close}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { data } = this.state
        return (
            <FlatList
                style={styles.container}
                data={data}
                extraData={this.state}
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