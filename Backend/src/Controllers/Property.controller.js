import { asynchandling } from "../Utils/Asynchndling.js";
import { Property } from "../Models/Property.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const addProperty = asynchandling(async (req, res) => {
    const { title, description, price, location, bedrooms, bathrooms, nearbyAmenities } = req.body;

    if(!title || !description || !price || !location || !bedrooms || !bathrooms || !nearbyAmenities){
        throw new ApiError(400, 'All fields are required');
    }
    const user = req.user; // Assuming you have middleware to authenticate and set req.user
    if (!user) {
      throw new ApiError(401, 'Unauthorized request');
    }
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      nearbyAmenities,
      sellerId: user._id
    });


    await newProperty.save();
    res.status(201).json({ message: 'Property posted successfully', property: newProperty });
       
      }
    );

    const getProperties = asynchandling(async (req, res) => {
        
        const properties = await Property.find();
        return res.status(200).json(new ApiResponse(200, properties, 'Properties fetched successfully'));
      });

    const getPropertyofseller = asynchandling(async (req, res) => {
        const { _id } = req.user;
        console.log(_id);
    const properties = await Property.find({ sellerId: _id });
    return res.status(200).json(new ApiResponse(200, properties, 'Properties fetched successfully'));
    }
    );

    const getProperty = asynchandling(async (req, res) => {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) {
          throw new ApiError(404, 'Property not found');
        }
        return res.status(200).json(new ApiResponse(200, property, 'Property fetched successfully'));
      });


    const updateProperty = asynchandling(async (req, res) => {
        const { id } = req.params;
        const { title, description, price, location, bedrooms, bathrooms, nearbyAmenities } = req.body;
        if (!title || !description || !price || !location || !bedrooms || !bathrooms || !nearbyAmenities) {
            throw new ApiError(400, 'All fields are required');
          }
        const property = await Property.findById(id);

        if (!property) {
          throw new ApiError(404, 'Property not found');
        }
        property.title = title;
        property.description = description;
        property.price = price;
        property.location = location;
        property.bedrooms = bedrooms;
        property.bathrooms = bathrooms;
        property.nearbyAmenities = nearbyAmenities;
        await property.save(); 

        return res.status(200).json(new ApiResponse(200, property, 'Property updated successfully'));
      });

    const deleteProperty = asynchandling(async (req, res) => {
        const { id } = req.params;
        const property = await Property.findByIdAndDelete(id);
        if (!property) {
          throw new ApiError(404, 'Property not found');
        }
        res.status(200).json({ message: 'Property deleted successfully' });
      });
    
    const filterProperty = asynchandling(async (req, res) => {
        const { location, bedrooms, bathrooms } = req.query;
        const filter = {};
        if (location) {
          filter.location = location;
        }   
        if (bedrooms) {
          filter.bedrooms = bedrooms;
        }
        if (bathrooms) {
          filter.bathrooms = bathrooms;
        }
        const properties = await Property.find(filter);
        return res.status(200).json(new ApiResponse(200, properties, 'Properties fetched successfully'));
    });

      export { addProperty, getProperties, getPropertyofseller, getProperty ,updateProperty,deleteProperty,filterProperty};

