import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnotherSearchScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Another Search Screen</Text>
            {/* Add your components and UI elements here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default AnotherSearchScreen;