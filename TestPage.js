import { useEffect, useCallback } from "react";
import axios from "axios";

// 페이지 번호와 LIMIT을 받아서 데이터를 요청하는 함수
async function getPostAxios(memoryId) {
  const url = `http://ec2-43-201-103-14.ap-northeast-2.compute.amazonaws.com:3000/memories/${memoryId}`;
  try {
    const res = await axios.get(url);
    const data = res.data;
    return data;
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
}

function TestPage() {
  const LIMIT = 10;

  // 데이터를 불러오는 함수
  const handleLoad = useCallback(async (options) => {
    try {
      console.log("handleLoad 호출됨, options:", options);
      // 페이지 번호 계산 (offset / LIMIT + 1)
      const page = options.offset / LIMIT + 1;
      // getPostAxios 호출
      const result = await getPostAxios(page, LIMIT);

      console.log("받아온 데이터 전체:", result);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect 호출됨");
    // 페이지 로드 시 데이터 불러오기
    handleLoad({ order: "asc", offset: 0, limit: LIMIT });
  }, [handleLoad]);

  return null; // UI를 출력하지 않음
}

export default TestPage;
