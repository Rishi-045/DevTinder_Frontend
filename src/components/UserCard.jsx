const UserCard = ({ user, onLike, onIgnore, index }) => {
  return (
    <div
      className="absolute w-full bg-base-300 rounded-xl shadow-xl p-4 flex flex-col items-center justify-center transition-transform duration-300"
      style={{
        zIndex: 10 - index,
        transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
      }}
    >
      <img
        src={user?.photoUrl}
        alt="profile"
        className="w-full h-60 object-cover rounded-lg"
      />

      <h2 className="text-xl base-content font-bold mt-2">
        {user?.firstName} {user?.lastName}
      </h2>

      {/* {user?.age && (
        <p className="text-gray-600">{user.age} years</p>
      )} */}

      {user?.skills?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          {user.skills.map((skill, i) => (
            <span
              key={i}
              className="badge badge-outline badge-primary text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* About (only if exists) */}
      {user?.about && (
        <p className="text-sm text-center text-gray-500 mt-2 line-clamp-3">
          {user.about}
        </p>
      )}

      {index === 0 && (
        <div className="flex gap-10 mt-4">
          <button
            onClick={() => onIgnore(user._id)}
            className="btn btn-secondary"
          >
            Ignore
          </button>

          <button
            onClick={() => onLike(user._id)}
            className="btn btn-primary"
          >
            Like
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
