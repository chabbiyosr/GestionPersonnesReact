import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { BackHandler, ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity 
} from 'react-native';
import firebase from '../Config';

export default function Authentification(props) {
  //const x = 10;
  //var y = 20;
//  let z = 10;
  const auth =firebase.auth();
  
  const [email, setmail] = useState("Yosr.chabbi@itbs.tn"); //
  const [pwd,setpwd] = useState("ITBS0000");
  const refinput2 = useRef();//


  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={{height:24,width:"100%",backgroundColor:"#800080"}}></View>
      <ImageBackground
        style={{
          alignItems: "center",
          justifyContent:"center",
          flex:1,
          height:"100%",
          width: "100%"
        }}
        resizeMode="cover"
        source={require("../assets/back.jpg")}
        >
          <View
          style={{

            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius :8,
            backgroundColor: "#0005",
            width: "85%",
            height: 300,
        }}
      >
        <Text style={{marginTop:15, fontSize:32,fontWeight: "bold", color:"white"}}>
          **Authentification**
        </Text>
        <TextInput
          onChangeText={(text) => {
            setmail(text)
          }}
          onSubmitEditing={() => {
            refinput2.current.focus();
          }}
          blurOnSubmit={true}
          keyboardType="email-adresse"
          placeholder="email"
          style={styles.input}
        >
        </TextInput>
        <TextInput
          ref={refinput2}
          onChangeText={(text) => setpwd(text)}//aa text bark mich kima onchange ala ay input fe text
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
        >
        </TextInput>
        <View></View>

        {/* <Button onPress={
        (v) => {

            auth
            .signInWithEmailAndPassword(email,pwd)
            .then(() => {
              props.navigation.navigate("acceuil");
            })
            .catch((ex)  => {
              alert(ex);
            });
                    //alert("sign in" + email + ":" + pwd);
         }}
         title="Sign in">

        </Button> */}
        <View style={{flexDirection: "row"}}>
        <TouchableOpacity 
        onPress={v=>{  
          auth.signInWithEmailAndPassword(email, pwd)
          .then(()=>{
            console.log(auth.currentUser.uid)
            props.navigation.navigate("acceuil", {currentid:auth.currentUser.uid,
            });
          })
          .catch((ex)=>{alert(ex)});
        }}
        style={styles.touchable}>
          <Text style={styles.text}>Submit</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={v=>{BackHandler.exitApp()}}
        style={styles.touchable}>
          <Text style={styles.text}>Dismiss</Text>

        </TouchableOpacity>

      </View>

        

        <TouchableOpacity 
          style= {{
            paddingRight:10,
            width:"100%",
            alignItems:"flex-end",//yebda mel louta mich kima flex-start mel fou9 aal lisar

        }}>

        <Text 
        onPress={() => { props.navigation.navigate("signup");//bech temchi lel page signup
       }}

        style={{ fontWeight: "bold", color:"white"}}
        >
          Create user
          </Text>

        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
      </ImageBackground>
      
    </View>
  );
}
//stausBar yodkhol fel bar fou9ania ken mathothech mayodkholch <StatusBar style="auto" />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f09',
    alignItems: 'center',//aligement horizontal (flex-start w flex-end)
    justifyContent: 'center',//aligement vertical 
  },
  touchable:{
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#ffacac",
  },
  input:{
    fontFamily:"serif",
    padding:10,
    fontSize:16,
    marginBottom:15,
    marginTop:15,
    backgroundColor: "#ffffff",
    height:60,
    width:"90%",
    borderRadius:8,
    textAlign:"center"
  },
});
