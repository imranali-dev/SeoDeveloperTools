const BuyAndSell = require("./Buyandsellmodel");

const createBuySell = async (req, res) => {
    const { serialNo, earningPlatforms, aboutThisAccount, details } = req.body;

    if (!serialNo || !earningPlatforms || !aboutThisAccount.accName || !aboutThisAccount.accountUrl || !details.accountFullname || !details.descFull || !details.siteAge || !details.monthlyProfit || !details.profitMargin || !details.pageViews) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingBuySell = await BuyAndSell.findOne({ 'serialNo': serialNo });
        if (existingBuySell) {
            return res.status(409).json({ message: 'Serial number already exists' });
        }

        const newBuySell = new BuyAndSell({
            serialNo: serialNo,
            earningPlatforms: earningPlatforms,
            aboutThisAccount: aboutThisAccount,
            details: details,
        });

        const newRecord = await newBuySell.save();
        res.status(201).json({ message: 'Buy and Sell  Created Successfully', newRecord: newRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating Buy and Sell  Account Record', error: error.message });
    }
};
const getAllBuySell = async (req, res) => {
    try {
      const buySellRecords = await BuyAndSell.find().sort({ createdAt: -1 })
      // .limit(5);
  
      if (!buySellRecords || buySellRecords.length === 0) {
        return res.status(404).json({ message: 'No Buy and Sell  Account Found' });
      }
      const limitedDetails = buySellRecords.map((record) => {
        const { _id, serialNo, earningPlatforms, aboutThisAccount } = record;
        return {
          _id,
          serialNo,
          earningPlatforms,
          aboutThisAccount,
        };
      });
  
      res.json(limitedDetails);
    } catch (error) {
      res.status(500).json({ message: 'Error Retrieving Buy and Sell  Account', error: error.message });
    }
  };

  const getAllBuySellDetails = async (req, res) => {
    try {
      const { id } = req.params;
  
      const socialSellRecord = await BuyAndSell.findById(id);
      if (!socialSellRecord) {
        return res.status(404).json({ message: 'Buy and Sell Account not found' });
      }
  
      res.json(socialSellRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving Buy and Sell  Account details', error: error.message });
    }
  };
  const updateBuySell = async (req, res) => {
    const serialNo = req.params.serialNo;
    const updateData = req.body;
  
    if (!serialNo) {
      return res.status(400).json({ message: 'Missing serial number' });
    }
  
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'Missing update data' });
    }
  
    try {
      let buySellRecord = await BuyAndSell.findOne({ serialNo: serialNo });
  
      if (!buySellRecord) {
        return res.status(404).json({ message: 'Buy and Sell Account Record Not Found For The Serial Number' });
      }
  
      if (updateData.details) {
        Object.assign(buySellRecord.details, updateData.details);
      }
      
      if (updateData.aboutThisAccount) {
        Object.assign(buySellRecord.aboutThisAccount, updateData.aboutThisAccount);
      }
      if (updateData.earningPlatforms) {
        buySellRecord.earningPlatforms = updateData.earningPlatforms;
      }
      buySellRecord = await buySellRecord.save(); 
      res.status(200).json({ message: 'Buy and Sell Account Updated Successfully', updatedRecord: buySellRecord });
    } catch (error) {
      res.status(500).json({ message: 'Error updating Buy and Sell Account', error: error.message });
    }
  };
  
  
const deleteBuySell = async (req, res) => {
    const serialNo = req.params.serialNo; 
    //  serial kkkkbh parameter

    try {
        const buySellRecord = await BuyAndSell.findOneAndDelete({ serialNo });

        if (!buySellRecord) {
            return res.status(404).json({ message: 'Buy Account  Record  Not Found For The Eerial Number' });
        }

        res.status(200).json({ message: 'Buy Account Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting Buy Account ', error: error.message });
    }
};
module.exports = {
    deleteBuySell,
    createBuySell,
    getAllBuySell,
    updateBuySell,
    getAllBuySellDetails
};