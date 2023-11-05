import React from "react"
import ExerciseForm from "./ExerciseForm"
import './ExerciseModal.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoEmbed from "./VideoEmbed"
function ExerciseModal({exercise,closeModal,handleEditExercise}) {

    return (
        <div className="modal show" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{exercise.name}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <p>{exercise.description}</p>
                        <VideoEmbed youtubeLink={exercise.video}/>
                    </div>
                    <div className="modal-footer">
                        <h5 className="modal-subtitle">Edit Exercise</h5>
                        <ExerciseForm exercise={exercise} onSubmit={handleEditExercise} />
                        <button type="button" onClick={closeModal} className="btn btn-secondary">Close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ExerciseModal