import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Alert,
  Platform
 } from 'react-native';

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
         imageLoaded: false,
         textLoaded: false,
         imageError: false,
         textError:false,
         src: null,
      }
    }

  /* get block info from dynamodb */
  async fetchBlock() {
    const input = {
      id: this.props.number
    };
    const blockInfo = await API.graphql(graphqlOperation(queries.getBlock, input ));
    if(blockInfo.data.getBlock == null){
      this.onTextError();
    } else {
      this.setState({ block: blockInfo});
      this.onBlockLoad();
    }
  }

  /* get image source from s3 */
  getImageSource() {
    var imageName = this.props.number + '-sm.jpg'
    Storage.get(imageName)
      .then(url => {
        this.setState({
            src: { uri: url }
        });
      });
  }

  componentDidMount(){
    this.getImageSource();
    this.fetchBlock();
  }

  /* set image load to true */
  onImageLoad = () => {
    this.setState(() => ({ imageLoaded: true }))
  }

  /* set image load to false */
  onBlockLoad = () => {
    this.setState(() => ({ textLoaded: true }))
  }

  /* run on image error */
  onImageError = () => {
    this.setState({
      imageLoaded: true,
      imageError: true,
    })
  }

  /* run on text error */
  onTextError(){
    this.setState({
      textLoaded: true,
      textError: true,
    })
  }//

  /* run on text and image error */
  onError = () => {
    Alert.alert("Oops, something went wrong. Try searching for a different number")
    this.props.callback()
  }

  render() {
    return (
      <View>
      {(this.state.imageError) && (this.state.textError) }
      <View style={styles.container}>
        {!this.state.imageError &&
          <View style={styles.leftContainer}>
            <Image
              source={ this.state.src }
              style={ styles.image }
              onLoad={ this.onImageLoad }
              onError={ this.onImageError }
            />
          </View>
        }
        {this.state.imageError &&
        <View style={styles.leftContainer}>
          <Image
              source={require('../assets/images/TCPlogoLight.png')}
              style={ styles.image }
              onLoad={ this.onImageLoad }
              onError={ this.onImageError }
          />
        </View>
        }
        {
          !(this.state.textLoaded && this.state.imageLoaded) &&
          <View style={ styles.centerContainer }>
            <ActivityIndicator size="large" color="#4d3f68" style={{ marginTop: 25, marginLeft: 70 }}/>
          </View>
        }
        {
          (this.state.textLoaded && this.state.imageLoaded && !this.state.textError) &&
          <View style={styles.centerContainer}>
            <View style={styles.leftContainer}>
              <Text style={[styles.numberText, styles.onePlusFontFix]}>{'#'+ (this.props.number) }</Text>
              <Text style={[styles.gradeText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.grade}</Text>
              <Text style={[styles.locationText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.location }</Text>
            </View>
          </View>
        }
        {
          (this.state.textLoaded && this.state.imageLoaded && this.state.textError) &&
          <View style={styles.centerContainer}>
            <View style={styles.leftContainer}>
              <Text style={[styles.numberText, styles.onePlusFontFix]}>{'#'+ (this.props.number) }</Text>
              <Text style={[styles.gradeText, styles.onePlusFontFix]}>Information Unavailable</Text>
            </View>
          </View>
        }
      </View>
      {
          (this.state.textLoaded && this.state.imageLoaded) &&
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
  onePlusFontFix: {
      ...Platform.select({
          ios: { fontFamily: 'Arial', },
          android: { fontFamily: 'Roboto' }
      })
  },
})
