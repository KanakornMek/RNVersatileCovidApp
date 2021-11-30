import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Modal, TouchableOpacity,  } from 'react-native';
import axios from 'axios'
import { WebView } from 'react-native-webview';

const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    React.useEffect(() => {
      toggleModal();
    }, [visible])
    const toggleModal = () =>{
      if(visible){
        setShowModal(true);
      }else{
        setShowModal(false);
      }
    };
    return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalbackground}>
        <ScrollView style={styles.modalcontainer}>{children}</ScrollView>
      </View>
    </Modal>
    );
  };


const api = axios.create({
    baseURL: 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-all'
})
const api2 = axios.create({
    baseURL: 'https://api.covidactnow.org/v2/counties.json?apiKey=0eeda7f67c7e49f584db32b99681cb5e'
})

const width_proportion = '100%';
const case_height_proportion = '100%';

class Home extends Component {
    

    state = {
        todaycase: [],
        isVisible: false,
    }

    constructor(){
        super();
        api.get('/').then(res => {
            console.log(res.data)
            this.setState({ todaycase: res.data })
        })
    }

    displayModal(show){
        this.setState({isVisible: show})
      }

    render(){
        return(
            <ScrollView style={styles.scrollView}>
                <ModalPoup visible={this.state.isVisible}>
                    <View style={{alignContent: 'center'}}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>{
                            this.displayModal(!this.state.isVisible);}
                        }>
                        <Text style={styles.text}>ปิด</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.succescontainer}>
                        <Text style={styles.succes}>Succes</Text>
                    </View>
                    </View>
                </ModalPoup>
            <View style={styles.view}>
                <Text style = {styles.welcome}>WELCOME TO</Text>
                <Text style = {styles.appsname}>APP's Name</Text>
                <View style = {styles.newcasecontainer}>
                    <View style = {styles.newcase}>
                        <View style={styles.case0up}>
                            <Text style={styles.newcaseheader}>ยอดผู้ป่วยรายใหม่</Text>
                        </View>
                        <View style={styles.case0below}>
                            {this.state.todaycase.map(todaycase => <Text style={styles.case0}> {todaycase.new_case}</Text>)}
                            <Text style={styles.raystat0}> ราย</Text>
                        </View>
                    </View>
                </View>
                <View style = {styles.threestatscontainer}>
                    <View style = {styles.setstatscontainer}>
                    <View style = {styles.stats1}> 
                        <View style={styles.case1up}>
                            <Image style = {{width: 30, height: 30,}}source={require('../mainscreen/fire.png')}/>
                        </View>
                        <View style={styles.case1below}>
                            <Text style={styles.case1header}>ติดเชิ้อสะสม</Text>
                            {this.state.todaycase.map(todaycase => <Text style={styles.case1}> {todaycase.total_case}</Text>)}
                            <Text style={styles.raystat1}> ราย</Text>
                        </View>
                    </View>
                    <View style = {styles.stats2}>
                    <View style={styles.case2up}>
                        <Image style = {{width: 30, height: 30,}}source={require('../mainscreen/heal.png')}/>
                    </View>
                        <View style={styles.case2below}>
                            <Text style={styles.case2header}>รักษาหายแล้ว</Text>
                            {this.state.todaycase.map(todaycase => <Text style={styles.case2}> {todaycase.total_recovered}</Text>)}
                            <Text style={styles.raystat1}> ราย</Text>
                        </View>
                    </View>
                    <View style = {styles.stats3}>
                    <View style={styles.case3up}>
                        <Image style = {{width: 30, height: 30,}}source={require('../mainscreen/vaccination.png')}/>
                    </View>
                        <View style={styles.case3below}>
                            <Text style={styles.case3header}>รักษาหายแล้ว</Text>
                            {this.state.todaycase.map(todaycase => <Text style={styles.case3}> {todaycase.total_recovered}</Text>)}
                            <Text style={styles.raystat3}> ราย</Text>
                        </View>
                    </View>
                    </View>
                </View>
                <View style={styles.othbigcontain}>
                <View style = {styles.othfunccontainer}>
                    <View style = {styles.func1}>
                        <TouchableOpacity style={styles.func1butt} onPress={() => this.displayModal(true)}>
                            <Image style= {{height: 120,width: 200, borderRadius:15,}} source={require('../mainscreen/tidlaewtumngai.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.func2}>
                        <TouchableOpacity style={styles.func1butt}>
                            <Image style= {{height: 120,width: 120, borderRadius:15,}} source={require('../mainscreen/areadetection.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
                <Text style={styles.appsname}>News</Text>
                <View style = {styles.newscontainer}>
                    <View style={styles.news}>
                        <ScrollView>
                    {/* <WebView style={{margin: 30, width: '100%'}} source={{html: '<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Finformationcovid19&tabs=timeline&width=350&height=700&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=1315071158939662" width="350" height="700" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>'}}/> */}
                    <WebView style={{ height: 1000 }} nestedScrollEnabled={true} source={{uri: 'https://www.beartai.com/'}}></WebView>
                    </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>)
    }
}

const styles = StyleSheet.create({
    scrollView:{
    },
    view:{
        position: 'relative',
        flex: 1,
        backgroundColor: 'white',
    },
    welcome: {
        paddingTop: 17,
        paddingLeft: 19,
        fontSize: 13,
        color: "#C7C7C7",
        // fontFamily: 'Roboto_700Bold',
    },
    appsname:{
        paddingTop: 3,
        paddingLeft: 32,
        fontSize: 30,
        color: "black",
        // fontFamily: 'Roboto_700Bold',
    },
    newcasecontainer:{
        position: 'relative',
        flex: 1,
        width: width_proportion,
        paddingTop: 22,
        alignItems: 'center',
    },
    newcase:{
        width: 350,
        height: 120,
        backgroundColor: '#FFA347',
        borderRadius: 15,
    },
    newcaseheader:{
        color: 'white',
        fontSize: 18,
        padding: 15,
    },
    threestatscontainer:{
        position: 'relative',
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-evenly',
        paddingTop: 25,
    },
    setstatscontainer:{
        width: 350,
        flexDirection: "row",
        justifyContent:'space-between',
    },
    stats1:{
        width: 100,
        height: 120,
        backgroundColor: 'rgba(255, 0, 0, 0.54)',
        borderRadius: 15,
    },
    stats2:{
        width: 100,
        height: 120,
        backgroundColor: '#72E893',
        borderRadius: 15,
    },
    stats3:{
        width: 100,
        height: 120,
        backgroundColor: '#FFE662',
        borderRadius: 15,
    },
    othbigcontain:{
        flex: 1,
        alignItems:'center',
    },
    othfunccontainer:{
        position: 'relative',
        flexDirection: "row",
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 25,
        paddingBottom: 40,
        width: 350,
    },
    func1:{
        width: 200,
        height: 120,
        backgroundColor: '#15ABFF',
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'space-between',
    },
    func2:{
        width: 120,
        height: 120,
        backgroundColor: '#15ABFF',
        borderRadius: 15,
    },
    newscontainer:{
        position: 'relative',
        backgroundColor: 'pink',
        paddingTop: 25,
        paddingBottom: 40,
        alignItems: 'center',
    },
    news:{
        width: '100%',
        height: 700,
        backgroundColor: '#E2E2E2',
        borderRadius: 15,
    },
    case0up:{
        width: 350,
        height: 55,
        borderRadius: 15,
        alignItems: 'center',
    },
    case0below:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
        width: 350,
        height: 70,
        borderRadius: 15,
    },
    case0:{
        color:'white',
        fontSize: 50,
        // fontFamily: 'Roboto_700Bold',
    },
    raystat0:{
        paddingTop: 19,
        color:'white',
    },
    case1header:{
        color:'white',
    },
    case1up:{
        width: 100,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent:'center',
    },
    case1below:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'column',
        width: 100,
        height: 70,
        borderRadius: 15,
    },
    case1:{
        color:'white',
        fontSize: 20,
        // fontFamily: 'Roboto_700Bold',
    },
    raystat1:{
        paddingLeft: 50,
        color:'white',
    },
    case2header:{
        color:'white',
    },
    case2up:{
        width: 100,
        height: 50,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
    },
    case2below:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'column',
        width: 100,
        height: 70,
        borderRadius: 15,
    },
    case2:{
        color:'white',
        fontSize: 20,
        // fontFamily: 'Roboto_700Bold',
    },
    raystat2:{
        paddingLeft: 50,
        color:'white',
    },
    case3header:{
        color:'white',
    },
    case3up:{
        width: 100,
        height: 50,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
    },
    case3below:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'column',
        width: 100,
        height: 70,
        borderRadius: 15,
    },
    case3:{
        color:'white',
        fontSize: 20,
        // fontFamily: 'Roboto_700Bold',
    },
    raystat3:{
        paddingLeft: 50,
        color:'white',
    },
    func1butt:{
        height: 120,
        width: 200,
    },
    modalbackground:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center',
      },
      modalcontainer:{
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
      },
      header:{
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
      text:{
        color:'red'
      },
      succescontainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
      },
      succes: {
        color:'#27E1AB',
        fontSize: 40,
        fontWeight: 'bold',
      }
})

export default Home;