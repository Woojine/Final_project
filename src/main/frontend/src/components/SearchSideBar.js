import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import { Container } from "./StandardStyles";
import FestivalAPI from "../api/FestivalAPI";
import festivalPoster2 from "../images/2023안양충훈벚꽃축제.jpg";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { formatDate } from "./DateStyle";
import { useNavigate } from "react-router";
const SearchContainer = styled.div`
  display: inline-block;
  max-width: 400px;
  min-width: 400px;
  height: calc(100vh - 58px);
  /* background: linear-gradient(to right, #654ea3, #eaafc8); */
  background-color: #fff;
  overflow-y: hidden;
  z-index: 3;
  box-shadow: 1px 0px 5px 0px #555555;
`;
const SearchArea = styled.div`
  display: flex;
  width: 100%;
  height: 8%;
  min-height: 80px;
  background: #222;
  align-items: center;
  justify-content: center;
  /* box-shadow: 5px 0 5px -5px #333; */
  /* border-bottom: 1px solid lightgray; */
`;

const InputBoxArea = styled.div`
  display: flex;
  width: 90%;
  height: 36px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
  /* linear-gradient(to right, #7E2BFE, #23C3F4); */
  align-items: center;
  background-origin: border-box;
  background-clip: content-box, border-box;
  outline: none;
  font-size: 13px;
  box-shadow: 1px 1px 4px -1px #555555;
  margin: 0px -5px;
`;

const SearchInputBox = styled.input`
  width: 83%;
  height: 32px;
  background-color: #fff;
  border: none;
  outline: none;
  font-size: 13px;
  margin-left: 15px;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px 3px 3px 8px;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: none;

  border-radius: 5px;
  .searchIcon {
    transition: all 0.1s ease-in;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover .searchIcon {
    transform: scale(1.2);
  }
`;

const ListContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 92%;
  min-height: 80;
  margin-top: auto;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;

  .show-scroll {
    overflow-y: scroll;
  }

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 10px;
    background: #f4ebff;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    /* height: 20px; */
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0px 0px 3px gray;
  }
`;

const Result = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 24px;
  /* min-height: 40px; */
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 0 8px;
  font-size: 14px;
`;

const ResultSort = styled.ol`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  li:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 10px;
    background-color: lightgray;
    margin: 0px 5px;
  }
`;

const SortByDateOrDistance = styled.li`
  display: inline-block;
  list-style: none;

  a {
    font-size: 12px;
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: #0475f4;
    }
  }
`;

const CardList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const CardWrap = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  background-color: #fff;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid lightgray;
`;

const CardInner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
  width: 350px;
  align-items: center;
  justify-content: center;

  p {
    font-size: 13px;
  }
`;

const ImageArea = styled.div`
  position: relative;
  grid-row: 1 / span 2;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 120px;
    margin-right: 10px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
      position: relative;
    }
  }
`;

const TextArea = styled.div`
  grid-column: 2;
  grid-row: 1;
  margin: 10px 0;
  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #222;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    margin: 10px 0;
    margin-right: 20px;
  }
`;

const ContentArea = styled.div`
  grid-column: 1 / span 2;
  grid-row: 3;
  background-color: #fff5fb;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f4ebff;
  }

  p,
  .address {
    margin: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 보여줄 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const SearchSideBar = () => {
  const navigate = useNavigate();
  const [festival, setFestival] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalElements, setTotalElements] = useState("");
  const {
    contextLongitude,
    setContextLongitude,
    contextLatitude,
    setContextLatitude,
  } = useContext(UserContext);
  const latitudeArr = [];
  const longitudeArr = [];
  const searchDefaultByFestivalName = async () => {
    const search = await FestivalAPI.GetSearchResultByFestivalName(
      searchKeyword,
      0
    ).then((result) => {
      console.log(result);
      console.log(result.data.content);

      setFestival(result.data.content);
      setTotalElements(result.data.totalElements);

      //마커 찍기 위한 위도 경도 배열을 콘텍스트에 전달
      for (let i = 0; i < result.data.content.length; i++) {
        latitudeArr.push(result.data.content[i].latitude);
        longitudeArr.push(result.data.content[i].longitude);
      }

      setContextLatitude(latitudeArr);
      setContextLongitude(longitudeArr);
    });
  };
  return (
    <SearchContainer>
      <SearchArea>
        <InputBoxArea>
          <SearchInputBox
            value={searchKeyword}
            type="text"
            placeholder="찾을 지역이나 축제 이름을 입력하세요."
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SearchButton onClick={searchDefaultByFestivalName}>
            <SearchIcon className="searchIcon" />
          </SearchButton>
        </InputBoxArea>
      </SearchArea>

      {/* 검색 결과 */}

      <ListContainer>
        {totalElements ? (
          <Result>
            <p>검색된 결과 '{totalElements}'개가 있습니다.</p>
            <ResultSort>
              <SortByDateOrDistance>
                <a href="#none">날짜순</a>
              </SortByDateOrDistance>
              <SortByDateOrDistance>
                <a href="#none">거리순</a>
              </SortByDateOrDistance>
            </ResultSort>
          </Result>
        ) : (
          <Result>
            <p>검색된 결과가 없습니다.</p>
            <ResultSort>
              <SortByDateOrDistance>
                <a href="#none">날짜순</a>
              </SortByDateOrDistance>
              <SortByDateOrDistance>
                <a href="#none">거리순</a>
              </SortByDateOrDistance>
            </ResultSort>
          </Result>
        )}

        {/* 결과 카드 */}
        <CardList>
          {festival &&
            festival.map((e, idx) => (
              <CardWrap key={idx}>
                <CardInner>
                  <ImageArea onClick={() => navigate("/pages/festivaldetail")}>
                    <img src={festivalPoster2} alt="festival_poster" />
                  </ImageArea>
                  <TextArea>
                    <h4
                      onClick={() => navigate(`/pages/festivaldetail/:${e.id}`)}
                    >
                      {e.fstvlNm}
                    </h4>
                    <p>시작일: {formatDate(e.fstvlStartDate)}</p>
                    <p>종료일: {formatDate(e.fstvlEndDate)}</p>
                    <p className="address">
                      {e.rdnmadr ? e.rdnmadr : e.lnmadr}
                    </p>
                    <p>{e.phoneNumber}</p>
                  </TextArea>
                  <ContentArea>
                    <p>{e.fstvlCo}</p>
                  </ContentArea>
                </CardInner>
              </CardWrap>
            ))}
        </CardList>
      </ListContainer>
    </SearchContainer>
  );
};
export default SearchSideBar;
