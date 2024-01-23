export type Helper = {
  img: string;
  text: string;
};

type filterObj = {
  label: string;
  values: string[];
  helperText: Helper[];
  helperLink: string;
  formName: string;
};

export const leafFilters: filterObj[] = [
  {
    label: "Leaf Type",
    values: ["Simple", "Compound"],
    helperText: [
      {
        img: "/filter-form/simple-leaf.jpeg",
        text: "Simple leaves are single leaves connected directly to the branch.",
      },
      {
        img: "/filter-form/compound-leaf.jpeg",
        text: "Compound leaves are groups of leaves connected to a single stem.",
      },
    ],
    helperLink:
      "https://www.treehugger.com/simple-and-compound-tree-leaf-4051112",
    formName: "leafType",
  },
  {
    label: "Leaf Shape",
    values: ["Needle", "Smooth", "Toothed", "Lobed"],
    helperText: [
      {
        img: "/filter-form/needles.jpeg",
        text: "Needles can be long, thin, and pointy, but some needle-like leaves can be shorter and scaled.",
      },
      {
        img: "/filter-form/smooth-leaf.jpeg",
        text: "Smooth leaves have no bumps along their edges.",
      },
      {
        img: "/filter-form/toothed-leaf.jpeg",
        text: "Toothed leaves have small bumps, teeth, or serrations along their edges.",
      },
      {
        img: "/filter-form/lobed-leaf.jpeg",
        text: "Lobed leaves have deep indentations that can be rounded or pointed.",
      },
    ],
    helperLink: "",
    formName: "leafShape",
  },
  {
    label: "Leaf Size",
    values: ["Under 2 inches", "2-6 inches", "6 - 10 inches, over 10 inches"],
    helperText: [
      {
        img: "/filter-form/simple-leaf.jpeg",
        text: "Measure the size of the entire leaf from where it connects to the stem to its tip.",
      },
      {
        img: "/filter-form/compound-leaf.jpeg",
        text: "If the leaf is compound, measure one leaflet in the group of leaves.",
      },
    ],
    helperLink: "",
    formName: "leafSize",
  },
];

export const barkFilters: filterObj[] = [
  {
    label: "Bark",
    values: ["Rough", "Smooth", "Peeling"],
    helperText: [
      {
        img: "/filter-form/rough-bark.jpeg",
        text: "Most trees have rough bark, which is bumpy, or furrowed to the touch.",
      },
      {
        img: "/filter-form/smooth-bark.jpeg",
        text: "Trees with smooth bark can still have bumps or cracks in the bark, but overall the bark is not bumpy or furrowed. (Note: Most trees have smooth bark when young.)",
      },
      {
        img: "/filter-form/peeling-bark.jpeg",
        text: "Some trees have peeling bark that naturally separates itself from the trunk.",
      },
    ],
    helperLink: "",
    formName: "bark",
  },
  {
    label: "Branches",
    values: ["Drooping", "Upright", "Spiral"],
    helperText: [
      {
        img: "/filter-form/drooping-branches.jpeg",
        text: "Drooping branches grow at about 90 degree angles from the trunk, and their weight causes them to droop as they grow larger.",
      },
      {
        img: "/filter-form/upright-branches.jpeg",
        text: "Upright branches spread in an upright direction from the main trunk.",
      },
      {
        img: "/filter-form/drooping-branches.jpeg",
        text: "Spiral branches grow in a spiral pattern from the main trunk.",
      },
    ],
    helperLink: "",
    formName: "branches",
  },
];

export const fruitFilters: filterObj[] = [
  {
    label: "Fruit/Seed Type",
    values: ["Fleshy", "Berry", "Nut", "Acorn", "Ball", "Key", "Cone"],
    helperText: [
      {
        img: "/filter-form/fleshy-fruit.jpeg",
        text: "Fleshy fruits, such as apples, have large amount of soft tissue with seeds often in the middle.",
      },
      {
        img: "/filter-form/berry-fruit.jpeg",
        text: "Berries are small roundish, juicy fruits (But many are poisonous, so don't eat it if you don't recognize it!)",
      },
      {
        img: "/filter-form/nut-fruit.jpeg",
        text: "Nuts are hard fruits within a tough outer casing.",
      },
      {
        img: "/filter-form/acorn-fruit.jpeg",
        text: "Acorns are hard seeds attatched to the tree with a cap.",
      },
      {
        img: "/filter-form/ball-fruit.jpeg",
        text: "Ball fruits are round. They can be smooth or spiky, but they do not hold a nut within.",
      },
      {
        img: "/filter-form/key-fruit.jpeg",
        text: "Keys are winged fruits with a smooth end to let them glide on the wind and a seed on the other end.",
      },
      {
        img: "/filter-form/pinecone.jpeg",
        text: "Cones are hard, scaly containers for seeds. They are not fruits, but are the seed containers for gymnosperms (pine, spruce, fir, etc.).",
      },
    ],
    helperLink: "",
    formName: "fruit",
  },
];

export const flowerFilters: filterObj[] = [
  {
    label: "Flower Color",
    values: [
      "Red",
      "Pink",
      "Purple",
      "Blue",
      "Orange",
      "Yellow",
      "White",
      "Green",
    ],
    helperText: [
      {
        img: "/filter-form/tree-flower.jpeg",
        text: "Many trees have inconspicuous flowers that only bloom at certain times of year, and gymnosperms (pine, spruce, fir, etc.) don't have flowers at all. Don't be surprised if you aren't able to find flowers on your tree.",
      },
    ],
    helperLink: "",
    formName: "flower",
  },
];

const radioFilters = [leafFilters, fruitFilters, flowerFilters];

export const allFilters: filterObj[] = [
  ...leafFilters,
  ...barkFilters,
  ...fruitFilters,
  ...flowerFilters,
];

export interface iFormData {
  [key: string]: any;
}

const initialFormData: iFormData = {
  title: "",
  location: "",
  bark: "",
  branches: "",
};

const completeInitialFormData = () => {
  radioFilters.forEach((filterList) =>
    filterList.forEach((filter) => {
      initialFormData[filter.formName] = "";
    })
  );
};
completeInitialFormData();

export interface GeocodeData {
  meta: {
    code: number;
  };
  addresses: {
    latitude: number;
    longitude: number;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    addressLabel: string;
    formattedAddress: string;
    country: string;
    countryCode: string;
    countryFlag: string;
    state: string;
    stateCode: string;
    postalCode: string;
    city: string;
    borough: string;
    county: string;
    neighborhood: string;
    number: string;
    distance: number;
    layer: string;
  }[];
}

export default initialFormData;
