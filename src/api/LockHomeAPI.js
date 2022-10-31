import { useState, useEffect } from "react";
import axios from "axios";

function LockhomeAPI() {
  const [lockhome, setLockhome] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getLockHome = async () => {
      const res = await axios.get("/api/lockhomes");
      setLockhome(res.data);
    };
    getLockHome();
  }, [callback]);
  return {
    lockhome: [lockhome, setLockhome],
    callback: [callback, setCallback],
  };
}
export default LockhomeAPI;
