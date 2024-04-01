import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';


// SearchScreen.js
  

const SearchScreen = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [location, setLocation] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    
    useEffect(() => {
        const init = async () => {
            try {
                console.log("Initiating location fetch...");
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Location permission denied');
                    return;
                }
        
                const userLocation = await Location.getCurrentPositionAsync({});
                setLocation(userLocation);
                console.log("User location:", userLocation);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };
    
        init();
    }, []);
    
    

    const calculateDistance = (userLocation, restaurantLocation) => {
        if (!userLocation) return null; // Handle if no user location yet
    
        const lat1 = userLocation.coords.latitude;
        const lon1 = userLocation.coords.longitude;
        const lat2 = restaurantLocation.latitude;
        const lon2 = restaurantLocation.longitude;
    
        const R = 6371; // Radius of Earth in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
    
        return distance;
      };

      const toRadians = (degrees) => degrees * (Math.PI / 180);

      useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        Authorization: 'Bearer BaYm5A41L_Is6H3l6kQ6ci825XRTrklNHABFkrKVqGZ7hae4v0OR_2NjDfSFsig0vRnMeeDcjfMcalfplVtuDMTntIBkd_CA1HG9zj9C0jr6-pJox7YMKuaIQNX3ZXYx',
                    },
                    params: {
                        term: 'restaurants',
                        location: 'New Zealand',
                    },
                });
                if (location) {
                    const sortedRestaurants = response.data.businesses.sort((a, b) => {
                        const distanceA = calculateDistance(location, a.coordinates);
                        const distanceB = calculateDistance(location, b.coordinates);
                        console.log(distanceA, distanceB);
                        return distanceA - distanceB; 
                    });
                    setRestaurants(sortedRestaurants);
                } else {
                    setRestaurants(response.data.businesses);  
                }

            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, [location]);


    const renderRestaurantItem = ({ item }) => (
        <TouchableOpacity style={styles.restaurantItem}>
            <Image source={{ uri: item.image_url }} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantRating}>Rating: {item.rating}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
           <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for restaurants"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            <FlatList
                data={restaurants}
                renderItem={renderRestaurantItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    searchText: {
        marginLeft: 8,
        fontSize: 16,
    },
    restaurantItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    restaurantImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16,
    },
    restaurantInfo: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    restaurantRating: {
        fontSize: 14,
        color: '#888',
    },
};

export default SearchScreen;