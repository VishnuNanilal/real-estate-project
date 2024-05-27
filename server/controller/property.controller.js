const Property = require('../models/property.model')

const createProperty = async (req, res) => {
    console.log("Reached: ", req.body)
    try {
        const response = await Property.create(req.body)
        console.log(response)
        if (response) {
            return res.status(201).send({
                success: true,
                message: "Property created.",
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
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Internal Server Error."
        })
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
    const { property_id } = req.params
    const { payload } = req.body;
    try {
        const response = await Property.findByIdAndUpdate(property_id, payload, { new: true })

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
    const { buyer_id, buyPrice } = req.body
    console.log("Reached with: ", property_id, buyer_id)
    try {
        const response = await Property.findByIdAndUpdate(property_id, { buyer_id, price: buyPrice }, { new: true })

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

const approveProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);

        if (!property) {
            return res.status(404).json({ success: false, 
                message: 'Property not found' 
            });
        }

        property.status = "approved";
        await property.save();

        res.status(200).json({ 
            success: true, 
            message: 'Property approved', 
            data: property 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to approve property', 
            error: error.message });
    }
};

const approveBidProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);

        if (!property) {
            return res.status(404).json({ success: false, 
                message: 'Property not found' 
            });
        }

        property.status = "bidPending";
        await property.save();

        res.status(200).json({ 
            success: true, 
            message: 'Property approved', 
            data: property 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to approve property', 
            error: error.message });
    }
};

const approveSold = async (req, res) => {
    try {
        const property = await Property.findById(req.params.propertyId);

        if (!property) {
            return res.status(404).json({ success: false, 
                message: 'Property not found' 
            });
        }

        property.status = "sold";
        await property.save();

        res.status(200).json({ 
            success: true, 
            message: 'Property approved', 
            data: property 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to approve property', 
            error: error.message });
    }
};


module.exports = {
    createProperty,
    getProperty,
    getAllProperties,
    updateProperty,
    updatePropertySetNewBuyer,
    deleteProperty,
    approveProperty,
    approveBidProperty,
    approveSold
}