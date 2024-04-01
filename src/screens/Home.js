import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function Home({ navigation }) {
    return (
        <View style={styles.container}> 
            <TouchableOpacity onPress={()=> navigation.navigate("SearchScreen")}>
                <Text style={{marginTop:30, padding:20, backgroundColor:'#0000ff', color:'white'}}>Search Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("AnotherSearchScreen")}>
                <Text style={{marginTop:30, padding:20, backgroundColor:'#0000ff', color:'white'}}>Another Search Screen</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding:20
    },
});
