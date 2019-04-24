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
    this.getViewedBlocks();
  }

  /* get list of viewed blocks from AsyncStorage */
  getViewedBlocks = async () => {
    try {
      const stringKeys = await AsyncStorage.getItem('History');
      const keys = JSON.parse(stringKeys);
      const items = Object.values(keys).sort((a, b) => parseInt(b.time) - parseInt(a.time));
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

  /* load more blocks when user scrolls past a certain threshold */
  loadMoreBlocks(){
    const { page } = this.state;
    const start = page * ITEMS;
    const end = (page + 1) * ITEMS - 1;

    const newItems = this.state.items.slice(start, end);

    this.setState({
        viewableItems: [...this.state.viewableItems, ...newItems],
        page: page + 1
    })
  }

  emptyFunction() {
  }

  /* callback for block screen. reloads viewed blocks to bring most recent block to the top */
  onGoBack = () => {
    this.getViewedBlocks()
  }

  render() {
    return (
      <View style={styles.containerLeft}>
        <StatusBar barStyle='light-content'/>
        {/* list of viewed blocks */}
        { this.state.keysLoaded &&
          <FlatList
            data={this.state.viewableItems}
            onEndReached={this.loadMoreBlocks.bind(this)}
            onEndReachedThreshold={0.5}
            renderItem={({item}) =>
              <TouchableHighlight onPress={() => {this.props.navigation.push('Block', { number: parseInt(item.key), onGoBack: this.onGoBack.bind(this)})} }>
                <View>
                <BlockListComp
                  number={ item.key }
                  callback={ this.emptyFunction }
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
