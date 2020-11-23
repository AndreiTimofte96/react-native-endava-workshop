import { Card, Button, Text } from 'react-native-elements';
import React from 'react';

const CoffeeShop = ({ item }) => {
  return (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Card.Image source={{ uri: item.image_url }} />
      <Text style={{ marginTop: 20 }}>
        {item.name}
      </Text>
      <Button
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="VIEW NOW"
      />
    </Card>
  )
}

export default CoffeeShop;