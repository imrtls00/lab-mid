import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// SearchScreen.js
  

const SearchScreen = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Fetch restaurants data from Yelp API
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
                setRestaurants(response.data.businesses);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

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
                <Ionicons name="search" size={24} color="black" />
                <Text style={styles.searchText}>Search for restaurants</Text>
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