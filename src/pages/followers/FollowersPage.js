import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import Asset from "../../components/Asset";
import styles from "../../styles/FollowersPage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "../profiles/Profile";

function FollowersPage() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  const [followers, setFollowers] = useState({ results: [] });
  const [following, setFollowing] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const fetchFollowersFollowing = async () => {
      try {
        const [{ data: followingData }, { data: followersData }] =
          await Promise.all([
            axiosReq.get(
              `/profiles/?owner__followed__owner__profile=${profile_id}`
            ),
            axiosReq.get(
              `/profiles/?owner__following__followed__profile=${profile_id}`
            ),
          ]);
        setFollowers(followersData);
        setFollowing(followingData);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFollowersFollowing();
  }, [profile_id, followers, following]);

  return (
    <Container className={`${styles.FollowersPage}`}>
      <Row>
        <Col lg={8} className="offset-lg-2">
          <h3 className={styles.Header}>Followers & Following</h3>
          <Tab.Container defaultActiveKey="followers">
            <Nav fill variant="tabs" className="justify-content-center">
              <Nav.Item>
                <Nav.Link className={styles.NavLink} eventKey="followers">
                  Followers
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className={styles.NavLink} eventKey="following">
                  Following
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="py-4">
              <Tab.Pane eventKey="followers">
                {hasLoaded ? (
                  followers.results.length ? (
                    followers.results.map((profile) => (
                      <Profile key={profile.id} profile={profile} />
                    ))
                  ) : (
                    <Asset message="No followers found." />
                  )
                ) : (
                  <Asset spinner />
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="following">
                {hasLoaded ? (
                  following.results.length ? (
                    following.results.map((profile) => (
                      <Profile key={profile.id} profile={profile} />
                    ))
                  ) : (
                    <Asset message="Not following anyone yet." />
                  )
                ) : (
                  <Asset spinner />
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default FollowersPage;
