const Seller = require('../models/seller.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createSeller = async (req, res) => {
    const { seller_id, name } = req.body;
    try {
        const response = await Seller.create({
            seller_id,
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
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const getSeller = async (req, res) => {
    const { seller_id } = req.body;
    try {
        const response = await Seller.findById(seller_id)

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
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const updateSeller = async (req, res) => {
    try {
        const {seller_id} = req.params;
        const response = await Seller.findByIdAndUpdate(seller_id, req.body, { new: true })

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
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const addProperty = async (req, res) => {
    try {
        const {seller_id} = req.params;

        const seller = await Seller.findOne({ seller_id })
        if (!seller) {
            return res.status(404).send({
                success: false,
                message: 'Seller not found'
            })
        }
        // Add the property ID to the seller's properties array
        let propertyResponse = await Property.create({
            name: req.body.name,
            price: req.body.price,
            //add boundary points for property.
        })

        seller.properties.push(propertyResponse._id)
        await seller.save();
        return res.status(200).json({
            success: true,
            message: 'Property created and added to seller',
            seller: seller
        });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

// Controller function for removing a property from a seller's properties array and update on Property DB.
const removeProperty = async (req, res) => {
    try {
        const { seller_id, property_id } = req.params;

        const seller = await Seller.findOne({ seller_id });

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
            await Property.findByIdAndDelete(property_id);   
            
            return res.status(200).json({
                success: true,
                message: 'Property removed from seller',
                seller: seller
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message: 'Property removal failed.',
            });
        }
    } catch (error) {
        console.error('Error removing property from seller:', error);
        return res.status(500).json({
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
    addProperty,
    removeProperty
}