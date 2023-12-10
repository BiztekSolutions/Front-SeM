import ExerciseForm from "./ExerciseForm";
import "./ExerciseModal.css";
import VideoEmbed from "./VideoEmbed";

// eslint-disable-next-line react/prop-types
function ExerciseModal({ exercise, closeModal, handleEditExercise }) {
  return (
    <div
      className="modal show border-8 z-10 fixed border-white top-0 left-0 translate-x-1/2  rounded-3xl bg-orange-600 w-1/2"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header relative">
            <h5 className="modal-title text-3xl text-white p-5">
              {exercise.Exercise.name}
            </h5>
            <button
              type="button"
              className="btn-close text-white absolute top-0 right-0 text-2xl"
              aria-label="Close"
              onClick={closeModal}
            >
              X
            </button>
          </div>
          <div
            className="modal-body py-5 border-t-4 flex flex-col"
            style={{ maxWidth: "100%" }}
          >
            <div className="mb-4 " style={{ maxWidth: "90%" }}>
              <p style={{ marginLeft: "5%" }}>
                {exercise.Exercise.description}
              </p>
            </div>
            <div
              className="flex items-center justify-center max-w-0"
              style={{ marginLeft: "5%", maxWidth: "90%" }}
            >
              {exercise.Exercise.video ? (
                <VideoEmbed youtubeLink={exercise.Exercise.video} />
              ) : null}
            </div>
          </div>

          <div className="border-t-4  py-5 modal-footer flex flex-col justify-center">
            <h5 className="modal-subtitle  text-2xl">Editar ejercicio</h5>
            <ExerciseForm exercise={exercise} onSubmit={handleEditExercise} />
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-secondary bg-black my-7"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExerciseModal;
