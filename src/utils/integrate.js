const axios = require("axios");

const logAction = async (product_id, shop_id, action_type, action_details) => {
  try {
    await axios.post("http://localhost:3001/api/v1/actions", {
      product_id,
      shop_id,
      action_type,
      action_details,
    });
  } catch (error) {
    console.error("Error logging action:", error.message);
  }
};

module.exports = { logAction };
