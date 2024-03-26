const Scammers = require("../model/scammermodel")
// Create a new scammer
exports.createScammer = async (req, res) => {
    const { name, phoneNumber, country, accountDeal, dealingDateTime, screenshot } = req.body;
        if (!name || !phoneNumber || !country || !accountDeal || !dealingDateTime) {
        return res.status(400).json({
            success: false,
            error: 'Please provide all required fields'
        });
    }
    try {
        const scammer = new Scammers({
            name,
            phoneNumber,
            country,
            accountDeal,
            dealingDateTime,
            screenshot
        });

        await scammer.save();

        res.status(201).json({
            success: true,
            data: scammer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


// Get all scammers
exports.getScammers = async (req, res) => {
    try {
        const scammers = await Scammers.find().sort({ createdAt: -1 });;

        res.status(200).json({
            success: true,
            data: scammers
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.getScammer = async (req, res) => {
    try {
        const scammer = await Scammers.findById(req.params.id);

        if (!scammer) {
            return res.status(404).json({
                success: false,
                error: 'No scammer found'
            });
        }

        res.status(200).json({
            success: true,
            data: scammer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete a scammer
exports.deleteScammer = async (req, res) => {
    try {
        const scammer = await Scammers.findById(req.params.id);

        if (!scammer) {
            return res.status(404).json({
                success: false,
                error: 'No scammer found'
            });
        }

        await scammer.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


exports.getScammersPage = async (req, res) => {
    try {
        const scammers = await Scammers.find();

        res.render('scammers', { scammers });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete a scammer and render a page
exports.deleteScammerAndRender = async (req, res) => {
    try {
      
        res.render('scammerdelte'); 
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


exports.updateScammer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phoneNumber, country, accountDeal, dealingDateTime } = req.body;

        // Find the scammer by ID and update the fields
        const updatedScammer = await Scammers.findByIdAndUpdate(
            id,
            { name, phoneNumber, country, accountDeal, dealingDateTime },
            { new: true } // Return the updated document
        );

        if (!updatedScammer) {
            return res.status(404).json({
                success: false,
                error: 'Scammer not found',
            });
        }

        res.status(200).json({
            success: true,
            data: updatedScammer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

exports.updatedscammmerformRender = async (req, res) => {
    try {
      
        res.render('scammerUpdateform'); 
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};



