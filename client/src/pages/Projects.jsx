import React, { useEffect, useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import HashLoader from 'react-spinners/HashLoader.js';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'mkhue720';

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
        const sortedRepos = data.filter(repo => !repo.fork).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRepos(sortedRepos);
        } else {
          setError('Failed to fetch data from GitHub');
        }
      })
      .catch(err => {
        setError('An error occurred while fetching data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center align-middle h-[100vh]">
        <HashLoader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <HelmetProvider>
    <Helmet>
      <title>Projects | NMK</title>
    </Helmet>
    </HelmetProvider>
    <div className='repo-container'>
      {repos.map((repo) => (
        <div key={repo.id} className="introduce flex items-center gap-2 ">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>
              <i className='bx bxl-github' ></i>
            </span>
            <div className="location">
              <a href={repo.html_url}>
                <h3>{repo.name}</h3>
              </a>
            </div>
          </div>
          <h3>{repo.description}</h3>
          <p>
            <span>
              <i className='bx bx-star' style={{color:'#ffb900'}}  ></i>
            </span>
            Stars: {repo.stargazers_count}</p>
          <p>
            <i className='bx bx-git-repo-forked'></i>
            Forks: {repo.forks_count}</p>
          <p>Language: {repo.language}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default Projects;
