import { useState } from "react";

import { Flex, Text } from '@chakra-ui/react'
import { iTreeTraitsData } from '../browse/data/treeData'
import { BsQuestionCircle } from 'react-icons/bs'

import { allFilters } from '../browse/data/filterFormData'


interface iTreeTraits {
  trait: any;
  label: string;
  helperText: string
}

const TreeTraits = ({ trait, label, helperText }: iTreeTraits) => {

  const [showHelper, setShowHelper] = useState(false)

  return (
    // Uses the filters array -- which has all descriptions already included in it and a property 'formName' that matches the key for the Traits variable passed in. This way, we can access the explanation for each trait from the filters
    <Flex direction={"row"}>
      <Text>{label}:</Text>
      <Text>{trait}</Text>
      <BsQuestionCircle onClick={() => setShowHelper(!showHelper)} />
      {showHelper && <Text>{helperText}</Text>}
    </Flex>
  );
}

export default TreeTraits
