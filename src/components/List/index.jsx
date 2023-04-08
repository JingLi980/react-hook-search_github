import React, { useState, useEffect } from "react";
import "./index.css";
import PubSub from "pubsub-js";

export default function List() {
  let [state, setState] = useState({
    users: [], //user初始值为数组
    isFirst: true, //是否为第一次打开页面
    isLoading: false, //发送请求后，响应回来之前
    err: "", //存储请求相关的错误信息
  });
  console.log(state);
  let { users, isFirst, isLoading, err } = state;

  useEffect(() => {
    let token = PubSub.subscribe("lijing", (_, stateObj) => {
      //不想写msg，可以用_下划线占位
      setState((state) => stateObj);
    });
    return () => {
      PubSub.unsubscribe(token);
    };
  });

  return (
    <div className="row">
      {isFirst ? (
        <h2>欢迎使用，输入关键字，点击搜索</h2>
      ) : isLoading ? (
        <h2>Loading.........</h2>
      ) : err ? (
        <h2 style={{ color: "red" }}>{err}</h2>
      ) : (
        users.map((userObj) => {
          return (
            <div className="card" key={userObj.id}>
              <a rel="noreferrer" href={userObj.html_url} target="_blank">
                <img
                  alt="head_portrait"
                  src={userObj.avatar_url}
                  style={{ width: "100px" }}
                />
              </a>
              <p className="card-text">{userObj.login}</p>
            </div>
          );
        })
      )}
    </div>
  );
}
