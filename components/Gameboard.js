import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import { Button } from "react-native-paper";
import {
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
  MAX_SPOT,
  NBR_OF_DICES,
  NBR_OF_THROWS,
  STORAGE_KEY,
} from "../constants/Game";
import styles from "../style/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from './Header';
import Footer from './Footer';
let board = [];

export default Gameboard = ({ route }) => {

  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("");
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [totalPoints, setTotalPoints] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [selectedDicePoints, setSelectedDicePoints] = useState(
    new Array(MAX_SPOT).fill(false)
  );
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [dicePointsTotal, setDicePointsTotal] = useState(
    new Array(MAX_SPOT).fill(0)
  );
  

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable 
        key={"row" + i}   
        onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50}
          color={getDiceColor(i)}
          style={{alignSelf:"center"}}>
          </MaterialCommunityIcons>
      </Pressable>
    );
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"points" + spot}>
        <Text key={"points" + spot} style={styles.points}>
          {getSpotTotal(spot)}</Text>
      </Col>
    );
  }

  const buttonsRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    buttonsRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable 
        key={"buttonsRow" + diceButton}
        onPress = {() => selectDicePoints(diceButton)}>
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={40}
            color={getDicePointsColor(diceButton)}>
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

    useEffect(() => {
      if (playerName === "" && route.params?.player) {
        setPlayerName(route.params.player);
        getScoreboardData();
      }
    }, []);

  useEffect(() => {
    if (nbrOfThrowsLeft == 0) {
      setStatus("Select your points");
    } else if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
    } else if (selectedDicePoints.every((x) => x)) {
      savePlayerPoints();
      totalPoints >= BONUS_POINTS_LIMIT
        ? setStatus("Congratulations, you receive the bonus ")
        : setStatus( <Text style ={styles.bonusText}> Unfortunately you dont have enough points for the bonus :( </Text>);
    }
  }, [nbrOfThrowsLeft]);

  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";} 
      else {
      return selectedDices[i] ? "black" : '#8ebfff';
    }
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? "black" : '#8ebfff';
  }

  function selectDice(i) {
    if (nbrOfThrowsLeft == 3) {
      setStatus("Before selecting: Throw the dices!");
      return;
    }
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }


  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  function selectDicePoints(i) {
    if (nbrOfThrowsLeft > 0) {
      setStatus("Please throw the dices first!");
      return;
    }
    if (selectedDicePoints[i]) {
      setStatus("Points have been selected already, select a different number!");
      return;
    }
    let selected = [...selectedDices];
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    if (!selectedPoints[i]) {
      selectedPoints[i] = true;
      let nbrOfDices = diceSpots.reduce(
        (total, x) => (x === i + 1 ? total + 1 : total),
        0
      );
      points[i] = nbrOfDices * (i + 1);
      setDicePointsTotal(points);
      setTotalPoints(totalPoints + points[i]);
    }
    selected.fill(false);
    setSelectedDices(selected);
    setSelectedDicePoints(selectedPoints);
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    return points[i];
  }
  

  function throwDices() {
    if (selectedDicePoints.every((v) => v)) {
      selectedDicePoints.fill(false);
      setDicePointsTotal(new Array(MAX_SPOT).fill(0));
      setTotalPoints(0);
      setStatus("New Game!");
    }
    if (nbrOfThrowsLeft <= 0) {
      setStatus("No throws left! Select points to continue!");
      return;
    }
    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = "dice-" + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    setDiceSpots(spots);
    setStatus("Select and throw dices again");
  }

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

  const savePlayerPoints = async () => {
    const currentDate = new Date();
    const playerPoints = {
      name: playerName,
      date: `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      points:
        totalPoints >= BONUS_POINTS_LIMIT
          ? totalPoints + BONUS_POINTS
          : totalPoints,
    };
    try {
      const newScore = [...highScores, playerPoints]
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);
      setHighScores(newScore);
      console.log(newScore);
      const jsonValue = JSON.stringify(newScore);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.gameboard}>
    <Header></Header>
    <View style={styles.flex}>
      {selectedDicePoints.every((v) => !v) && nbrOfThrowsLeft == 3 ? (
        <MaterialCommunityIcons
          name="dice-multiple"
          size={100}
          color='#8ebfff'
        />
      ) : (
        row
      )}
    </View>
    <Button
      style={styles.button}
      onPress={() => throwDices()}
      mode="contained"
    >
      {selectedDicePoints.every((v) => v)
        ? "New Game"
        : nbrOfThrowsLeft > 0
        ? "Throw Dices"
        : "New Round"}
    </Button>
    <Text style={{ fontSize: 20 }}>
      Number of throws left: {nbrOfThrowsLeft}
    </Text>
    <Text style={{ fontSize: 15 }}>{status}</Text>
    <View style={styles.dicePoints}>
      <Grid>{pointsRow}</Grid>
    </View>
    <View style={styles.dicePoints}>
      <Grid>{buttonsRow}</Grid>
    </View>
    <Text style={styles.title}>Total Points: {totalPoints}</Text>
    <Text style={styles.subTitle}>
      {BONUS_POINTS_LIMIT - totalPoints <= 0
        ? "You have reached the bonus!"
        : `You are ${
            BONUS_POINTS_LIMIT - totalPoints
          } points away from ${BONUS_POINTS} bonus points`}
    </Text>
    <Text>Player {playerName}</Text>
    <Footer></Footer>
  </View>
  
  );
};