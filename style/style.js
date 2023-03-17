import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  header: {
    marginBottom: 15,
    backgroundColor: '#8ebfff',
    flexDirection: 'row',
    
  },
  footer: {
    marginTop: 20, 
    backgroundColor: '#8ebfff',
    flexDirection: 'row',
    fontFamily: 'Arial',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Arial',
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 20,
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#8ebfff',
    width: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color:"white",
    fontSize: 20,
    fontFamily: 'Arial',
    
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center',
  },
  dicePoints: {
    flexDirection: 'row',
    width: 280,
    alignContent: 'center',
    
  },
  text: {
    fontSize: 23,
    textAlign: "center",
    fontFamily: 'Arial',
  },

  textInput: {
    marginTop: 20,
    backgroundColor: "#dbd7d7",
    fontSize: 30
  },

  rulesText: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10
  },

  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center",
    fontFamily: 'Arial',
  },
  numbers: {
    flexDirection: 'column',
  },
  nbrSum: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18
  },

  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  gamevalue: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  bonusText: {
    textAlign: 'center',
  }
});