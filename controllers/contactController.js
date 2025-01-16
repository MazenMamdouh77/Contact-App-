const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
const mongoose = require("mongoose")

const GetAllContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({userID: req.user.id})
    res.status(200).json(contacts);
});


const CreateContact = asyncHandler(async(req, res) => {
    const { Name, Phone, Email } = req.body;
    const Taken = await Contact.findOne({Email})
    if (Taken) {
        return res.status(400).json({ message: "Email already exists" });
        }
    if (!Name || !Phone || !Email) {
        return res.status(400).json({ message: "Please Fill The Missing Field"});
    }

    const contact = await Contact.create({Name,Phone,Email,userID:req.user.id})
    console.log("The Contact:", contact);
    res.status(200).json({ message: "Contact Created Successfully" });
});

const GetByEmail = asyncHandler(async (req, res) => {
    const Email = req.params.Email; 
    const contact = await Contact.findOne({ Email });

    if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Get Contact Successfully", contact });
    console.log(contact);
});

const UpdateContact = asyncHandler(async (req, res) => {
    const Email = req.params.Email; 
    const updatedcontact = await Contact.findOneAndUpdate({ Email }, req.body, { new: true });

    if (!updatedcontact) {
        return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Update Contact Successfully", updatedcontact });
    console.log(updatedcontact);
});

const DeleteContact = asyncHandler(async (req, res) => {
    if(contact.userID.toString() !== req.user.id){
        res.status(403).json({message:"User Do Not Have Permission To Update"})
    }
    const deletecontact = await Contact.findOneAndDelete({ Email });

    if (!deletecontact) {
        return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact Deleted Successfully" });
});


module.exports = { GetAllContact, GetByEmail, CreateContact, UpdateContact, DeleteContact };
