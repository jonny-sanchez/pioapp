import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

type MapProviderGoogleProps = {
    children?: React.ReactNode;
    latitude?: number;
    longitude?: number;
    showsUserLocation?: boolean | undefined;
    followsUserLocation?: boolean | undefined;
    latitudeDelta?: number;
    longitudeDelta?: number;
}

const darkModeStyleMap =  [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
]

export default function MapProviderGoogle ({
    children,
    latitude = 14.6349,
    longitude = -90.5069,
    showsUserLocation,
    followsUserLocation,
    latitudeDelta = 0.05,
    longitudeDelta = 0.05
} : MapProviderGoogleProps) {

    return (
        <>
            <MapView 
                provider={PROVIDER_GOOGLE}
                showsUserLocation={showsUserLocation}
                followsUserLocation={followsUserLocation}
                style={[ 
                    { width: '100%', height: '100%' } 
                ]}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: longitudeDelta,
                }}
                // customMapStyle={darkModeStyleMap}
                // userInterfaceStyle='dark'
            >
                { children }
            </MapView>
        </>
    )
}