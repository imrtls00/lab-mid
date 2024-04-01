const weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
  
    const fetchWeather = async () => {
      try {
        const apiKey = '9db4e5a77fc8c78ef128cef25db24179';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
        const response = await axios.get(url);
        setWeather(response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setWeather(null);
        setError("Failed to fetch weather data. Please try again.");
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter City"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Get Weather" onPress={fetchWeather} />
        {error && <Text style={styles.error}>{error}</Text>}
        {weather && (
          <View style={styles.weatherInfo}>
            <Text style={styles.text}>Temperature: {weather.main.temp}°C</Text>
            <Text style={styles.text}>Feels Like: {weather.main.feels_like}°C</Text>
            <Text style={styles.text}>Humidity: {weather.main.humidity}%</Text>
          </View>
        )}
      </View>
    );
  };