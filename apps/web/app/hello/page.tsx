"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "../../app/stores/userStore";

const HelloPage = () => {
  const { token } = useUserStore.getState();
  const [data, setData] = useState<string>("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/protected/hello", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.message || JSON.stringify(res.data));
      } catch (error: any) {
        console.error("Error fetching protected data:", error);
        setData("Unauthorized or error occurred.");
      }
    };

    if (token) fetchData();
    else setData("No token found.");
  }, [token]);

  return <div>{data}</div>;
};

export default HelloPage;
