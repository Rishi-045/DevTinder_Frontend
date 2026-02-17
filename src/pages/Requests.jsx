import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, removeRequest } from "../store/requests/requestSlice";
import SkeletonItem from "../common/SkeletonItem";
import api from "../utils/axios";
import toast from "react-hot-toast";
import { resetConnections } from "../store/connections/connectionsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((store) => store.requests);
  useEffect(() => {
    if (requests.length === 0) dispatch(fetchRequests());
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const res = await api.post(`request/review/accepted/${requestId}`);
      console.log(res);
      dispatch(removeRequest(requestId));
      dispatch(resetConnections());
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to accept request");
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const res = await api.post(`request/review/rejected/${requestId}`);
      console.log(res);
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to decline request");
    }
  };

  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          All your incoming requests are listed here. You can accept or decline
          them.
        </li>

        {loading &&
          Array(5)
            .fill(0)
            .map((_, index) => <SkeletonItem key={index} />)}
        {error && <div className="text-red-500">{error}</div>}

        {requests?.map((request) => {
          return (
            <li key={request?._id} className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={request?.fromUserId?.photoUrl}
                />
              </div>
              <div>
                <div>
                  {request?.fromUserId?.firstName}{" "}
                  {request?.fromUserId?.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {request?.fromUserId?.email}
                </div>
              </div>

              <button
                onClick={() => handleAccept(request?._id)}
                className="btn btn-soft btn-primary self-center btn-sm"
              >
                Accept
              </button>

              <button
                onClick={() => handleDecline(request?._id)}
                className="btn btn-soft btn-error self-center btn-sm"
              >
                Decline
              </button>
            </li>
          );
        })}
      </ul>
      {requests.length === 0 && !loading && (
        <div className="p-4 text-center text-sm opacity-60">
          No incoming requests at the moment.
        </div>
      )}
    </div>
  );
};

export default Requests;
