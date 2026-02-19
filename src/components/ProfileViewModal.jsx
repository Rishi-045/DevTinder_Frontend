import React from "react";
import GenderIcon from "../common/GenderIcon";

const ProfileViewModal = ({ connection }) => {
  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="max-w-sm mx-auto modal-box  bg-base-200 border-base-300 shadow-lg rounded-2xl p-6 relative">
          <div
            className=" bg-primary
 h-20 rounded-xl relative"
          >
            <img
              src={connection?.photoUrl}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 -bottom-12 transform -translate-x-1/2"
            />
          </div>

          <div className="text-center mt-14">
            <h2 className="text-lg font-semibold flex justify-center items-center gap-2">
              {connection?.firstName} {connection?.lastName}
              {connection?.gender && <GenderIcon gender={connection.gender} />}
            </h2>

            {connection?.age && (
              <div className="badge absolute top-30 right-6 badge-soft badge-primary">
                Age : {connection.age}
              </div>
            )}

            <p className="text-gray-500 text-sm">{connection?.email}</p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {connection?.about || "No bio available"}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-gray-400 text-sm mb-2">Skills</p>

            {connection?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {connection.skills.map((skill, index) => (
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

          <div className="modal-action flex justify-center items-center">
            <form method="dialog">
              <button className="btn btn-primary btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProfileViewModal;
