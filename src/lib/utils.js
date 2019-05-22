export function upperCaseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function extractIDFromPokemonUrl(url) {
  const fragments = url.split('/');

  return fragments[fragments.length - 2];
}
