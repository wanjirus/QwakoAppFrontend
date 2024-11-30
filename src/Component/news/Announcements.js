import React, { useState } from "react";
import NewsList from "../news/admin";
// import AdminPanel from "../news/data";
import newsData from "../news/data";
import { Announcement } from "@material-ui/icons";

function Announcements() {
  const [news, setNews] = useState(newsData);

  const handleAddNews = (newNews) => {
    newNews.id = news.length + 1;
    setNews([...news, newNews]);
  };

  const handleDeleteNews = (id) => {
    const updatedNews = news.filter((item) => item.id !== id);
    setNews(updatedNews);
  };

  return (
    <div className="Announcement">
      <h1>Announcement Page</h1>
      {/* <AdminPanel onAdd={handleAddNews} /> */}
      <NewsList news={news} onDelete={handleDeleteNews} />
    </div>
  );
}

export default Announcements;
