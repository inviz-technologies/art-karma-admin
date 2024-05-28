// import moment from "moment";
import { useParams } from "react-router-dom";
import { convertDateFormat } from "./../../../utils/helpers";
import ApiLoader from "../../../components/ApiLoader";
import ErrorAlert from "../../../components/ErrorAlert";
// import { useSendPaymentMutation } from "../../../services/usersMutation";
import { api } from "../../../services/axiosInstance";
import { showNotification } from "../../../features/common/headerSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useOrderQuery } from "../../../services/ordersQueries";

const SingleOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { data: order, error, isPending, isError } = useOrderQuery(id);
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

  console.log("single order", order)
  return (
    <>
      <div className="bg-white rounded-md shadow-md p-4 flex flex-col gap-5">
        <>
          <h2 className="h2 text-2xl font-semibold">Order Details</h2>
          <div className=" card grid sm:grid-cols-1 lg:grid-cols-2 row-span-10 gap-4  p-4 rounded-md shadow-md card-compact ">
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Name:</span>
              <span className=" text-md font-semibold">{order?.order?.name}</span>
            </div>
            {/* <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Email:</span>
              <span className=" text-md font-semibold">
                {order.email.toLowerCase()}
              </span>
            </div> */}
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Quantity:</span>
              <span className=" text-md font-semibold">
                {order?.quantity}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Price:</span>
              <span className=" text-md font-semibold">{order?.subTotal}</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Order Status</span>
              <span className=" text-md font-semibold">{order?.orderStatus}</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className=" text-md font-semibold">Created At:</span>
              <span className=" text-md font-semibold">
                {convertDateFormat(order?.order?.createdAt)}
              </span>
            </div>
          </div>
        </>
        <>
          {/* <h2 className="h2 text-2xl font-semibold">Actions</h2> */}
          {/* <div className=" card grid sm:grid-cols-1 lg:grid-cols-1 row-span-10 gap-4  p-4 rounded-md shadow-md card-compact ">
            <div className=" mb-4">
              <div
                className={
                  !order?.payment?.advancePaid &&
                  "tooltip tooltip-right mb-4 cursor-not-allowed"
                }
                data-tip="Send advance payment link on this order's Email"
              >
                <button
                  className="btn btn-primary"
                  onClick={() => sendPaymentLink(order._id)}
                  disabled={order?.payment?.advancePaid || isLoading}
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
                    {order?.payment?.advancePaid ? "Paid" : "Not Paid"}
                  </span>
                </div>
                <div
                  className={
                    !order?.payment?.advancePaid && "tooltip tooltip-left mb-4"
                  }
                  data-tip={!order?.payment?.advancePaid && "Mark as Paid"}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => confirmAdvancePayment(order._id)}
                    disabled={order?.payment?.advancePaid || isLoading}
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
                  order?.payment?.advancePaid && "tooltip tooltip-right mb-4"
                }
                data-tip="Send login credentials to order on email"
              >
                <button
                  className="btn btn-primary"
                  disabled={
                    !order?.payment?.advancePaid ||
                    isLoading ||
                    !order?.encryptedPassword
                  }
                  onClick={() => sendLoginCredentials(order._id)}
                >
                  {isLoading
                    ? "Sending..."
                    : !order?.encryptedPassword
                    ? "Sent"
                    : "Send logn credentials"}
                </button>
              </div>
            </div>
          </div> */}
        </>
      </div>
    </>
  );
};

export default SingleOrder;
