import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();

  return (
    <Container className={`${mobile && "d-lg-none text-center mb-3"}`}>
      {popularProfiles.results.length ? (
        <>
          <h2 className="fs-4">Most Followed profiles</h2>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results
              .slice(0, 7)
              .map((profile) => <Profile key={profile.id} profile={profile} />)
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
