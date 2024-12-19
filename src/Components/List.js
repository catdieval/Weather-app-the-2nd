export default function List({ activities, onDeleteActivity }) {

  return (
    <>
      <ul className="list-container">
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}{" "}
            <button 
              className="delete-button" 
              aria-label="Delete activity"
              title="Delete activity"
              onClick={() => onDeleteActivity(activity.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
