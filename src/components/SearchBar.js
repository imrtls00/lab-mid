import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
const SearchBar = (props) => {
  const [searchOn, setSearchOn] = useState(false)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSearchOn(!searchOn)} style={styles.searchIcon}>
        <Feather name="search" color="white" style={styles.searchIcon}/>
      </TouchableOpacity>
      {searchOn ? <TextInput placeholder='Search anyything' style={styles.input} value={props.term} onChangeText={props.onTermChange} onSubmitEditing={props.onTermSubmit} /> : <></>}

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal:5,
    flexDirection: 'row',
  },
  searchIcon: {
    padding: 5,
    backgroundColor: '#000000',
    color: 'white',
    marginRight:10
  },
  input:{
    flex:1,
    paddingHorizontal:10,
    backgroundColor:'white',
  }
})
export default SearchBar;