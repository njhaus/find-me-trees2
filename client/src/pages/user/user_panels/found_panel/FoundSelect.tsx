import { Flex, Text } from '@chakra-ui/react';
import SelectInput from '../../../../components/inputs/SelectInput'
import { states } from '../../../../data/browse_data/statesData';

interface iFoundSelect {
    onSelect: (form: null, state: string) => void;
}

const FoundSelect = ({onSelect}: iFoundSelect) => {

    return (
        <SelectInput
          formVal={'foundStateSelect'}
          label={"Select a state"}
          values={states}
          formName={"location"}
          onChange={onSelect}
        />
    );
}

export default FoundSelect
