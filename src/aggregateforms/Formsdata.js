const mongoose = require('mongoose');
const SellerPayment = require('../Seller-payment/model/Model');
const Payment = require('../buyerPayment/Model/schma');


async function searchByEmail(email) {
  try {
    const result = await SellerPayment.aggregate([
      {
        $match: { emailAddress: email },
      },
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          userName: 1,
          uniquePin: 1,
          email: '$emailAddress',
          sellerEmail: '$sellerEmailAddress',
          accountSerialNo: 1,
          accountType: 1,
          accountPrice: 1,
          accountTax: 1,
          totalAccountPrice: 1,
          transitionId: 1,
          transitionData: '$transitionIdDate',
          transactionDate: '$createdAt',
          transactionTime: { $literal: null },
          paymentScreenshot: '$transitionScreenShot',
        },
      },
    ]).exec();

    const paymentResult = await Payment.aggregate([
      {
        $match: { email: email },
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
          accountTax: 1,
          totalAccountPrice: 1,
          transitionId: 1,
          transitionData: 1,
          transactionDate: 1,
          transactionTime: 1,
          paymentScreenshot: '$paymentScreenshot',
        },
      },
    ]).exec();

    // Combine the results from both collections
    const combinedResult = [...result, ...paymentResult];

    console.log('Search result:', combinedResult);
    return combinedResult;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Example usage
const userEmail = 'user@example.com';
searchByEmail(userEmail);
