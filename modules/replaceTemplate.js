module.exports = (htmlTemplates, apidataFromServer) => {
  let output = htmlTemplates.replace(
    /{%PRODUCTNAME%}/g,
    apidataFromServer.productName
  );
  output = output.replace(/{%PRODUCTNAME%}/g, apidataFromServer.productName);
  output = output.replace(/{%PRODUCTIMAGE%}/g, apidataFromServer.image);
  output = output.replace(/{%FROM%}/g, apidataFromServer.from);
  output = output.replace(/{%IMAGE%}/g, apidataFromServer.image);
  output = output.replace(/{%NUTRIENTS%}/g, apidataFromServer.nutrients);
  output = output.replace(/{%QUANTITY%}/g, apidataFromServer.quantity);
  output = output.replace(/{%PRICE%}/g, apidataFromServer.price);
  output = output.replace(/{%DESCRIPTION%}/g, apidataFromServer.description);
  output = output.replace(/{%ID%}/g, apidataFromServer.id);

  if (!apidataFromServer.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
