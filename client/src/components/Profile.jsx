import React from "react";
import "./Profile.css";
import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  useEffect(() => {
    console.log("profile component loaded");
  }, []);

  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const handleUpdateProfile = () => {
    setShowUpdateProfile((prevState) => !prevState);
  };

  return (
    <>
      {showUpdateProfile && <UpdateProfile handleMount={handleUpdateProfile} />}
      <div className="profileContainer">
        <div className="profileImageContainer">
          <div className="profileImage"></div>
        </div>
        <div className="profileInfoContainer">
          <div className="profileInfo">
            <div className="profileLine">
              Name:
              <span className="profileAns">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium culpa cumque excepturi modi ea expedita doloremque
                officia voluptates sint ex!
              </span>
            </div>
            <div className="profileLine">Gmail:</div>
            <div className="profileLine">Gender:</div>
            <div className="profileLine">Country:</div>
            <div className="profileLine">City:</div>
            <div className="profileLine">Date of Birth:</div>
            <div className="profileLine">School:</div>
            <div className="profileLine">College:</div>
            <div className="profileLine">University:</div>
            <div className="profileLine">Workplace:</div>
            <div className="profileLine">Contact number:</div>
            <div className="profileLine">Relationship status:</div>
            <div className="profileLine">Why are you on this website:</div>
            <div className="profileEassy">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
              nesciunt doloribus iure officiis, vel sapiente magnam cum totam
              fugit dolore doloremque reprehenderit commodi mollitia?
              Architecto, ad tempore non reprehenderit adipisci impedit optio
              molestias quo! Sint iure, unde error maxime exercitationem quos
              doloremque molestias fugit molestiae dicta excepturi saepe id
              vitae adipisci cumque repudiandae reiciendis autem. Laudantium
              reprehenderit consectetur tempore ipsum amet corrupti fugiat dicta
              quas dignissimos! Consequuntur ad repellendus expedita quos,
              explicabo nam dolore fugiat veniam quidem velit incidunt vel.
              Veritatis velit, asperiores quo assumenda eaque officiis incidunt
              est quaerat provident cupiditate expedita hic facilis, sunt
              debitis tempora reprehenderit aliquid aperiam error commodi
              voluptatum. Fuga corporis, maiores odio itaque nisi molestiae
              minima in optio ullam amet facilis iure ex recusandae, dolore
              dolorum dolor repellat illo commodi repellendus quis rem?
              Necessitatibus voluptatibus ullam ducimus perspiciatis culpa,
              delectus pariatur unde harum labore ipsa expedita minima vero
              ipsum maiores placeat, nesciunt, optio fugiat repellendus
              accusantium quam adipisci debitis fugit hic maxime? Eius suscipit
              necessitatibus reprehenderit, officia alias soluta laboriosam
              facilis quis earum porro, voluptatem, quo ipsum eaque tempora
              cumque? Quam magnam animi odit dolorum quasi voluptates dolores
              itaque! Facere debitis, quisquam distinctio quidem sed, obcaecati
              eius hic labore suscipit quis, porro officia harum.
            </div>
            <div className="profileLine">
              What is your opinion on Equity for All:
            </div>
            <div className="profileEassy">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
              nesciunt doloribus iure officiis, vel sapiente magnam cum totam
              fugit dolore doloremque reprehenderit commodi mollitia?
              Architecto, ad tempore non reprehenderit adipisci impedit optio
              molestias quo! Sint iure, unde error maxime exercitationem quos
              doloremque molestias fugit molestiae dicta excepturi saepe id
              vitae adipisci cumque repudiandae reiciendis autem. Laudantium
              reprehenderit consectetur tempore ipsum amet corrupti fugiat dicta
              quas dignissimos! Consequuntur ad repellendus expedita quos,
              explicabo nam dolore fugiat veniam quidem velit incidunt vel.
              Veritatis velit, asperiores quo assumenda eaque officiis incidunt
              est quaerat provident cupiditate expedita hic facilis, sunt
              debitis tempora reprehenderit aliquid aperiam error commodi
              voluptatum. Fuga corporis, maiores odio itaque nisi molestiae
              minima in optio ullam amet facilis iure ex recusandae, dolore
              dolorum dolor repellat illo commodi repellendus quis rem?
              Necessitatibus voluptatibus ullam ducimus perspiciatis culpa,
              delectus pariatur unde harum labore ipsa expedita minima vero
              ipsum maiores placeat, nesciunt, optio fugiat repellendus
              accusantium quam adipisci debitis fugit hic maxime? Eius suscipit
              necessitatibus reprehenderit, officia alias soluta laboriosam
              facilis quis earum porro, voluptatem, quo ipsum eaque tempora
              cumque? Quam magnam animi odit dolorum quasi voluptates dolores
              itaque! Facere debitis, quisquam distinctio quidem sed, obcaecati
              eius hic labore suscipit quis, porro officia harum.
            </div>
          </div>
          <div className="updateProfileButtonContainer">
            <button
              className="profileUpdateButton"
              onClick={handleUpdateProfile}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
