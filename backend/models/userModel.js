const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: function () {
                return !this.isGoogleSignIn;
            },
        },

        dateofbirth: {
            type: Date,
            required: function () {
                return !this.isGoogleSignIn;
            },
            validate: {
                validator: function (value) {
                    if (!value) return true; // Skip validation if dob is not provided (for Google sign-in users)

                    const ageDiffMs = Date.now() - value.getTime();
                    const ageDate = new Date(ageDiffMs); // Convert to Date object to calculate age
                    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                    return age >= 5;
                },
                message: 'Age must be at least 5 years.',
            },
        },

        isGoogleSignIn: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

userSchema.virtual('age').get(function () {
    if (!this.dateofbirth) return null;
    const ageDiffMs = Date.now() - this.dateofbirth.getTime();
    const ageDate = new Date(ageDiffMs); // Convert to Date object to calculate age
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

const User = mongoose.model('User', userSchema);
module.exports = User;