// ActorList.js
import React from "react";

const ActorList = ({ cast }) => {
  return (
    <div className="actor-list">
      <h3>Top Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorList;
