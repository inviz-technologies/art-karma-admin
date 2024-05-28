import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";

// import { deleteLead, getLeadsContent } from "./userSlice";
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
import { useDeleteUserMutation } from "../../services/usersMutation";
import { deleteUser } from "../../services/usersApi";

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
  const { data: users, error, isPending, isError } = useUsersQuery();
  const deleteUserMutation = useDeleteUserMutation();


  const handleDeleteUser = (userId) => {
    deleteUserMutation.mutate(userId);
  };

  // const deleteCurrentLead = (index) => {
  //   dispatch(
  //     openModal({
  //       title: "Confirmation",
  //       bodyType: MODAL_BODY_TYPES.CONFIRMATION,
  //       extraObject: {
  //         message: `Are you sure you want to delete this User?`,
  //         type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
  //         index,
  //       },
  //     })
  //   );
  // };

  if (isPending) {
    return <ApiLoader />;
  }

  if (isError) {
    return <ErrorAlert message={error?.response?.data?.message} />;
  }

  return (
    <>
      <TitleCard
        title="Current Users"
        topMargin="mt-2"
        // TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Event type</th>
                <th>Event date</th>
                <th>Quantity</th>
                <th>Delivery</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">{user.name}</div>
                        {/* <div className="text-sm opacity-70">{l.last_name}</div> */}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.tel}</td>
                    <td>{user.eventName}</td>
                    <td>{convertDateFormat(user.eventDate)}</td>
                    <td>{user.quantityAndOrders}</td>
                    <td>{user.shippingOption}</td>
                    <td> {convertDateFormat(user.createdAt)}</td>
                    <td className="flex">
                      <button
                        className="btn btn-ghost"
                        onClick={() => navigate(user._id)}
                      >
                        <div className="tooltip" data-tip="View Details">
                          <EyeIcon className="w-5" />
                        </div>
                      </button>
                      <button
                        className="btn btn-ghost"
                        onClick={() => handleDeleteUser(user._id)}
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
