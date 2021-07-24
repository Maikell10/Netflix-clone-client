import React, { useEffect, useState } from "react";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "../../axios";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${type ? "?type=" + type : ""}${
                        genre ? "&genre=" + genre : ""
                    }`,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZmI2MGI0MDkxOGUyM2ZkMDQ2MTMzMiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MjcxMDQzNjIsImV4cCI6MTYyNzUzNjM2Mn0.DhddYH_MUdDwOnEp_5a6EnEIzmHe7RUyBCKBt8dXINw",
                        },
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre]);

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} />
            {lists.map((list) => (
                <List list={list} />
            ))}
        </div>
    );
};

export default Home;
