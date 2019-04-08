import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
    StatusBar,
    Platform,
    Alert,
 } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../constants/style.js';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
    };
  }

  _on_goBack = () => {

  }

  /* */
  _check_entry() {
    if(this.state.number != ''){
      var enteredNumber = parseInt(this.state.number); /* Cast enteredText to an int */
      this.setState({ number: ''});
      this.props.navigation.navigate('Block', { number: enteredNumber, onGoBack: this._on_goBack.bind(this)})
    } else {
      Alert.alert("Please enter a number")
      this.setState({number: ''})
    }
  }

  _on_sponsors() {
    this.props.navigation.navigate('Sponsors')
  }

  _on_about() {
    this.props.navigation.navigate('About')
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle='light-content'/>
      <Image source={require('../assets/images/mtlogo3400.png')} style={styles.logo}/>
        <View style={{backgroundColor: '#9785bf', height: 44, width: 354, borderRadius: 2, marginTop: 10}}>
          <View style={{backgroundColor: '#ffffff', height: 40, width: 350, borderRadius: 2, marginTop: 2, marginLeft: 2}}>
            <TextInput
              placeholder="Block Number"
              platform='android'
              keyboardType= {Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              returnKeyType= {Platform.OS === 'ios' ? 'done' : 'search'}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) => this.setState({number: text})}
              onSubmitEditing={this._check_entry.bind(this)}
              underlineColorAndroid='transparent' // hides extra underline in android text input
              value={this.state.number}
              style={styles.searchBox}
            />

          </View>
        </View>
        <Text style={styles.h3}>Enter the number of the block you want to search for.</Text>
        <View style={searchStyles.bottom}>
            <Button
                icon={{
                    name: 'information-outline',
                    type: 'material-community',
                    size: 20,
                    color: "white"
                }}
                title="About The Compassion Project"
                onPress={this._on_about.bind(this)}
                buttonStyle={searchStyles.aButton}
            />
            <Button
                icon={{
                    name: 'gift',
                    type: 'material-community',

                    color: "white"
                }}
                title="Our Sponsors"
                containerStyle={{alignItems: 'center'}}
                onPress={this._on_sponsors.bind(this)}
                buttonStyle={searchStyles.aButton}
            />

        </View>
      </View>
    );
  }
}

const searchStyles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
    aButton:{
        backgroundColor: '#9785bf',
        marginBottom: 10,
        width: '100%',
    }
});
