import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./News.module.scss";
import Post from "./Post";
import {pageNews} from "../../api/api";

const News = () => {
    const [getPosts, setPosts] = useState([]);

    useEffect(() => {
        const getPostsFromApi = async () => {
            await axios.get(pageNews)
                .then(res => res.data)
                .then(({data, status}) => {
                    if (status === "success") {
                        setPosts(data.news.reverse());
                    }
                })
                .catch(() => console.log("Error fetching data (news)"));
        };
        getPostsFromApi();
    }, []);
    return (
        <div className={styles.newsContainer}>
            <span className={styles.newsSupHeader}>Flywide.pl</span>
            <h2 className={styles.newsHeader}>News</h2>
            { getPosts.map(news => <Post news={news} key={news.id}/>)}
        </div>
    );
};

export default News;