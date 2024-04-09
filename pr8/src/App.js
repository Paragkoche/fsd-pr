import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { getDevPost, dd } from "./api/index";

const Post = (props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.thumbnail} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href={props.link} target="__blank" className="btn btn-primary">
          Read more
        </a>
      </div>
    </div>
  );
};

function App() {
  const [post, setPost] = React.useState([]);
  React.useEffect(() => {
    getDevPost({
      user: "lisabirch",
    }).then((res) => {
      setPost(res);
    });
  }, []);
  console.log(post);
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {post.map((v) => (
          <div className="col">
            <Post {...v} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
