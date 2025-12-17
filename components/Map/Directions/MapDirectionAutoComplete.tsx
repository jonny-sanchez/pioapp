import { LatLng, Marker } from "react-native-maps";
import MapViewDirections, { MapViewDirectionsDestination, MapViewDirectionsMode, MapViewDirectionsOrigin } from "react-native-maps-directions"
import { useTheme } from "react-native-paper";
import { AppTheme } from "types/ThemeTypes";

type MapDirectionAutoCompleteProps = {
    origin?: LatLng;
    destination?: LatLng;
    mode?: MapViewDirectionsMode | undefined;
}

export default function MapDirectionAutoComplete ({
    origin,
    destination,
    mode
} : MapDirectionAutoCompleteProps) {

    const theme:AppTheme = useTheme() as AppTheme

    const GOOGLE_MAPS_APIKEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

    return (
        <>
            { destination && <Marker coordinate={destination} title="Destino TIENDA RABINAL ACHI"/> }
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              mode={mode}
              strokeWidth={4}
              strokeColor={theme.colors.primary}
            />
        </>
    )
}