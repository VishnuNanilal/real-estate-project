const Property = require('../models/property.model')

const createProperty = async (payload) => {
    console.log("...", payload)
    try {
        const response = await Property.create(payload)
        console.log("response: ", response)
        if (response) {
            return response;
        }
        else {
            return null;
        }

    }
    catch (err) {
        return null;
    }
}

const getProperty = async (req, res) => {
    const { property_id } = req.params;
    try {
        const response = await Property.findById(property_id)
        if (response) {
            return res.status(200).send({
                success: true,
                message: "Property fetched.",
                data: response
            })
        }
        else {
            return res.status(400).send({
                success: true,
                message: "Property fetching failed."
            })
        }
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const getAllProperties = async (req, res) => {
    try {
        const response = await Property.find()
        if (response) {
            return res.status(200).send({
                success: true,
                message: "All properties fetched.",
                data: response
            })
        }
        else {
            return res.status(400).send({
                success: true,
                message: "All property fetching failed."
            })
        }
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const updateProperty = async (req, res) => {
    const {property_id} = req.params
    const {payload} = req.body; 
    try {
        const response = await Property.findByIdAndUpdate(property_id, payload, {new: true})

        if (response) {
            return res.status(200).send(
                {
                success: true,
                message: "Property updation successful.",
                data: response
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Property updation failed.",
            });
        }

    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const updatePropertySetNewBuyer = async (req, res) => {
    console.log("reached")

    const { property_id } = req.params;
    const {buyer_id, buyPrice} = req.body
    console.log("Reached with: ",property_id, buyer_id)
    try {
        const response = await Property.findByIdAndUpdate(property_id, {buyer_id, price: buyPrice}, {new: true})

        if (response) {
            return res.status(200).send({
                success: true,
                message: "New Buyer Set.",
                data: response
            })
        }
        else {
            return res.status(400).send({
                success: true,
                message: "New Buyer Set failed.",
            })
        }

    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const deleteProperty = async (payload) => {
    try {
        const response = await Property.findByIdAndDelete(payload.id)

        if (response) {
            return response;
        }
        else {
            return null;
        }

    }
    catch (err) {
        return null;
    }
}

module.exports = {
    createProperty,
    getProperty,
    getAllProperties,
    updateProperty,
    updatePropertySetNewBuyer,
    deleteProperty
}