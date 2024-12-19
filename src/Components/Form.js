import { uid } from "uid";

export default function Form({ onAddActivity }) {

  function handleSubmit(event) {
    event.preventDefault();

    const newActivity = {
      name: event.target.form.activity.value,
      isForGoodWeather: event.target.form.checkbox.checked,
      id: uid(),
    };

    event.target.form.reset();

    onAddActivity(newActivity);
  }

  return (
    <>
      <h2>Add new activity</h2>
      <br/>
      <form className="form-container">
        <div className="input-container">
          <label htmlFor="activity">Name: </label>
          <input type="text" id="activity"/>
        </div>
        <div className="input-container input-container-checkbox">
          <label htmlFor="checkbox">
            Good weather activity
          </ label>
          <input 
            type="checkbox"
            id="checkbox" 
          />
        </div>  
        <button
          type="submit"
          className="submit-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
}
