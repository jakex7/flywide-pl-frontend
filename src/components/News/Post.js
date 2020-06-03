import React from "react";
import styles from "./News.module.scss";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Post = ({news}) => {
    return (
        <Card className={styles.postContainer}>
            <CardContent>
                <h2 className={styles.postHeader}>{news.title}</h2>
                <div className={styles.postBody} dangerouslySetInnerHTML={{__html: news.content}} />
            </CardContent>
        </Card>
    );
};

export default Post;