import React from "react";
import "./TeamMember.css";
import { CgProfile } from "react-icons/cg";

const TeamMember = (props) => {
  const { id, nombre, edad, descripcion, ubicacion } = props;

  return (
    <div className="wrapper">
      <div className="card">
        <input type="checkbox" id={id} className="more" aria-hidden="true" />
        <div className="content">
          <div
            className="front"
            style={{
              backgroundImage:
                "url('https://png.pngtree.com/background/20210710/original/pngtree-technological-sense-business-line-background-picture-image_1014566.jpg')",
            }}
          >
            <div className="inner">
              <CgProfile className="h-28 w-28 text-black" />
              <h2 className="text-black">{nombre}</h2>
              <div className="rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <label htmlFor={id} className="button" aria-hidden="true">
                Informacion
              </label>
            </div>
          </div>
          <div className="back text-black">
            <div className="inner">
              <div className="info">
                <span>{edad}</span>
                <div className="icon">
                  <i className="fas fa-users"></i>
                  <span>Años</span>
                </div>
              </div>

              <div className="description">
                <p>{descripcion}</p>
              </div>
              <div className="location">{ubicacion}</div>
              <div className="price">38€ / day</div>
              <label
                htmlFor={id}
                className="button return text-black"
                aria-hidden="true"
              >
                Volver
                <i className="fas fa-arrow-left"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
