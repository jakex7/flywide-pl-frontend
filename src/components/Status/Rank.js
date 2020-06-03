import React from "react";
import styles from "./Status.module.scss";
import base from "../../api/api";

const Rank = ({group}) => {
    return (
        <div className={styles.rankContainer}>
            <div className={styles.head}>
                <img
                    src={`${base}${group.groupIconEndpoint}`}
                    width="16"
                    className={styles.image}
                    alt={group.groupId}
                />
                <span className={styles.header}>{group.groupName}</span>
            </div>
            {group.clients.map(client => (
                <p className={styles.element} key={client.nickname}>
                    <span className={styles.nickname}>{client.nickname}</span>
                    <span className={`${styles.status} ${client.status === "online" ? styles.statusOnline :styles.statusOffline }`}>
                        {client.status}
                    </span>
                </p>
            ))}
        </div>
    );
};

export default Rank;