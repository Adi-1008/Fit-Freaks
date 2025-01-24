const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },

        age: {
            type : Number,
        },

        weight: {
            type : Number
        },

        height: {
            type : Number
        },

        running: {
            type : Number
        },

        muscletrain: {
            type : Number
        },

        cardio: {
            type : Number
        },

        streakDates: [
            {
                type: Date, // Dates when the user logged in
            },
        ],

    },
    {
        timestamps: true,
    }
)

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;