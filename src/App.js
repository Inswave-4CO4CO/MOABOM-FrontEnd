import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import HeaderButton from "./components/HeaderButton";
import FilterBox from "./components/FilterBox";
import CheckBox from "./components/CheckBox";
import OttButton from "./components/OttButton";
import NetflixLogo from './assets/images/Netflix.png';
import WavveLogo from './assets/images/Wavve.png';
import CoupangPlayLogo from './assets/images/CoupangPlay.png';
import WatchaLogo from './assets/images/Watcha.png';
import TvingLogo from './assets/images/Tving.png';
import LaftelLogo from './assets/images/Laftel.png';
import DisneyLogo from './assets/images/Disney.png';
import AppleTvLogo from './assets/images/AppleTv.png';
import UplusLogo from './assets/images/Uplus.png';

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <HeaderButton>OTT 추천받기</HeaderButton>
      <FilterBox>전체</FilterBox>
      <CheckBox>전체</CheckBox>
      <OttButton imageSrc={NetflixLogo} imageAlt="넷플릭스" />
      <OttButton imageSrc={WavveLogo} imageAlt="웨이브" />
      <OttButton imageSrc={CoupangPlayLogo} imageAlt="쿠팡플레이" />
      <OttButton imageSrc={WatchaLogo} imageAlt="왓챠" />
      <OttButton imageSrc={TvingLogo} imageAlt="티빙" />
      <OttButton imageSrc={LaftelLogo} imageAlt="라프텔" />
      <OttButton imageSrc={DisneyLogo} imageAlt="디즈니" />
      <OttButton imageSrc={AppleTvLogo} imageAlt="애플티비" />
      <OttButton imageSrc={UplusLogo} imageAlt="유플러스" />
    </ChakraProvider>
  );
};

export default App;