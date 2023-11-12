import { useContext } from "react";

import { Flex, Image, Box } from "@chakra-ui/react";

import { useImg } from "../../../hooks/useImg";
import SelectInput from "../../../components/inputs/SelectInput";
import { states } from "../data/statesData";
import { FormDataContext, iFormDataContext } from "../Browse";

const MapFilter = () => {
  const mapImg = useImg("placeholder-3.jpeg");

  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string) => {
    setFormData({ ...formData, [key]: val });
  };



  return (
    <Flex>
      <SelectInput
        formVal={formData.location}
        label={"Choose a state:"}
        values={states}
        formName={"location"}
        onChange={handleChange}
      />
      <Box>
        Or click your location on the map:
        <Image maxWidth={"50%"} src={mapImg}></Image>
      </Box>
    </Flex>
  );
};

export default MapFilter;
