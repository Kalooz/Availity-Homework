const Home = () => {
  return (
    <main className="container mt-4">
      <h1 className="text-center">
        Availity Full Stack .NET Homework Assignment
      </h1>

      <h5 className="mt-3 mx-5  text-center">
        For this assignment, I created a site to host the apps that I built out.
        I used React and Bootstrap for the frontend, and Vite and ASP.Net for
        the backend. I also launched and hosted the server locally, added
        CloudFlare protection to protect my nextwork, and setup a CI/CD pipeline
        with Jenkins for future updates.
      </h5>

      <p className="mt-5">
        A recent article that was quite interesting was about a security
        researcher from Tel Aviv that brought to light how extremely simple
        router hacking is on a massive scale. He wanted to see how far he could
        expolit the weakness of WPS authentication and weak passwords on a
        larger scale. He created a mobile command center that could be carried
        around inconspicously in a back pack and walked around Tel Aviv and
        sniffed Wi-Fi traffic. He then took the hashes from his walk and was
        able to crack about 3500 out of 5000 router passwords with mininmal
        resources in only a couple of days. The article can be found{" "}
        <a
          href="https://www.cyberark.com/resources/threat-research-blog/cracking-wifi-at-scale-with-one-simple-trick"
          target="_blank"
          rel="noreferer"
        >
          here
        </a>
      </p>

      <p className="mt-5">
        The rest of my assignments can be found by navigating through the
        header, and also on my{" "}
        <a href="https://github.com/Kalooz/Availity-Homework">GitHub</a>.
      </p>

      <p></p>
    </main>
  );
};

export default Home;
