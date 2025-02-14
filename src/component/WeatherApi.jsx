export const getWeatherData = async (city) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=76101fb77b52fcec45fc78f410740120`);
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
