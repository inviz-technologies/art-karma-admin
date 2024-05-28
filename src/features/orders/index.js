import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";

// import { deleteLead, getLeadsContent } from "./orderslice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
// import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";
import { useUsersQuery } from "../../services/usersQueries";
import { convertDateFormat } from "./../../utils/helpers";
import ErrorAlert from "../../components/ErrorAlert";
import ApiLoader from "../../components/ApiLoader";
import { useOrdersQuery } from "../../services/ordersQueries";
import { useState } from "react";
import { api } from "../../services/axiosInstance";

// const TopSideButtons = () => {
//   const dispatch = useDispatch();

//   const openAddNewLeadModal = () => {
//     dispatch(
//       openModal({
//         title: "Add New User",
//         bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
//       })
//     );
//   };

//   return (
//     <div className="inline-block float-right">
//       <button
//         className="btn px-6 btn-sm normal-case btn-primary"
//         onClick={() => openAddNewLeadModal()}
//       >
//         Add New
//       </button>
//     </div>
//   );
// };

function Leads() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data: orders, error, isPending, isError } = useOrdersQuery();
  const [isLoading, setIsLoading] = useState(false);

  console.log("orders data", orders);


  const handleDeleteOrder = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await api.delete(`/api/v1/orders/${id}`);
      if (data) {
        console.log("delete data",data);
        setIsLoading(false);
        dispatch(
          openModal({
            title: "Confirmation",
            bodyType: MODAL_BODY_TYPES.CONFIRMATION,
            extraObject: {
              message: `Are you sure you want to delete this Order?`,
              type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
              index:id,
            },
          })
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Payment_link_error", error);
    }
  };


  if (isPending) {
    return <ApiLoader />;
  }

  if (isError) {
    return <ErrorAlert message={error?.response?.data?.message} />;
  }

  return (
    <>
      <TitleCard
        title="Orders"
        topMargin="mt-2"
        // TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
              <th>Client Name</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Order Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => {
                return (
                  <tr key={order?.order_id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">{order?.user?.name}</div>
                        {/* <div className="text-sm opacity-70">{l.last_name}</div> */}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">{order?.order.name}</div>
                        {/* <div className="text-sm opacity-70">{l.last_name}</div> */}
                      </div>
                    </td>
                    <td>$ {order?.subTotal}</td>
                    <td>{order?.quantity}</td>
                    {/* <td>{convertDateFormat(order.eventDate)}</td> */}
                    <td>{order?.orderStatus}</td>
                    {/* <td>{order.shippingOption}</td> */}
                    <td> {convertDateFormat(order.createdAt)}</td>
                    <td className="flex">
                      <button
                        className="btn btn-ghost"
                        onClick={() => navigate(order?._id)}
                      >
                        <div className="tooltip" data-tip="View Details">
                          <EyeIcon className="w-5" />
                        </div>
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <div className="tooltip" data-tip="Delete User">
                          <TrashIcon className="w-5" />
                        </div>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
