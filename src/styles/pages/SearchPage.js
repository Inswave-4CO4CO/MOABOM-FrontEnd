import styled from "styled-components";

export const SearchContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SearchHeader = styled.div`
  margin-bottom: 24px;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 12px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 24px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const SelectedFiltersWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const FilterLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-right: 16px;
  white-space: nowrap;
`;

export const SelectedFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FilterBoxWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

export const CloseIcon = styled.span`
  margin-left: 4px;
  font-weight: bold;
`;

export const SearchContent = styled.div`
  display: flex;
  gap: 24px;
`;

export const FilterSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

export const FilterContainer = styled.div`
  background-color: #fff8f0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
`;

export const GenreGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  overflow-y: auto;
  max-height: 300px;
`;

export const CategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const GenreOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  overflow-y: visible;
`;

export const CategoryOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

export const FilterOption = styled.div`
  display: flex;
  align-items: center;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  background-color: #c3c0c0;
  align-self: stretch;
`;

export const ResultsSection = styled.div`
  flex: 1;
  width: 100%;

  /* 작품 탭에서만 그리드 레이아웃 적용 */
  ${(props) =>
    props.$isContentTab &&
    `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  `}
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
  grid-column: 1 / -1; /* 전체 너비 사용 */
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-bottom: 16px;
  font-weight: 500;
`;

export const LoadingMessage = styled.div`
  padding: 15px 0;
  text-align: center;
  color: #666;
  font-size: 14px;
`;

export const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 16px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LoadingMoreMessage = styled(LoadingMessage)`
  grid-column: 1 / -1;
  padding: 20px 0;
`;

export const ProfileIconWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  padding: 10px;

  &:hover {
    transform: scale(1.05);
  }

  /* ProfileIcon 내부 컴포넌트 스타일 재정의 */
  div {
    width: 100% !important;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }

  img {
    width: 150px !important;
    height: 150px !important;
    min-width: 150px;
    min-height: 150px;
    max-width: 150px;
    max-height: 150px;
    object-fit: cover;
    border-radius: 50%;
    aspect-ratio: 1/1;
    box-sizing: border-box;
  }

  span {
    font-weight: bold;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    margin-top: 6px;
    display: block;
  }
`;

export const PosterCardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
