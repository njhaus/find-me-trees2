const fs = require("fs").promises;
const pdf = require("pdf-parse");


// const getTreeData = (dataArray) => {
//   const treeData = dataArray.map(data => (
//     {
      
//     }
//   ))
// }

const getFileData = async (file) => {
  try {
    const data = await fs.readFile(`./raw/${file}`, "utf8");
    console.log("FILE DATA:");
    const splitWords = [
      "introduction",
      "General Information",
      "Scientific name:",
      "Common name(s):",
      "Family:",
      "USDA Hardiness Zones:",
      "Origin:",
      "Uses:",
      "Avaliability:",
      "Leaf type:",
      "Leaflet margin:", "Leaf margin:",
      "Leaflet shape:", "leaf shape:",
      "leaflet venation:", "leaf venation:",
      'flower color:'
    ];
    const regex = new RegExp(`(${splitWords.join("|")})`, "i");
    const dataArray = data.toString().split(regex).filter(Boolean);
    console.log(dataArray);
    return dataArray;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getFiles = async () => {
  try {
    const files = await fs.readdir("./raw");
    console.log("Current directory filenames:");
    files.forEach((file) => {
      console.log(file);
    });
    return files; // Return the array of files if needed
  } catch (err) {
    console.error("Error reading directory:", err);
    return []; // Return an empty array or handle the error as required
  }
};

getFiles()
  .then((files) => {
    // console.log(files)
    // getTreeData(
      files.forEach(file => getFileData(file))
    // )
  })
  .catch((err) => {
    console.error("Error in getFiles:", err);
  });


const treeList = [];
