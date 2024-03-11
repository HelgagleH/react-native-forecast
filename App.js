import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground, SafeAreaView, Text } from "react-native";
import { s } from "./App.style";
import { Home } from "./pages/Home/Home";
import backgroundImg from "./assets/background.png";
import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MeteoAPI } from "./api/meteo";

export default function App() {

  const [coordinates, setCoordinates] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    getUserCoordnates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates);
    }
  }, [coordinates]);

  async function fetchWeatherByCoords() {
    const weatherResponse = await MeteoAPI.fetchWeatherByCoords(coords);
    setWeather(weatherResponse);
  }

  async function getUserCoordnates() {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } else {
      setCoordinates({ lat: "48.85", lng: "2.35" });
    }
  }

  console.log(coordinates);
  console.log(weather);


  return (
    <ImageBackground
      imageStyle={s.img}
      style={s.img_background}
      source={backgroundImg}
    >
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          <Home />
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
