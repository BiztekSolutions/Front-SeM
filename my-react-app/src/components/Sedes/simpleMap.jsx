import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import chincheUbi from "../../assets/chinchetaUbi.png";

export const AnyReactComponent = () => (
  <div>
    <img src={chincheUbi} alt="ubicacion" className="bg-transparent w-8 h-8" />
  </div>
);

AnyReactComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function SimpleMap({ center, children }) {
  const defaultProps = {
    center: center,
    zoom: 17,
  };

  return (
    <div style={{ height: "30vh", width: "550px" }} className="m-12">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCMoTEepJRZ2GBDkmK5RGN3pbH-BK3z8Go",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
}
