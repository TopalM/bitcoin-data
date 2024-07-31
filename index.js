const axios = require("axios");
const ExcelJS = require("exceljs");

const getHistoricalData = async () => {
  try {
    const symbol = "BTC-USD";
    const interval = "4h"; // 4 saatlik veriler
    const startTime = new Date("2021-11-08").getTime(); // Başlangıç tarihi
    const endTime = new Date("2025-01-01").getTime(); // Bitiş tarihi

    const response = await axios.get("https://api.binance.com/api/v3/klines", {
      params: {
        symbol: symbol,
        interval: interval,
        startTime: startTime,
        endTime: endTime,
      },
    });

    const historicalData = response.data;

    // Yeni bir çalışma kitabı oluşturun
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("MOVR Data");

    // Sütun başlıklarını ekleyin
    worksheet.columns = [
      { header: "Date", key: "date", width: 20 },
      { header: "Open", key: "open", width: 15 },
      { header: "High", key: "high", width: 15 },
      { header: "Low", key: "low", width: 15 },
      { header: "Close", key: "close", width: 15 },
      { header: "Volume", key: "volume", width: 15 },
    ];

    historicalData.forEach((data) => {
      worksheet.addRow({
        date: new Date(data[0]).toLocaleString(),
        open: data[1],
        high: data[2],
        low: data[3],
        close: data[4],
        volume: data[5],
      });
    });

    // Excel dosyasını kaydedin
    await workbook.xlsx.writeFile("mustafa.xlsx");

    console.log("Veriler başarıyla mustafa.xlsx dosyasına kaydedildi.");
  } catch (error) {
    console.error("Hata:", error);
  }
};

getHistoricalData();
