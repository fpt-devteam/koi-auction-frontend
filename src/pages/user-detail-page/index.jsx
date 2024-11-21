import React, { useEffect, useState } from "react";
import { Form, message, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import userApi from "../../config/userApi";
import emailApi from "../../config/emailApi";
import addressApi from "../../config/addressApi";
import UserDetailCard from "../../components/user-detail-card";
import ProfileForm from "../../components/profile-form-modal";
import "./index.css";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seed, setSeed] = useState(0);

  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const userId = new URLSearchParams(window.location.search).get("id");
  const isRequesting = location?.state?.isRequesting || false;

  // Reset seed for re-render
  const handleReset = () => {
    setSeed((prevSeed) => prevSeed + 1);
  };

  // Fetch Address
  const fetchAddress = async (id) => {
    try {
      const response = await userApi.get(`manage/profile/address/${id}`);
      setAddress(response.data.Address || "Unknown address");
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };

  // Fetch Provinces, Districts, and Wards
  const fetchProvinces = async () => {
    try {
      const response = await addressApi.get("province");
      setProvinceList(response.data || []);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      message.error("Failed to load provinces.");
    }
  };

  const fetchDistricts = async (provinceCode) => {
    try {
      if (provinceCode) {
        const response = await addressApi.get(`district/${provinceCode}`);
        setDistrictList(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      message.error("Failed to load districts.");
    }
  };

  const fetchWards = async (districtCode) => {
    try {
      if (districtCode) {
        const response = await addressApi.get(`ward/${districtCode}`);
        setWardList(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
      message.error("Failed to load wards.");
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await userApi.get(`manage/detail-profile/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize form data
  const initializeFormData = async () => {
    try {
      await fetchProvinces();
      if (user?.ProvinceCode) await fetchDistricts(user.ProvinceCode);
      if (user?.DistrictCode) await fetchWards(user.DistrictCode);
    } catch (error) {
      console.error("Error initializing form data:", error);
    }
  };

  // Approval or Rejection
  const handleApprove = async (id, email, status, reason) => {
    try {
      message.loading({ content: "Updating breeder...", key: "updatable" });

      await userApi.patch(`verify-breeder/${id}`, { Verified: status });

      const emailContent = {
        Email: email,
        Subject: status == 1 ? "Account Approved" : "Account Rejected",
        Text:
          status == 1
            ? "Your account has been approved."
            : `Your account has been rejected. Reason: ${reason || "None"}`,
      };

      await emailApi.post("send-email", emailContent);

      message.success({ content: "Update successful!", key: "updatable" });
      handleReset();
      navigate("/management/request-list", { state: { isRequesting: 1 } });
    } catch (error) {
      console.error("Error updating breeder:", error);
      message.error({ content: "Failed to update breeder.", key: "updatable" });
    }
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          message.loading({ content: "Updating user...", key: "updatable" });
          values.UserId = userId;
          values.Active = values.Active.toString();
          console.log(values.Active);

          const response = await userApi.patch(
            `manage/profile/${userId}`,
            values
          );
          console.log(response.data.message);
          console.log(values.Active);
          fetchUser(userId);

          message.success({
            content: "User updated successfully!",
            key: "updatable",
          });
          handleReset();
          setIsModalVisible(false);
        } catch (error) {
          console.error("Error updating user:", error);
          message.error({
            content: error.response.data.message || "Failed to update user",
            key: "updatable",
            duration: 2,
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Handle province/district selection
  const handleSelectProvince = (value) => {
    form.setFieldsValue({ DistrictCode: undefined, WardCode: undefined });
    setProvinceId(value);
  };

  const handleSelectDistrict = (value) => {
    form.setFieldsValue({ WardCode: undefined });
    setDistrictId(value);
  };

  // Effects
  useEffect(() => {
    if (provinceId) fetchDistricts(provinceId);
  }, [provinceId]);

  useEffect(() => {
    if (districtId) fetchWards(districtId);
  }, [districtId]);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      fetchAddress(userId);
    } else {
      message.error("No user ID provided in the URL.");
    }
  }, [userId, seed]);

  useEffect(() => {
    if (user) initializeFormData();
  }, [user]);

  return loading ? (
    <Spin />
  ) : (
    <>
      <UserDetailCard
        data={user}
        address={address}
        openModal={() => setIsModalVisible(true)}
        title="Information Details"
        isRequesting={isRequesting}
        onApprove={() => handleApprove(user.UserId, user.Email, 1)}
        onReject={(reason) => handleApprove(user.UserId, user.Email, 2, reason)}
      />
      <ProfileForm
        form={form}
        initialValues={user}
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        handleFormSubmit={handleFormSubmit}
        provinceList={provinceList}
        districtList={districtList}
        wardList={wardList}
        onSelectProvince={handleSelectProvince}
        onSelectDistrict={handleSelectDistrict}
      />
    </>
  );
};

export default UserDetail;
