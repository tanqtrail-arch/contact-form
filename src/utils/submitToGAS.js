import { GAS_URL } from "../constants/brand";

export const submitToGAS = async (type, data) => {
  if (GAS_URL === "YOUR_GAS_WEB_APP_URL_HERE") {
    await new Promise((r) => setTimeout(r, 1200));
    return { success: true, demo: true };
  }
  try {
    await fetch(GAS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...data, timestamp: new Date().toISOString() }),
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
