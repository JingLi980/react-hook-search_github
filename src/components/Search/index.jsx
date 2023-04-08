import React, { useState } from "react";
import PubSub from "pubsub-js";
import axios from "axios";

export default function Search() {
  const [serValue, setvalue] = useState("");
  let onChange = (event) => {
    let { target } = event;
    setvalue((serValue) => target.value);
    console.log(serValue);
  };
  let search = () => {
    PubSub.publish("lijing", { isFirst: false, isLoading: true });
    axios.get(`http://localhost:3000/api1/search/users?q=${serValue}`).then(
      (response) => {
        PubSub.publish("lijing", {
          isLoading: false,
          users: response.data.items,
        });
      },
      (error) => {
        PubSub.publish("lijing", { isLoading: false, err: error.message });
      }
    );
  };
  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">搜索github用户</h3>
      <div>
        <input
          onChange={(e) => onChange(e)}
          type="text"
          placeholder="输入关键词点击搜索"
        />
        &nbsp;<button onClick={search}>Search</button>
      </div>
    </section>
  );
}
