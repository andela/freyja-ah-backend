const validLinkTypes = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
const linkRegex = new RegExp(validLinkTypes);

const linkCheck = (message) => {
  const link = message.match(linkRegex);
  if (link) {
    return true;
  }
  return false;
};

const characterLengthCheck = (message) => {
  const messageLength = message.length;
  const isValid = messageLength > 150;
  return isValid;
};

export { linkCheck, characterLengthCheck };
