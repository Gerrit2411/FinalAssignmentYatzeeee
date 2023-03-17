import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import style from "../style/style";
import { STORAGE_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, DataTable } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from './Header';
import Footer from './Footer';

export default Scoreboard = ({ navigation }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });
  });

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setHighScores(tmpScores);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setHighScores([]);
      getScoreboardData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={style.container}>
      <Header> </Header>
      <MaterialCommunityIcons
        style={{ textAlign: "center", color: '#8ebfff', marginBottom: 10 }}
        name="file-document-multiple-outline"
        size={40}
      />
     
      <ScrollView>
        <DataTable>
          <DataTable.Header
            style={{
              backgroundColor: '#8ebfff',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <DataTable.Title
              textStyle={{
                color: "white",
                fontFamily: "Arial",
                fontSize: 15,
              }}
            >
              Name
            </DataTable.Title>
            <DataTable.Title
              textStyle={{
                fontFamily: "Arial",
                fontSize: 15,
                color: "white",     
              }}
            >
              Date & Time
            </DataTable.Title>
            <DataTable.Title
              textStyle={{
                fontFamily: "Arial",
                fontSize: 15,
                color: "white",
                
              }}
            >
              Score
            </DataTable.Title>
          </DataTable.Header>

          {highScores.map((player, i) => (
            <DataTable.Row key={i + 1} style={{ backgroundColor: '#8ebfff' }}>
              <DataTable.Cell textStyle={{ color: "white" }}>
                {player.name}
              </DataTable.Cell>
              <DataTable.Cell textStyle={{ color: "white", fontFamily: "Arial" }}>
                {player.date} {player.time}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{ color: "white", fontFamily: "Arial" }}
              >
                {player.points}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      {highScores.length > 0 && (
        <Button style={style.button} mode="contained" onPress={clearScoreboard}>
          Reset Table
        </Button>
      )}
      <Footer> </Footer>
    </View>
  );
};
