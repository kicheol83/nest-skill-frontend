const cards = [
  { title: "NEW", image: "https://unsplash.it/500/500/" },
  { title: "RECOMMEND", image: "https://unsplash.it/511/511/" },
  { title: "HUMOR", image: "https://unsplash.it/502/502/" },
  { title: "HUMOR", image: "https://unsplash.it/503/503/" },
  { title: "NEW", image: "https://unsplash.it/504/504/" },
  { title: "FREE", image: "https://unsplash.it/505/505/" },
  { title: "RECOMMEND", image: "https://unsplash.it/506/506/" },
  { title: "NEW", image: "https://unsplash.it/508/508/" },
];

export default function FlippingCards() {
  return (
    <div className="wrapper">
      {/* <h1>Parallax Flipping Cards</h1> */}
      <div className="cols">
        {cards.map((card, index) => (
          <div className="col" key={index}>
            <div className="container1">
              <div
                className="front"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="inner">
                  <p>{card.title}</p>
                  <span>by: David</span>
                </div>
              </div>
              <div className="back">
                <div className="inner">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Alias cum repellat velit quae suscipit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
