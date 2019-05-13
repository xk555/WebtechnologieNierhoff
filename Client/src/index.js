import React from "react";
import ReactDOM from "react-dom";

import ReactModal from "react-modal";
import "./Post.json";
import "./styles.css";
import { Feed } from "./Components/Feed";
import Header from "./Components/Header";
import { Search } from "./Components/Search";
import { Thread } from "./Thread";
import { WritePopUp } from "./Components/WritePopUp";
import { FeedThread } from "./Components/FeedThread";

ReactModal.setAppElement("#root");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "start",
      id: null,
      showWriteModal: false,
      showPostModal: false,
      search: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleClosePostModal = this.handleClosePostModal.bind(this);
    this.handleOpenPostModal = this.handleOpenPostModal.bind(this);
    this.returnOpenModal = this.returnOpenModal.bind(this);
    this.proceedClick = this.proceedClick.bind(this);
    this.returnToStartPage = this.returnToStartPage.bind(this);
    this.postPopUp = null;
  }
  searchStarted = searchValue => {
    console.log(searchValue);
    this.setState({ search: searchValue, page: "thread" });
    this.render();
  };
  render() {
    if (this.state.page === "start")
      return (
        <div className="App">
          <Header />
          <div id="main">
            <WritePopUp
              showModal={this}
              handleCloseModal={this.handleCloseModal}
              handleOpenModal={this.handleOpenModal}
            />
            {this.state.showPostModal ? this.postPopUp : ""}
            <Search action={this.searchStarted} />
            <Feed onclick={this.proceedClick} />
          </div>
        </div>
      );
    if (this.state.page === "thread")
      return (
        <div className="App">
          <Header />
          <Search action={this.searchStarted} />
          <div id="main">
            <WritePopUp
              showModal={this}
              handleCloseModal={this.handleCloseModal}
              handleOpenModal={this.handleOpenModal}
            />
            {this.state.showPostModal ? this.postPopUp : ""}
            <FeedThread
              key="Search"
              search={this.state.search}
              onclick={this.proceedClick}
            />
          </div>
        </div>
      );
  }
  proceedClick(id) {
    console.log(id);
    this.postPopUp = (
      <Thread
        id={id}
        showModal={this}
        handleCloseModal={this.handleClosePostModal}
      />
    );
    this.setState({ showPostModal: true });
  }
  returnToStartPage() {
    this.setState({
      page: "start",
      id: null
    });
  }
  returnOpenModal() {
    return this.state.showModal;
  }
  handleOpenModal() {
    this.setState({ showWriteModal: true });
  }

  handleCloseModal() {
    this.setState({ showWriteModal: false });
  }
  handleOpenPostModal() {
    this.setState({ showPostModal: true });
  }

  handleClosePostModal() {
    this.setState({ showPostModal: false });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);