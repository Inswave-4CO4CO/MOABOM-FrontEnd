import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../components/BannerImage';
import OttButtonList from '../components/OttButtonList';
import PosterCard from '../components/PosterCard';
import { Footer } from '../components/Footer';

const MainPage = () => {
  return (
      <div>
        <BannerImage />
        <OttButtonList />
        <PosterCard />
        <Footer />
      </div>
  );
};

export default MainPage;
