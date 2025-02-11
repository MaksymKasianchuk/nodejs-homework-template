const {Schema, Types, model} = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Types.ObjectId,
      ref: "user",
    },
}, {versionKey: false, timestamps: true});

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
    owner: Joi.object()
});

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema
};