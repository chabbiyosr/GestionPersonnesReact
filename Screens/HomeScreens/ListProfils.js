import { FlatList, StyleSheet, Text, View,Image, TouchableHighlight } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import firebase from '../../Config'
import { Button,Dialog } from 'react-native-paper';



const database = firebase.database();
export default function ListProfils(props) {
  const [data, setdata] = useState([]);
  const [isDialogVisible, setisDialogVisible] = useState(false)
  
  var table_profils = database.ref("profils");
  useEffect(() =>{
  table_profils.on("value",(snapshot)=>{
  let d = [];
  snapshot.forEach((un_profil) =>{
  d.push(un_profil.val());
});
setdata(d);
console.log(data);
  });
  
  return () =>{
    table_profils.off();
  };
  
}, []);
  return (
    <View>
      <StatusBar style="dark" />
     <Text style={{
        marginBottom: 30,
        color: "gray",
        fontSize: 20,
        fontWeight: "bold",
        textAlign:"center"
      }}>List Profils
      </Text>
      <FlatList
      style={{width:"95%"}}
      data={data}
      renderItem={({item})=>{
        return (
       <View 
       style={{
        borderRadius: 12,
        flexDirection: "row",
        backgroundColor:"bisque",
        marginBottom:5,
        width:"100%",
        justifyContent:"space-around",
        alignItems:"center"
        
       }}>
        <TouchableHighlight
        onPress={()=>{
          setisDialogVisible(true)
        }}>
        <Image 
        
        resizeMode="contain"
        style={{width:45,height:60 }}
        source={
          item.url
          ? {uri:item.url}
        :require("../../assets/profil.png")}></Image>
        </TouchableHighlight>
        <Text>{item.nom}</Text>
        <Text>{item.prenom}</Text>
        <Text onPress={()=>{
          props.navigation.navigate("chat", 
          {
            currentid: props.route.params.currentid,
            friendsid: item.id,
          
          })
        }} >{item.pseudo}</Text>
        </View>
        );
        
      }}>

    
      </FlatList>
      <Dialog visible={isDialogVisible} onDismiss={() =>{setisDialogVisible(false)}}>
      <Dialog.Title>Details</Dialog.Title>
      <Dialog.Content>
        <Text variant ="bodyMedium">warrrarrry</Text>
        <Image 
        style={{width:60,height:60,resizeMode:"contain"}}
        source={require("../../assets/profil.png")}></Image>
        
      </Dialog.Content>
      <Dialog.Actions>
      <Button onPress={() =>{setisDialogVisible(false)}}>Done</Button>
      </Dialog.Actions>
      
    </Dialog>
    </View>
    
  )
}
const styles = StyleSheet.create({
 
})