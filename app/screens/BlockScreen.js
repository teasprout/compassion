import React from 'react';
import { Platform,
    View,
    StatusBar } from 'react-native';
import BlockComp from '../components/Block';
import { Icon } from 'react-native-elements';
import styles from '../constants/style.js';

const navColor = '#664ea0';

export default class BlockScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <View style={{
              marginLeft: 20,
            }}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                type='ionicon'
                onPress={() => {
                    navigation.state.params.onGoBack()
                    navigation.goBack()
                  }
                }
                color="#ffffff"
                underlayColor={navColor}
                size={35}
              />
            </View>
      )
    };
  }

  _search_again = () => {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <BlockComp
          /* CHANGE DEFAUlT PARAMETER HERE TO ERROR PARAMETER */
          number={ JSON.stringify(this.props.navigation.getParam('number', 0))}
          callback={this._search_again}
        />
      </View>
    );
  }
}
