import { useState, useEffect, useCallback } from "react";
import { publicRequest } from "../helpers/requestMethods";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useFetch = (url) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const handleLogOut = useCallback(() => {
    publicRequest.get("/api/auth/logout").then((res) => {
      navigate("/login");
      sessionStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      alert("Güvenlik açısından tekrar giriş yapmanız gerekmektedir.");
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get(url);
        setData(res.data);
      } catch (err) {
        if (err.response.data.status === 403) {
          handleLogOut();
        }
        setError(err);
      }
      setLoading(false);
    };
    fetchData();

    return () => {
      setData([]);
    };
  }, [url, handleLogOut]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
