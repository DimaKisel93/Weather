import React from "react";
// import { YMaps } from "react-yandex-maps";


// const getGeolocation = ymaps => {
//   return ymaps.geolocation.get({
//   provider: 'yandex',
//   autoReverseGeocode: true
//   })
//   .then(function (result) {
//     console.log(result.geoObjects.get(0)
//       .properties.get('metaDataProperty'));
//   });
// }

// const handleApiAvaliable = ymaps => {
//   const geolocation = getGeoLocation(ymaps);

//   console.log(geolocation)
// };


const Info = props => (

  
  <div>
    <h2>Погодное приложение</h2>
    <p>Узнайте погоду в любом городе</p>
    <p>Ваш город</p>
    <p>{props.town}</p>
    {/* <YMaps
      query={{
        apikey: '4ed9ddb3-e69d-4a30-906f-ca5046791f20',
      }}>
      onApiAvaliable={ymaps => handleApiAvaliable(ymaps)}
    </YMaps>  */}
  </div>

)

export default Info;