import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";


const libraries = ["places"]; //tranh rerender nheiu lan

const Map = () => {
      const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env. REACT_APP_API_GOOGLE_KEY,
        libraries,
      });
      if (loadError) return "error loading maps";
        if (!isLoaded) return "loading maps";

        
const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};
const center = {
  lat: 10.823099,
  lng: 106.629662,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
      
    }




// import React, { useCallback, useRef, useState } from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import { formatRelative } from "date-fns";

// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";

// import IconItem from "./assets/focus-location.png";
// import { Box, Input, Stack, TextField } from "@mui/material";

// const libraries = ["places"]; //tranh rerender nheiu lan

// const mapContainerStyle = {
//   width: "50vw",
//   height: "50vh",
// };
// const center = {
//   lat: 10.823099,
//   lng: 106.629662,
// };

// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
// };
// const Map = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env. REACT_APP_API_GOOGLE_KEY,
//     libraries,
//   });

//   const [markers, setMarkers] = useState([]);
//   const [selected, setSelected] = useState(null);

//   const onMapClick = useCallback((e) => {
//     setMarkers((current) => [
//       ...current,
//       {
//         lat: e.latLng.lat(),
//         lng: e.latLng.lng(),
//         time: new Date(),
//       },
//     ]);
//   }, []);

//   const mapRef = useRef();
//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   const panTo = useCallback(({ lat, lng }) => {
//     mapRef.current.panTo({ lat, lng });
//     mapRef.current.setZoom(14);
//   }, []);

//   if (loadError) return "error loading maps";
//   if (!isLoaded) return "loading maps";

//   return (
//     <div>
//       <Search panTo={panTo} />
//       <Locate
//         panTo={panTo}
//         onClick={() => {
//           console.log("click on location");
//           // navigator.geolocation.getCurrentPosition(success, error, options);
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               panTo({
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//               });
//             },
//             () => null,
//             options
//           );
//         }}
//       />

//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={8}
//         center={center}
//         options={options}
//         onClick={onMapClick}
//         onLoad={onMapLoad}
//       >
//         {markers.map((marker) => (
//           <Marker
//             key={marker.time.toISOString()}
//             position={{ lat: marker.lat, lng: marker.lng }}
//             icon={{
//               url: IconItem,
//               scaledSize: new window.google.maps.Size(30, 30),
//               origin: new window.google.maps.Point(0, 0),
//               anchor: new window.google.maps.Point(15, 15),
//             }}
//             onClick={() => {
//               console.log(marker);
//               setSelected(marker);
//             }}
//           />
//         ))}

//         {selected ? (
//           <InfoWindow
//             position={{ lat: selected.lat, lng: selected.lng }}
//             onCloseClick={() => {
//               setSelected(null);
//             }}
//           >
//             <div>
//               <h2>Bear spotted</h2>
//               <p>Spotted {formatRelative(selected.time, new Date())}</p>
//             </div>
//           </InfoWindow>
//         ) : null}
//       </GoogleMap>
//     </div>
//   );
// };

// export default Map;

// export const Locate = ({ panTo, onClick }) => {
//   return (
//     <button onClick={onClick}>
//       <img src={IconItem} alt="compass-locate me" width="30" height="30" />
//     </button>
//   );
// };

// export const Search = ({ panTo }) => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete({
//     requestOptions: {
//       location: { lat: () => 10.823099, lng: () => 106.629662 },
//       radius: 200 * 1000, //km --> mét
//     },
//   });

//   return (
//     <Box
//       onSelect={async (address) => {
//         // console.log(address);
//         setValue(address, false);
//         clearSuggestions();
//         try {
//           const results = await getGeocode({ address });
//           //   console.log(results);
//           const { lat, lng } = await getLatLng(results[0]);
//           //   console.log(lat, lng);
//           panTo({ lat, lng });
//         } catch (error) {
//           console.log("map error!");
//         }
//       }}
//     >
//       <Input
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//         disabled={!ready}
//         placeholder="enter address"
//       />

//       <Box>
//         <Stack>
//           {status === "OK" &&
//             data.map(({ id, description }) => (
//               <TextField key={id} value={description} />
//             ))}
//         </Stack>
//       </Box>
//     </Box>
//   );
//    }