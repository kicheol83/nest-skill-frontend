import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Pagination, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import FlippingCards from "./CommunityCard";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { useRouter } from "next/router";
import { BoardArticlesInquiry } from "@/libs/types/board-article/board-article.input";
import { useQuery } from "@apollo/client";
import { GET_BOARD_ARTICLES } from "@/apollo/user/query";

interface BoardArticleProps {
  initialInput: BoardArticlesInquiry;
}

const CommunityBoard = (props: BoardArticleProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const router = useRouter();
  const [boardArticle, setBoardArticle] = useState<BoardArticle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<any>(
    router?.query?.input
      ? JSON.parse(router?.query?.input as string)
      : initialInput
  );

  /** APOLLO REQUEST **/

  const {
    loading: getBoardArticleLoading,
    data: getBoardArticleData,
    error: getBoardArticleError,
    refetch: getBoardArticleRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: "cache-and-network",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (getBoardArticleData?.getBoardArticles?.list) {
      setBoardArticle(getBoardArticleData.getBoardArticles.list);
      setTotal(getBoardArticleData?.getBoardArticles.metaCounter[0]?.total);
    }
  }, [getBoardArticleData]);

  /** HANDLERS **/

  const paginationChangeHandler = async (
    event: ChangeEvent<unknown>,
    value: number
  ) => {
    const newFilter = { ...searchFilter, page: value };
    setSearchFilter(newFilter);
    setCurrentPage(value);

    await router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          pageB: value,
          inputL: JSON.stringify(newFilter),
        },
      },
      undefined,
      { scroll: false }
    );
  };

  useEffect(() => {
    if (router.query.pageB) {
      const pageNumber = Number(router.query.pageB);
      const newFilter = { ...searchFilter, page: pageNumber };
      setSearchFilter(newFilter);
      setCurrentPage(pageNumber);
    }
  }, [router.query.pageB]);

  if (device === "mobile") {
    return <div>COMMUNITY BOARDS (MOBILE)</div>;
  } else {
    return (
      <Stack className={"community-board"}>
        <Stack className={"container"}>
          <Stack className="community-title">
            <span>
              COMMUNITY BOARD<span className="board-txt">HIGHLIGHTS</span>{" "}
            </span>
          </Stack>
          <div className="wrapper">
            <div className="cols">
              {boardArticle.map((article) => (
                <div className="col" key={article._id}>
                  <FlippingCards article={article} />
                </div>
              ))}
            </div>
          </div>
          <Stack className="pagination" spacing={2}>
            <Pagination
              className="pagi-count"
              page={currentPage}
              count={Math.ceil(total / initialInput.limit)}
              onChange={paginationChangeHandler}
              variant="outlined"
              shape="circular"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1rem",
                  width: "38px",
                  height: "38px",
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

CommunityBoard.defaultProps = {
  initialInput: {
    page: 1,
    limit: 8,
    sort: "createdAt",
    directions: "DESC",
    search: {},
  },
};

export default CommunityBoard;
