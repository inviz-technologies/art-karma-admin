import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewCategory } from "../categorySlice";
import SelectBox from "./../../../components/Input/SelectBox";

const INITIAL_CATEGORY_OBJ = {
  name: "",
  description: "",
  parent: "",
};

function AddCategoryModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryObj, setCategoryObj] = useState(INITIAL_CATEGORY_OBJ);

  const saveNewCategory = () => {
    let newCategoryObj = {
      id: 7,
      name: categoryObj.name,
      description: categoryObj.description,
      parent: categoryObj.parent,
    };
    dispatch(addNewCategory({ newCategoryObj }));
    dispatch(showNotification({ message: "New Category Added!", status: 1 }));
    closeModal();
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setCategoryObj({ ...categoryObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={categoryObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Category Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={categoryObj.description}
        updateType="description"
        containerStyle="mt-4"
        labelTitle="Description"
        updateFormValue={updateFormValue}
      />

      {/* <InputText
        type="email"
        defaultValue={categoryObj.email}
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email Id"
        updateFormValue={updateFormValue}
      /> */}
      <SelectBox
        labelTitle="Select Parent Category"
        containerStyle="mt-4 w-full"
        options={[
          { value: null, name: "None" },
          { value: "test", name: "test" },
        ]}
        defaultValue={categoryObj.parent}
        updateType="parent"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewCategory()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddCategoryModalBody;
