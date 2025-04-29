const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Reads a key-value CSV file and returns an object.
 * 
 * @param {string} filePath - Relative path to the CSV file.
 * @returns {Promise<Object>} - Key-value data as an object.
 */
async function readKeyValueCSV(filePath) {
    const fullPath = path.resolve(__dirname, filePath);
    console.log("Reading File from - " + filePath);
    const result = {};

    return new Promise((resolve, reject) => {
        fs.createReadStream(fullPath)
            .pipe(csv())
            .on('data', (row) => {
                const key = row.key;
                const value = row.value;
                if (key) result[key] = value;
            })
            .on('end', () => resolve(result))
            .on('error', reject);
    });
}

module.exports = { readKeyValueCSV };
