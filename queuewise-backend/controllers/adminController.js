const overviewData = require('../data/adminOverviewData');
const alertsData = require('../data/adminAlertsData');
const performanceData = require('../data/adminPerformanceData');

exports.getOverview = (req, res) => {
    res.json(overviewData);
};

exports.getAlerts = (req, res) => {
    res.json(alertsData);
};

exports.getPerformance = (req, res) => {
    res.json(performanceData);
};
