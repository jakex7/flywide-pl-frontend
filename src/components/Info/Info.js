import React from "react";
import styles from "./News.module.scss";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import dayjs from "dayjs";

const Info = ({clientInfo: {clientNickname, clientUid, clientDbid, clientFirstConnect}}) => {
    const firstConnect = dayjs.unix(clientFirstConnect).format('YYYY-MM-DD HH:mm:ss');
    return (
        <div className={styles.infoContainer}>
            <span className={styles.infoSupHeader}>Flywide.pl</span>
            <h2 className={styles.infoHeader}>Client info</h2>
            <Card className={styles.infoCardContainer}>
                <CardContent>
                    <h2 className={styles.infoNickname}>{clientNickname}</h2>
                    <h4>Database ID: <span className={styles.infoContent}>{clientDbid}</span></h4>
                    <h4>First connection: <span className={styles.infoContent}>{firstConnect}</span></h4>
                    <h4>Unique ID: <span className={styles.infoContent}>{clientUid}</span></h4>
                    <h4>Time: <a href={"/czas"}><span className={styles.infoContent}>Click</span></a></h4>
                </CardContent>
            </Card>
        </div>
    );
};

export default Info;