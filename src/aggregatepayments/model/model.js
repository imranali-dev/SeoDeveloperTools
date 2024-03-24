const SellerPaymentModel = require('../../Seller-payment/model/Model');
const PaymentModel = require('../../buyerPayment/Model/schma');
const AccountModel = require("../../users/PaymentModel")
async function searchByEmail(email, Semail, accountSerialNo, transitionId, transactionDate, userName, firstName) {
  try {
    const resultSeller = await SellerPaymentModel.aggregate([
      {
        $match: {
          emailAddress: email,
          sellerEmail: Semail,
          accountSerialNo: accountSerialNo,
          transitionId: transitionId,
          transactionDate: transactionDate,
          userName: userName,
          firstName: firstName,
        },
      },
      {
        $project: {
          _id: 0,
          // firstName: 1,
          // lastName: 1,
          userName: 1,
          uniquePin: 1,
          email: '$emailAddress',
          sellerEmail: '$sellerEmailAddress',
          // accountSerialNo: 1,
          // accountType: 1,
          // accountPrice: 1,
          // totalAccountPrice: 1,
          transitionId: 1,
          // transitionData: '$transitionIdDate',
          transactionDate: '$createdAt',
          transactionTime: { $literal: null },
        },
      },
    ]).exec();

    const resultPayment = await PaymentModel.aggregate([
      {
        $match: {
          email: email,
          sellerEmail: Semail,
          accountSerialNo: accountSerialNo,
          transitionId: transitionId,
          transactionDate: transactionDate,
          userName: userName,
          firstName: firstName,
        },
      },
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          userName: 1,
          uniquePin: 1,
          email: 1,
          sellerEmail: 1,
          accountSerialNo: 1,
          accountType: 1,
          accountPrice: 1,

          totalAccountPrice: 1,
          transitionId: 1,

          transactionDate: 1,
          transactionTime: 1,
        },
      },
    ]).exec();

    const combinedResult = [...resultSeller, ...resultPayment];

    if (combinedResult.length === 0) {
      throw new Error('No user found with the specified criteria');
    }

    return combinedResult;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = {
  searchByEmail,
};

// ___________________________________________________________________________________________
async function searchByParam(searchParam) {
  try {
    const resultSeller = await SellerPaymentModel.aggregate([
      {
        $match: {
          $or: [
            { userName: { $regex: searchParam, $options: 'i' } },
            { emailAddress: { $regex: searchParam, $options: 'i' } },

            { totalAccountPrice: { $regex: searchParam, $options: 'i' } },
            { transitionId: { $regex: searchParam, $options: 'i' } },
            { selectPaymentMethod: { $regex: searchParam, $options: 'i' } },

            { sellerEmailAddress: { $regex: searchParam, $options: 'i' } },
            { accountSerialNo: { $regex: searchParam, $options: 'i' } },
            { uniquePin: { $regex: searchParam, $options: 'i' } },
            { transactionDate: { $regex: searchParam, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          collectionType: { $literal: 'SellerPayment Form' },
          userName: '$userName', 
          email: '$emailAddress',
          totalAccountPrice: '$totalAccountPrice',
          transitionId: "$transitionId",
          selectPaymentMethod: "$selectPaymentMethod",
          transactionDate: '$createdAt',
        },
      },
    ]).exec();

    const resultPayment = await PaymentModel.aggregate([
      {
        $match: {
          $or: [

            { userName: { $regex: searchParam, $options: 'i' } },
            { email: { $regex: searchParam, $options: 'i' } },

            { totalAccountPrice: { $regex: searchParam, $options: 'i' } },
            { transitionId: { $regex: searchParam, $options: 'i' } },
            { selectPaymentMethod: { $regex: searchParam, $options: 'i' } },

            { sellerEmail: { $regex: searchParam, $options: 'i' } },
            { accountSerialNo: { $regex: searchParam, $options: 'i' } },
            { uniquePin: { $regex: searchParam, $options: 'i' } },
            { transactionDate: { $regex: searchParam, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          collectionType: { $literal: 'Buyer Form' },
          userName: '$userName', 
          email: '$email',
          totalAccountPrice: '$totalAccountPrice',
          transitionId: "$transitionId",
          selectPaymentMethod: "$selectPaymentMethod",
          transactionDate: '$transactionDate',

          
        },
      },
    ]).exec();

    const resultAccount = await AccountModel.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: searchParam, $options: 'i' } },
            { email: { $regex: searchParam, $options: 'i' } },
            { phone: { $regex: searchParam, $options: 'i' } },
            { paymentMethod: { $regex: searchParam, $options: 'i' } },
            { description: { $regex: searchParam, $options: 'i' } },
            { userName: { $regex: searchParam, $options: 'i' } },
            { transitionId: { $regex: searchParam, $options: 'i' } },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          collectionType: { $literal: 'Add Fund' },
          userName: 1,
          email: 1,
          totalAccountPrice: 1,
          transitionId: 1,
          selectPaymentMethod: 1,
          transactionDate: 1,

        },
      },
    ]).exec();
    const combinedResult = [...resultSeller, ...resultPayment, ...resultAccount];

    combinedResult.sort((a, b) => new Date(b.transactionDate || b.createdAt) - new Date(a.transactionDate || a.createdAt));

    if (combinedResult.length === 0) {
      throw new Error('No user found with the specified criteria');
    }

    return combinedResult;
  } catch (error) {
    console.error('Error in searchByParam:', error.message);
    throw error;
  }
}
module.exports = {
  searchByParam,
};
