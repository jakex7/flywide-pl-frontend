import React from "react";
import styles from "./Status.module.scss";
import Rank from "./Rank";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Status = ({adminsStatus}) => {
    return (
        <div className={styles.statusContainer}>
            <h2 className={styles.statusHeader}>Admins online</h2>
            <Card>
                <CardContent>
                    {adminsStatus.map(adminsStatusGroup => <Rank group={adminsStatusGroup} key={adminsStatusGroup.groupId}/>)}
                </CardContent>
            </Card>
        </div>
    );
};

export default Status;