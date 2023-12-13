type filterObj = {
    label: string;
    values: string[];
  helperText: string;
  formName: string;
}

export const leafFilters: filterObj[] = [
    {
        label: 'Leaf Type',
        values: ['Simple', 'Compound'],
    helperText: 'Leaf type helper text.',
    formName: 'leafType',
        
    },
    {
        label: 'Leaf Shape',
        values: ['Needle', 'Smooth', 'Toothed', 'Lobed'],
        helperText: 'Leaf shape helper text.',
        formName: 'leafShape',
    },
    {
        label: 'Leaf Size',
        values: ['Under 2 inches', '2-6 inches', 'Over 6 inches'],
        helperText: 'Leaf size helper text.',
        formName: 'leafSize',
    }
]

export const barkFilters: filterObj[] = [
  {
    label: "Bark",
    values: ["Smooth", "Rough", "Peeling"],
    helperText: "Bark helper text.",
    formName: 'bark',
  },
  {
    label: "Branches",
    values: ["Drooping", "Spiral"],
    helperText: "Branches helper text.",
    formName: 'branches',
  },
];

export const fruitFilters: filterObj[] = [
  {
    label: "Fruit/Seed Type",
    values: ["Fleshy", "Berry", "Nut", "Acorn", "Ball", "Key", "Cone"],
    helperText: "Fruit/seed helper text.",
    formName: 'fruit',
  }
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
      "Green"
    ],
    helperText: "Flower helper text.",
    formName: 'flower',
  },
];

const radioFilters = [leafFilters, fruitFilters, flowerFilters]

export const allFilters : filterObj[] = [...leafFilters, ...barkFilters, ...fruitFilters, ...flowerFilters];

export interface iFormData {
  [key: string]: any;
}

const initialFormData: iFormData = {
  title: '',
  location: undefined,
  bark: [],
  branches: undefined,
};

const completeInitialFormData = () => {
  radioFilters.forEach((filterList) =>
    filterList.forEach((filter) => {
      initialFormData[filter.formName] = undefined;
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