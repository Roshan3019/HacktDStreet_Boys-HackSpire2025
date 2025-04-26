const bookingsData = require('../data/bookingsData');
const historyData = require('../data/historyData');
const recommendationsData = require('../data/recommendationsData');

exports.getBookings = (req, res) => {
    res.json(bookingsData);
};

exports.getHistory = (req, res) => {
    res.json(historyData);
};

exports.getRecommendations = (req, res) => {
    res.json(recommendationsData);
};
