// import moment from "moment";
import { useParams } from "react-router-dom";
import { useUserQuery } from "../../../services/usersQueries";
import { convertDateFormat } from "./../../../utils/helpers";
import ApiLoader from "../../../components/ApiLoader";
import ErrorAlert from "../../../components/ErrorAlert";
// import { useSendPaymentMutation } from "../../../services/usersMutation";
import { api } from "../../../services/axiosInstance";
import { showNotification } from "../../../features/common/headerSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CustomerProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { data: user, error, isPending, isError } = useUserQuery(id);
  // const paymentMutation = useSendPaymentMutation();
  const dispatch = useDispatch();

  if (isPending) {
    return <ApiLoader />;
  }

  if (isError) {
    return <ErrorAlert message={error?.response?.data?.message} />;
  }

  // console.log(user?.payment);

  // Handle send advance payment link to user
  const confirmAdvancePayment = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await api.patch(
        `/api/v1/payments/confirm-advance-payment`,
        { userId: id }
      );
      if (data) {
        console.log(data);
        setIsLoading(false);
        dispatch(
          showNotification({
            message: "Payment confirm! You can send the login credentials now.",
            status: 1,
          })
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.log("confirm-payment-error", error);
      alert(error.response.data.message);
    }
  };

  // Handle confirm advance payment
  const sendPaymentLink = async (id) => {
    // paymentMutation.mutate(id);
    setIsLoading(true);
    try {
      const { data } = await api.post(`/api/v1/users/send-payment-link/${id}`);
      if (data) {
        console.log(data);
        setIsLoading(false);
        dispatch(showNotification({ message: data?.message, status: 1 }));
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Payment_link_error", error);
    }
  };

  //Send Login Credentials to paid user
  const sendLoginCredentials = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await api.post(`/api/v1/users/send-credentials/${id}`);
      if (data) {
        console.log(data);
        setIsLoading(false);
        dispatch(showNotification({ message: data?.message, status: 1 }));
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error_while_sending_credentails", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-md p-4 flex flex-col gap-5">
        <>
          <h2 className="h2 text-2xl font-semibold">User Details</h2>
          <div className=" card grid sm:grid-cols-1 lg:grid-cols-2 row-span-10 gap-4  p-4 rounded-md shadow-md card-compact ">
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Name:</span>
              <span className=" text-md font-semibold">{user.name}</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Email:</span>
              <span className=" text-md font-semibold">
                {user.email.toLowerCase()}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Phone:</span>
              <span className=" text-md font-semibold">{user.tel}</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Created At:</span>
              <span className=" text-md font-semibold">
                {convertDateFormat(user.createdAt)}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Event date:</span>
              <span className=" text-md font-semibold">
                {convertDateFormat(user.eventDate)}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Quantity:</span>
              <span className=" text-md font-semibold">
                {user.quantityAndOrders}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Delivery type:</span>
              <span className=" text-md font-semibold">
                {user.shippingOption}
              </span>
            </div>
          </div>
        </>
        <>
          <h2 className="h2 text-2xl font-semibold">Actions</h2>
          <div className=" card grid sm:grid-cols-1 lg:grid-cols-1 row-span-10 gap-4  p-4 rounded-md shadow-md card-compact ">
            <div className=" mb-4">
              <div
                className={
                  !user?.payment?.advancePaid &&
                  "tooltip tooltip-right mb-4 cursor-not-allowed"
                }
                data-tip="Send advance payment link on this user's Email"
              >
                <button
                  className="btn btn-primary"
                  onClick={() => sendPaymentLink(user._id)}
                  disabled={user?.payment?.advancePaid || isLoading}
                >
                  {isLoading ? "Sending..." : "Send Payment link"}
                </button>
              </div>
              <br />
              <hr />
              <br />
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <span className="text-md font-semibold">Payment status:</span>
                  <span className=" text-md font-semibold">
                    {user?.payment?.advancePaid ? "Paid" : "Not Paid"}
                  </span>
                </div>
                <div
                  className={
                    !user?.payment?.advancePaid && "tooltip tooltip-left mb-4"
                  }
                  data-tip={!user?.payment?.advancePaid && "Mark as Paid"}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => confirmAdvancePayment(user._id)}
                    disabled={user?.payment?.advancePaid || isLoading}
                  >
                    {isLoading ? "Please wait..." : "Confirm Payment"}
                  </button>
                </div>
              </div>
              <br />
              <hr />
              <br />
              <div
                className={
                  user?.payment?.advancePaid && "tooltip tooltip-right mb-4"
                }
                data-tip="Send login credentials to user on email"
              >
                <button
                  className="btn btn-primary"
                  disabled={
                    !user?.payment?.advancePaid ||
                    isLoading ||
                    !user?.encryptedPassword
                  }
                  onClick={() => sendLoginCredentials(user._id)}
                >
                  {isLoading
                    ? "Sending..."
                    : !user?.encryptedPassword
                    ? "Sent"
                    : "Send logn credentials"}
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default CustomerProfile;
