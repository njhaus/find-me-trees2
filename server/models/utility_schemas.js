import mongoose from "mongoose"


export const GeoCodeSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  coordinates: [Number],
});
// EXAMPLE GEOCOORDINATE:
// geocode: {
//       type: 'point',
//       coordinates: [ -74.360846, 40.45940210000001 ],
//       _id: ObjectId("6543f65f3699ccf717c19f23")
//     },



export const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
]