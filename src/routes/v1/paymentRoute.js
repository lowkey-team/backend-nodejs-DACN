import express from "express";
import crypto from "crypto";
import axios from "axios";

const router = express.Router();

const accessKey = "F8BBA842ECF85";
const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
const partnerCode = "MOMO";
const redirectUrl = "http://localhost:3000/cart";
const ipnUrl = "http://localhost:3000/cart";

const generateStatusSignature = (
  partnerCode,
  accessKey,
  requestId,
  orderId,
  requestType
) => {
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;
  console.log("Chuỗi rawSignature cho trạng thái: ", rawSignature);
  return crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
};

const generateSignature = (amount, orderId, requestId, orderInfo) => {
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=payWithMethod`;
  return crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
};

router.post("/api/payment", async (req, res) => {
  const amount = req.body.totalAmount;
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const orderInfo = "Thanh toán bằng MoMo";
  const signature = generateSignature(amount, orderId, requestId, orderInfo);

  const requestBody = {
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang: "vi",
    requestType: "payWithMethod",
    autoCapture: true,
    extraData: "",
    signature,
  };

  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody
    );
    if (response.data && response.data.resultCode === 0) {
      res.json(response.data);
    } else {
      res.status(400).send("Thanh toán không thành công");
    }
  } catch (error) {
    res.status(500).send(error.response?.data || error.message);
  }
});

router.get("/api/payment/status", async (req, res) => {
  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ message: "Thiếu thông tin orderId" });
  }

  const requestId = partnerCode + new Date().getTime();
  const requestType = "transactionStatus";

  const requestBody = {
    partnerCode,
    accessKey,
    requestId,
    orderId,
    lang: "vi",
  };

  const signature = generateStatusSignature(
    requestBody.partnerCode,
    requestBody.accessKey,
    requestBody.requestId,
    requestBody.orderId
  );

  console.log("Chữ ký tạo ra:", signature);

  requestBody.signature = signature;

  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/query",
      requestBody
    );

    console.log("MoMo API response:", response.data);

    if (response.data && response.data.resultCode === 0) {
      res.json({
        message: "Giao dịch thành công",
        data: response.data,
      });
    } else {
      res.status(400).json({
        message: "Không thể kiểm tra trạng thái thanh toán",
        error: response.data,
      });
    }
  } catch (error) {
    console.error(
      "Lỗi khi kiểm tra trạng thái thanh toán:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Lỗi server khi kiểm tra trạng thái",
      error: error.response?.data || error.message,
    });
  }
});

export const paymentRoute = router;
