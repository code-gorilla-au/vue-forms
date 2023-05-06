const email = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

/**
 * validate email
 * @param value email to validate against
 */
export function validateEmail(value: string): boolean {
  const matches = value.match(email);
  return matches !== null && matches?.length > 0;
}
