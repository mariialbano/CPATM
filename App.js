import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const App = () => {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState([]);

  const calculateNotes = () => {
    let value = parseInt(amount);
    const denominations = [50, 20, 10];
    const result = [];

    if (value % 10 !== 0) {
      alert('O valor deve ser múltiplo de 10');
      return;
    }

    for (let note of denominations) {
      if (value >= note) {
        const count = Math.floor(value / note);
        value -= count * note;
        result.push({ note, count });
      }
    }

    setNotes(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite o valor a ser retirado (múltiplo de 10)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor a ser retirado"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="CALCULAR RETIRADA" onPress={calculateNotes} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.note.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.count} cédula(s) de R${item.note}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  item: {
    fontSize: 18,
    marginVertical: 4,
    textAlign: 'center',

  },
});

export default App;
