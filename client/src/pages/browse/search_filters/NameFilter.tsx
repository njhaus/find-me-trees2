import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const NameFilter = () => {
  return (
    <FormControl display={'flex'}>
      <FormLabel>Search by Name:</FormLabel>
      <Input placeholder="Enter tree name" />
    </FormControl>
  );
}

export default NameFilter
