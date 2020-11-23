import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { fetchFakeData } from './faker';
import Deck from './Deck';

const yelpApiKey = 'SM5y3HUZl1PbEl77IAy-A9w-6gRPcgJRvX8-K_nSRlJr81vQK0dfrSZGHZjwo_P7E1tz2n29vKPAvfgR5NoNTMv_DsVjeRYdA8EZUkDS91kCenGSEIKvJfbdTu24X3Yx';
const SEARCH_URL = '/businesses/search';

const API = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    'Authorization': `Bearer ${yelpApiKey}`
  }
});

export default function App() {
  const [data, setData] = useState([]);
  const [location] = useState({
    latitude: '51.5265',
    longitude: '-0.0825'
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(SEARCH_URL, {
        params: {
          categoris: 'coffee,coffeeroasteries,coffeeshops',
          ...location,
        }
      });
      setData([...response.data.businesses, ...fetchFakeData()]);
    }
    fetchData();
  }, []);

  const onSwipe = (direction) => {
    setData((prev) => prev.slice(1));
  }

  return (
    <ScrollView styles={styles}>
      <Deck data={data} onSwipe={onSwipe} />
    </ScrollView>
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
