import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: -35.6453777,
      lng: -59.7910402,
    },
    zoom: 17,
  };

  return (
    <div style={{ height: "30vh", width: "550px" }} className="m-12">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCMoTEepJRZ2GBDkmK5RGN3pbH-BK3z8Go" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={-35.6528}
          lng={-60.6958}
          text="Salud en movimiento GIMNASIO"
        />
      </GoogleMapReact>
    </div>
  );
}
