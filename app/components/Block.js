import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform,
  Alert,
  AsyncStorage,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements';

/*   Amplify Imports. RELATIVE PATHS */
import * as queries from '../src/graphql/queries'
import * as mutations from '../src/graphql/mutations'
import Amplify, { Storage } from 'aws-amplify';
import API, { graphqlOperation } from '@aws-amplify/api';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

/* Sizing Constants */
const blockSide = Dimensions.get('window').width;
const leftMargin = 15;
const topMargin = 5;
const textSize = 16;

export default class BlockComp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
         imageLoaded: false,
         textLoaded: false,
         imageError: false,
         textError:false,
         src: null,
         blockLiked: false,
         viewRecorded: false,
      }
    }

  /* Fetch block info from database */
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

  /* Increment number of views in the database */
  async incrementViews() {
    var blockInfo = this.state.block.data.getBlock;
    var viewsAsInt = parseInt(blockInfo.views);
    viewsAsInt = viewsAsInt + 1;
    blockInfo.views = viewsAsInt.toString()

    var updateInfo = await API.graphql(graphqlOperation(mutations.updateBlock, { input: blockInfo } ));
  }

  /* Increment number of likes in the database */
  async incrementLikes() {
    var blockInfo = this.state.block.data.getBlock;
    var likesAsInt = parseInt(blockInfo.likes);
    likesAsInt = likesAsInt + 1;
    blockInfo.likes = likesAsInt.toString()

    var updateInfo = await API.graphql(graphqlOperation(mutations.updateBlock, { input: blockInfo } ));
  }

  /* Decrement number of likes in the database */
  async decrementLikes() {
    var blockInfo = this.state.block.data.getBlock;
    var likesAsInt = parseInt(blockInfo.likes);
    likesAsInt = likesAsInt - 1;
    blockInfo.likes = likesAsInt.toString()

    var updateInfo = await API.graphql(graphqlOperation(mutations.updateBlock, { input: blockInfo } ));
  }

  /* Get url for image in cloud */
  getImageSource() {
    var imageName = this.props.number + '-lg.jpg'
    Storage.get(imageName)
      .then(url => {
        this.setState({
            src: { uri: url }
        });
      });
  }

  /* Check whether or not the user has liked this block in AsyncStorage  */
  async checkForLike() {
    /*
      Try to get Liked from AsyncStorage. If the user has not liked anything,
      getItem will throw an exception. This shouldn't be a problem, though,
      as blockLiked is set to false by default
    */
    try {
      var liked = await AsyncStorage.getItem('Liked');
      const items = JSON.parse(liked);
      const keys = Object.keys(items);

      if(keys.includes( this.props.number.toString() )){
        this.setState({blockLiked: true});
      }
    } catch(error) {
      console.log(error);
    }
  }

  /* fetch data from AWS and check for like when the component mounts */
  componentDidMount(){
    this.getImageSource();
    this.fetchBlock();
    this.checkForLike();
  }

  /* change state when the image has loaded */
  onImageLoad = () => {
    this.setState({ imageLoaded: true, imageError: false }, this.onChangeState.bind(this))
  }

  /* change state when the statement has loaded */
  onBlockLoad() {
    this.setState({ textLoaded: true, textError:false }, this.onChangeState.bind(this))
  }

  /* method called when user clicks the heart button and the block isn't liked */
  async onLike() {
    Alert.alert("Favorited!", "You can view your Favorited blocks in the Favorites tab");
    this.setState({blockLiked: true });
    var numAsString = this.props.number.toString();
    var time = Date.now();
    try {
      let blockInfo = {
        [ numAsString ] : {
          key: numAsString,
          time: time,
        }
      }

      await AsyncStorage.mergeItem('Liked', JSON.stringify(blockInfo));
    } catch (error) {
      console.log(error);
    }
    if(!this.state.textError){
      this.incrementLikes();
    }
  }

  /* method called when user clicks the heart button and the block is liked */
  async onDislike() {
    Alert.alert("Unfavorited");
    this.setState({blockLiked: false });
    var numAsString = this.props.number.toString();

    try {
      var liked = await AsyncStorage.getItem('Liked');
      var likedObject = JSON.parse(liked);

      delete likedObject[numAsString];
      await AsyncStorage.setItem('Liked', JSON.stringify(likedObject));
    } catch (error) {
      console.log(error);
    }
    if(!this.state.textError){
      this.decrementLikes();
    }
  }

  /*
   * callback for each time imageLoaded, textLoaded, textError, or imageError is changed.
   * if the block is loaded succesfully, log this in AsyncStorage.
   * otherwise, call the onError to return to the previous screen
   */
  async onChangeState() {
    if(this.state.imageLoaded
       && this.state.textLoaded
       && !this.state.viewRecorded
       && !(this.state.textError && this.state.imageError)){
      var numAsString = this.props.number.toString();
      var time = Date.now();
      try {
        let blockInfo = {
          [ numAsString ] : {
            key: numAsString,
            time: time
          }
        }

        await AsyncStorage.mergeItem('History', JSON.stringify(blockInfo));
      } catch (error) {
        console.log(error);
      }
      if(!this.state.textError){
        this.incrementViews();
      }
      this.setState({ viewRecorded: true })
    }
    if(this.state.textError && this.state.imageError) {
        this.onError()
    }
  }

  /* run when there is an image error. if there is not also a text error, we will display default images */
  onImageError = () => {
    this.setState({
      imageLoaded: true,
      imageError: true,
    }, this.onChangeState.bind(this))
  }

  /* run when there is an text error. if there is not also a image error, we will display default "No artist statement available"*/
  onTextError(){
    this.setState({
      textLoaded: true,
      textError: true,
    }, this.onChangeState.bind(this))
  }

  /*
   * run when there is both an image and text error.
   * this displays an error message and returns the user to the previous screen
   */
  onError = () => {
    Alert.alert("Oops, something went wrong. Try searching for a different number. ")
    this.props.callback()
  }

  /* change the status of like and call appropriate funtion */
  toggleLike(){
    if(this.state.blockLiked){
      this.onDislike()
    } else {
      this.onLike()
    }
  }


  /* double tap handler. calculate time between taps of picture and toggleLike is sufficiently close together */
  lastTap = null
  delay = 3000
  imageTap = () => {
    const now = Date.now();
    if (this.lastTap && (now - this.lastTap) < this.delay) {
      this.toggleLike();
    } else {
      this.lastTap = now
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {(!this.state.imageError) &&
          <View style={styles.centerContainer}>
            <TouchableWithoutFeedback onPress={this.imageTap}>
              <Image
                source={ this.state.src }
                style={ styles.image }
                onLoad={ this.onImageLoad.bind(this) }
                onError={ this.onImageError.bind(this) }
              />
            </TouchableWithoutFeedback>
          </View>
          }

          {/*show the logo and an error message when the image can't be found*/}
          {(this.state.imageError && !this.state.textError && this.state.textLoaded) &&
            <TouchableWithoutFeedback onPress={this.imageTap}>
              <View style={styles.centerContainer}>
                <Image source={require('../assets/images/TCPlogoLight.png')} style={styles.image}/>
                <Text style={styles.imageErrorText}>No Image{"\n"} Found</Text>
              </View>
            </TouchableWithoutFeedback>
          }
          {!(this.state.textLoaded && this.state.imageLoaded) &&
            <ActivityIndicator size="large" color="#4d3f68"/>
          }
          {!(this.state.textLoaded && this.state.imageLoaded) &&
            <Text style={styles.loadText}>Hold on, let us get that for you</Text>
          }

          {
            (this.state.textLoaded && this.state.imageLoaded && !this.state.blockLiked) &&
            <View style={styles.leftContainer}>
              <View style={styles.icon}>
                <Icon
                  name={Platform.OS === 'ios' ? `ios-heart-outline` : 'md-heart-outline'}
                  type='ionicon'
                  onPress={this.onLike.bind(this)}
                  color="#000"
                  style={styles.icon}
                  size={30}
                />
              </View>
            </View>
          }
          {(this.state.textLoaded && this.state.imageLoaded && this.state.blockLiked) &&
            <View style={styles.leftContainer}>
              <View style={styles.icon}>
                <Icon
                  name={Platform.OS === 'ios' ? `ios-heart` : 'md-heart'}
                  type='ionicon'
                  onPress={this.onDislike.bind(this)}
                  color="#664ea0"
                  style={styles.icon}
                  size={30}
                />
              </View>
            </View>
          }

          {(this.state.textLoaded && this.state.imageLoaded && this.state.textError) &&
            <View style={{flex: 1, height: 5, width: 5}}/>
          }
          {(this.state.textLoaded && this.state.imageLoaded) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.numberText, styles.onePlusFontFix]}>{'#'+ (this.props.number) }</Text>
            </View>
          }
          {
            (this.state.textLoaded && this.state.imageLoaded && !this.state.textError) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.gradeText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.grade}</Text>
            </View>
          }
          {
            (this.state.textLoaded && this.state.imageLoaded && !this.state.textError) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.locationText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.location}</Text>
            </View>
          }
          {
            (this.state.textLoaded && this.state.imageLoaded && !this.state.textError) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.statementText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.statement}</Text>
            </View>
          }
          {
            (this.state.textLoaded && this.state.imageLoaded && this.state.textError) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.statementText, styles.onePlusFontFix]}>No Artist Statement Found</Text>
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: blockSide,
    width: blockSide,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  imageErrorText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: -225,
    marginBottom: 179
  },
  loadText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    height: 60,
    fontStyle: 'italic',
  },
  statementText: {
    fontSize: textSize,
    color: '#222',
    textAlign: 'left',
    marginLeft: leftMargin,
    marginRight: leftMargin,
    marginTop: topMargin,
  },
  numberText: {
    fontSize: textSize,
    color: '#666',
    textAlign: 'left',
    marginLeft: leftMargin,
    // marginTop: 5,
  },
  gradeText: {
    fontSize: textSize,
    color: '#222',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: leftMargin,
    marginTop: topMargin,
  },
  locationText: {
    fontSize: textSize,
    color: '#222',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: leftMargin,
    marginTop: topMargin,
  },
  leftContainer: {
    alignItems: 'flex-start'
  },
  grayCenterContainer: {
    alignItems: 'center',
    backgroundColor: "#e6e6e6"
  },
  centerContainer: {
    alignItems: 'center',
    backgroundColor: "#ffffff"
  },
  icon: {
    marginLeft: leftMargin,
    marginTop: 5
  },
  onePlusFontFix: {
      ...Platform.select({
          ios: { fontFamily: 'Arial', },
          android: { fontFamily: 'Roboto' }
      })
  },
})
