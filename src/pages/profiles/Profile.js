import React from "react";
import styles from "../../styles/Profile.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 40, followerPage } = props;
  const { id, following_id, image_url, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center justify-content-between ${
        mobile && "flex-column"
      }`}
    >
      <div className={`d-flex align-items-center ${mobile && "flex-column"}`}>
        <div>
          <Link className="align-self-center" to={`/profiles/${id}`}>
            <Avatar src={image_url} height={imageSize} id={id} />
          </Link>
        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
          <strong>{owner}</strong>
        </div>
      </div>

      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          currentUser &&
          !is_owner &&
          !followerPage &&
          (following_id ? (
            <Button
              className="btn btn-danger"
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className="btn btn-success"
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
