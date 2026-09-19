import { useState } from 'react'
import './App.css'
import domains from './data/domains'

function App() {
  const [page, setPage] = useState('login')
  const [previousPage, setPreviousPage] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedInterest, setSelectedInterest] = useState('')
  const [suggestedDomain, setSuggestedDomain] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState('')

  const domainInfo = domains.find(
    (domain) => domain.name === selectedDomain
  )

  const suggestedDomainInfo = domains.find(
    (domain) => domain.name === suggestedDomain
  )

  const goToPage = (newPage) => {
    setPreviousPage(page)
    setPage(newPage)
  }

  const goHome = () => {
    setPage('landing')
    setPreviousPage('')
  }

  const goBack = () => {
    if (previousPage) {
      setPage(previousPage)
      setPreviousPage('')
    } else {
      setPage('landing')
    }
  }

  const selectDomain = (domainName) => {
    setSelectedDomain(domainName)
    setSelectedSkills([])
    goToPage('overview')
  }

  const selectSkill = (skill) => {
    if (selectedSkills.includes('None of the above')) {
      return
    }

    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([
        ...selectedSkills,
        skill
      ])
    }
  }

  const selectNone = () => {
    setSelectedSkills(['None of the above'])
  }

  const selectInterest = (interest) => {
    setSelectedInterest(interest)

    if (interest === 'Building & Creating') {
      setSuggestedDomain('Web Development')
    }

    if (interest === 'Working with Data') {
      setSuggestedDomain('Data Science')
    }

    if (interest === 'Security & Problem Solving') {
      setSuggestedDomain('Cybersecurity')
    }

    if (interest === 'Designing Experiences') {
      setSuggestedDomain('UI/UX Design')
    }
  }

  const chooseSuggestedDomain = () => {
    if (!suggestedDomain) {
      return
    }

    setSelectedDomain(suggestedDomain)
    setSelectedSkills([])
    goToPage('overview')
  }

  const handleLogin = () => {
    if (!email || !password) {
      setLoginMessage(
        'Please enter your email and password.'
      )
      return
    }

    setLoginMessage('')
    goToPage('landing')
  }

  return (
    <div className="app">

      {page !== 'login' && (
        <nav className="topbar">

          <div
            className="logo"
            onClick={goHome}
          >
            AAROHA
          </div>

          <div className="nav-actions">

            {page !== 'landing' && (
              <button
                className="nav-button"
                onClick={goBack}
              >
                ← Back
              </button>
            )}

            <button
              className="nav-button home"
              onClick={goHome}
            >
              Home
            </button>

          </div>

        </nav>
      )}

      {/* LOGIN PAGE */}

      {page === 'login' && (
        <section className="login">

          <div className="login-box">

            <div className="login-logo">
              AAROHA
            </div>

            <div className="login-tagline">
              Learn • Grow • Become
            </div>

            <p>
              Your personalized learning journey starts here.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
              Login →
            </button>

            {loginMessage && (
              <p className="login-message">
                {loginMessage}
              </p>
            )}

          </div>

        </section>
      )}

      {/* LANDING PAGE */}

      {page === 'landing' && (
        <section className="landing">

          <div className="landing-content">

            <h1>AAROHA</h1>

            <h2>
              Your Personalized Learning Journey
            </h2>

            <p>
              Discover what you want to become,
              understand your skills, and build a
              personalized path forward.
            </p>

            <button
              onClick={() => goToPage('profile')}
            >
              Start Your Journey →
            </button>

          </div>

        </section>
      )}

      {/* PROFILE PAGE */}

      {page === 'profile' && (
        <section className="profile">

          <h1>
            Do you know what you want to become?
          </h1>

          <p>
            Tell us what you already have in mind
            so we can personalize your learning journey.
          </p>

          <div className="profile-buttons">

            <button
              onClick={() => goToPage('domains')}
            >
              Yes, I know
            </button>

            <button
              onClick={() => goToPage('interests')}
            >
              No, help me explore
            </button>

          </div>

        </section>
      )}

      {/* DOMAIN SELECTION FOR USERS WHO KNOW */}

      {page === 'domains' && (
        <section className="domains">

          <h1>
            Choose Your Domain
          </h1>

          <p>
            Select the area you want to explore
            and build your skills in.
          </p>

          <div className="domain-list">

            {domains.map((domain) => (
              <button
                key={domain.name}
                onClick={() => selectDomain(domain.name)}
              >

                <h2>
                  {domain.name}
                </h2>

                <span>
                  {domain.description}
                </span>

              </button>
            ))}

          </div>

        </section>
      )}

      {/* INTEREST EXPLORATION */}

      {page === 'interests' && (
        <section className="domains">

          <h1>
            Discover Your Interests
          </h1>

          <p>
            Tell us what kind of work interests you.
            We'll suggest a suitable domain to explore.
          </p>

          <div className="domain-list">

            <button
              onClick={() =>
                selectInterest('Building & Creating')
              }
            >

              <h2>
                💻 Building & Creating
              </h2>

              <span>
                I enjoy creating websites,
                applications and digital products.
              </span>

            </button>

            <button
              onClick={() =>
                selectInterest('Working with Data')
              }
            >

              <h2>
                📊 Working with Data
              </h2>

              <span>
                I like numbers, patterns,
                analysis and finding insights.
              </span>

            </button>

            <button
              onClick={() =>
                selectInterest('Security & Problem Solving')
              }
            >

              <h2>
                🔐 Security & Problem Solving
              </h2>

              <span>
                I am interested in protecting
                systems and solving security problems.
              </span>

            </button>

            <button
              onClick={() =>
                selectInterest('Designing Experiences')
              }
            >

              <h2>
                🎨 Designing Experiences
              </h2>

              <span>
                I enjoy creativity, visual design
                and making things easy to use.
              </span>

            </button>

          </div>

          {selectedInterest && suggestedDomainInfo && (
            <div className="overview-section">

              <h2>
                Suggested Domain
              </h2>

              <p>
                Based on your interest in{' '}
                <strong>
                  {selectedInterest}
                </strong>
                , you may want to explore:
              </p>

              <h2>
                {suggestedDomainInfo.name}
              </h2>

              <p>
                {suggestedDomainInfo.description}
              </p>

              <button
                onClick={chooseSuggestedDomain}
              >
                Explore This Domain →
              </button>

            </div>
          )}

        </section>
      )}

      {/* DOMAIN OVERVIEW */}

      {page === 'overview' && domainInfo && (
        <section className="overview">

          <h1>
            {domainInfo.name}
          </h1>

          <p>
            {domainInfo.description}
          </p>

          <div className="overview-section">

            <h2>
              Career Opportunities
            </h2>

            <ul>

              {domainInfo.opportunities.map(
                (opportunity) => (
                  <li key={opportunity}>
                    {opportunity}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="overview-section">

            <h2>
              Required Skills
            </h2>

            <ul>

              {domainInfo.skills.map(
                (skill) => (
                  <li key={skill}>
                    {skill}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="overview-section">

            <h2>
              Career Path
            </h2>

            <ol>

              {domainInfo.careerPath.map(
                (step) => (
                  <li key={step}>
                    {step}
                  </li>
                )
              )}

            </ol>

          </div>

          <button
            onClick={() => goToPage('skills')}
          >
            Choose This Domain →
          </button>

        </section>
      )}

      {/* SKILLS PAGE */}

      {page === 'skills' && domainInfo && (
        <section className="skills">

          <h1>
            What skills do you already know?
          </h1>

          <p>
            Select the skills you are familiar with
            in {domainInfo.name}.
          </p>

          <div className="skill-list">

            {domainInfo.skills.map((skill) => (
              <button
                key={skill}
                className={
                  selectedSkills.includes(skill)
                    ? 'selected-skill'
                    : ''
                }
                onClick={() => selectSkill(skill)}
              >
                {skill}
              </button>
            ))}

            <button
              className={
                selectedSkills.includes(
                  'None of the above'
                )
                  ? 'selected-skill'
                  : ''
              }
              onClick={selectNone}
            >
              None of the above
            </button>

          </div>

          <p>
            Selected skills:{' '}

            {selectedSkills.length > 0
              ? selectedSkills.join(', ')
              : 'None selected'}
          </p>

          <button
            onClick={() => goToPage('assessment')}
          >
            Continue →
          </button>

        </section>
      )}

      {/* ASSESSMENT PLACEHOLDER */}

      {page === 'assessment' && domainInfo && (
        <section className="skills">

          <h1>
            {domainInfo.name} Assessment
          </h1>

          <p>
            Your personalized assessment will
            appear here.
          </p>

          <p>
            Selected skills:{' '}

            {selectedSkills.length > 0
              ? selectedSkills.join(', ')
              : 'None selected'}
          </p>

          <p>
            Assessment module coming soon 🚀
          </p>

        </section>
      )}

    </div>
  )
}

export default App