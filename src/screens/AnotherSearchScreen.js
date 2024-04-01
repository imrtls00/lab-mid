import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';

const SearchScreen = ({ navigation }) => {
const [restaurants, setRestaurants] = useState([]);
const [currentLocation, setCurrentLocation] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [weatherData, setWeatherData] = useState(null);

useEffect(() => {
(async () => {
// Get user's current location
const { granted } = await Location.requestPermissionsAsync();
if (granted) {
const location = await Location.getCurrentPositionAsync({
accuracy: Location.Accuracy.High,
});
setCurrentLocation(location.coords);
}


Explain
  // Fetch weather data
  const weatherResponse = await axios.get('...OpenWeatherMap API URL...', {
    params: {
      lat: currentLocation.latitude,
      lon: currentLocation.longitude,
    },
  });
  setWeatherData(weatherResponse.data);

  // Fetch restaurants based on weather and location
  const yelpResponse = await axios.get('...Yelp API URL...', {
    params: {
      term: 'restaurants',
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    },
  });
  const sortedRestaurants = sortRestaurants(yelpResponse.data.businesses);
  setRestaurants(sortedRestaurants);
  setIsLoading(false);
})();
}, []);

const handleRestaurantPress = (restaurant) => {
navigation.navigate('RestaurantDetail', restaurant);
};

const sortRestaurants = (restaurants) => {
// Apply sorting logic based on distance and weather
// (e.g., using geolib or custom distance calculation)
// Ensure expensive restaurants are first during rainy weather
return sortedRestaurants;
};

return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{isLoading ? (
<Text>Loading...</Text>
) : (
<>
<FlatList
data={restaurants}
renderItem={({ item }) => (
<TouchableOpacity onPress={() => handleRestaurantPress(item)}>
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
<Image source={{ uri: item.image_url }} style={{ width: 50, height: 50 }} />
<Text style={{ marginLeft: 10 }}>{item.name}</Text>
</View>
</TouchableOpacity>
)}
keyExtractor={(item) => item.id}
/>
</>
)}
</View>
);
};

export default AnotherSearchScreen;