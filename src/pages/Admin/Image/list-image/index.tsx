// src/MediaLibrary.js
import React, { useState } from 'react';
import {  Input, Select, Button, Card, Row, Col } from 'antd';
import { AppstoreOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import './style.scss';
import Heading from '../../components/Heading';

const { Search } = Input;
const { Option } = Select;

const mediaFiles = [
  { id: 1, src: 'https://cf.shopee.vn/file/vn-11134207-7ras8-m0st0n2s9e333f', type: 'image' },
  { id: 2, src: 'https://cf.shopee.vn/file/vn-11134207-7ras8-m0st0n2s9e333f', type: 'image' },
  { id: 3, src: 'https://cf.shopee.vn/file/vn-11134207-7ras8-m0st0n2s9e333f', type: 'image' },
  { id: 4, src: 'https://cf.shopee.vn/file/vn-11134207-7ras8-m0st0n2s9e333f', type: 'image' },
  { id: 5, src: 'https://cf.shopee.vn/file/vn-11134207-7ras8-m0st0n2s9e333f', type: 'image' },
  { id: 6, src: 'https://cf.shopee.vn/file/vn-11134207-7ras8-m0st0n2s9e333f', type: 'image' },
  { id: 7, src: 'https://cf.shopee.vn/file/vn-11134207-7ras8-m0st0n2s9e333f', type: 'image' },
  // Thêm các URL ảnh khác ở đây
];

const MediaLibrary = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterDate, setFilterDate] = useState('all');

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  const handleFilterTypeChange = (value) => {
    setFilter(value);
  };

  const handleFilterDateChange = (value) => {
    setFilterDate(value);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="p-6">
      <Heading>Media</Heading>
      <div className="flex justify-between items-center mb-4 mt-[15px]">
        
      <Button
    type="primary"
    icon={<PlusOutlined />}
    className="custom-button"
  >
    Add new media file
  </Button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-4 mt-[25px] mb-[3rem]">
        {/* Phần bên trái */}
        <div className="flex items-center gap-4">
          {/* Chuyển đổi chế độ xem */}
          <div className="flex items-center gap-2">
           <Button
              type={viewMode === 'grid' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              onClick={() => handleViewToggle('grid')}
              className="button-black"
/>

            <Button
              type={viewMode === 'list' ? 'primary' : 'default'}
              icon={<UnorderedListOutlined />}
              onClick={() => handleViewToggle('list')}
              className="button-black"
            />
          </div>

          {/* Bộ lọc loại media */}
          <Select
            defaultValue="All"
            onChange={handleFilterTypeChange}
            className="w-32"
          >
            <Option value="all">All</Option>
            <Option value="image">Image</Option>
            <Option value="video">Video</Option>
          </Select>

          {/* Bộ lọc ngày */}
          <Select
            defaultValue="All days"
            onChange={handleFilterDateChange}
            className="w-40"
          >
            <Option value="all">All days</Option>
            <Option value="today">Today</Option>
            <Option value="thisWeek">This week</Option>
            <Option value="thisMonth">This month</Option>
          </Select>

          {/* Nút chọn nhiều */}
          <Button type="default" className="w-38">
          Choose many
          </Button>
        </div>

        {/* Ô tìm kiếm media (bên phải) */}
        <Search
  placeholder="Find media"
  onSearch={handleSearch}
  className="search-input"  // Thêm lớp CSS cho Search
  enterButton
  allowClear
/>

      </div>

      {/* Chế độ hiển thị theo lưới */}
      <Row gutter={[36, 36]}>
        {mediaFiles
          .filter(file => filter === 'all' || file.type === filter)
          .filter(file => file.src.includes(searchTerm))
          .map(file => (
            <Col span={4} key={file.id}>
  <Card
    
    cover={<img alt="media" src={file.src} className="full-image border-radius: 10px" />}
    
  />
</Col>

          ))}
      </Row>
    </div>
  );
};

export default MediaLibrary;
