import { colors } from 'styles/util';

/**
 * Build a CSS transition property with all of the properties defined in the provided array.
 * property name | duration | timing function | delay
 *
 * @param {[string|object]} propertyNames The CSS properties that are going to be transitioned. Can accept a
 * string with the property name and will then use default values or the global values provided in the function or
 * can extrapolate unique data from an object with the same key names inside the array.
 * @param {string} duration The time, in seconds, it takes for the transition to complete. This param is
 * optional and will default to '0.3s'
 * @param {string} timingFunction The timing function of the transition, defaults to 'ease' if not defined.
 * @param {string} delay The delay on the transition to be set.
 * @return {string} Returns a string containing all of the transitions that were set.
 */
const createTransitionForProperties = (propertyNames, duration = '0.3s', timingFunction = 'ease', delay = '0s') => {
  let transitionString = 'transition: ';

  propertyNames.forEach((property, index) => {
    const propertyName = property.propertyName || property;
    const transitionDuration = property.duration || duration;
    const transitionTimingFunction = property.timingFunction || timingFunction;
    const transitionDelay = property.delay || delay;

    if (index > 0) {
      transitionString += ', ';
    }
    transitionString += `${propertyName} ${transitionDuration} ${transitionTimingFunction} ${transitionDelay}`;
  });

  return transitionString;
};

/**
 * Truncate a text element at a certain width. This will cause the text element to display on a single line
 * to a given width then ellipses.
 *
 * @param {number|string} width The width at which to set for the text. This will default to a pixel value
 * if a number is provided.
 * @return {string} Returns a block of properties to truncate and ellipses a text element.
 */
const truncateAtWidth = (width = '100px') => {
  let truncateWidth = width;

  if (typeof width !== 'string' && typeof width === 'number') {
    truncateWidth = `${width.toString()}px`;
  }

  return `
    width: ${truncateWidth};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
};

/**
 * Returns a box-shadow property with the default settings. Useful for maintaining consistency throughout shadow
 * placements.
 *
 * @param {string} color Rgb color. Applies black by default.
 * @param {[string]} offsets Array of offset measurements.
 * @param {number|string} opacity Opacity set for box-shadow. Defaults to 0.5.
 * @return {string} Returns a box-shadow definition.
 */
const boxShadow = (color = colors.black.rgb, offsets = ['0', '6px', '6px', 0], opacity = 0.5) =>
  `box-shadow: ${offsets.join(' ')} rgba(${color}, ${opacity})`;

/**
 * Build a linear gradient CSS declaration. Takes two colors, and creates a gradient.
 * Params should preferably be hex values.
 *
 * @param {string} firstColor
 * @param {string} secondColor
 * @param {string} direction Defaults to `to right`.
 */
const linearGradient = (firstColor, secondColor, direction = 'to right') =>
  `background: linear-gradient(${direction}, ${firstColor}, ${secondColor})`;

/**
 * Reset browser button styles.
 */
const buttonReset = `
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
`;

export {
  boxShadow,
  buttonReset,
  createTransitionForProperties,
  linearGradient,
  truncateAtWidth,
};