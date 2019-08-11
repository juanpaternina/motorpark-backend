var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	plates: String,
	color: String,
	model: String,
	brand: String,
	userId: Number,
	userFullName: String,
	location: String,
	type: String,
	joined: { type: Boolean, default: true },
	entryHour: { type: Date, default: Date.now },
	toPay: Number,
});

var Car = db.model('car', carSchema);

module.exports = {
	getAll: async () => {
		try {
			return await Car.find({ joined: true }).exec();
		} catch (error) {
			return [];
		}
	},
	query: async (term) => {
		try {
			return await Car.find({ plates: new RegExp(term, 'i'), joined: true }).exec();
		} catch (error) {
			return [];
		}
	},
	save: (data) => {
		return new Promise((resolve, reject) => {
			var car = new Car({
				location: data.location,
				plates: data.plate,
				userId: data.userId,
				userFullName: data.userFullName,
				type: data.vehicleType,
				brand: data.vehicleBrand,
				model: data.vehicleModel,
			});
			try {
				car.save(data);
				resolve();
			} catch (error) {
				reject();
			}
		});
	},
	update: (id, data) => {
		return new Promise((resolve, reject) => {
			Car.findByIdAndUpdate(id, data).then(() => {
				resolve();
			});
		});
	},
	delete: (id) => {
		return new Promise((resolve, reject) => {
			Car.deleteOne({ _id: id }, function (err) {
				if (err) return reject(err);
				resolve();
			});
		});
	},
};
