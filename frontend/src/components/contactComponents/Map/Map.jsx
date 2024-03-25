import React, { useCallback, useState } from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Map.scss'

// const containerStyle = {
//     width: '67.5rem',
//     height: '25rem'
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

const Map = () => {

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: ""
    // })

    // const [map, setMap] = useState(null)

    // const onLoad = useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);

    //     setMap(map)
    // }, [])

    // const onUnmount = useCallback(function callback(map) {
    //     setMap(null)
    // }, [])


    return (
        <div className="map">
            {
                // isLoaded ? (
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.90977283596!2d-79.54286439581446!3d43.718370958010574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1711142737792!5m2!1sen!2sca" style={{ width: "600", height: "450", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }} ></iframe>
                // <GoogleMap
                //     mapContainerStyle={containerStyle}
                //     center={center}
                //     zoom={10}
                //     onLoad={onLoad}
                //     onUnmount={onUnmount}
                // >
                // </GoogleMap>
                // ) : <></>
            }
        </div>
    )
}

export default Map
