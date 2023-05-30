import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const context = createContext();

export const useOjo = () => {
  const OjoContext = useContext(context);
  if (!context) throw new Error("Context API requires a provider");
  return OjoContext;
};

export const OjoProvider = ({ children }) => {
  const [greeting, setGreeting] = useState("Hola");
  const [user, setUser] = useState(null);
  const [ipUser, setIpUser] = useState(null);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [ip, setIp] = useState("");

  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  const [clouds, setClouds] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [temp, setTemp] = useState(0);

  const getGreeting = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour <= 12) setGreeting("Buenos días");

    if (hour >= 13 && hour <= 18) setGreeting("Buenas tardes");

    if (hour >= 19 && hour <= 23) setGreeting("Buenas noches");
  };

  useEffect(() => {
    getGreeting();
  }, []);

  const getUser = () => {
    const cookies = new Cookies();

    const userCookie = cookies.get("user");

    setUser(userCookie);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getIpUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition(position);
      });
    }
    axios
      .get(`https://ipapi.co/json/`)
      .then((response) => {
        const apiResponse = response.data;
        setIpUser(apiResponse);
        setCity(apiResponse.city);
        setCountry(apiResponse.country_name);
        setCurrency(apiResponse.currency_name);
        setIp(apiResponse.ip);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getIpUser();
  }, []);

  const getWeather = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c97566f1aafdd1d33ea80ef1a1ccfebd`
      )
      .then((response) => {
        const apiResponse = response.data;
        setWeather(apiResponse);
        setClouds(apiResponse.clouds.all);
        setHumidity(apiResponse.main.humidity);
        setPressure(apiResponse.main.pressure);
        setTemp(apiResponse.main.temp - 273.15);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (city) getWeather(city);
  }, [city]);

  return (
    <context.Provider
      value={{
        greeting,
        user,
        ipUser,
        position,
        weather,
        city,
        country,
        currency,
        ip,
        clouds,
        humidity,
        pressure,
        temp,
      }}
    >
      {children}
    </context.Provider>
  );
};
