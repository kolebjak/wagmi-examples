export const displayAddress = (address?: `0x${string}`, length = 6) => {
  if (!address) {
    return '';
  }

  return `${address.substring(0, length)}...${address.substring(address.length - length)}`;
};
