import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

const category = ["business", "entertainment", "general", "health", "science", "sports", "technology"];


const Newsapp = () => {

    const [articles, setArticles] = useState([]);
    const [totalarticles, setTotalArticles] = useState(0);
    const [currentPage, setCurrentPage] = useState(undefined);
    const [selectCategory, setSelectCategory] = useState("business")

    const loadNews = (pageNo = 1) => {
        axios({
            method: "GET",
            url: "https://newsapi.org/v2/top-headlines",
            params: {
                country: "in",
                apiKey: "2894d2d668014ab88d3ad9a5a70bffe2",
                page: pageNo,
                category: selectCategory,
            }
        }).then((res) => {
            setArticles([...articles, ...res.data.articles]);
            setTotalArticles(res.data.totalResults);
            setCurrentPage(pageNo);

        })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => { loadNews() }, [])
    useEffect(() => { loadNews() }, [selectCategory])



    return (
        <div>
            <h2>News Application</h2>
            <div>
                {
                    category.map((category) => {
                        return (
                            <button className="btn btn-dark" style={{ margin: 50, }}
                                onClick={() => {
                                    setArticles([]);
                                    setSelectCategory(category);
                                }}>{category}</button>
                        )
                    })
                }
            </div>
            <div >

                <InfiniteScroll style={{ display: "flex", flexWrap: "wrap", margin: 30, overflow: "hidden", }}
                    dataLength={articles} //This is important field to render the next data
                    next={() => {
                        loadNews(currentPage + 1)
                    }}
                    hasMore={true}//totalarticles != articles.length
                >
                    {
                        articles.map((article, index) => {
                            return (
                                <div style={{ padding: 20 }}>
                                    <div className="card" style={{ width: 200, height: 500, padding: 10, overflow: "hidden", margin: 10, marginLeft: 20 }}>
                                        <img className="card-img-top" src={article.urlToImage} alt="Card image cap" style={{ width: "100%", height: 150 }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{article.title}</h5>
                                            <p className="card-text">{article.content}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Newsapp;