import { Cake } from "lucide-react";
import GenderIcon from "../common/GenderIcon";

const ProfileView = ({ user, setEditMode }) => {
  console.log(user)
  return (
    <div className="max-w-sm mx-auto  bg-base-200 border-base-300 shadow-lg rounded-2xl p-6 relative">
      {/* Top Banner */}
      <div
        className=" bg-primary
 h-20 rounded-xl relative"
      >
        <img
          src={user?.photoUrl}
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 -bottom-12 transform -translate-x-1/2"
        />
      </div>

      <div className="text-center mt-14">
        <h2 className="text-lg font-semibold flex justify-center items-center gap-2">
          {user?.firstName} {user?.lastName}
          {/* Gender Icon */}
          {user?.gender && <GenderIcon gender={user.gender} />}
        </h2>
        {/* Age */}
          {user?.age && (
            <div className="badge absolute top-30 right-6 badge-soft badge-primary">Age : {user.age}</div>

          )}

        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

       

      {/* About */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          {user?.about || "No bio available"}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <p className="text-gray-400 text-sm mb-2">Skills</p>

        {user?.skills?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No skills added</p>
        )}
      </div>

      {/* Edit Button */}
      <button
        onClick={() => setEditMode(true)}
        className="btn btn-soft btn-primary mt-4 w-full"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileView;
