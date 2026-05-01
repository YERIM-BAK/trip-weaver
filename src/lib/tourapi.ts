async function fetchTour(endpoint: string, params: Record<string, string>) {
  const query = new URLSearchParams({ endpoint, ...params });
  const res = await fetch(`/api/tour?${query}`);
  if (!res.ok) throw new Error("TourAPI 호출 실패");
  return res.json();
}

// 키워드 검색
export async function searchKeyword(keyword: string) {
  return fetchTour("searchKeyword2", {
    keyword,
    numOfRows: "12",
    pageNo: "1",
  });
}

// 지역 기반 관광지 목록
export async function getAreaBasedList(
  areaCode: string,
  contentTypeId?: string,
) {
  return fetchTour("areaBasedList2", {
    areaCode,
    numOfRows: "20",
    pageNo: "1",
    ...(contentTypeId && { contentTypeId }),
  });
}

// 반려동물 동반 여행 정보 (전용 API!)
export async function getPetTourInfo(contentId: string) {
  return fetchTour("detailPetTour2", {
    contentId,
  });
}

// 관광지 공통 상세 정보
export async function getDetailCommon(contentId: string) {
  return fetchTour("detailCommon2", {
    contentId,
    defaultYN: "Y",
    firstImageYN: "Y",
    addrinfoYN: "Y",
    mapinfoYN: "Y",
  });
}

// 소개 정보 (운영시간, 입장료 등)
export async function getDetailIntro(contentId: string, contentTypeId: string) {
  return fetchTour("detailIntro2", {
    contentId,
    contentTypeId,
  });
}

// 이미지 목록
export async function getDetailImage(contentId: string) {
  return fetchTour("detailImage2", {
    contentId,
    imageYN: "Y",
    subImageYN: "Y",
  });
}

// 축제/행사 검색
export async function searchFestival(areaCode: string, startDate: string) {
  return fetchTour("searchFestival2", {
    areaCode,
    eventStartDate: startDate,
    numOfRows: "10",
    pageNo: "1",
  });
}

// 위치 기반 관광지
export async function getLocationBased(
  lat: string,
  lng: string,
  radius: string = "5000",
) {
  return fetchTour("locationBasedList2", {
    mapX: lng,
    mapY: lat,
    radius,
    numOfRows: "20",
    pageNo: "1",
  });
}
