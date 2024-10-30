import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Asset from "../../components/Asset";
import styles from "../../styles/FollowersPage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Profile from "../profiles/Profile";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

function FollowersPage() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
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
        // console.log(err);
      }
    };

    fetchFollowersFollowing();
  }, [profile_id]);

  return (
    <Container className={`${styles.FollowersPage}`}>
      <Row>
        <Col lg={8} className="offset-lg-2">
          <h2 className={styles.Header}>Followers & Following</h2>
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
                    <InfiniteScroll
                      children={followers?.results.map((profile) => (
                        <Profile
                          key={profile.id}
                          profile={profile}
                          followerPage={true}
                        />
                      ))}
                      dataLength={followers.results.length}
                      loader={<Asset spinner />}
                      hasMore={!!followers.next}
                      next={() => fetchMoreData(followers, setFollowers)}
                    />
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
                    <InfiniteScroll
                      children={following?.results.map((profile) => (
                        <Profile
                          key={profile.id}
                          profile={profile}
                          followerPage={true}
                        />
                      ))}
                      dataLength={following.results.length}
                      loader={<Asset spinner />}
                      hasMore={!!following.next}
                      next={() => fetchMoreData(following, setFollowing)}
                    />
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
