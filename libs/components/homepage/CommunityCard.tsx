import { REACT_APP_API_URL } from "@/libs/config";
import { BoardArticle } from "@/libs/types/board-article/board-article";

interface BoardArticleCardProps {
  article: BoardArticle;
}

export default function FlippingCards(props: BoardArticleCardProps) {
  const { article } = props;
  return (
    <div className="col">
      <div className="container1">
        <div
          className="front"
          style={{
            backgroundImage: `url(${
              article?.articleImage
                ? `${REACT_APP_API_URL}/${article.articleImage}`
                : "/img/board-article.webp"
            })`,
          }}
        >
          <div className="inner">
            <p>{article.articleTitle}</p>
            <span>{article?.memberData?.memberNick}</span>
          </div>
        </div>
        <div className="back">
          <div className="inner">
            <p>{article.articleContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
