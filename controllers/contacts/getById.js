const {Contact} = require("../../models");

const getById = async (req, res)=> {
    try {
        const {id} = req.params;
        const contact = await Contact.findById(id);
        if(!contact) {
            return res.status(404).json({
                "message": "Not found"
            });
        }
        res.json({
            contact
        })
    }
    catch(error){
        next(error);
    }
};

module.exports = getById;