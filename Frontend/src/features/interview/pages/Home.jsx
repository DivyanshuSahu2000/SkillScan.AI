import React from "react";
// import "../style/home.scss";

import "../style/home.scss";

const Home = () => {
  return (
    <div className="home-page">
      {" "}
      <header className="page-header">
        <h1>
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>
        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>
      <main>
        <div className="left">
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter Your Job Description Here..."
          ></textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <label htmlFor="resume">Upload Resume</label>
            <input type="file" name="resume" id="resume" accept=".pdf" />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription"></label>
            <textarea
              id="selfDescription"
              name="selfDescription"
              placeholder="Enter Your Self Description Here..."
            ></textarea>
            <button>Generate Iterview Report</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
