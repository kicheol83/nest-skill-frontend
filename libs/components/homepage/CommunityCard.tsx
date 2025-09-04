import { REACT_APP_API_URL } from "@/libs/config";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { useRouter } from "next/router";

interface BoardArticleCardProps {
  article: BoardArticle;
}

export default function FlippingCards(props: BoardArticleCardProps) {
  const { article } = props;
  const router = useRouter();
  /** HANDLERS **/
  const chooseArticleHandler = (
    e: React.SyntheticEvent,
    article: BoardArticle
  ) => {
    router.push(
      {
        pathname: "/community/detail",
        query: {
          articleCategory: article?.articleCategory,
          id: article?._id,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <div className="col">
      <div
        className="container1"
        onClick={(e: any) => chooseArticleHandler(e, article)}
      >
        <div
          className="front"
          style={{
            backgroundImage: `url(${
              article?.articleImage
                ? `${REACT_APP_API_URL}/${article.articleImage}`
                : "/img/article-img.avif"
            })`,
          }}
        >
          <div className="inner">
            <p>{article.articleCategory}</p>
            <span>{article?.memberData?.memberNick}</span>
          </div>
        </div>
        <div className="back">
          <div className="inner">
            <p>{article.articleTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
