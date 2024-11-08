import React, { useEffect, useState } from "react";
import BreederLotList from "../../components/breeder-lot-list";
import BreederDetail from "../../components/breeder-info";
import KoiSearchBar from "../../components/koi-search-bar";
import lotApi from "../../config/lotApi";
import { message } from "antd";
import { useParams } from "react-router-dom";
import userApi from "../../config/userApi";

function BreederDetailPage() {
  const sampleBreeder = {
    BreederId: 1,
    FarmName: "Narita Koi Farm",
    Certificate: "https://link-to-logo-image.jpg", // Link tới logo của breeder
    About: "Owner: Mr. Ryuki Narita",
  };
  const [breeder, setBreeder] = useState([]);
  const { breederId } = useParams();

  const fetchBreederInfo = async () => {
    try {
      const response = await userApi.get(`/manage/breeder/profile/${breederId}`);
      console.log("breeder", response.data);
      setBreeder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBreederInfo();
  }, [breederId]);

  // Sample data
  const sampleLots = [
    {
      LotId: 1,
      Variety: "Showa Sanshoku",
      Sex: true,
      SizeCm: 36,
      YearOfBirth: 2023,
      WeightKg: 1.5,
      KoiMedia: [{ filePath: "path/to/photo1.jpg" }],
      FinalPrice: 250000,
    },
    {
      LotId: 2,
      Variety: "Kohaku",
      Sex: true,
      SizeCm: 38,
      YearOfBirth: 2023,
      WeightKg: 1.7,
      KoiMedia: [{ filePath: "path/to/photo2.jpg" }],
      FinalPrice: 300000,
    },
    // Add more sample lots as needed
  ];

  const [filteredLots, setFilteredLots] = useState([]);
  const [allLots, setAlllots] = useState([]);
  const fetchFilterLotData = async () => {
    try {
      const response = await lotApi.get(`/lots/search-koi?id=${breederId}`);
      console.log("Nhe nhang va tinh cam", response.data);
      setFilteredLots(response.data);
      setAlllots(response.data);
    } catch (error) {
      // message.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFilterLotData();
  }, [breederId]);

  // Hàm xử lý khi lọc
  const handleFilter = (filters) => {
    const filtered = sampleLots.filter((lot) => {
      return (
        (filters.variety ? lot.Variety === filters.variety : true) &&
        (filters.sex !== "" ? lot.Sex === filters.sex : true)
      );
    });
    setFilteredLots(filtered);
  };

  return (
    <div style={{ padding: "2% 15%" }}>
      <BreederDetail breeder={breeder} />
      <KoiSearchBar
        allLots={allLots} // Truyền allLots vào KoiSearchBar
        setFilteredLots={setFilteredLots}
      />{" "}
      {/* Thêm thanh tìm kiếm */}
      <BreederLotList breederLotList={filteredLots} />
    </div>
  );
}

export default BreederDetailPage;
