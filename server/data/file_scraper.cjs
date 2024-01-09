const fs = require("fs").promises;
const pdf = require("pdf-parse");

const treeList = [];

const getFileData = async (file) => {
  try {
    const data = await fs.readFile(`./raw/${file}`, "utf8");
    // console.log("FILE DATA:");
    const splitWords = [
      "introduction",
      "General Information",
      "Scientific name:",
      "Pronunciation:",
      "Common name",
      "Family:",
      "USDA hardiness zones:",
      "Origin:",
      "Uses:",
      "Availability:",
      "description",
      "Leaf type:",
      "Leaflet margin:",
      "Leaf margin:",
      "Leaflet shape:",
      "Leaf shape:",
      "Leaflet venation:",
      "Leaf venation:",
      "Leaf type and persistence:",
      "Leaf blade length:",
      "Leaflet blade length:",
      "Leaf color:",
      "Flower color:",
      "Flower characteristics:",
      "Trunk/bark/branches:",
      "Pruning requirement:",
    ]; 3

    const regex = new RegExp(`(${splitWords.join("|")})`, "i");
    const dataArray = data.toString().split(regex).filter(Boolean).map((str) => str.replaceAll(/\n/g, " ").trim(),);

    const intro = dataArray[dataArray.findIndex(str => str.match('INTRODUCTION')) + 1];
    const sciName = dataArray[dataArray.findIndex((str) => str.match("Scientific name:")) + 1].split(',')[0];
    const commonName = dataArray[
      dataArray.findIndex((str) => str.match("Common name")) + 1
    ]
      .split(/,|:/)[1]
      ;
    const commonNames = dataArray[
      dataArray.findIndex((str) => str.match("Common name")) + 1
    ]
      .split(":")[1]
      ;
    const leafType =
      dataArray[dataArray.findIndex((str) => str.match("Leaf type:")) + 1];
    const leafShape =
      dataArray[dataArray.findIndex((str) => str.match("Leaf shape:")) + 1];
    const leafletShape =
      dataArray[dataArray.findIndex((str) => str.match("Leaflet shape:")) + 1];
    const leafSize =
      dataArray[dataArray.findIndex((str) => str.match("Leaf blade length:")) + 1];
    const leafletSize =
      dataArray[
        dataArray.findIndex((str) => str.match("Leaflet blade length:")) + 1
      ];
    const leafVeins =
      dataArray[dataArray.findIndex((str) => str.match("venation:")) + 1];
    const flower = dataArray[
      dataArray.findIndex((str) => str.match("Flower color:")) + 1
    ]
      .split("\n")[0]
      ;
    const barkBranches =
      dataArray[
        dataArray.findIndex((str) => str.match("Trunk/bark/branches:")) + 1
      ];
    const family = dataArray[
      dataArray.findIndex((str) => str.match("Family:")) + 1
    ];
     const hardinessZone =
       dataArray[
         dataArray.findIndex((str) => str.match("USDA hardiness zones:")) + 1
       ].split("(")[0]
      ;
    const origin = dataArray[
      dataArray.findIndex((str) => str.match("Origin:")) + 1
    ];
    const uses = dataArray[
      dataArray.findIndex((str) => str.match("Uses:")) + 1
    ];
    const availability = dataArray[
      dataArray.findIndex((str) => str.match("Availability:")) + 1
    ];
    
    const dataObject = {
      title: capitalize(commonName),
      imgSrc: [
        "https://source.unsplash.com/random/400×300/?shrub",
        "https://source.unsplash.com/random/400×300/?shrub",
      ],
      sciName: capitalize(sciName),
      intro: capitalize(intro),
      sciInfo: {
        scientificName: capitalize(sciName),
        commonNames: capitalize(commonNames),
        family: capitalize(family),
        hardinessZone: capitalize(hardinessZone),
        origin: capitalize(origin),
        uses: capitalize(uses),
        availability: capitalize(availability),
      },
      traits: {
        leafType: capitalize(leafType),
        leafShape: leafShape.match("Fact")
          ? capitalize(leafletShape)
          : capitalize(leafShape),
        leafSize: leafShape.match("Fact")
          ? capitalize(leafletSize)
          : capitalize(leafSize),
        leafVeins: capitalize(leafVeins),
        bark: capitalize(barkBranches),
        // branches: "spiral",
        // fruit: "fleshy",
        flower: capitalize(flower),
        location: [],
      },
    };
    // console.log(dataArray);

    // console.log(commonName);
    if (!dataObject.title || dataObject.sciName.match(/Logo/)) {return null}
    else {return dataObject;}
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getFiles = async () => {
  try {
    const files = await fs.readdir("./raw");
    const promises = files.map(file => {
      return getFileData(file)
    })
    return Promise.all(promises); // Return the array of files if needed
  } catch (err) {
    console.error("Error reading directory:", err);
    return []; // Return an empty array or handle the error as required
  }
};

getFiles()
  .then((files) => {
    files.forEach(file => {
      treeList.push(file);
    })
    // )
  })
  .then(trees => {
    console.log("howdy doody");
    console.log(treeList);
  })
  .catch((err) => {
    console.error("Error in getFiles:", err);
  });


const capitalize = (str) => {
  if (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
  else {
    return '';
  }
}