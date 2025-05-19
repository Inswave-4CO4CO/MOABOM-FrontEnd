import { Flex } from '@chakra-ui/react';
import OttButton from './OttButton';

import netflix from '../assets/images/Netflix.png';
import wavve from '../assets/images/Wavve.png';
import coupangplay from '../assets/images/CoupangPlay.png';
import watcha from '../assets/images/Watcha.png';
import tving from '../assets/images/Tving.png';
import laftel from '../assets/images/Laftel.png';
import disney from '../assets/images/Disney.png';
import appletv from '../assets/images/AppleTv.png';
import uplus from '../assets/images/Uplus.png';

// ottList 배열을 내보내서 다른 컴포넌트에서도 사용할 수 있게 함
export const ottList = [
  { src: netflix, alt: '넷플릭스' },
  { src: wavve, alt: '웨이브' },
  { src: coupangplay, alt: '쿠팡플레이' },
  { src: watcha, alt: '왓챠' },
  { src: tving, alt: '티빙' },
  { src: laftel, alt: '라프텔' },
  { src: disney, alt: '디즈니' },
  { src: appletv, alt: '애플티비' },
  { src: uplus, alt: '유플러스' }
];

const OttButtonList = ({ selectedOtts = [], onSelect }) => {
  return (
    <Flex direction="row" gap="8px">
      {ottList.map((ott, i) => (
        <OttButton
          key={i}
          imageSrc={ott.src}
          imageAlt={ott.alt}
          isSelected={selectedOtts.includes(ott.alt)}
          onClick={onSelect}
        />
      ))}
    </Flex>
  );
};

export default OttButtonList;