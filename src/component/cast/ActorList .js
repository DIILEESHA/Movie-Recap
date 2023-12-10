// ActorList.js
import React from "react";
import "./actor.css";

const ActorList = ({ cast, name }) => {
  return (
    <div className="actor-list">
      <h3 className="actor ">Top Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
              />
            ) : (
              <img
                src="https://ehelperteam.com/wp-content/uploads/2019/09/Broken-images.png"
                alt={actor.name}
                style={{ opacity: "0.6" }}
              />
            )}
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorList;
