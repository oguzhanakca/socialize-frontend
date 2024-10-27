import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const handleMessageClick = async () => {
    try {
      const chatResponse = await axiosReq.get(`/chats/`);
      console.log(chatResponse);

      const existingChat = chatResponse.data.results.find(
        (chat) =>
          (chat.user1 === currentUser.profile_id &&
            chat.user2 === profile.id) ||
          (chat.user1 === profile.id && chat.user2 === currentUser.profile_id)
      );

      if (existingChat) {
        navigate(`/chats/${existingChat.id}`);
      } else {
        const { data } = await axiosReq.post("/chats/", {
          user1: currentUser.profile_id,
          user2: profile.id,
        });
        navigate(`/chats/${data.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mainProfile = (
    <>
      <Row className="px-3 text-center fs-5">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image_url}
          />
        </Col>
        <Col lg={6}>
          <div className="d-flex text-center justify-content-center">
            <h3 className="m-2 d-">{profile?.owner}</h3>
          </div>

          <Row className="justify-content-center">
            <Col xs={4} className="my-2">
              <div>{profile?.posts_count}</div>
              <div>Posts</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>Followers</div>
            </Col>
            <Col xs={4} className="my-2">
              <div>{profile?.following_count}</div>
              <div>Following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-end">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
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
          {currentUser && !is_owner && (
            <Button
              className="btn btn-primary ms-2"
              onClick={handleMessageClick}
            >
              Message
            </Button>
          )}
        </Col>
        <Col className="p-3">{profile?.bio}</Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="fs-3 text-center">{profile?.owner}'s Latests Posts</p>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results
            .filter((post) => post.owner === profile?.owner)
            .map((post) => (
              <Post key={post.id} {...post} setPosts={setProfilePosts} />
            ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container>
          {hasLoaded ? (
            <>
              {mainProfile}
              {profile?.is_private && !profile?.following_id && !is_owner ? (
                <p className="fs-4 text-center">
                  This profile is private. Follow to see their posts.
                </p>
              ) : (
                mainProfilePosts
              )}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
