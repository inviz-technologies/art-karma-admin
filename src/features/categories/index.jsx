import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
// import { deleteLead } from "./userSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Category",
        bodyType: MODAL_BODY_TYPES.CATEGORY_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const navigate = useNavigate();
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getLeadsContent());
  }, []);

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Users"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Parent Category Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 5, 5].map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="font-bold">RESIN TRAYS</div>
                    </td>
                    <td>Made entirely from Resin and are .5 inch thick</td>
                    <td>None</td>

                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(k)}
                      >
                        <TrashIcon className="w-5" />
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
