module.exports.formatCreditCardNumber = cardNumber => {

  const p1 = cardNumber.substring(0, cardNumber.length-4);
  const p2 = cardNumber.substring(cardNumber.length-4, cardNumber.length);

  let split;
  p1.length % 4 === 0 ? split = p1.match(/.{4}/g) : split = p1.match(/.{3}/g);

  const encoded = split.map(s => s.replace(/\w/g, 'x'));
  const joined = encoded.join('-');

  return `${joined}-${p2}`;
}

module.exports.generateCompanyPath = companyName =>  encodeURIComponent(companyName).toLowerCase();
