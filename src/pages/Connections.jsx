import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnections } from "../store/connections/connectionsSlice";
import Loader from "../common/Loader";
import SkeletonItem from "../common/SkeletonItem";

const Connections = () => {
  const { connections, loading, error } = useSelector(
    (store) => store.connections,
  );
  const dispatch = useDispatch();
  console.log(connections);
  useEffect(() => {
    if (connections.length === 0)
    dispatch(fetchConnections());
  }, []);

  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          All your connections are listed here. You can view their profiles.
        </li>
        {loading &&
          Array(5)
            .fill(0)
            .map((_, index) => <SkeletonItem key={index} />)}
        {connections?.map((connection) => {
          console.log(connection?.photoUrl);
          return (
            <li key={connection?._id} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={connection?.photoUrl}
                  alt={`${connection?.firstName}'s profile`}
                />
              </div>
              <div>
                <div>{connection?.firstName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {connection?.email}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {connections.length === 0 && !loading && (
        <div className="p-4 text-center text-sm opacity-60">
          No connections at the moment.
        </div>
      )}
    </div>
  );
};

export default Connections;
