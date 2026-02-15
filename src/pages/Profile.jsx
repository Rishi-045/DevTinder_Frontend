import React, { useEffect, useState } from "react";
import ProfileEdit from "../components/ProfileEdit";
import ProfileView from "../components/ProfileView";
import api from "../utils/axios"
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [editMode, setEditMode] = useState(false);



  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      {editMode ? (
        <ProfileEdit
          user={user}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <ProfileView user={user} setEditMode={setEditMode} />
      )}
    </div>
  );
};

export default Profile;
