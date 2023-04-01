import React, { useState } from "react";
import { Input, Pressable, Icon, Text, Button, Box, Heading, Center, HStack, NativeBaseProvider } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const bonusBallMax = {
    "EUR": { max: 11, count: 2},
    "USA": { max: 26, count: 1}
  }
  const [result, setResult] = useState('')
  const [selected, setSelected] = React.useState(1);

  function getRandomNumbersArray(num, max = 100, loc = undefined) {
    const randomNumbers = new Set();
    const bonusBalls = new Set();
    while (randomNumbers.size < num) {
      const randomNumber = Math.floor(Math.random() * max) + 1;
      randomNumbers.add(randomNumber);
    }
    if(loc) {
      while (bonusBalls.size < bonusBallMax[loc].count) {
        const bonusBall = Math.floor(Math.random() * bonusBallMax[loc].max) + 1;
        bonusBalls.add(bonusBall);
      }
    }
    const sortedNumbers = Array.from(randomNumbers).sort((a, b) => a - b).join(', ');
    const sortedBonusBalls = Array.from(bonusBalls).sort((a, b) => a - b).join(', ');

    switch (loc){
      case 'EUR':
        return sortedNumbers + " Lucky Stars: " + sortedBonusBalls;
      case 'USA':
        return sortedNumbers + " Powerball: " + sortedBonusBalls;
      default:
        return sortedNumbers
    }
  }  

  return <NativeBaseProvider>
    <Center w="100%" safeArea>
      <Heading size="md">
        Random Lottery/Number Generator
      </Heading>
      <Box>
        <HStack space={4}>
          <Button onPress={() => setResult(getRandomNumbersArray(6, 47, undefined))}>Irish Lotto</Button>
          <Button onPress={() => setResult(getRandomNumbersArray(6, 59, undefined))}>UK Lotto</Button>
          <Button onPress={() => setResult(getRandomNumbersArray(5, 50, "EUR"))}>Euromillions</Button>
        </HStack>
      </Box>
      <Box>
        <HStack space={4}>
          <Button onPress={() => setResult(getRandomNumbersArray(5, 69, "USA"))}>US Powerball</Button>
          <Button>Custom</Button>
        </HStack>
      </Box>
      <Text fontSize="4xl">
        {result}
      </Text>
      <Box flex={1} bg="white" safeAreaTop width="100%" maxW="300px" alignSelf="center">
        </Box>
        </Center>
        </NativeBaseProvider>
}