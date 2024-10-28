import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm";
import { Container } from "react-bootstrap";
import "./api/axiosDefaults";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostsPage from "./pages/posts/PostsPage";
import PostEditForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ProfileSettings from "./pages/profiles/ProfileSettings";
import FollowersPage from "./pages/followers/FollowersPage";
import ChatList from "./pages/chats/ChatList";
import ChatDetail from "./pages/chats/ChatDetail";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <PostsPage message="No results found. Adjust the search keyword." />
            }
          />

          <Route
            path="/liked"
            element={
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`post_likes__owner__profile=${profile_id}&orderings=-likes__created_at&`}
              />
            }
          />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/posts/create" element={<PostCreateForm />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<PostEditForm />} />
          <Route path="/profiles/:id" element={<ProfilePage />} />
          <Route path="/profiles/:id/edit/" element={<ProfileEditForm />} />
          <Route path="/profiles/:id/settings/" element={<ProfileSettings />} />
          <Route path="/profiles/:id/followers/" element={<FollowersPage />} />
          <Route path="/chats" element={<ChatList user={currentUser} />} />
          <Route
            path="/chats/:chat_id"
            element={<ChatDetail user={currentUser} />}
          />

          <Route path="*" element={<p1>Page Not Found</p1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
