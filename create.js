// const express = require("express");
// const PptxGenJS = require("pptxgenjs");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 3003;

// const createFreeSlide = (pptx) => {
    
//     const slide = pptx.addSlide();

//     slide.addShape(pptx.ShapeType.rect, {
//         x: 1,          
//         y: 1,           
//         w: 5,           
//         h: 3,        
//         fill: { color: "0088CC" },
//         line: { color: "000000", width: 1 },
//         shadow: {
//             type: 'outer',
//             color: '999999',
//             offset: { x: 0.5, y: 0.5 },
//             blur: 5,
//             transparency: 0.5
//         }
//     });

//     slide.addText("Dummy Text 1", {
//         x: 1.5, 
//         y: 1.5, 
//         fontSize: 18,
//         color: "FFFFFF",
//         bold: true,
//         align: "center"
//     });

//     slide.addText("Dummy Text 2", {
//         x: 1.5,
//         y: 2.5,       
//         fontSize: 18,
//         color: "FFFFFF",
//         bold: true,
//         align: "center"
//     });
// };


// app.get("/generate-pptx", (req, res) => {
//     const pptx = new PptxGenJS();
//     createFreeSlide(pptx);
//     const outputFilePath = path.join(__dirname, "RectangleWithShadow.pptx");
//     pptx.writeFile(outputFilePath)
//         .then(fileName => {
//             console.log(`Created file: ${fileName}`);
//             res.download(outputFilePath, (err) => {
//                 if (err) {
//                     console.error(err);
//                 }
//                 fs.unlinkSync(outputFilePath);
//             });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).send("Error generating PowerPoint file.");
//         });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// function createFreeSlide() {

//     const pasreStringToNumber = (value) => {
//       if(typeof value === "string") {
//         return parseInt(value, 10);
//       }
    
//       if(typeof value === "number") {
//         return value;
//       }
    
//       return 0;
//     }
//     const elements = [];
//     const getLayers = (metaType, value, options) => ({ metaType, value, options });
  
//     elements.push(
//       getLayers("SHAPE", "rect", {
//         x: 0.33,
//         y: 0.33,
//         w: 12.66,
//         h: 6.81,
//         line: { color: "000000", width: 1.5 },
//         fill: "ffffff",
//         shadow: {color: "000000", opacity: 0.3, offset: 1}
//       }),
//       getLayers("TEXT", "This is a preview of the first 5 slides of the presentation for FREE customers", {
//         x: 2.69,
//         y: 2.22,
//         w: 7.61,
//         h: 0.90,
//         fontFace: "Aptos Display",
//         fontSize: pasreStringToNumber(24),
//         color: "000000",
//         align: "center",
//         valign: "top"
//       }),
//       getLayers("TEXT", "Please purchase a                                         to download the entire deck, and create unlimited presentations", {
//         x: 0.57,
//         y: 3.45,
//         w: 11.86,
//         h: 0.90,
//         fontFace: "Aptos Display",
//         fontSize: pasreStringToNumber(24),
//         color: "000000",
//         align: "center",
//         valign: "top"
//       }),
//       getLayers("TEXT", "Paid Subscription", {
//         x: 3.76,
//         y: 3.45,
//         w: 2.681,
//         h: 0.90,
//         fontFace: "Aptos Display",
//         fontSize: pasreStringToNumber(24),
//         color: "FF0000",
//         align: "left",
//         valign: "top",
//         bold: true
//       }),
//     );
//     return elements;
//   }
  
//   const express = require("express");
//   const pptxgen = require("pptxgenjs");
  
//   const app = express();
//   const PORT = 3008;
  
//   const filename = "Template2.pptx";
  
//   app.get("/", async function (req, res) { 
  
//     const slideMetadata = createFreeSlide();
//     const pptx = new pptxgen();
//     pptx.layout = "LAYOUT_WIDE";
  
//     const slide = pptx.addSlide();
  
//     slideMetadata.forEach((design) => {
//       const { metaType, options, value } = design;
//       if (metaType === "IMAGE") {
//         slide.addImage({ path: value, ...options });
//       } else if (metaType === "SHAPE") {
  
//         slide.addShape(pptx.ShapeType[value], options);
//       } else if (metaType === "TEXT") {
//         slide.addText(value, options);
//       }
//     });
  
//     const stream = await pptx.stream();
//     res.writeHead(200, {
//       "Content-Disposition": `attachment;filename=${filename}`,
//       "Content-Length": stream.length,
//     });
//     res.end(Buffer.from(stream, "binary"));
//   });
  
//   app.listen(PORT, (error) => {
//     if (!error) {
//       console.log("Server is Successfully Running, and App is listening on port " + PORT);
//     } else {
//       console.log("Error occurred, server can't start", error);
//     }
//   });


function createFreeSlide(pptx) {

    const pasreStringToNumber = (value) => {
      if (typeof value === "string") {
        return parseInt(value, 10);
      }
  
      if (typeof value === "number") {
        return value;
      }
  
      return 0;
    };
  
    const elements = [];
    const getLayers = (metaType, value, options) => ({ metaType, value, options });
  
    elements.push(
      getLayers("SHAPE", "rect", {
        x: 0.33,
        y: 0.33,
        w: 12.66,
        h: 6.81,
        line: { color: "000000", width: 1.5 },
        fill: "ffffff",
        shadow: { color: "000000", opacity: 0.3, offset: 1 }
      }),
      getLayers("TEXT", "This is a preview of the first 5 slides of the presentation for FREE customers", {
        x: 2.69,
        y: 2.22,
        w: 7.61,
        h: 0.90,
        fontFace: "Aptos Display",
        fontSize: pasreStringToNumber(24),
        color: "000000",
        align: "center",
        valign: "top"
      }),
      getLayers("TEXT", "Please purchase a                                         to download the entire deck, and create unlimited presentations", {
        x: 0.57,
        y: 3.45,
        w: 11.86,
        h: 0.90,
        fontFace: "Aptos Display",
        fontSize: pasreStringToNumber(24),
        color: "000000",
        align: "center",
        valign: "top"
      }),
      getLayers("TEXT", "Paid Subscription", {
        x: 3.76,
        y: 3.45,
        w: 2.681,
        h: 0.90,
        fontFace: "Aptos Display",
        fontSize: pasreStringToNumber(24),
        color: "FF0000",
        align: "left",
        valign: "top",
        bold: true
      }),
    );
  
    // Create slide and add elements to it
    const slide = pptx.addSlide();
  
    elements.forEach((design) => {
      const { metaType, options, value } = design;
      if (metaType === "IMAGE") {
        slide.addImage({ path: value, ...options });
      } else if (metaType === "SHAPE") {
        slide.addShape(pptx.ShapeType[value], options);
      } else if (metaType === "TEXT") {
        slide.addText(value, options);
      }
    });
  
    return slide;
  }
  
  const express = require("express");
  const pptxgen = require("pptxgenjs");
  
  const app = express();
  const PORT = 3008;
  
  const filename = "Template2.pptx";
  
  app.get("/", async function (req, res) {
    const pptx = new pptxgen();
    pptx.layout = "LAYOUT_WIDE";
  
    // Call the function to create the slide
    createFreeSlide(pptx);
  
    const stream = await pptx.stream();
    res.writeHead(200, {
      "Content-Disposition": `attachment;filename=${filename}`,
      "Content-Length": stream.length,
    });
    res.end(Buffer.from(stream, "binary"));
  });
  
  app.listen(PORT, (error) => {
    if (!error) {
      console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
      console.log("Error occurred, server can't start", error);
    }
  });
  
