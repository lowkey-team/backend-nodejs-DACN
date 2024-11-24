const { default: Ghn } = require("giaohangnhanh");

const ghn = new Ghn({
  token: "c40cb3f6-a81c-11ef-8e53-0a00184fe694",
  shopId: 195404,
  host: "https://dev-online-gateway.ghn.vn",
  trackingHost: "https://tracking.ghn.dev/",
  testMode: true,
});

const calculateShippingFee = async (req, res) => {
  try {
    const {
      to_district_id,
      to_ward_code,
      service_type_id,
      height,
      weight,
      length,
      width,
    } = req.body;

    const fee = await ghn.calculateFee.calculateShippingFee({
      to_district_id,
      to_ward_code,
      service_type_id,
      height,
      weight,
      length,
      width,
    });

    res.json(fee);
  } catch (error) {
    console.error("Error calculating shipping fee:", error.message);
    console.error("Detailed error:", error);
    res.status(500).json({
      message: "Error calculating shipping fee",
      error: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    const order = await ghn.order.createOrder(orderData);

    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

module.exports = {
  calculateShippingFee,
  createOrder,
};
