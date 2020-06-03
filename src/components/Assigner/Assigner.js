import React, {useEffect, useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { selectCode } from "../../features/user/userSlice";
import base, {addRanks, allRanks, assignedRanks, delRanks} from "../../api/api";

import FormControl  from "@material-ui/core/FormControl";
import FormControlLabel  from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./Assigner.module.scss"

const Assigner = () => {
    const [getRanks, setRanks] = useState([]);
    // const [getAssigned, setAssigned] = useState([]);
    const code = useSelector(selectCode);

    useEffect(() => {
        const fetchData = async () => {
            const assignedRanksResults = await axios.get(assignedRanks, { headers: { code: code } })
                .catch(() => {
                    console.log("request denied")
                });

            const allRanksResults = await axios.get(allRanks)
                .catch(() => {
                    console.log("request denied")
                });

            if (assignedRanksResults.data.status === "success" && allRanksResults.data.status === "success") {
                const assignedRanksRes = assignedRanksResults.data.data.ranks;
                const allRanksRes = allRanksResults.data.data.ranks;

                // setAssigned(assignedRanksRes);

                allRanksRes.map(item => item.assigned=false);
                assignedRanksRes.map(item => {
                    const index = allRanksRes.findIndex(rank => rank.sgid == item.sgid);
                    if (index >= 0){
                        allRanksRes[index].assigned = true;
                    }
                });

                setRanks(allRanksRes);
            }
        };
        fetchData();
    }, [code]);

    const assignGroup = event => {
        const index = getRanks.findIndex(rank => rank.sgid == event.target.value);
        let ranks = [...getRanks];
        if (event.target.checked) {
            axios.post(addRanks, null, { headers: {code: code, rank: event.target.value} })
                .catch(e => console.log(e));
            ranks[index].assigned = true;
            setRanks(ranks);
        } else {
            axios.post(delRanks, null, { headers: {code: code, rank: event.target.value} })
                .catch(e => console.log(e));
            ranks[index].assigned = false;
            setRanks(ranks);
        }
    };

    return (
        <div className={styles.assignerContainer}>
            <h2 className={styles.assignerHeader}>Assigner</h2>
            <FormControl>
                <FormLabel component="legend">Groups</FormLabel>
                <FormGroup>
                    {getRanks.map(rank => {
                        return (
                            <FormControlLabel key={rank.name}
                              control={<Checkbox onChange={assignGroup} value={rank.sgid} checked={rank.assigned}/>}
                              label={
                                  <>
                                      <img src={`${base}${rank.iconendpoint}`} width="16" alt={rank.iconid}/>
                                      {`  ${rank.name}`}
                                  </>
                              }
                            />
                        )
                    })}
                </FormGroup>
            </FormControl>
        </div>
    )
};

export default Assigner;