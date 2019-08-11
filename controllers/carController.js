var Car = require('../model/Car');

module.exports = {
	getallCars: async (req, res) => {
		res.json({
			response: await Car.getAll(),
		});
	},

	query: async (req, res) => {
		res.json({
			response: await Car.query(req.params.query),
		});
	},

	save: (req, res) => {
		Car.save(req.body).then(() => {
			res.json({ success: true });
		});
	},

	retire: (req, res) => {
		Car.update(req.params.id, { joined: false });
		res.json({ success: true });
	},

	delete: (req, res) => {
		Car.delete(req.params.id);
		res.json({ success: true });
	},
};
