import React, { useEffect, useState } from 'react';
import 'boxicons/css/boxicons.min.css';

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
          setRepos(data.filter(repo => !repo.fork));
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='repo-container'>
      {repos.map((repo) => (
        <div key={repo.id} className="introduce flex items-center gap-2 ">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>
              <i className='bx bxl-github' ></i>
            </span>
            <div className="location">
              <h3>{repo.name}</h3>
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
          <a href={repo.html_url}>View on GitHub</a>
        </div>
      ))}
    </div>
  );
};

export default Projects;
