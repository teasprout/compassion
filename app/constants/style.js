import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    containerLeft: {
        flex: 1,
        backgroundColor: '#fff',
    },
    onePlusFontFix: {
        ...Platform.select({
            ios: { fontFamily: 'Arial', },
            android: { fontFamily: 'Roboto' }
        })
    },
    textBox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        color: '#222',
        fontSize: 14
    },
    searchBox: {
      height: 40,
      width: 345,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginLeft: 5,
    },
    logo: {
      width: 375,
      height: 200,
      alignItems: 'center',
      resizeMode: 'contain',
      marginTop: 30,
      marginBottom: 10,
      marginLeft: -10,
    },
    image:{
        height: 180,
        width: 398,
        resizeMode: 'contain',
        marginTop: 20,
    },
    imageL:{
        flex:1,
        maxWidth: '90%',
        height: 75,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    imageM:{
        maxHeight: 150,
        width: '40%',
        resizeMode: 'contain'
    },
    imageS:{
        maxHeight: 100,
        width: '40%',
        resizeMode: 'contain'
    },
    h1:{
      fontSize: 30,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    h2:{
        fontSize: 25,
        color:'#664ea0',
        fontWeight: 'bold',
        marginTop: 15,
    },
    h3:{
        fontSize: 12,
        color:'#664ea0',
        marginTop: 5,
    },
    subtitle:{
        fontSize: 15,
        color: '#757575',
        marginLeft: 8,
        marginRight: 8,
        alignSelf:'center'
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    col:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    name:{
        fontSize: 20,
        color: '#616161',
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        alignSelf: 'center'
    },
    card:{
        width: '95%'
    },
    colorWhite:{
        backgroundColor: 'white'
    },
    haikuText: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        color: '#222',
        fontSize: 14,
        fontStyle: 'italic'
    },
    linkText: {
        color:'#1494c6',
        marginTop: 5,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
});
