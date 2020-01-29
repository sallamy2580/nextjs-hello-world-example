import React from "react";
import useSWR from "swr";

import Banner from "../components/home/Banner";
import MainView from "../components/home/MainView";
import Tags from "../components/home/Tags";
import fetcher from "../lib/utils/fetcher";
import { SERVER_BASE_URL } from "../lib/utils/constant";

const Home = ({ articles: initialArticles, tags: initialTags }) => {
  const { data: fetchedArticles } = useSWR(
    `${SERVER_BASE_URL}/articles`,
    fetcher,
    {
      initialArticles
    }
  );
  const { data: fetchedTags } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher, {
    initialTags
  });

  const { articles } = fetchedArticles || initialArticles;
  const { tags } = fetchedTags || initialTags;

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <MainView articles={articles} />
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <Tags tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const articles = await fetcher(`${SERVER_BASE_URL}/articles`);
  const tags = await fetcher(`${SERVER_BASE_URL}/tags`);
  return { articles, tags };
};

export default Home;
