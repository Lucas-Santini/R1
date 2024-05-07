import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [drinkName, setDrinkName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const searchDrink = async () => {
    try {
      const response = await axios.get(`http://10.136.63.235:3000/drinks`);
      if (response.data && response.data.drinks && response.data.drinks.length > 0) {
        const drink = response.data.drinks[0];
        const drinkIngredients = [];
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          if (ingredient) {
            drinkIngredients.push(ingredient);
          }
        }
        setIngredients(drinkIngredients);
      } else {
        setIngredients([]);
      }
    } catch (error) {
      console.error('Erro ao buscar drink:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do drink"
        value={drinkName}
        onChangeText={setDrinkName}
      />
      <Button title="Buscar" onPress={searchDrink} />
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingredientes:</Text>
        {ingredients.map((ingredient, index) => (
          <Text key={index}>{ingredient}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  ingredientsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  ingredientsTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default App;
