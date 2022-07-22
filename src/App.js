import './App.css';
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import mapStyles from './mapStyles';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const libraries = ["places"]
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
  }
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  }

  const [latitude, setLatitude] = useState('') 
  const [longitude, setLongitude] = useState('')

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "",
    libraries, 
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      //store latitude and longitude
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  const center = {
    lat: latitude,
    lng: longitude
  }

  if (loadError) {
    return "error loading maps"
  }
  if (!isLoaded) {
    return "loading maps"
  }
  
  const notify = () => {
    toast.info('Villa Paradiso: Kids eat free wednesday nights!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    console.log('click')
  }

  return (
    <div className="App">
      <h2>Get to know your local restaurants</h2>
      <button onClick={notify}>Latest updates</button>
      <ToastContainer/>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={15} 
        center={center}
        options={options}
        >
      </GoogleMap>
    </div>
  );
}

export default App;
