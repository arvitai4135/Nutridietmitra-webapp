/**
 * Utility function to combine multiple class names into a single string.
 * It filters out any falsy values (false, null, undefined, 0, "") and
 * joins the remaining class names with a space.
 *
 * @param {...(string|undefined|null|false)} classes - Any number of class names (or expressions that evaluate to a class name).
 * @returns {string} - A string containing the combined class names, or an empty string if no valid classes are provided.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
