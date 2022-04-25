import * as React from 'react';
import {useEffect,useState} from 'react';
import { View, Text,StyleSheet, Image,Dimensions, TextInput } from 'react-native';
//a importação dimensions serve para pegar as dimensões de cada tela
import { NavigationContainer } from '@react-navigation/native'; //navegar entre as páginas
//import { createStackNavigator } from 'react-navigation/stack'; //só confia
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //criar os ícones na parte de baixo e serve para navegar tbm
import Ionicons from 'react-native-vector-icons/Ionicons';//os icones legais, olhar o site...
import { StatusBar } from 'expo-status-bar';
import Modal from './Modal.js';
import * as WebBrowser from 'expo-web-browser'; //tem que instalar para poder abrir no navegador


//cada função é uma aba diferente do app, tem que passar o navigation para mudar de aba
function HomeScreen({navigation}) {
  return (
    //o touchableOpacity é o botão para trocar de abas
    //onPress chama a função para trocar a aba
    //o Ionicons é o icone do botão, no site tem os modelos
    <View style={{padding:15,flex:1}}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
          <Text style={styles.textHeader}>Para onde você deseja navegar?</Text>

          <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnNavigation}>
            <Ionicons name="md-home" size={29} color='white' />
            <Text style={{color:'white',marginTop:8,marginLeft:8}}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Sobre')} style={styles.btnNavigation}>
            <Ionicons name="ios-information-circle" size={29} color='white' />
            <Text style={{color:'white',marginTop:8,marginLeft:8}}>Sobre</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('Portfolio')} style={styles.btnNavigation}>
            <Ionicons name="ios-list-box" size={29} color='white' />
            <Text style={{color:'white',marginTop:8,marginLeft:8}}>Portfólio</Text>
          </TouchableOpacity>
        </ScrollView>
    </View>
  );
}

//cada função é uma aba diferente do app, tem que passar o navigation para mudar de aba
function SobreScreen({navigation}) {
  const [showModal,setModal] = useState(false);

  const abrirModalContato = () =>{
     setModal(!showModal);
  }

  let widthWindow = Dimensions.get('window').width - 30 -40;
  
  return (
    //https://scontent.fgyn23-1.fna.fbcdn.net/v/t39.30808-6/278454885_1954517881402835_9185486806265900375_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF9mGadf_nuzTcAaWrJrEyv1-W5nshI3ZXX5bmeyEjdlRtc0c3R5LUajmuyN_i57UTH7Jjz80PDjtJJlayo0PX8&_nc_ohc=8itPoYWIfX8AX-TZGmI&_nc_ht=scontent.fgyn23-1.fna&oh=00_AT_80YeupjX9b7kmUStTO4nCDBlKoIBwv65OBDCATVVVmQ&oe=62671FE5
    <View style={{flex:1}}>
      {
        (showModal)?
        <Modal showModal={showModal} setModal={setModal}  />
        :
        <View></View>
      }
      <View style={{padding:10,flex:1}}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
          <Text style={styles.textHeader}>Sobre</Text>

          <Image style={{width:widthWindow,height:widthWindow,marginTop:20}} source={{uri:'https://scontent.fgyn23-1.fna.fbcdn.net/v/t39.30808-6/278454885_1954517881402835_9185486806265900375_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF9mGadf_nuzTcAaWrJrEyv1-W5nshI3ZXX5bmeyEjdlRtc0c3R5LUajmuyN_i57UTH7Jjz80PDjtJJlayo0PX8&_nc_ohc=8itPoYWIfX8AX-TZGmI&_nc_ht=scontent.fgyn23-1.fna&oh=00_AT_80YeupjX9b7kmUStTO4nCDBlKoIBwv65OBDCATVVVmQ&oe=62671FE5'}} />
        
          <View>
            <Text style={{fontSize:20,marginTop:10}}>Mateus Fidelis / Estudante</Text>
        
            <Text style={{fontSize:16,marginTop:10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis velit ex. Nullam finibus, enim ac malesuada maximus, dui neque condimentum nunc, quis porttitor sapien quam sit amet nibh. Aliquam ultricies lorem nec condimentum placerat. Cras id rutrum nulla. Nulla facilisi. Etiam a vehicula lacus, laoreet pulvinar orci. Morbi massa sem, hendrerit non finibus ac, condimentum nec lorem. Suspendisse non leo hendrerit, fermentum diam a, egestas leo. Duis tincidunt, nisl id accumsan eleifend, est mi porta turpis, in aliquam eros erat sit amet turpis. Cras ultrices dolor consequat ultricies consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque gravida ultrices purus, eget commodo justo. Curabitur sollicitudin nibh nisi, eget vehicula risus accumsan at.</Text>
        
            <TouchableOpacity onPress={()=>abrirModalContato()} style={{...styles.btnNavigation,justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:17}}>Entrar em contato!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

//cada função é uma aba diferente do app, tem que passar o navigation para mudar de aba
function PortfolioScreen({navigation,route}) {

  const [images,setImages] = useState([
    {//depois do img, deixar tudo como 0 por padrão
      //img: require('./resources/img1.png'),
      img: require('./src/img1.png'),
      width:0,
      height:0,
      ratio:0,
      website:'https://cursos.dankicode.com'
    },
    {
      img: require('./src/img2.png'),
      width:0,
      height:0,
      ratio:0,
      website:'https://cursos.dankicode.com'
    }
  ])

  //controlar o tamanho das imagens
  const [windowWidth,setWindowWidth] = useState(0);

  useEffect(() => {
    let windowWidthN = Dimensions.get('window').width;

    setWindowWidth(windowWidthN - 30 - 40);

    let newImages = images.filter(function(val){
        let w = Image.resolveAssetSource(val.img).width;
        let h = Image.resolveAssetSource(val.img).height;

        val.width = w;
        val.height = h;
        val.ratio = h/w;

        return val;
    })
    setImages(newImages);

  }, [])

  //função para abrir os projetos no navegador
  const abrirNavegador = async (website) =>{
      let result = await WebBrowser.openBrowserAsync(website);
  }

  return (
    <View style={{padding:15,flex:1}}>
      <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Os últimos projetos!</Text>       
         {
           images.map(function(val){
              return (
                <View style={styles.parentImage}>
                  <Image 
                  style={{width:windowWidth,height:windowWidth*val.ratio,resizeMode:'stretch'}} source={val.img} />
                  <TouchableOpacity onPress={()=>abrirNavegador(val.website)} style={styles.botaoAbrirNavegador}><Text style={{textAlign:'center',color:'white',fontSize:18}}>Abrir no navegador!</Text></TouchableOpacity>
                </View>
              )
           })
         }      
      </ScrollView>
    </View>
  );
}

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  function App() {
  return (
    <NavigationContainer>
    
    <StatusBar hidden />
 
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name == 'Portfolio') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }else if(route.name == 'Sobre'){
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#5f5380',
        inactiveTintColor: 'gray',
      }} 

      
      >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sobre" component={SobreScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    </Tab.Navigator>
    </NavigationContainer>
    );
  }

export default App;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  textHeader:{
    color:'#5f5380',
    fontSize:24
  },
  btnNavigation:{
    backgroundColor:'#5f5380',
    padding:20,
    marginTop:15,
    flexDirection:'row'
  },
 
  parentImage:{
    marginTop:30
  },
  botaoAbrirNavegador:{
    padding:10,
    backgroundColor:'#5f5380',
  },
  modalParent:{
    position:'absolute',
    left:0,
    top:0,
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.6)',
    zIndex:1
  },
  boxModal:{
    backgroundColor:'white',
    height:370,
    width:'100%',
    position:'absolute',
    left:0,
    top:'50%',
    marginTop:-185,
    padding:10
  }
})