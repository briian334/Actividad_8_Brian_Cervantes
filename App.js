import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';

export default function App() {

  const [data, setData] = useState([]); // arreglo para almacenar los datos traidos de la API ↓
  const [isLoading, setLoading] = useState(true);
  
    const API = async() => 
  {     //Funcíon de flechita para el consumo de una API

    try{

      const URL = "https://jsonplaceholder.typicode.com/posts"; //URL de la API
  
      const res = await fetch(URL); //Consumir los datos de la API
  
      const json = await res.json(); //Convertir a formato JSON
  
      setData(json); //*Mandamos los datos que contiene JSON al arreglo vacio "data" ↑
    }catch(error){
      console.error("Error: Intente de nuevo")
    }finally{
      setLoading(false);
    }
  }
  
  useEffect( () => {
    API();
  },[])
  
  return (
    <View style={styles.container}>
  
    {isLoading ? <ActivityIndicator size="large" color="#00ff00"/> : (      
    <FlatList 
      data = {data}
      keyExtractor = {({id}, index) => id}
      renderItem = {
        ({item}) => (
          <Text>{item.title}</Text>
        )
      } 
      /> ) 
    }
      
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
