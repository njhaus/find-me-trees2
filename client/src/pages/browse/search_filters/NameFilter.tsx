import TextInput from "../../../components/inputs/BrowseTextInput";
import { useContext, useState, useRef, useEffect } from "react";
import { FormDataContext, iFormDataContext } from "../Browse";

const NameFilter = () => {

  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string | null) => {
    setFormData({ ...formData, [key]: val });
  };

  return (
    <TextInput
      formVal={formData.title}
      label={"Search by name: "}
      formName={"title"}
      helperText={"Enter tree name"}
      onChange={handleChange}
    />
  );
}

export default NameFilter
