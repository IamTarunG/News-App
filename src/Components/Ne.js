import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Spinner from "../Components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
function Ne(props) {
  const [New, setNew] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=92f1f81f65ce441ab89108e92a93208d&category=technology&page=${page}&pageSize=${props.pageSize}`;
    let res = await fetch(url);
    props.setProgress(30);
    let data = await res.json();
    props.setProgress(70);
    setLoading(false);
    setNew(data.articles);
    setPage(page);
    setTotalResults(data.totalResults);
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apiKey=92f1f81f65ce441ab89108e92a93208d&category=technology&page=${page}&pageSize=${props.pageSize}`;
    let res = await fetch(url);
    let data = await res.json();
    setNew(New.concat(data.articles));
    setTotalResults(data.totalResults);
  };

  return (
    <div className="container my-3">
      <h1>New Monkey Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading || New === null ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div>
          <div className="container">
            <InfiniteScroll
              style={{ overflow: "hidden" }}
              dataLength={New.length}
              next={fetchMoreData}
              hasMore={New.length !== totalResults}
              loader={<Spinner />}
            >
              <div className="row">
                {New.map((ele, index) => {
                  return (
                    <div className="col-md-3" key={index}>
                      <span
                        className="badge bg-danger"
                        style={{ margin: "5px", padding: "5px" }}
                      >
                        {ele.source.name}
                      </span>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={
                            ele.urlToImage === null
                              ? "https://www.sammobile.com/wp-content/uploads/2021/09/Galaxy-S21-One-UI-4.0-Android-12-beta-720x405.jpg"
                              : ele.urlToImage
                          }
                        />
                        <Card.Body>
                          <Card.Title>{ele.title}</Card.Title>
                          <Card.Text as="div">
                            {ele.description === null ? (
                              <div>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Saepe voluptate libero magni,
                                nemo deleniti quaerat!
                              </div>
                            ) : (
                              ele.description
                            )}
                          </Card.Text>
                          <p className="card-text">
                            <small className="text-muted">
                              By {ele.author === null ? "Unknown" : ele.author}{" "}
                              published at{" "}
                              {new Date(ele.publishedAt).toUTCString()}
                            </small>
                          </p>
                          <Button
                            variant="primary"
                            href={ele.url}
                            target="_blank"
                            className="btn-sm"
                          >
                            Read More
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </div>
  );
}
Ne.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general",
};

Ne.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default Ne;
