import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    View,
    Linking,
    TouchableWithoutFeedback,
    StatusBar
} from 'react-native';
import { Card } from 'react-native-elements';
import styles from '../constants/style.js';

class InText extends React.Component {
    render() {
        return (
            <ScrollView contentContainerStyle={{alignItems:'center', marginBottom: 20}}>

            <Card
            containerStyle={styles.card}
            title='Commitment to Compassion'>
            <Text style={styles.subtitle}>$10,000 or above</Text>
            <View style={styles.col}>
                {/*Education, Health, & Human Development*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.montana.edu/thecompassionproject/images/sponsor-logos/Logo_EHHD.png')}>
                    <Image source={require('../assets/images/sponsors/logoEHHD.png')}
                    style={{flex:1, maxWidth: '90%', height: 100, resizeMode: 'contain'}}/>
                </TouchableWithoutFeedback>

                {/*Southern Poverty Law Center*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('https://www.splcenter.org/teaching-tolerance')}>
                    <Image source={require('../assets/images/sponsors/logoSPLC.png')}
                    style={{flex:1, maxWidth: '90%', height: 125, resizeMode: 'contain'}}/>
                </TouchableWithoutFeedback>

                {/*Software Factory*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.bobcatsoftwarefactory.com/')}>
                    <Image source={require('../assets/images/SFlogo.png')}
                    style={{flex:1, maxWidth: '90%', height: 175, resizeMode: 'contain'}}/>
                </TouchableWithoutFeedback>
            </View>
            </Card>

            {/*<Text style={styles.h2}>Everyday Generosity - $5,000-9,999</Text>*/}

            <Card
            containerStyle={styles.card}
            title='Habits of Goodness'>
                <Text style={styles.subtitle}>$2,000 - $4,999</Text>
            <View style={styles.row}>
                {/*Sweet Pea Festival*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('https://sweetpeafestival.org/')}>
                    <Image source={require('../assets/images/sponsors/logoSweetPea.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>

                {/*Office of the President*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.montana.edu/president/index.html')}>
                    <Image source={require('../assets/images/sponsors/logoOfficeOfThePresident.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*Emerson Center for the Arts & Culture*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.theemerson.org/')}>
                    <Image source={require('../assets/images/sponsors/logoEmerson.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>

                {/*College of Arts & Architecture*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.montana.edu/caa/index.php')}>
                    <Image source={require('../assets/images/sponsors/logoArtsArchitecture.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*College of Letters and Science*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.montana.edu/lettersandscience/index.html')}>
                    <Image source={require('../assets/images/sponsors/logoLettersAndScience.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>

                {/*Alumni Foundation*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('https://www.msuaf.org/s/1584/rd18/home.aspx')}>
                    <Image source={require('../assets/images/sponsors/logoAlumni.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>
            </View>
            <Text style={[styles.name,styles.onePlusFontFix]}>Joe Sullivan Films</Text>

            </Card>

            <Card
            containerStyle={styles.card}
            title='Random Acts of Kindness'>
            <Text style={styles.subtitle}>$500 - $1,999</Text>
            <View style={styles.row}>
                {/*college of nursing*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.montana.edu/nursing/index.html')}>
                    <Image source={require('../assets/images/sponsors/logoMSUnursing.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>

                {/*office of student engagement*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.montana.edu/engagement/index.html')}>
                    <Image source={require('../assets/images/sponsors/logoStudentEngagement.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>
            </View>


            <View style={styles.row}>
                {/*college of Agriculture*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://agriculture.montana.edu/index.html')}>
                    <Image source={require('../assets/images/sponsors/logoAgriculture.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>

                {/*Element*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('')}>
                    <Image source={require('../assets/images/sponsors/logoElement.png')}
                    style={styles.imageM}/>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*Rosauers*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('')}>
                    <Image source={require('../assets/images/sponsors/logoRosauers.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>

                {/*Kenyon Noble*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('')}>
                    <Image source={require('../assets/images/sponsors/logoKenyonNoble.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*National Endowment for the Arts*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('')}>
                    <Image source={require('../assets/images/sponsors/logoNEA.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>

                {/*Continental Cabinetry*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('')}>
                    <Image source={require('../assets/images/sponsors/logoContinentalCabinetry.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*Montana Arts Council*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('')}>
                    <Image source={require('../assets/images/sponsors/logoMAC.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>

                {/*Fork and Spoon Kithcne*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('https://www.forkandspoonkitchen.org/')}>
                    <Image source={require('../assets/images/ForkSpoonLogoTransparent.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*Montana Arts Council*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.redtractorpizza.com/')}>
                    <Image source={require('../assets/images/RedTractorPizzaLogo.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>

                {/*Fork and Spoon Kithcne*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('https://www.bozemanlibrary.org/')}>
                    <Image source={require('../assets/images/Logo_BozemanPublicLibrary.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*Montana Arts Council*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.solacafe.com')}>
                    <Image source={require('../assets/images/Logo-SolaSolid.jpg')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>
            </View>

            <Text style={[styles.name, styles.onePlusFontFix]}>Alison & Rance Harmon</Text>
            <Text style={[styles.name, styles.onePlusFontFix]}>Teresa & Steve Seright</Text>
            </Card>

            <Card
            containerStyle={{width: '95%', marginBottom: 15}}
            title='Allies and Friends'>
            <Text style={styles.subtitle}>$50 - $499</Text>


            {/*Pecha Kucha Night*/}
            <TouchableWithoutFeedback onPress={() =>
            Linking.openURL('https://www.pechakucha.com/')}>
                <Image source={require('../assets/images/sponsors/logoPechaKucha.png')}
                style={styles.imageL}/>
            </TouchableWithoutFeedback>

            {/*logoDancesofUniversalPeace.png*/}
            <TouchableWithoutFeedback onPress={() =>
            Linking.openURL('https://dancesofuniversalpeacena.org/')}>
                <Image source={require('../assets/images/sponsors/logoDancesofUniversalPeace.png')}
                style={styles.imageL}/>
            </TouchableWithoutFeedback>

            <View style={styles.row}>


            {/*ASMSU*/}
            <TouchableWithoutFeedback onPress={() =>
            Linking.openURL('http://www.montana.edu/asmsu/')}>
                <Image source={require('../assets/images/sponsors/logoASMSU.png')}
                style={styles.imageS}/>
            </TouchableWithoutFeedback>

            {/*Honors College*/}
            <TouchableWithoutFeedback onPress={() =>
            Linking.openURL('http://www.montana.edu/honors/')}>
                <Image source={require('../assets/images/sponsors/logoMSUhonors.png')}
                style={styles.imageS}/>
            </TouchableWithoutFeedback>
            </View>

            <View style={styles.row}>
                {/*Bridger Care*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('https://bridgercare.org/')}>
                    <Image source={require('../assets/images/sponsors/logoBridgerCare.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>

                {/*Norton Ranch Homes*/}
                <TouchableWithoutFeedback onPress={() =>
                Linking.openURL('http://www.nortonranchhomes.com/')}>
                    <Image source={require('../assets/images/sponsors/logoNortonRanchHomes.png')}
                    style={styles.imageS}/>
                </TouchableWithoutFeedback>

            </View>

            <Text style={[styles.name, styles.onePlusFontFix]}>Grace Anderson & Larry Morales</Text>

            </Card>
            </ScrollView>
        );
    }
}

export default class SponsorsScreen extends React.Component {
    render() {
        return (
            <View>
                <StatusBar barStyle='light-content'/>
                <InText/>
            </View>
        );
    }
}
