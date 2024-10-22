import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => navigate(-1)} // Điều hướng về trang trước
    >
      Back
    </button>
  );
}

export default BackButton;
