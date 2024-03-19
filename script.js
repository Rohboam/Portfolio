function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Personal access token
const accessToken = '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'; // Replace with your actual token

// Fetch rate limit information and repositories from GitHub API with authorization
fetch('https://api.github.com/rate_limit', {
  headers: {
    Authorization: `token ${accessToken}`
  }
})
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch rate limit');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Extract and display relevant rate limit information
    const rateLimitInfo = data.resources.core;
    console.log(`Limit: ${rateLimitInfo.limit}`);
    console.log(`Remaining: ${rateLimitInfo.remaining}`);
    console.log(`Reset: ${new Date(rateLimitInfo.reset * 1000)}`);
  })
  .catch(error => console.error('Error fetching rate limit information:', error));

// Fetch repositories from GitHub API with authorization
fetch('https://api.github.com/users/Rohboam/repos', {
  headers: {
    Authorization: `token ${accessToken}`
  }
})
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Process the fetched data and display on your website
    displayProjects(data);
  })
  .catch(error => console.error('Error fetching repositories:', error));




  async function displayProjects(repositories) {
    const projectsContainer = document.querySelector('.details-container.color-container .article-container');
  
    for (const repo of repositories) {
      const projectContainer = document.createElement('div');
      projectContainer.classList.add('details-container', 'color-container');
  
      const articleContainer = document.createElement('div');
      articleContainer.classList.add('article-container');
  
      const img = document.createElement('img');
      img.src = './assets/project-1.png'; // You can replace this with a default image for projects
      img.alt = repo.name;
      img.classList.add('project-img');
  
      // articleContainer.appendChild(img);
  
      const projectTitle = document.createElement('h2');
      projectTitle.classList.add('experience-sub-title', 'project-title');
      projectTitle.textContent = repo.name;
  
      const languageContainer = document.createElement('div');
      languageContainer.classList.add('language-container');
  
      const languages = await getRepoLanguages(repo.languages_url);
      Object.keys(languages).forEach(language => {
        const languageWrapper = document.createElement('span');
  
        // Create an image element for the language icon
        const languageIcon = document.createElement('img');
        languageIcon.src = './assets/icons/' + language.toLowerCase() + '.png'; // Adjust the path based on your actual icon files
        languageIcon.alt = language;
        languageIcon.classList.add('language-icon');
        languageIcon.width = 30; // Set the width to 20 pixels
        languageIcon.height = 30; // Set the height to 20 pixels
  
        // Create a span element for the language name
        const languageName = document.createElement('span');
        languageName.textContent = language;
  
        // Append the language icon and name to the wrapper
        languageWrapper.appendChild(languageIcon);
        // languageWrapper.appendChild(languageName);
  
        // Append the wrapper to the language container
        languageContainer.appendChild(languageWrapper);
      });
  
      const btnContainer = document.createElement('div');
      btnContainer.classList.add('btn-container');
  
      const githubBtn = document.createElement('button');
      githubBtn.classList.add('btn', 'btn-color-2', 'project-btn');
      githubBtn.textContent = 'GitHub';
      githubBtn.onclick = function() {
        window.open(repo.html_url, '_blank');
      };
  
  
      btnContainer.appendChild(githubBtn);
  
      projectContainer.appendChild(articleContainer);
      projectContainer.appendChild(projectTitle);
      projectContainer.appendChild(languageContainer);
      projectContainer.appendChild(btnContainer);
  
      projectsContainer.appendChild(projectContainer);
    }
  }
  

async function getRepoLanguages(languagesUrl) {
  const accessToken = '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'; // Replace with your actual token

  const response = await fetch(languagesUrl, {
    headers: {
      Authorization: `token ${accessToken}`
    }
  });

  // Check if the response is successful
  if (!response.ok) {
    throw new Error('Failed to fetch languages');
  }

  const data = await response.json();
  // console.log(data); // Log the response data to understand its structure
  return data;
}
