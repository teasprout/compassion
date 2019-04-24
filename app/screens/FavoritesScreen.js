import React from 'react';
import { View,
  AsyncStorage,
  FlatList,
  TouchableHighlight,
  StatusBar } from 'react-native';
import BlockListComp from '../components/BlockListView';
import styles from '../constants/style.js';

const ITEMS = 8;
export default class FavoritesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      keysLoaded: false
    }
  }

  componentDidMount(){
    this.getLikedBlocks();
  }

  /* get list of liked blocks from async storage */
  getLikedBlocks = async () => {
    try {
      const stringKeys = await AsyncStorage.getItem('Liked');
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

  /* Empty callback for BlockListComp */
  emptyFunction() {
  }

 /* callback for block screen. reloads liked blocks in case the user unlikes the block */
  onGoBack = () => {
    this.getLikedBlocks()
  }

  render() {
    return (
      <View style={styles.containerLeft}>
        <StatusBar barStyle='light-content'/>
        {/* list of blocks */}
        { this.state.keysLoaded &&
          <FlatList
            data={this.state.viewableItems}
            onEndReached={this.loadMoreBlocks.bind(this)}
            onEndReachedThreshold={0.5}
            renderItem={({item}) =>
              <TouchableHighlight onPress={() => {this.props.navigation.navigate('Block', { number: parseInt(item.key), onGoBack: this.onGoBack.bind(this) })} }>
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
