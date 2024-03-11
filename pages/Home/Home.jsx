import { Text, View } from "react-native";
import { s } from "./Home.style";

export function Home() {
    return (
        <>
            <View style={s.meteo_basic}>
                <Text>Basic Weather info</Text>
            </View>
            <View style={s.searchbar_container}>
                <Text>Searchbar</Text>
            </View>
            <View style={s.meteo_advanced}>
                <Text>Advanced Weather info</Text>
            </View>
        </>
    )
}