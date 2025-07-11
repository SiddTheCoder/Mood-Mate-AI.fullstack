import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLoginRegister } from "../../feature/auth/authThunks";
import LoaderModal from "../../components/LoaderModal";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      dispatch(googleLoginRegister({ code })).then(() => {
        navigate("/");
      });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <LoaderModal />;
};

export default GoogleCallback;
