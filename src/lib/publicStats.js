import "server-only";

export const CLIENT_COUNT_BASELINE = 0;

export async function getLiveClientCount() {
  return CLIENT_COUNT_BASELINE;
}
