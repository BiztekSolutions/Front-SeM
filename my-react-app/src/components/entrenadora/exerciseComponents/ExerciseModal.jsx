import ExerciseForm from "./ExerciseForm";
import "./ExerciseModal.css";
import VideoEmbed from "./VideoEmbed";

// eslint-disable-next-line react/prop-types
function ExerciseModal({ exercise, closeModal, handleEditExercise }) {
  return (
    <div
      className="modal show border-8 absolute z-10 border-white top-5 left-1/4 rounded-3xl bg-gray-900 w-1/2"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header ">
            <h5 className="modal-title text-3xl text-black">{exercise.name}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body border-t-4 py-5 flex gap-6 justify-center">
            <div className="flex">
              <p className="pt-14">{exercise.description}</p>
              <VideoEmbed youtubeLink={exercise.video} />
            </div>
          </div>
          <div className="border-t-4 border-b-4 py-5 modal-footer flex justify-center">
            <h5 className="modal-subtitle p-20 text-2xl">Editar ejercicio</h5>
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
