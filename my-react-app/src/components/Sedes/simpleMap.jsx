import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationPin = ({ text }) => (
  <div className="pin">
    <FaMapMarkerAlt className="pin-icon" />
    <p className="pin-text text-black">{text}</p>
  </div>
);

LocationPin.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: -35.6423179,
      lng: -59.7843731,
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
        <LocationPin
          lat={-35.6423179}
          lng={-59.7843731}
          text="Salud en movimiento GIMNASIO"
        />
      </GoogleMapReact>
    </div>
  );
}
