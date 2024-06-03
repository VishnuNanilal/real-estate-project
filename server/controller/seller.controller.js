const Seller = require('../models/seller.model');
const Property = require('../models/property.model')
const {createProperty, deleteProperty}  = require('../controller/property.controller')

const createSeller = async (req, res) => {
    // console.log("reached: ", id, name)
    const { id, name } = req.body;
    console.log(id, name);
    try {
        const response = await Seller.create({
            user_id:id,
            name,
            properties: []
        })

        if (response) {
            return res.status(201).send({
                success: true,
                data: response,
                message: "Seller created."
            })
        }
        else {
            return res.status(400).send({
                success: false,
                error: "Seller creation failed on DB."
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

const getSeller = async (req, res) => {
    const { id } = req.body;
    try {
        const response = await Seller.findOne({user_id: id})

        if (response) {
            return res.status(200).send({
                success: true,
                data: response,
                message: "Seller fetched."
            })
        }
        else {
            return res.status(404).send({
                success: false,
                error: "Seller fetch failed."
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

const updateSeller = async (req, res) => {
    console.log(">>>", req.body)
    try {
        const {seller_id} = req.params;
        const response = await Seller.findByIdAndUpdate(seller_id, {
            name: req.body.name
        }, { new: true })

        if (response) {
            return res.status(201).send({
                success: true,
                data: response,
                message: "Seller updated."
            })
        }
        else {
            return res.status(400).send({
                success: false,
                error: "Seller updation failed."
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

const updateSellerAddProperty = async (req, res) => {
    console.log("updateSellerAddProperty reached")
    try {
        const {seller_id} = req.params;
        const {property_id} = req.body
        const seller = await Seller.findById(seller_id)
        if (!seller) {
            return res.status(404).send({
                success: false,
                message: 'Seller not found'
            })
        }
        // Add the property ID to the seller's properties array
        seller.properties.push(property_id)
        await seller.save();
        return res.status(200).json({
            success: true,
            message: 'Property added to seller',
            seller: seller
        });

    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

// Controller function for removing a property from a seller's properties array and update on Property DB.
const updateSellerRemoveProperty = async (req, res) => {
    try {
        const { seller_id, property_id } = req.params;
        const seller = await Seller.findById(seller_id );

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        // Remove the property ID from the seller's properties array
        const index = seller.properties.findIndex(propertyRef=>propertyRef.equals(property_id));
        if (index !== -1) {
            seller.properties.splice(index, 1);
            await seller.save();
            await deleteProperty(property_id);
            
            return res.status(200).send({
                success: true,
                message: 'Property removed from seller',
                seller: seller
            });
        }
        else{
            return res.status(400).send({
                success: false,
                message: 'Property removal failed from seller property list.',
            });
        }
    } catch (error) {
        console.error('Error removing property from seller:', error);
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
};

module.exports = {
    createSeller,
    getSeller,
    updateSeller,
    updateSellerAddProperty,
    updateSellerRemoveProperty
}