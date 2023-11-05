function WorkoutFormRadio({handleRadioChange}) {

    return (
        <div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="inlineRadioOptions" 
                    id="inlineRadio1" 
                    value="All" 
                    onChange={handleRadioChange} 
                />
                <label className="form-check-label" htmlFor="inlineRadio1">All</label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="inlineRadioOptions" 
                    id="inlineRadio3" 
                    value="Strength Training" 
                    onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">Strength Training</label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio"
                    name="inlineRadioOptions" 
                    id="inlineRadio3" 
                    value="Aerobic" 
                    onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio3">Aerobic</label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="inlineRadioOptions" 
                    id="inlineRadio4" 
                    value="Stretch"
                    onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="inlineRadio4">Stretch</label>
            </div>
        </div>
    )
}

export default WorkoutFormRadio