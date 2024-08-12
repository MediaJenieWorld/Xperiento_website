const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const { Cashfree } = require("cashfree-pg");
const { subscriptionPacks } = require("../utils/sub_packs");
const User = require("../models/User_Customer");
const { add_Subscription } = require("../utils/create_subscription");

require("dotenv").config();

Cashfree.XClientId = process.env.PAYMENT_ID;
Cashfree.XClientSecret = process.env.PAYMENT_ID_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

router.post("/payment", async (req, res) => {
  try {
    const pack = req.body.pack;

    const isPackVaild = subscriptionPacks.some(
      (order, i) => order.name === pack
    );
    if (!isPackVaild) {
      res.sendStatus(404).json("INVAILD PACK");
    }
    const findPack = subscriptionPacks.find((order, i) => order.name === pack);

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const crypto_Id = generateOrderId();

    let request = {
      order_amount: findPack.price,
      order_currency: "INR",
      order_id: crypto_Id,
      customer_details: {
        customer_id: user._id,
        customer_phone: user.phoneNumber,
        customer_name: user.firstName + " " + user.lastName,
        customer_email: user.email,
      },
    };

    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        res.status(201).json(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        res.status(500).json(error.response.data.message);
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

router.post("/verifyPayment", async (req, res) => {
  try {
    let { orderId } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
      .then(async (response) => {
        if (response.data.length > 0) {
          const x = response.data.some(
            (order, i) => order.payment_status == "SUCCESS"
          );
          if (x) {
            await add_Subscription(response.data, user);
          } else {
            throw new Error("Payment Failed");
          }
        }
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).json({ data: error.message, success: false });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

module.exports = router;

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);

  const orderId = hash.digest("hex");

  return orderId.substr(0, 12);
}
