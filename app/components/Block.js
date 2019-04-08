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

const blockSide = Dimensions.get('window').width;
const leftMargin = 15;
const topMargin = 5;
const textSize = 16;

export default class BlockComp extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
         image_loaded: false,
         text_loaded: false,
         image_error: false,
         text_error:false,
         src: null,
         block_liked: false,
         view_recorded: false,
      }
    }

  /* Fetch block info from database */
  async fetch_block() {
    const input = {
      id: this.props.number
    };
    const blockInfo = await API.graphql(graphqlOperation(queries.getBlock, input ));
    if(blockInfo.data.getBlock == null){
      this._on_text_error();
    } else {
      console.log(blockInfo);
      this.setState({ block: blockInfo});
      this._on_block_load();
    }
    this._on_view()
  }

  /* Increment number of views in the database */
  async incrementViews() {
    var blockInfo = this.state.block.data.getBlock;
    var viewsAsInt = parseInt(blockInfo.views);
    viewsAsInt = viewsAsInt + 1;
    blockInfo.views = viewsAsInt.toString()

    var updateInfo = await API.graphql(graphqlOperation(mutations.updateBlock, { input: blockInfo } ));
    console.log(updateInfo);
  }

  /* Increment number of likes in the database */
  async incrementLikes() {
    var blockInfo = this.state.block.data.getBlock;
    var likesAsInt = parseInt(blockInfo.likes);
    likesAsInt = likesAsInt + 1;
    blockInfo.likes = likesAsInt.toString()

    var updateInfo = await API.graphql(graphqlOperation(mutations.updateBlock, { input: blockInfo } ));
    console.log(updateInfo);
  }

  /* Decrement number of likes in the database */
  async decrementLikes() {
    var blockInfo = this.state.block.data.getBlock;
    var likesAsInt = parseInt(blockInfo.likes);
    likesAsInt = likesAsInt - 1;
    blockInfo.likes = likesAsInt.toString()

    var updateInfo = await API.graphql(graphqlOperation(mutations.updateBlock, { input: blockInfo } ));
    console.log(updateInfo);
  }

  /* Get url for image in cloud */
  get_image_source() {
    var image_name = this.props.number + '-lg.jpg'
    Storage.get(image_name)
      .then(url => {
        this.setState({
            src: { uri: url }
        });
        // console.log(url);
      });
  }

  /* Check whether or not the user has liked this block in async storage  */
  async _check_for_like() {
    /*
      Try to get Liked from AsyncStorage. If the user has not liked anything,
      getItem will throw an exception. This shouldn't be a problem, though,
      as block_liked is set to false by default
    */
    try {
      var liked = await AsyncStorage.getItem('Liked');
      console.log(liked);
      const items = JSON.parse(liked);
      const keys = Object.keys(items);

      if(keys.includes( this.props.number.toString() )){
        this.setState({block_liked: true});
      }
    } catch(error) {
      console.log(error);
    }
  }

  /* fetch data from AWS and check for like when the component mounts */
  componentDidMount(){
    this.get_image_source();
    this.fetch_block();
    this._check_for_like();
  }

  /* change state when the image has loaded */
  _on_image_load = () => {
    this.setState(() => ({ image_loaded: true, image_error: false }))
    this._on_view()
  }

  /* change state when the statement has loaded */
  _on_block_load = () => {
    this.setState(() => ({ text_loaded: true, text_error:false }))
  }

  /*
   method called when user clicks the heart button
  */
  async _on_like() {
    Alert.alert("Favorited!", "You can view your Favorited blocks in the Favorites tab");
    this.setState({block_liked: true });
    var num_as_string = this.props.number.toString();
    var time = Date.now();
    try {
      let blockInfo = {
        [ num_as_string ] : {
          key: num_as_string,
          time: time,
        }
      }

      await AsyncStorage.mergeItem('Liked', JSON.stringify(blockInfo));
    } catch (error) {
      console.log(error);
    }
    if(!this.state.text_error){
      this.incrementLikes();
    }
  }

  async _on_dislike() {
    Alert.alert("Unfavorited");
    this.setState({block_liked: false });
    var num_as_string = this.props.number.toString();

    try {
      var liked = await AsyncStorage.getItem('Liked');
      var likedObject = JSON.parse(liked);

      delete likedObject[num_as_string];
      console.log(likedObject);
      await AsyncStorage.setItem('Liked', JSON.stringify(likedObject));
    } catch (error) {
      console.log(error);
    }
    if(!this.state.text_error){
      this.decrementLikes();
    }
  }

  async _on_view() {
    if(this.state.image_loaded
       && this.state.text_loaded
       && !this.state.view_recorded
       && !(this.state.text_error && this.state.image_error)){
      var num_as_string = this.props.number.toString();
      var time = Date.now();
      try {
        let blockInfo = {
          [ num_as_string ] : {
            key: num_as_string,
            time: time
          }
        }

        await AsyncStorage.mergeItem('History', JSON.stringify(blockInfo));
      } catch (error) {
        console.log(error);
      }
      if(!this.state.text_error){
        this.incrementViews();
      }
      this.setState({ view_recorded: true })
    }
  }

  _on_image_error = () => {
    this.setState({
      image_loaded: true,
      image_error: true,
    })
    this._on_view()
  }


  _on_text_error(){
    this.setState({
      text_loaded: true,
      text_error: true,
    })
  }

  _on_error = () => {
    Alert.alert("Oops, something went wrong. Try searching for a different number. ")
    this.props.callback()
  }

  _toggle_like(){
    if(this.state.block_liked){
      this._on_dislike()
    } else {
      this._on_like()
    }
  }


  lastTap = null
  delay = 3000
  _image_tap = () => {
    const now = Date.now();
    if (this.lastTap && (now - this.lastTap) < this.delay) {
      this._toggle_like();
    } else {
      this.lastTap = now
    }
  }

  render() {
    return (
      <ScrollView>
        {/* If both errors occured, call _on_error*/}
        {(this.state.image_error) && (this.state.text_error) && (this._on_error())}
        <View style={styles.container}>
          {(!this.state.image_error) &&
          <View style={styles.centerContainer}>
            <TouchableWithoutFeedback onPress={this._image_tap}>
              <Image
                source={ this.state.src }
                style={ styles.image }
                onLoad={ this._on_image_load }
                onError={ this._on_image_error.bind(this) }
              />
            </TouchableWithoutFeedback>
          </View>
          }

          {/*show the logo and an error message when the image can't be found*/}
          {(this.state.image_error && !this.state.text_error && this.state.text_loaded) &&
            <TouchableWithoutFeedback onPress={this._image_tap}>
              <View style={styles.centerContainer}>
                <Image source={require('../assets/images/TCPlogoLight.png')} style={styles.image}/>
                <Text style={styles.imageErrorText}>No Image{"\n"} Found</Text>
              </View>
            </TouchableWithoutFeedback>
          }
          {!(this.state.text_loaded && this.state.image_loaded) &&
            <ActivityIndicator size="large" color="#4d3f68"/>
          }
          {!(this.state.text_loaded && this.state.image_loaded) &&
            <Text style={styles.loadText}>Hold on, let us get that for you</Text>
          }

          {
            (this.state.text_loaded && this.state.image_loaded && !this.state.block_liked) &&
            <View style={styles.leftContainer}>
              <View style={styles.icon}>
                <Icon
                  name={Platform.OS === 'ios' ? `ios-heart-outline` : 'md-heart-outline'}
                  type='ionicon'
                  onPress={this._on_like.bind(this)}
                  color="#000"
                  style={styles.icon}
                  size={30}
                />
              </View>
            </View>
          }
          {(this.state.text_loaded && this.state.image_loaded && this.state.block_liked) &&
            <View style={styles.leftContainer}>
              <View style={styles.icon}>
                <Icon
                  name={Platform.OS === 'ios' ? `ios-heart` : 'md-heart'}
                  type='ionicon'
                  onPress={this._on_dislike.bind(this)}
                  color="#664ea0"
                  style={styles.icon}
                  size={30}
                />
              </View>
            </View>
          }

          {(this.state.text_loaded && this.state.image_loaded && this.state.text_error) &&
            <View style={{flex: 1, height: 5, width: 5}}/>
          }
          {(this.state.text_loaded && this.state.image_loaded) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.numberText, styles.onePlusFontFix]}>{'#'+ (this.props.number) }</Text>
            </View>
          }
          {
            (this.state.text_loaded && this.state.image_loaded && !this.state.text_error) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.gradeText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.grade}</Text>
            </View>
          }
          {
            (this.state.text_loaded && this.state.image_loaded && !this.state.text_error) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.locationText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.location}</Text>
            </View>
          }
          {
            (this.state.text_loaded && this.state.image_loaded && !this.state.text_error) &&
            <View style={styles.leftContainer}>
              <Text style={[styles.statementText, styles.onePlusFontFix]}>{this.state.block.data.getBlock.statement}</Text>
            </View>
          }
          {
            (this.state.text_loaded && this.state.image_loaded && this.state.text_error) &&
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
    marginTop: topMargin
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
})
