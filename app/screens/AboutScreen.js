import React from 'react';
import {Image,
    Text,
    TouchableOpacity,
    View,
    StatusBar,
    Linking,
    ScrollView,
   } from 'react-native';
import styles from '../constants/style.js';
import { Icon } from 'react-native-elements';

export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/mtlogo.jpg')}
            style={styles.image}
          />
          <Text style={[styles.onePlusFontFix, styles.h2]}>Our Mission</Text>
          <Text style={styles.textBox}>
            The Compassion Project (TCP), a non-partisan, non-religious
            organization and project, is designed to bring the Bozeman community
            and the greater Gallatin County together through education in and
            outside the schools around compassion- what it means, how to
            recognize it, how to practice it, and why it is important.
            It is the hope that this will then be expanded to other communities
            around Montana and beyond.
          </Text>
          <Text style={[styles.onePlusFontFix, styles.h2]}>TCP Mission Haiku</Text>
          <Text style={styles.haikuText}>
            Spreading Compassion{'\n'}
            Through education and art{'\n'}
            For safety, peace, joy{'\n'}
          </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
          <TouchableOpacity style={{marginRight: 20}} onPress={() =>
              Linking.openURL('https://www.facebook.com/CompassionPject')}>
              <Icon
                  name='facebook-box'
                  type='material-community'
                  color='#4d3f68'
                  size={50}
              />
          </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 20}} onPress={() =>
                Linking.openURL('https://www.instagram.com/compassionpject/')}>
                <Icon
                    name='instagram'
                    type='material-community'
                    color='#4d3f68'
                    size={50}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                Linking.openURL('https://rebrand.ly/CompassionMain')}>
                <Icon
                    name='web'
                    type='material-community'
                    color='#4d3f68'
                    size={50}
                />
            </TouchableOpacity>

        </View>
            <TouchableOpacity onPress={() =>
                Linking.openURL('https://docs.google.com/document/d/e/2PACX-1vQz9-C1m8APNXjvPX1M9TR449I-1Y0LF-GmsAdOiL2-tG3bAtXddtkeIcI689CbRa6BxT52F9_-CsgX/pub')}>
                <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    );
  }
}
