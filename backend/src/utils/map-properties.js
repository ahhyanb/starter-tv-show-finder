const _ = require("lodash");

/**
 * Maps properties from a flat structure to a nested structure based on a configuration.
 * @param {Object} config - The mapping configuration.
 * @returns {Function} - A function that transforms data.
 */
function mapProperties(config) {
  // Return a function to process data
  return (data) => {
    // If no data is provided, return it as-is
    if (!data) return data;

    // Use `reduce` to process each row of data and accumulate the transformed objects
    return data.reduce((accumulator, row) => {
      // Step 1: Extract only the keys specified in the configuration
      const base = _.pick(row, Object.keys(config));

      // Step 2: Map old keys to new paths using the configuration
      _.forOwn(config, (newPath, oldKey) => {
        // Use `_.set` to place the value at the specified nested path
        _.set(base, newPath, row[oldKey]);
      });

      // Step 3: Add the transformed object to the accumulator
      accumulator.push(base);
      return accumulator; // Return the accumulator for the next iteration
    }, []); // Start with an empty array as the initial value for the accumulator
  };
}

module.exports = mapProperties;
