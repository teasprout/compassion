import React from 'react';
import {
  View,
  AsyncStorage,
  FlatList,
  TouchableHighlight,
  StatusBar } from 'react-native';
import BlockListComp from '../components/BlockListView';
import styles from '../constants/style.js';

const ITEMS = 8;
export default class HistoryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keysLoaded: false
    }
  }

  componentDidMount(){
    this._get_viewed_blocks();
  }

  _get_viewed_blocks = async () => {
    try {
      const stringKeys = await AsyncStorage.getItem('History');
      const keys = JSON.parse(stringKeys);
      const items = Object.values(keys).sort((a, b) => parseInt(b.time) - parseInt(a.time));
      console.log(items);
      const viewableItems = items.slice(0, ITEMS);
      this.setState({
        items: items,
        keysLoaded: true,
        viewableItems: viewableItems,
        page: 1,
      });
    } catch(error) {
      console.log(error);
    }
  }

  _loadMoreBlocks(){
    console.log("loading more blocks")
    const { page } = this.state;
    const start = page * ITEMS;
    const end = (page + 1) * ITEMS - 1;

    const newItems = this.state.items.slice(start, end);

    this.setState({
        viewableItems: [...this.state.viewableItems, ...newItems],
        page: page + 1
    })
  }

  empty_function() {
  }

  _on_goBack = () => {
    this._get_viewed_blocks()
  }

  render() {
    return (
      <View style={styles.containerLeft}>
        <StatusBar barStyle='light-content'/>
        { this.state.keysLoaded &&
          <FlatList
            data={this.state.viewableItems}
            onEndReached={this._loadMoreBlocks.bind(this)}
            onEndReachedThreshold={0.5}
            renderItem={({item}) =>
              <TouchableHighlight onPress={() => {this.props.navigation.push('Block', { number: parseInt(item.key), onGoBack: this._on_goBack.bind(this)})} }>
                <View>
                <BlockListComp
                  number={ item.key }
                  callback={ this.empty_function }
                />
                </View>
              </TouchableHighlight>
            }
          />
        }
      </View>
    );
  }
}
