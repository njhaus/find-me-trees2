// Step 1: get files and add to database

const fs = require("fs").promises;

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
    const dataArray = data.toString().split(regex).filter(Boolean).map((str) => str.replaceAll(/\n/g, "").trim());

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

const fileData = () => {
  const treeList = [];
  getFiles()
    .then((fileData) => {
      fileData.forEach((data) => {
        treeList.push(data);
      });
      // )
    })
    .then((trees) => {
      const emptyLocation = 
        treeList.map((tree) => {
          if (tree) {
             return {
               title: tree.title,
               imgSrc: [],
               location: [],
             };
          }
        });
      process.stdout.write(JSON.stringify(emptyLocation) + "\n");
    })
    .catch((err) => {
      console.error("Error in getFiles:", err);
    });
  
  return treeList;
}


// Utility functions
const capitalize = (str) => {
  if (str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
  else {
    return '';
  }
}

// Step 2: add locations (I for invasive, U for unknown)
[
  { title: "White Fir", imgSrc: [], location: [] },
  { title: "Japanese Fir", imgSrc: [], location: [] },
  { title: "Wright Acacia", imgSrc: [], location: [] },
  { title: "Wright Acacia", imgSrc: [], location: [] },
  { title: "Wright Acacia", imgSrc: [], location: [] },
  { title: "Wright Acacia", imgSrc: [], location: [] },
  { title: "Amur Maple", imgSrc: [], location: [] },
  { title: "Bigtooth Maple", imgSrc: [], location: [] },
  { title: "Paperbark Maple", imgSrc: [], location: [] },
  { title: "Chalk Maple", imgSrc: [], location: [] },
  { title: "Boxelder", imgSrc: [], location: [] },
  { title: "Japanese Maple", imgSrc: [], location: [] },
  { title: "Norway Maple", imgSrc: [], location: [] },
  { title: "Sycamore Maple", imgSrc: [], location: [] },
  { title: "Red Maple", imgSrc: [], location: [] },
  { title: "Silver Maple", imgSrc: [], location: [] },
  { title: "Sugar Maple", imgSrc: [], location: [] },
  { title: "Three-Flowered Maple", imgSrc: [], location: [] },
  { title: "Paurotis Palm", imgSrc: [], location: [] },
  { title: "Yellow Buckeye", imgSrc: [], location: [] },
  { title: "Ohio Buckeye", imgSrc: [], location: [] },
  { title: "Horsechestnut", imgSrc: [], location: [] },
  { title: "Indian Horsechestnut", imgSrc: [], location: [] },
  { title: "Red Buckeye", imgSrc: [], location: [] },
  { title: "Red Horsechestnut", imgSrc: [], location: [] },
  { title: "Mimosa", imgSrc: [], location: [] },
  { title: "Tree-of-Heaven", imgSrc: [], location: [] },
  { title: "Common Alder", imgSrc: [], location: [] },
  { title: "White Alder", imgSrc: [], location: [] },
  { title: "Downy Serviceberry", imgSrc: [], location: [] },
  { title: "Shadblow Serviceberry", imgSrc: [], location: [] },
  { title: "Allegheny Serviceberry", imgSrc: [], location: [] },
  { title: "Apple Serviceberry", imgSrc: [], location: [] },
  { title: "Black-Calabash", imgSrc: [], location: [] },
  { title: "Devils-Walkingstick", imgSrc: [], location: [] },
  { title: "Monkey-Puzzletree", imgSrc: [], location: [] },
  { title: "False Monkey-Puzzletree", imgSrc: [], location: [] },
  { title: "Norfolk-Island-Pine", imgSrc: [], location: [] },
  { title: "Texas Madrone", imgSrc: [], location: [] },
  { title: "Strawberry-Tree", imgSrc: [], location: [] },
  { title: "Pawpaw", imgSrc: [], location: [] },
  { title: "White Orchid-Tree", imgSrc: [], location: [] },
  { title: "Hong Kong Orchid-Tree", imgSrc: [], location: [] },
  { title: "Brazilian Orchid-Tree", imgSrc: [], location: [] },
  { title: "Purple orchid-tree", imgSrc: [], location: [] },
  { title: "Orchid-Tree", imgSrc: [], location: [] },
  { title: "orchid tree", imgSrc: [], location: [] },
  { title: "Ponytail", imgSrc: [], location: [] },
  { title: "Gray Birch", imgSrc: [], location: [] },
  { title: "River Birch", imgSrc: [], location: [] },
  { title: "Paper Birch", imgSrc: [], location: [] },
  { title: "European Birch", imgSrc: [], location: [] },
  { title: "bishopwood", imgSrc: [], location: [] },
  { title: "Bismarck Palm", imgSrc: [], location: [] },
  { title: "Chittamwood", imgSrc: [], location: [] },
  { title: "Gumbo-Limbo", imgSrc: [], location: [] },
  { title: "Pindo Palm", imgSrc: [], location: [] },
  { title: "Bridalveil Tree", imgSrc: [], location: [] },
  { title: "Dwarf Poinciana", imgSrc: [], location: [] },
  { title: "Powderpuff", imgSrc: [], location: [] },
  { title: "Pink Powderpuff", imgSrc: [], location: [] },
  { title: "Weeping Bottlebrush", imgSrc: [], location: [] },
  { title: "Red Bottlebrush", imgSrc: [], location: [] },
  { title: "California Incense-Cedar", imgSrc: [], location: [] },
  { title: "Santa Maria", imgSrc: [], location: [] },
  { title: "Beauty Leaf", imgSrc: [], location: [] },
  { title: "Tea-Oil Camellia", imgSrc: [], location: [] },
  { title: "Carpentaria Palm", imgSrc: [], location: [] },
  { title: "European Hornbeam", imgSrc: [], location: [] },
  { title: "American Hornbeam", imgSrc: [], location: [] },
  { title: "American Hornbeam", imgSrc: [], location: [] },
  { title: "Pecan", imgSrc: [], location: [] },
  { title: "Shagbark Hickory", imgSrc: [], location: [] },
  { title: "Fishtail Palm", imgSrc: [], location: [] },
  { title: "Candlebrush", imgSrc: [], location: [] },
  { title: "Butterfly Bush", imgSrc: [], location: [] },
  { title: "Golden-Shower", imgSrc: [], location: [] },
  { title: "Chinese Chestnut", imgSrc: [], location: [] },
  { title: "Australian-Pine", imgSrc: [], location: [] },
  { title: "Catalpa", imgSrc: [], location: [] },
  { title: "Silver Atlas Cedar", imgSrc: [], location: [] },
  { title: "Deodar Cedar", imgSrc: [], location: [] },
  { title: "Cedar-of-Lebanon", imgSrc: [], location: [] },
  { title: "Mediterranean Hackberry", imgSrc: [], location: [] },
  { title: "Sugarberry", imgSrc: [], location: [] },
  { title: "Common Hackberry", imgSrc: [], location: [] },
  { title: "Japanese Hackberry", imgSrc: [], location: [] },
  { title: "Katsuratree", imgSrc: [], location: [] },
  { title: "Eastern Redbud", imgSrc: [], location: [] },
  { title: "Mexican Redbud", imgSrc: [], location: [] },
  { title: "Western Redbud", imgSrc: [], location: [] },
  { title: "Oklahoma Redbud", imgSrc: [], location: [] },
  { title: "Lawson Falsecypress", imgSrc: [], location: [] },
  { title: "Nootka Falsecypress", imgSrc: [], location: [] },
  { title: "Hinoki Falsecypress", imgSrc: [], location: [] },
  { title: "Sawara Falsecypress", imgSrc: [], location: [] },
  { title: "Chinese Fringetree", imgSrc: [], location: [] },
  { title: "Fringetree", imgSrc: [], location: [] },
  { title: "Desert-Willow", imgSrc: [], location: [] },
  { title: "Floss-Silk Tree", imgSrc: [], location: [] },
  { title: "Satinleaf", imgSrc: [], location: [] },
  { title: "Yellow Butterfly Palm", imgSrc: [], location: [] },
  { title: "camphor-tree", imgSrc: [], location: [] },
  { title: "Citrus", imgSrc: [], location: [] },
  { title: "American Yellowwood", imgSrc: [], location: [] },
  { title: "Harlequin Glorybower", imgSrc: [], location: [] },
  { title: "Pitch-Apple", imgSrc: [], location: [] },
  { title: "Pigeon-Plum", imgSrc: [], location: [] },
  { title: "Seagrape", imgSrc: [], location: [] },
  { title: "Silverpalm", imgSrc: [], location: [] },
  { title: "Coconut Palm", imgSrc: [], location: [] },
  { title: "Buttonwood", imgSrc: [], location: [] },
  { title: "Wild-Olive", imgSrc: [], location: [] },
  { title: "Geiger-Tree", imgSrc: [], location: [] },
  { title: "Giant Dogwood", imgSrc: [], location: [] },
  { title: "Roughleaf Dogwood", imgSrc: [], location: [] },
  { title: "Flowering Dogwood", imgSrc: [], location: [] },
  { title: "Kousa Dogwood", imgSrc: [], location: [] },
  { title: "Cornelian-Cherry", imgSrc: [], location: [] },
  { title: "Walter Dogwood", imgSrc: [], location: [] },
  { title: "Turkish Filbert", imgSrc: [], location: [] },
  { title: "Smoketree", imgSrc: [], location: [] },
  { title: "American Smoketree", imgSrc: [], location: [] },
  { title: "May Hawthorn", imgSrc: [], location: [] },
  { title: "English Hawthorn", imgSrc: [], location: [] },
  { title: "Washington Hawthorn", imgSrc: [], location: [] },
  { title: "‘Winter King’ Southern Hawthorn", imgSrc: [], location: [] },
  { title: "Lavalle Hawthorn", imgSrc: [], location: [] },
  { title: "Calabash-Tree", imgSrc: [], location: [] },
  { title: "Japanese-Cedar", imgSrc: [], location: [] },
  { title: "China-Fir", imgSrc: [], location: [] },
  { title: "Carrotwood", imgSrc: [], location: [] },
  { title: "Arizona Cypress", imgSrc: [], location: [] },
  { title: "Smooth-Barked Arizona Cypress", imgSrc: [], location: [] },
  { title: "Monterey Cypress", imgSrc: [], location: [] },
  { title: "Italian Cypress", imgSrc: [], location: [] },
  { title: "indian rosewood", imgSrc: [], location: [] },
  { title: "royal poinciana", imgSrc: [], location: [] },
  { title: "Japanese Persimmon", imgSrc: [], location: [] },
  { title: "Texas Persimmon", imgSrc: [], location: [] },
  { title: "Common Persimmon", imgSrc: [], location: [] },
  { title: "Pinkball", imgSrc: [], location: [] },
  { title: "Russian-Olive", imgSrc: [], location: [] },
  { title: "Bronze Loquat", imgSrc: [], location: [] },
  { title: "loquat", imgSrc: [], location: [] },
  { title: "Coral Tree", imgSrc: [], location: [] },
  { title: "Red-Flowering Gum", imgSrc: [], location: [] },
  { title: "Hardy Rubber Tree", imgSrc: [], location: [] },
  { title: "Stopper", imgSrc: [], location: [] },
  { title: "Korean Evodia", imgSrc: [], location: [] },
  { title: "American Beech", imgSrc: [], location: [] },
  { title: "European Beech", imgSrc: [], location: [] },
  { title: "Guava", imgSrc: [], location: [] },
  { title: "Strangler Fig", imgSrc: [], location: [] },
  { title: "Weeping Fig", imgSrc: [], location: [] },
  { title: "Rubber Tree", imgSrc: [], location: [] },
  { title: "Fiddleleaf Fig", imgSrc: [], location: [] },
  { title: "Cuban-Laurel", imgSrc: [], location: [] },
  { title: "Rusty Fig", imgSrc: [], location: [] },
  { title: "Chinese Parasoltree", imgSrc: [], location: [] },
  { title: "Franklin-Tree", imgSrc: [], location: [] },
  { title: "White Ash", imgSrc: [], location: [] },
  { title: "Common Ash", imgSrc: [], location: [] },
  { title: "Raywood Ash", imgSrc: [], location: [] },
  { title: "Green Ash", imgSrc: [], location: [] },
  { title: "Texas Ash", imgSrc: [], location: [] },
  { title: "Velvet Ash", imgSrc: [], location: [] },
  { title: "Australian-Willow", imgSrc: [], location: [] },
  { title: "Maidenhair Tree", imgSrc: [], location: [] },
  { title: "Thornless Honeylocust", imgSrc: [], location: [] },
  { title: "Loblolly-Bay", imgSrc: [], location: [] },
  { title: "Silk-Oak", imgSrc: [], location: [] },
  { title: "Lignumvitae", imgSrc: [], location: [] },
  { title: "Kentucky Coffeetree", imgSrc: [], location: [] },
  { title: "Carolina Silverbell", imgSrc: [], location: [] },
  { title: "Two-Winged Silverbell", imgSrc: [], location: [] },
  { title: "Mountain Silverbell", imgSrc: [], location: [] },
  { title: "Witch-Hazel", imgSrc: [], location: [] },
  { title: "Chinese Witch-Hazel", imgSrc: [], location: [] },
  { title: "Rose-of-Sharon", imgSrc: [], location: [] },
  { title: "Japanese Raisintree", imgSrc: [], location: [] },
  { title: "Sentry Palm", imgSrc: [], location: [] },
  { title: "Panicle Hydrangea", imgSrc: [], location: [] },
  { title: "Dahoon Holly", imgSrc: [], location: [] },
  { title: "Possumhaw", imgSrc: [], location: [] },
  { title: "Lusterleaf Holly", imgSrc: [], location: [] },
  { title: "Winterberry", imgSrc: [], location: [] },
  { title: "Yaupon Holly", imgSrc: [], location: [] },
  { title: "Japanese Black Pine", imgSrc: [], location: [] },
  { title: "Jacaranda", imgSrc: [], location: [] },
  { title: "Peregrina", imgSrc: [], location: [] },
  { title: "Peregrina", imgSrc: [], location: [] },
  { title: "Black Walnut", imgSrc: [], location: [] },
  { title: "Ashe Juniper", imgSrc: [], location: [] },
  { title: "‘Torulosa’ Juniper", imgSrc: [], location: [] },
  { title: "McFetter Alligator Juniper", imgSrc: [], location: [] },
  { title: "Rocky Mountain Juniper", imgSrc: [], location: [] },
  { title: "Southern Redcedar", imgSrc: [], location: [] },
  { title: "Eastern Redcedar", imgSrc: [], location: [] },
  { title: "Castor-Aralia", imgSrc: [], location: [] },
  { title: "Chinese Flame-Tree", imgSrc: [], location: [] },
  { title: "Flamegold", imgSrc: [], location: [] },
  { title: "Goldenraintree", imgSrc: [], location: [] },
  { title: "Goldenchain Tree", imgSrc: [], location: [] },
  { title: "Japanese Crape-Myrtle", imgSrc: [], location: [] },
  { title: "Crape-Myrtle", imgSrc: [], location: [] },
  { title: "Queens Crape-Myrtle", imgSrc: [], location: [] },
  { title: "Goldenball Leadtree", imgSrc: [], location: [] },
  { title: "American Holly", imgSrc: [], location: [] },
  { title: "Japanese Privet", imgSrc: [], location: [] },
  { title: "Glossy Privet", imgSrc: [], location: [] },
  { title: "Formosa Sweetgum", imgSrc: [], location: [] },
  { title: "Sweetgum", imgSrc: [], location: [] },
  { title: "Tuliptree", imgSrc: [], location: [] },
  { title: "Lychee", imgSrc: [], location: [] },
  { title: "Chinese Fan Palm", imgSrc: [], location: [] },
  { title: "Wild-Tamarind", imgSrc: [], location: [] },
  { title: "Amur Maackia", imgSrc: [], location: [] },
  { title: "Osage-Orange", imgSrc: [], location: [] },
  { title: "Cucumbertree", imgSrc: [], location: [] },
  { title: "Yulan Magnolia", imgSrc: [], location: [] },
  { title: "Southern Magnolia", imgSrc: [], location: [] },
  { title: "Kobus Magnolia", imgSrc: [], location: [] },
  { title: "Bigleaf Magnolia", imgSrc: [], location: [] },
  { title: "Sweetbay Magnolia", imgSrc: [], location: [] },
  { title: "Saucer Magnolia", imgSrc: [], location: [] },
  { title: "Siberian Crabapple", imgSrc: [], location: [] },
  { title: "Japanese Flowering Crabapple", imgSrc: [], location: [] },
  { title: "Tea Crabapple", imgSrc: [], location: [] },
  { title: "Sargent Crabapple", imgSrc: [], location: [] },
  { title: "Crabapple", imgSrc: [], location: [] },
  { title: "Mango", imgSrc: [], location: [] },
  { title: "sapodilla", imgSrc: [], location: [] },
  { title: "Chinaberry", imgSrc: [], location: [] },
  { title: "Dawn Redwood", imgSrc: [], location: [] },
  { title: "White Mulberry", imgSrc: [], location: [] },
  { title: "Banana", imgSrc: [], location: [] },
  { title: "Southern Waxmyrtle", imgSrc: [], location: [] },
  { title: "Northern Bayberry", imgSrc: [], location: [] },
  { title: "Oleander", imgSrc: [], location: [] },
  { title: "Madagascar Olive", imgSrc: [], location: [] },
  { title: "Ogeechee Tupelo", imgSrc: [], location: [] },
  { title: "Chinese Tupelo", imgSrc: [], location: [] },
  { title: "Blackgum", imgSrc: [], location: [] },
  { title: "Ochrosia", imgSrc: [], location: [] },
  { title: "Devilwood", imgSrc: [], location: [] },
  { title: "Sweet Osmanthus", imgSrc: [], location: [] },
  { title: "Fortunes Osmanthus", imgSrc: [], location: [] },
  { title: "American Hophornbeam", imgSrc: [], location: [] },
  { title: "Sourwood", imgSrc: [], location: [] },
  { title: "Screw-pine", imgSrc: [], location: [] },
  { title: "Jerusalem-Thorn", imgSrc: [], location: [] },
  { title: "Persian Parrotia", imgSrc: [], location: [] },
  { title: "Princess-Tree", imgSrc: [], location: [] },
  { title: "Yellow Poinciana", imgSrc: [], location: [] },
  { title: "Avocado", imgSrc: [], location: [] },
  { title: "Redbay", imgSrc: [], location: [] },
  { title: "Amur Corktree", imgSrc: [], location: [] },
  { title: "Canary Island Date Palm", imgSrc: [], location: [] },
  { title: "Senegal Date Palm", imgSrc: [], location: [] },
  { title: "Pygmy Date Palm", imgSrc: [], location: [] },
  { title: "Red-Leaf Photinia", imgSrc: [], location: [] },
  { title: "Chinese Photinia", imgSrc: [], location: [] },
  { title: "Oriental Photinia", imgSrc: [], location: [] },
  { title: "Fraser Photinia", imgSrc: [], location: [] },
  { title: "Norway Spruce", imgSrc: [], location: [] },
  { title: "White Spruce", imgSrc: [], location: [] },
  { title: "Serbian Spruce", imgSrc: [], location: [] },
  { title: "Oriental Spruce", imgSrc: [], location: [] },
  { title: "Colorado Spruce", imgSrc: [], location: [] },
  { title: "Pinckneya", imgSrc: [], location: [] },
  { title: "Lacebark Pine", imgSrc: [], location: [] },
  { title: "Mexican Pinyon", imgSrc: [], location: [] },
  { title: "Sand Pine", imgSrc: [], location: [] },
  { title: "Japanese Red Pine", imgSrc: [], location: [] },
  { title: "Mondell Pine", imgSrc: [], location: [] },
  { title: "Slash Pine", imgSrc: [], location: [] },
  { title: "Limber Pine", imgSrc: [], location: [] },
  { title: "Spruce Pine", imgSrc: [], location: [] },
  { title: "Mugo Pine", imgSrc: [], location: [] },
  { title: "Austrian Pine", imgSrc: [], location: [] },
  { title: "Longleaf Pine", imgSrc: [], location: [] },
  { title: "Japanese White Pine", imgSrc: [], location: [] },
  { title: "Stone Pine", imgSrc: [], location: [] },
  { title: "Eastern White Pine", imgSrc: [], location: [] },
  { title: "Scotch Pine", imgSrc: [], location: [] },
  { title: "Loblolly Pine", imgSrc: [], location: [] },
  { title: "Virginia Pine", imgSrc: [], location: [] },
  { title: "Chinese Pistache", imgSrc: [], location: [] },
  { title: "Ebony Blackbead", imgSrc: [], location: [] },
  { title: "Sycamore", imgSrc: [], location: [] },
  { title: "Oriental Planetree", imgSrc: [], location: [] },
  { title: "‘Bloodgood’ London Planetree", imgSrc: [], location: [] },
  { title: "Arborvitae", imgSrc: [], location: [] },
  { title: "White Frangipani", imgSrc: [], location: [] },
  { title: "Frangipani", imgSrc: [], location: [] },
  { title: "Podocarpus", imgSrc: [], location: [] },
  { title: "Weeping Podocarpus", imgSrc: [], location: [] },
  { title: "Podocarpus", imgSrc: [], location: [] },
  { title: "Podocarpus", imgSrc: [], location: [] },
  { title: "Nagi Podocarpus", imgSrc: [], location: [] },
  { title: "Pongam", imgSrc: [], location: [] },
  { title: "White Poplar", imgSrc: [], location: [] },
  { title: "Lombardy Poplar", imgSrc: [], location: [] },
  { title: "Mesquite", imgSrc: [], location: [] },
  { title: "Chickasaw Plum", imgSrc: [], location: [] },
  { title: "Cherry-Laurel", imgSrc: [], location: [] },
  { title: "Pissard Plum", imgSrc: [], location: [] },
  { title: "Amur Chokecherry", imgSrc: [], location: [] },
  { title: "Japanese Apricot", imgSrc: [], location: [] },
  { title: "Mexican Plum", imgSrc: [], location: [] },
  { title: "Peach", imgSrc: [], location: [] },
  { title: "Sargent Cherry", imgSrc: [], location: [] },
  { title: "Black Cherry", imgSrc: [], location: [] },
  { title: "Kwanzan Cherry", imgSrc: [], location: [] },
  { title: "‘Autumnalis’ Higan Cherry", imgSrc: [], location: [] },
  { title: "Flowering-Almond", imgSrc: [], location: [] },
  { title: "Flatwoods Plum", imgSrc: [], location: [] },
  { title: "Golden Larch", imgSrc: [], location: [] },
  { title: "Douglas-fir", imgSrc: [], location: [] },
  { title: "Cattley Guava", imgSrc: [], location: [] },
  { title: "Common Hoptree", imgSrc: [], location: [] },
  { title: "Chinese Wingnut", imgSrc: [], location: [] },
  { title: "Fragrant Epaulette Tree", imgSrc: [], location: [] },
  { title: "Macarthur Palm", imgSrc: [], location: [] },
  { title: "‘Aristocrat’ Callery Pear", imgSrc: [], location: [] },
  { title: "‘Bradford’ Callery Pear", imgSrc: [], location: [] },
  { title: "‘Redspire’ Callery Pear", imgSrc: [], location: [] },
  { title: "Japanese Evergreen Oak", imgSrc: [], location: [] },
  { title: "Sawtooth Oak", imgSrc: [], location: [] },
  { title: "White Oak", imgSrc: [], location: [] },
  { title: "Bluff Oak", imgSrc: [], location: [] },
  { title: "Swamp White Oak", imgSrc: [], location: [] },
  { title: "Turkey Oak", imgSrc: [], location: [] },
  { title: "Southern Red Oak", imgSrc: [], location: [] },
  { title: "Blue Japanese Oak", imgSrc: [], location: [] },
  { title: "Shingle Oak", imgSrc: [], location: [] },
  { title: "Diamond Leaf Oak", imgSrc: [], location: [] },
  { title: "Overcup Oak", imgSrc: [], location: [] },
  { title: "Bur Oak", imgSrc: [], location: [] },
  { title: "Chinkapin Oak", imgSrc: [], location: [] },
  { title: "Water Oak", imgSrc: [], location: [] },
  { title: "Nuttall Oak", imgSrc: [], location: [] },
  { title: "Pin Oak", imgSrc: [], location: [] },
  { title: "Willow Oak", imgSrc: [], location: [] },
  { title: "Chestnut Oak", imgSrc: [], location: [] },
  { title: "English Oak", imgSrc: [], location: [] },
  { title: "Northern Red Oak", imgSrc: [], location: [] },
  { title: "Shumard Oak", imgSrc: [], location: [] },
  { title: "Post Oak", imgSrc: [], location: [] },
  { title: "Texas Red Oak", imgSrc: [], location: [] },
  { title: "Southern Live Oak", imgSrc: [], location: [] },
  { title: "Travelers-Tree", imgSrc: [], location: [] },
  { title: "Carolina Buckthorn", imgSrc: [], location: [] },
  { title: "Chinese Sumac", imgSrc: [], location: [] },
  { title: "Shining Sumac", imgSrc: [], location: [] },
  { title: "Texan Sumac", imgSrc: [], location: [] },
  { title: "Black Locust", imgSrc: [], location: [] },
  { title: "Royal Palm", imgSrc: [], location: [] },
  { title: "Cabbage Palm", imgSrc: [], location: [] },
  { title: "Weeping Willow", imgSrc: [], location: [] },
  { title: "Corkscrew Willow", imgSrc: [], location: [] },
  { title: "American Elder", imgSrc: [], location: [] },
  { title: "Mexican Elder", imgSrc: [], location: [] },
  { title: "Western Soapberry", imgSrc: [], location: [] },
  { title: "Florida Soapberry", imgSrc: [], location: [] },
  { title: "Chinese Tallowtree", imgSrc: [], location: [] },
  { title: "Sassafras", imgSrc: [], location: [] },
  { title: "schefflera", imgSrc: [], location: [] },
  { title: "Dwarf Schefflera", imgSrc: [], location: [] },
  { title: "Japanese Umbrella-Pine", imgSrc: [], location: [] },
  { title: "Cassia", imgSrc: [], location: [] },
  { title: "Coast Redwood", imgSrc: [], location: [] },
  { title: "Paradise-Tree", imgSrc: [], location: [] },
  { title: "Eves-Necklace", imgSrc: [], location: [] },
  { title: "Scholar Tree", imgSrc: [], location: [] },
  { title: "Scholar Tree", imgSrc: [], location: [] },
  { title: "Korean Mountain-Ash", imgSrc: [], location: [] },
  { title: "European Mountain-Ash", imgSrc: [], location: [] },
  { title: "African Tulip-Tree", imgSrc: [], location: [] },
  { title: "Japanese Stewartia", imgSrc: [], location: [] },
  { title: "Korean Stewartia", imgSrc: [], location: [] },
  { title: "Tall Stewartia", imgSrc: [], location: [] },
  { title: "White Bird-of-Paradise", imgSrc: [], location: [] },
  { title: "Japanese Snowbell", imgSrc: [], location: [] },
  { title: "Fragrant Snowbell", imgSrc: [], location: [] },
  { title: "Mahogany", imgSrc: [], location: [] },
  { title: "Queen Palm", imgSrc: [], location: [] },
  { title: "Japanese Tree Lilac", imgSrc: [], location: [] },
  { title: "Trumpet Tree", imgSrc: [], location: [] },
  { title: "Golden Trumpet Tree", imgSrc: [], location: [] },
  { title: "Pink Trumpet Tree", imgSrc: [], location: [] },
  { title: "Purple Tabebuia", imgSrc: [], location: [] },
  { title: "Tamarind", imgSrc: [], location: [] },
  { title: "Pondcypress", imgSrc: [], location: [] },
  { title: "Baldcypress", imgSrc: [], location: [] },
  { title: "Montezuma Baldcypress", imgSrc: [], location: [] },
  { title: "English Yew", imgSrc: [], location: [] },
  { title: "Yellow-Elder", imgSrc: [], location: [] },
  { title: "West Indian-almond", imgSrc: [], location: [] },
  { title: "Muellers Terminalia", imgSrc: [], location: [] },
  { title: "Key Thatch Palm", imgSrc: [], location: [] },
  { title: "White-Cedar", imgSrc: [], location: [] },
  { title: "Giant Arborvitae", imgSrc: [], location: [] },
  { title: "Princess-Flower", imgSrc: [], location: [] },
  { title: "American Linden", imgSrc: [], location: [] },
  { title: "Littleleaf Linden", imgSrc: [], location: [] },
  { title: "Silver Linden", imgSrc: [], location: [] },
  { title: "Japanese Torreya", imgSrc: [], location: [] },
  { title: "Florida Torreya", imgSrc: [], location: [] },
  { title: "Windmill Palm", imgSrc: [], location: [] },
  { title: "black olive", imgSrc: [], location: [] },
  { title: "Canadian Hemlock", imgSrc: [], location: [] },
  { title: "Winged Elm", imgSrc: [], location: [] },
  { title: "American Elm", imgSrc: [], location: [] },
  { title: "Cedar Elm", imgSrc: [], location: [] },
  { title: "Chinese Elm", imgSrc: [], location: [] },
  { title: "Siberian Elm", imgSrc: [], location: [] },
  { title: "Mexican-Buckeye", imgSrc: [], location: [] },
  { title: "Christmas Palm", imgSrc: [], location: [] },
  { title: "Sweet Viburnum", imgSrc: [], location: [] },
  { title: "Siebold Viburnum", imgSrc: [], location: [] },
  { title: "Rusty Blackhaw", imgSrc: [], location: [] },
  { title: "Chastetree", imgSrc: [], location: [] },
  { title: "Cut-Leaf Chastetree", imgSrc: [], location: [] },
  { title: "Desert Palm", imgSrc: [], location: [] },
  { title: "Leyland Cypress", imgSrc: [], location: [] },
  { title: "Spineless Yucca", imgSrc: [], location: [] },
  { title: "Japanese Zelkova", imgSrc: [], location: [] },
];

fileData();

module.exports = {
  fileData
}