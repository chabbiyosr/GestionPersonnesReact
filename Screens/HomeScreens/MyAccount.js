import { StatusBar } from "expo-status-bar";
import {
  BackHandler,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


import { useState } from "react";
import { Image } from "react-native";
import firebase from '../../Config';
import * as ImagePicker from 'expo-image-picker';


const database = firebase.database();
const storage = firebase.storage();

export default function MyAccount(props) {
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [pseudo, setpseudo] = useState("");
  const [urlImage, seturlImage] = useState();
  const [isdefault, setIsdefault] = useState(true);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setIsdefault(false);
      seturlImage(result.assets[0].uri);
    }
  };

  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    return blob;
  };
  const uploadImageToFirebase =async (urilocal) => {
    //convertir image to blob
    const blob= await imageToBlob(urilocal);
    //upload image to storage
    const ref_mesImages=storage.ref("mes_images");
    const key =props.route.params.currentid;
    const ref_image = ref_mesImages.child("myImage"+key);
    await ref_image.put(blob);
    //recuperer l'url
    const url =ref_image.getDownloadURL();
    return url ;
  }
  return (
    <ImageBackground source={require("../../assets/back.jpg")}
     style={styles.container}>
      <View
        style={{
          backgroundColor: "bisque",
          borderRadius: 10,
          padding: 25,
        }}
      >
        <View
          style={{
            alignItems: "center", //Alignement horizental
            justifyContent: "center", //Alignement vertical
            flexDirection: "column",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={ () => {
            pickImage();
          }}>

          <Image
            source={ isdefault ?
              require("../../assets/profil.png")
              : {uri:urlImage}
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 400 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          </TouchableOpacity>
        </View>


        <TextInput
          onChangeText={(ch) => {
            setnom(ch);
          }}
          style={styles.textinput}
          placeholder="Nom"
        ></TextInput>
        <TextInput
          onChangeText={(ch) => {
            setprenom(ch);
          }}
          style={styles.textinput}
          placeholder="Prenom"
          keyboardType="default"
        ></TextInput>

        <TextInput
          onChangeText={(ch) => {
            setpseudo(ch);
          }}
          style={styles.textinput}
          placeholder="Pseudo"
          keyboardType="default"
        ></TextInput>

        <View
          style={{
            alignItems: "center", //Alignement horizental
            justifyContent: "center", //Alignement vertical
            flexDirection: "column",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={async() => {
              var table_profils = database.ref("profils");
             // var key = table_profils.push().key;
             var userid=props.route.params.currentid;
              var un_profil = table_profils.child("profil" + userid);
              const url = await uploadImageToFirebase(urlImage);

              un_profil.set({
                id:userid,
                nom:nom,
                prenom:prenom,
                pseudo:pseudo,
                url:url
              });
           //   alert(nom+" " + prenom + " " + pseudo)
            }}
          >
            <Text style={styles.text} >Save</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center", //Alignement horizental
    justifyContent: "center", //Alignement vertical
    flexDirection: "column",
  },
  textinput: {
    width: 250,
    height: 50,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 15,
  },
  touchable: {
    backgroundColor: "white",
    height: 40,
    width: 100,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "blue",
  },
});