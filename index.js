const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

// console.log(fs);
/////////////////////////////////////////////
// FILE

// Synchronous way
// const input = fs.readFileSync("./txt/input.txt", "utf-8");
// const text = `This is about ${input}\n created on ${Date.now()}`;

// console.log(input);

// fs.writeFileSync("./txt/output.txt", text, "utf-8");
// console.log("Write success");

// Ascyhoronous way

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR");
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/ascyhoronousoutput.txt", `${data2}\n${data3}`, (err) => {
//         console.log("File Write Success");
//       });
//     });
//   });
// });

/////////////////////////////////////////////
// SERVER

const templateOverview = fs.readFileSync(
  __dirname + "/templates/template-overview.html",
  "utf-8"
);
const templateCard = fs.readFileSync(
  __dirname + "/templates/template-card.html",
  "utf-8"
);

const templateProduct = fs.readFileSync(
  __dirname + "/templates/template-product.html",
  "utf-8"
);
const data = fs.readFileSync(__dirname + "/dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);
const slug = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slug);

console.log(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //   overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHTML = dataObj
      .map(function (apidatas) {
        return replaceTemplate(templateCard, apidatas);
      })
      .join("");

    const output = templateOverview.replace(/{%CARDS%}/g, cardsHTML);

    // console.log(output);

    res.end(output);

    // product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);

    res.end(output);

    // api page
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "status-code": 200,
    });
    res.end(data);

    // page not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-ownheader": "hay",
    });
    res.end("<h1>ERROR, Page Not Found</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is listening on port 3000");
});
