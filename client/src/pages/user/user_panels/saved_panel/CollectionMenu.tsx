import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
    MenuDivider,
  Button
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

interface iCollectionMenu {
    collections: string[];
    onClick: (collection: string) => void;
}

const CollectionMenu = ({collections, onClick }: iCollectionMenu) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
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
