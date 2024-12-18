import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import styles from "../../styles/Comment.module.css";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const { state } = useLocation();
  const message = state?.message;
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost(post);
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 mx-auto" lg={8}>
        <PopularProfiles mobile />
        {message && (
          <Alert variant="success" className="mt-3">
            {message}
          </Alert>
        )}
        <Post {...post} setPosts={setPost} postPage />
        <div className={styles.Comment}>
          <hr />
          {currentUser && (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          )}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <Container className="my-2 px-4 py-2">
              <hr />
              <p className="ms-2">Nobody commented yet. Be the first one!</p>
            </Container>
          ) : (
            <Container className="my-2 px-4 py-2">
              <hr />
              <p className="ms-2">Nobody commented yet.</p>
            </Container>
          )}
        </div>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostPage;
