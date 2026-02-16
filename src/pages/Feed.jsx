import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import { fetchFeed, removeUser } from "../store/feed/feedSlice";
import api from "../utils/axios";
import toast from "react-hot-toast";

const Feed = () => {
  const dispatch = useDispatch();
  const { users, loading, page, hasMore, limit, error } = useSelector(
    (state) => state.feed,
  );

  console.log("Feed users:", users);
  console.log(page, hasMore, limit);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchFeed({ page: 1, limit }));
    }
  }, [dispatch, page, limit]);

  const loadMore = () => {
    if (loading || !hasMore) return;

    dispatch(fetchFeed({ page, limit }));
  };

  const handleLike = async (id) => {
    console.log("Liked:", id);
    try {
      const res = await api.post(`/request/send/interested/${id}`);
      console.log("Like response:", res);
      toast.success("Liked");
      dispatch(removeUser(id));
    } catch (err) {
      console.error("Error liking user:", err);
      toast.error("failed to like user");
    }
  };

  const handleIgnore = async (id) => {
    try {
      const res = await api.post(`/request/send/ignored/${id}`);
      console.log("Ignore response:", res);
      toast.success("Ignored");
      dispatch(removeUser(id));
    } catch (err) {
      console.error("Error ignoring user:", err);
      toast.error("failed to ignore user");
    }
  };

  return (
    <div className="flex justify-center items-center mt-1 p-4">
      <div className="relative w-100">
        {users.slice(0, 3).map((user, index) => (
          <UserCard
            key={user._id}
            user={user}
            index={index}
            onLike={handleLike}
            onIgnore={handleIgnore}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
