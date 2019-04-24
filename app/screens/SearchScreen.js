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

  /*
   * null method to pass as callback.
   * this callback rerenders the history and favorites screen,
   * but does nothing for the search screen
   */
  onGoBack = () => {

  }

  /* ensure the number entered is non empty before passing to BlockScreen */
  checkEntry() {
    if(this.state.number != ''){
      var enteredNumber = parseInt(this.state.number); /* Cast enteredText to an int */
      this.setState({ number: ''});
      this.props.navigation.navigate('Block', { number: enteredNumber, onGoBack: this.onGoBack.bind(this)})
    } else {
      Alert.alert("Please enter a number")
      this.setState({number: ''})
    }
  }

  /* redirect user to sponsors screen when they click sponsors button */
  onSponsors() {
    this.props.navigation.navigate('Sponsors')
  }

 /* redirects user to about screen when they click about button */
  onAbout() {
    this.props.navigation.navigate('About')
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar barStyle='light-content'/>
      {/* TCP MT Logo */}
      <Image source={require('../assets/images/mtlogo3400.png')} style={styles.logo}/>
      {/* text input and purple boundary */}
        <View style={{backgroundColor: '#9785bf', height: 44, width: 354, maxWidth: '90%', borderRadius: 2, marginTop: 10}}>
          <View style={{backgroundColor: '#ffffff', borderRadius: 2, marginTop: 2, marginLeft: 2, marginRight: 2}}>
            <TextInput
              placeholder="Block Number"
              platform='android'
              keyboardType= {Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              returnKeyType= {Platform.OS === 'ios' ? 'done' : 'search'}
              enablesReturnKeyAutomatically={true}
              onChangeText={(text) => this.setState({number: text})}
              onSubmitEditing={this.checkEntry.bind(this)}
              underlineColorAndroid='transparent' // hides extra underline in android text input
              value={this.state.number}
              style={styles.searchBox}
            />

          </View>
        </View>

        <Text style={styles.h3}>Enter the number of the block you want to search for.</Text>


        <View style={searchStyles.bottom}>
            {/* about button */}
            <Button
                icon={{
                    name: 'information-outline',
                    type: 'material-community',
                    size: 20,
                    color: "white"
                }}
                title="About The Compassion Project"
                onPress={this.onAbout.bind(this)}
                buttonStyle={searchStyles.aButton}
            />
            {/* sponsors button */}
            <Button
                icon={{
                    name: 'gift',
                    type: 'material-community',

                    color: "white"
                }}
                title="Our Sponsors"
                containerStyle={{alignItems: 'center'}}
                onPress={this.onSponsors.bind(this)}
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
