import { useImg } from "../../../hooks/useImg";

type LeafType = 'simple' | 'compound';
type LeafShape = 'needle' | 'smooth' | 'toothed' | 'lobed';
type Bark = 'smooth' | 'rough' | 'peeling' | 'Brown' | 'Gray' | 'White' | null;
type Branches = 'drooping' | 'spiral' | null;
type Fruit = 'fleshy' | 'berry' | 'nut' | 'acorn' | 'ball' | 'key' | 'cone' | 'other';
type Flower = 'red' | 'pink' | 'purple/blue' | 'orange/yellow' | 'white' | 'green' | 'other';
export type UsState =
  | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA'
  | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD'
  | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ'
  | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC'
  | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';


// Need to complete
interface iSciInfo {
    info: string;
}
  
interface iLeaf {
    type: LeafType;
    shape: LeafShape;
    size: number;
}

export interface iTreeTraitsData {
    leaf: iLeaf;
    bark: Bark[];
    branches: Branches;
    fruit: Fruit;
    flower: Flower;
}   

export interface iTreeData {
  title: string;
  imgSrc: string[];
    sciName: string;
    intro: string;
    sciInfo: iSciInfo;
    traits: iTreeTraitsData;
    location: UsState[]
}

export const tempData = {
  title: "Tree title",
  imgSrc: [useImg("placeholder-1.jpeg"), useImg("placeholder-2.jpeg")],
  sciName: "treeus maximus",
  intro:
    "TREE INTRO: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore laborum, voluptas fugiat quo quas sint iusto debitis optio dolorum ipsa mollitia ex. Voluptas perspiciatis pariatur, magni eius tempore veniam illum animi quisquam fugiat assumenda rem! Velit ipsam ut iusto? Incidunt totam voluptatem libero molestias inventore ipsam rem est vero quas rerum odit enim, nisi nihil laboriosam cupiditate repellendus amet? Nihil quas sed consequuntur deserunt mollitia illum voluptatum minus temporibus, error quam vero delectus magni quisquam vitae labore veniam aliquid dolore sunt architecto id molestias praesentium ipsum ea. Sint consequuntur, magnam harum dolorum, odio quae maxime recusandae facere eum eligendi asperiores provident reprehenderit unde assumenda quo non aspernatur accusantium magni blanditiis dolor? Nesciunt reprehenderit consequatur distinctio neque enim debitis? Ut unde dolore nemo repellendus suscipit sequi omnis aperiam corrupti alias eaque. Adipisci, obcaecati? Quidem, sequi. Dolore repellat culpa sapiente veritatis perferendis id quasi explicabo, dicta ab deserunt porro eveniet vel, corrupti in. Dolorum non voluptas in voluptatem illo modi, consequatur possimus labore nobis facilis error quibusdam quam quasi ab blanditiis iste vero ut? Quas labore nobis nihil debitis voluptates doloribus ab distinctio, officiis expedita atque laudantium error blanditiis, ea perspiciatis molestiae sit asperiores, doloremque ullam quidem quaerat. Molestiae eveniet facilis possimus!",
  sciInfo: {
    info: "scientific info",
  },
  traits: {
    leaf: {
      type: "simple" as LeafType,
      shape: "compound" as LeafShape,
      size: 3,
    },
    bark: ["smooth" as Bark],
    branches: "spiral" as Branches,
    fruit: "fleshy" as Fruit,
    flower: "green" as Flower,
  },
  location: ["CA" as UsState, "WA" as UsState, "OR" as UsState],
};

// FUNCTION TO VALIDATE OBJECTS (still need to check it -- this is a ChatGPT thing)
function validateTreeData(rawData: any): iTreeData {
  // Ensure the leaf type is a valid LeafType
  function validateLeaf(leaf: any): iLeaf {
    return {
      type: leaf.type as LeafType,
      shape: leaf.shape as LeafShape,
      size: +leaf.size, // Convert size to a number
    };
  }

  // Ensure the bark types are valid Bark types
  function validateBark(bark: any): Bark[] {
    if (Array.isArray(bark)) {
      return bark.map((b) => b as Bark);
    }
    return [bark as Bark];
  }

  // Ensure the branches type is a valid Branches type
  function validateBranches(branches: any): Branches {
    return branches as Branches;
  }

  // Ensure the fruit type is a valid Fruit type
  function validateFruit(fruit: any): Fruit {
    return fruit as Fruit;
  }

  // Ensure the flower type is a valid Flower type
  function validateFlower(flower: any): Flower {
    return flower as Flower;
  }

  // Ensure the location types are valid UsState types
  function validateLocation(location: any): UsState[] {
    if (Array.isArray(location)) {
      return location.map((l) => l as UsState);
    }
    return [location as UsState];
  }

  return {
    title: rawData.title,
    imgSrc: rawData.imgSrc.map((src: string) => useImg(src)),
    sciName: rawData.sciName,
    intro: rawData.intro,
    sciInfo: {
      info: rawData.sciInfo.info,
    },
    traits: {
      leaf: validateLeaf(rawData.traits.leaf),
      bark: validateBark(rawData.traits.bark),
      branches: validateBranches(rawData.traits.branches),
      fruit: validateFruit(rawData.traits.fruit),
      flower: validateFlower(rawData.traits.flower),
    },
    location: validateLocation(rawData.traits.location),
  };
}

// Usage
const validatedData: iTreeData = validateTreeData(tempData);
