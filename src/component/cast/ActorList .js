// ActorList.js
import React from "react";
import './actor.css'

const ActorList = ({ cast,name }) => {
  return (
    <div className="actor-list">
      <h3 className="actor ">Top Cast</h3>
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
