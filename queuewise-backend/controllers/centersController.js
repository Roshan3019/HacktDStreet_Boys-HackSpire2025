const centersData = require('../data/centersData');

exports.getCenters = (req, res) => {
    res.json(centersData);
};
