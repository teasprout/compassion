import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert } from 'react-native';

/* Amplify Imports. RELATIVE PATHS */
import * as queries from '../src/graphql/queries'
import Amplify, { Storage } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

const margin = 15;

export default class BlockListComp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         image_loaded: false,
         text_loaded: false,
         image_error: false,
         text_error:false,
         src: null,
      }
    }

  async fetch_block() {
    const input = {
      id: this.props.number
    };
    const blockInfo = await API.graphql(graphqlOperation(queries.getBlock, input ));
    console.log(blockInfo);
    if(blockInfo.data.getBlock == null){
      this._on_text_error();
    } else {
      this.setState({ block: blockInfo});
      this._on_block_load();
    }
  }

  get_image_source() {
    var image_name = this.props.number + '-sm.jpg'
    Storage.get(image_name)
      .then(url => {
        this.setState({
            src: { uri: url }
        });
        console.log(url);
      });
  }

  componentDidMount(){
    this.get_image_source();
    this.fetch_block();
  }

  _on_image_load = () => {
    this.setState(() => ({ image_loaded: true }))
  }

  _on_block_load = () => {
    this.setState(() => ({ text_loaded: true }))
  }

  _on_image_error = () => {
    this.setState({
      image_loaded: true,
      image_error: true,
    })
  }

  _on_text_error(){
    this.setState({
      text_loaded: true,
      text_error: true,
    })
  }//

  _on_error = () => {
    Alert.alert("Oops, something went wrong. Try searching for a different number")
    this.props.callback()
  }

  render() {
    return (
      <View>
      {(this.state.image_error) && (this.state.text_error) }
      <View style={styles.container}>
        {!this.state.image_error &&
          <View style={styles.leftContainer}>
            <Image
              source={ this.state.src }
              style={ styles.image }
              onLoad={ this._on_image_load }
              onError={ this._on_image_error }
            />
          </View>
        }
        {this.state.image_error &&
        <View style={styles.leftContainer}>
          <Image
              source={require('../assets/images/TCPlogoLight.png')}
              style={ styles.image }
              onLoad={ this._on_image_load }
              onError={ this._on_image_error }
          />
        </View>
        }
        {
          !(this.state.text_loaded && this.state.image_loaded) &&
          <View style={ styles.centerContainer }>
            <ActivityIndicator size="large" color="#4d3f68" style={{ marginTop: 25, marginLeft: 70 }}/>
          </View>
        }
        {
          (this.state.text_loaded && this.state.image_loaded && !this.state.text_error) &&
          <View style={styles.centerContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.numberText}>{'#'+ (this.props.number) }</Text>
              <Text style={styles.gradeText}>{this.state.block.data.getBlock.grade}</Text>
              <Text style={styles.locationText}>{this.state.block.data.getBlock.location }</Text>
            </View>
          </View>
        }
        {
          (this.state.text_loaded && this.state.image_loaded && this.state.text_error) &&
          <View style={styles.centerContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.numberText}>{'#'+ (this.props.number) }</Text>
              <Text style={styles.gradeText}>Information Unavailable</Text>
            </View>
          </View>
        }
      </View>
      {
          (this.state.text_loaded && this.state.image_loaded) &&
          <View style={{ height: 1, backgroundColor: '#ddd', alignItems: 'stretch' }}/>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  image: {
    width: 75,
    height: 75,
    marginLeft: margin,
    marginTop: margin,
    marginBottom: margin,
    resizeMode: 'contain',
  },
  loadText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    height: 60,
    fontStyle: 'italic',
  },
  locationText: {
    fontSize: 14,
    color: '#222',
    textAlign: 'left',
    marginLeft: margin,
    marginRight: margin,
    marginTop: 3,
    marginBottom: margin + 5,
  },
  numberText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginLeft: margin,
    marginTop: margin + 5,
  },
  gradeText: {
    fontSize: 18,
    color: '#222',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: margin,
    marginTop: 2,
  },
  leftContainer: {
    alignItems: 'flex-start'
  },
  centerContainer: {
    alignItems: 'center'
  },
})
