import TextInput from "../../../components/inputs/TextInput";
import { useContext, useState } from "react";
import { FormDataContext, iFormDataContext } from "../Browse";

const NameFilter = () => {

  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string | null) => {
    setFormData({ ...formData, [key]: val });
  };

  return (
    <TextInput
      formVal={formData.nameSearch}
      label={"Search by name: "}
      formName={"nameSearch"}
      helperText={"Enter tree name"}
      onChange={handleChange}
    />
  );
}

export default NameFilter
