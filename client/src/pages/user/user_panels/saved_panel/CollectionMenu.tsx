import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

interface iCollectionMenu {
  currentCol: string;
    collections: string[];
    onClick: (collection: string) => void;
}

const CollectionMenu = ({currentCol, collections, onClick }: iCollectionMenu) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width={'11rem'}>
        {currentCol === 'all' ? 'My Collections' : `${currentCol.split('')[0].toUpperCase()}${currentCol.slice(1)}`}
      </MenuButton>
          <MenuList>
              <MenuItem onClick={() => onClick('all')}>View All</MenuItem>
        {collections.map((c, i) => (
            <MenuItem key={i}
                onClick={() => onClick(c)}
            >{c}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CollectionMenu;
