const { Mongoose } = require("mongoose");
const SellModel = require("./sellSchema");


exports.sell = async (req, res) => {

  const { accountName, accountType, accountAge, paymentMethod, accountUrl, accountDesc, monetizationEnabled, accountImage, accountmethod, email, contactNumber, telegramUsername, } = req.body

  try {
    const data = await SellModel.create({
      accountName: accountName,
      accountType: accountType,
      accountAge: accountAge,
      accountUrl: accountUrl,
      accountDesc: accountDesc,
      monetizationEnabled: monetizationEnabled,
      accountImage: accountImage,
      accountmethod: accountmethod,
      email: email,
      contactNumber: contactNumber,
      telegramUsername: telegramUsername,
      paymentMethod: paymentMethod,
    })
    res.status(201).json({
      success: true,
      message: 'your form submit successfuly',
      data
    })
  } catch (error) {
    // console.error("Error submitting form:", error);
    res.status(500).json({
      success: false,
      message: "your form couldn't submit successfuly",
      error: error.message
    })
  }
}
