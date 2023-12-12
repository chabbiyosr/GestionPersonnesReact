import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import firebase from '../Config';

export default function SignUp(props) {



  const auth =firebase.auth();


  const [email, setmail] = useState("");
  const [pwd,setpwd] = useState("");
  const [confirmpwd,setConfirmpwd] = useState("");




  const refinput2 = useRef();


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
          new account
        </Text>
        <TextInput
          onChangeText={(text) => {
            setmail(text)
          }}
          onSubmitEditing={() => {
            refinput2.current.focus();
          }}
          blurOnSubmit={false}
          keyboardType="email-adresse"
          placeholder="email"
          style={styles.input}
        >
        </TextInput>
        <TextInput
          ref={refinput2}
          onChangeText={(text) => setpwd(text)}
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
        >
        </TextInput>
        <TextInput
          ref={refinput2}
          onChangeText={(text) => setConfirmpwd(text)}
          keyboardType="default"
          placeholder="confirm password"
          secureTextEntry={true}
          style={styles.input}
        >
        </TextInput>
        <View></View>

        <Button
         onPress={(v) => {
            if (pwd === confirmpwd)
            {
                auth.createUserWithEmailAndPassword(email, pwd)
                .then(()=>{props.navigation.replace("acceuil",{currentid:auth.currentUser.uid,
                });})
                .catch((ex)=>{alert(ex)});
            }
            else {alert("les mots de passes sont differents")}
          //alert("sign in" + email + ":" + pwd);
         }}
         title="Sign in">

        </Button>

       <Button
       title="cancel"></Button>
        

       
      </View>
      </ImageBackground>
      
    </View>
  );
}

 <StatusBar style="auto" />
    const styles = StyleSheet.create({
     container: {
     flex: 1,
      backgroundColor: '#f09',
      alignItems: 'center',//aligement horizontal (flex-start w flex-end)
      justifyContent: 'center',//aligement vertical 
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
