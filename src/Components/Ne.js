import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Spinner from "../Components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export class Ne extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      New: null,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }
  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=92f1f81f65ce441ab89108e92a93208d&category=technology&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let res = await fetch(url);
    let data = await res.json();

    this.setState({
      loading: false,
      New: data.articles,
      page: this.state.page,
      totalResults: data.totalResults,
    });
  }
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apiKey=92f1f81f65ce441ab89108e92a93208d&category=technology&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let res = await fetch(url);
    let data = await res.json();

    this.setState({
      New: this.state.New.concat(data.articles),

      totalResults: data.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1>
          New Monkey Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading || this.state.New === null ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div>
            <InfiniteScroll
              dataLength={this.state.New.length}
              next={this.fetchMoreData}
              hasMore={this.state.New.length !== this.state.totalResults}
              loader={<Spinner />}
            >
              <div className="row">
                {this.state.New.map((ele) => {
                  return (
                    <div className="col-md-3" key={ele.url}>
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
        )}
      </div>
    );
  }
}

export default Ne;
