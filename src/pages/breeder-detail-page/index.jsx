import React, { useState } from 'react';
import BreederLotList from '../../components/breeder-lot-list';
import BreederDetail from '../../components/breeder-info';
import KoiSearchBar from '../../components/koi-search-bar';

function BreederDetailPage() {
  const sampleBreeder = {
    BreederId: 1,
    FarmName: 'Narita Koi Farm',
    Certificate: 'https://link-to-logo-image.jpg', // Link tới logo của breeder
    About: 'Owner: Mr. Ryuki Narita'
  };

  // Sample data
  const sampleLots = [
    {
      LotId: 1,
      Variety: 'Showa Sanshoku',
      Sex: true,
      SizeCm: 36,
      YearOfBirth: 2023,
      WeightKg: 1.5,
      KoiMedia: [{ filePath: 'path/to/photo1.jpg' }],
      FinalPrice: 250000
    },
    {
      LotId: 2,
      Variety: 'Kohaku',
      Sex: true,
      SizeCm: 38,
      YearOfBirth: 2023,
      WeightKg: 1.7,
      KoiMedia: [{ filePath: 'path/to/photo2.jpg' }],
      FinalPrice: 300000
    }
    // Add more sample lots as needed
  ];

  const [filteredLots, setFilteredLots] = useState(sampleLots);

  // Hàm xử lý khi lọc
  const handleFilter = (filters) => {
    const filtered = sampleLots.filter((lot) => {
      return (filters.variety ? lot.Variety === filters.variety : true) && (filters.sex !== '' ? lot.Sex === filters.sex : true);
    });
    setFilteredLots(filtered);
  };

  return (
    <div style={{ padding: '2% 15%' }}>
      <BreederDetail breeder={sampleBreeder} />
      <KoiSearchBar lotList={sampleLots} onFilter={handleFilter} /> {/* Thêm thanh tìm kiếm */}
      <BreederLotList breederLotList={sampleLots} />
    </div>
  );
}

export default BreederDetailPage;
