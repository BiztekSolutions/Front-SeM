import ExerciseForm from "./ExerciseForm";
import "./ExerciseModal.css";
import VideoEmbed from "./VideoEmbed";

// eslint-disable-next-line react/prop-types
function ExerciseModal({ exercise, closeModal, handleEditExercise }) {
  return (
    <div
      className="modal show border-8 absolute z-10 border-white top-1/2 left-1/4 rounded-3xl bg-blue-600 w-1/2"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header relative">
            <h5 className="modal-title text-3xl text-white p-5">{exercise.name}</h5>
            <button
              type="button"
              className="btn-close text-white absolute top-0 right-0 text-2xl"
              aria-label="Close"
              onClick={closeModal}
            >X</button>
          </div>
          <div className="modal-body border-t-4 py-5 flex gap-6 justify-center">
            <div className="flex">
              <p className="pt-14 pr-16">{exercise.description}</p>
              <VideoEmbed youtubeLink={exercise.video} />
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
