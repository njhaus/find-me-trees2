import { useContext } from "react";
import TextInput from "../../../components/inputs/BrowseTextInput";
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
      label={""}
      formName={"title"}
      helperText={"Enter tree name"}
      onChange={handleChange}
    />
  );
}

export default NameFilter
