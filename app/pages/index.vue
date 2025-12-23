<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      <div class="hero-illustration">
        <TeamIllustration />
      </div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">Build Teams</span>
          <span class="title-line highlight">Match Ideas</span>
          <span class="title-line">Create Magic</span>
        </h1>
        <p class="hero-subtitle">
          Teamy connects talented individuals with innovative ideas. Build dream
          teams, showcase skills, and turn visions into reality.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/signup">
            <MyButton
              variant="solid"
              color="primary"
              :no-margin="true"
            >
              Start Building →
            </MyButton>
          </NuxtLink>
          <NuxtLink to="/login">
            <MyButton
              variant="outline"
              color="secondary"
              :no-margin="true"
              >Sign In</MyButton
            >
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <p class="section-subtitle">
          From idea to execution in three simple steps
        </p>
        <div class="steps-grid">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step-card"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-illustration">
              <component :is="step.illustration" />
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Powerful Features</h2>
        <p class="section-subtitle">
          Everything you need to build and manage successful teams
        </p>
        <div class="features-grid">
          <NuxtLink
            v-for="(feature, index) in features"
            :key="feature.path"
            :to="feature.path"
            class="feature-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="feature-illustration">
              <component :is="feature.illustration" />
            </div>
            <div class="feature-content">
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
              <div class="feature-link">
                Explore <span class="arrow">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-background">
        <div class="cta-orb"></div>
      </div>
      <div class="cta-content">
        <h2 class="cta-title">Ready to Build Something Amazing?</h2>
        <p class="cta-subtitle">
          Join thousands of innovators already creating on Teamy
        </p>
        <NuxtLink to="/signup">
          <MyButton variant="solid" class="cta-button">
            Create Your Account
          </MyButton>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

// Hero illustration
const TeamIllustration = {
  template: `
    <svg viewBox="0 0 400 400" class="hero-svg">
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:var(--color-cornflower-400);stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:var(--color-cornflower-600);stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <circle cx="150" cy="150" r="50" fill="url(#heroGrad)" opacity="0.3"/>
      <circle cx="250" cy="150" r="50" fill="url(#heroGrad)" opacity="0.3"/>
      <circle cx="200" cy="100" r="40" fill="url(#heroGrad)" opacity="0.3"/>
      <path d="M100 250 Q150 220 200 250" stroke="url(#heroGrad)" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M200 250 Q250 220 300 250" stroke="url(#heroGrad)" stroke-width="10" fill="none" stroke-linecap="round"/>
      <line x1="200" y1="140" x2="200" y2="200" stroke="url(#heroGrad)" stroke-width="8" stroke-linecap="round"/>
      <circle cx="200" cy="80" r="30" fill="url(#heroGrad)"/>
      <circle cx="150" cy="150" r="35" fill="url(#heroGrad)"/>
      <circle cx="250" cy="150" r="35" fill="url(#heroGrad)"/>
      <circle cx="200" cy="80" r="20" fill="white"/>
      <circle cx="150" cy="150" r="20" fill="white"/>
      <circle cx="250" cy="150" r="20" fill="white"/>
      <circle cx="200" cy="80" r="10" fill="var(--color-cornflower-700)"/>
      <circle cx="150" cy="150" r="10" fill="var(--color-cornflower-700)"/>
      <circle cx="250" cy="150" r="10" fill="var(--color-cornflower-700)"/>
    </svg>
  `,
};

// Step illustrations
const ProfileIllustration = {
  template: `
    <svg viewBox="0 0 200 200" class="step-svg">
      <circle cx="100" cy="80" r="30" fill="var(--color-cornflower-400)" opacity="0.2"/>
      <circle cx="100" cy="80" r="20" fill="var(--color-cornflower-500)"/>
      <path d="M60 150 Q100 130 140 150" stroke="var(--color-cornflower-500)" stroke-width="8" fill="none" stroke-linecap="round"/>
      <rect x="80" y="100" width="40" height="50" rx="5" fill="var(--color-cornflower-400)"/>
    </svg>
  `,
};

const SkillsIllustration = {
  template: `
    <svg viewBox="0 0 200 200" class="step-svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="var(--color-cornflower-400)" stroke-width="4" opacity="0.3"/>
      <circle cx="100" cy="100" r="40" fill="var(--color-cornflower-500)" opacity="0.2"/>
      <path d="M100 60 L115 95 L80 95 Z" fill="var(--color-cornflower-500)"/>
      <path d="M100 140 L115 105 L80 105 Z" fill="var(--color-cornflower-400)"/>
      <circle cx="100" cy="100" r="8" fill="var(--color-cornflower-600)"/>
    </svg>
  `,
};

const TeamStepIllustration = {
  template: `
    <svg viewBox="0 0 200 200" class="step-svg">
      <circle cx="70" cy="80" r="25" fill="var(--color-cornflower-400)"/>
      <circle cx="130" cy="80" r="25" fill="var(--color-cornflower-500)"/>
      <path d="M45 140 Q70 120 95 140" stroke="var(--color-cornflower-400)" stroke-width="6" fill="none"/>
      <path d="M105 140 Q130 120 155 140" stroke="var(--color-cornflower-500)" stroke-width="6" fill="none"/>
      <line x1="100" y1="100" x2="100" y2="120" stroke="var(--color-cornflower-600)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="100" cy="60" r="20" fill="var(--color-cornflower-600)"/>
    </svg>
  `,
};

// Feature illustrations
const DashboardIllustration = {
  template: `
    <svg viewBox="0 0 120 120" class="feature-svg">
      <rect x="10" y="10" width="50" height="40" rx="4" fill="var(--color-cornflower-400)" opacity="0.3"/>
      <rect x="10" y="60" width="50" height="40" rx="4" fill="var(--color-cornflower-500)" opacity="0.3"/>
      <rect x="70" y="10" width="40" height="90" rx="4" fill="var(--color-cornflower-600)" opacity="0.3"/>
      <line x1="20" y1="30" x2="45" y2="30" stroke="var(--color-cornflower-500)" stroke-width="2"/>
      <line x1="20" y1="40" x2="40" y2="40" stroke="var(--color-cornflower-500)" stroke-width="2"/>
      <line x1="20" y1="80" x2="50" y2="80" stroke="var(--color-cornflower-600)" stroke-width="2"/>
      <line x1="20" y1="90" x2="45" y2="90" stroke="var(--color-cornflower-600)" stroke-width="2"/>
      <rect x="75" y="70" width="30" height="20" rx="2" fill="var(--color-cornflower-700)"/>
    </svg>
  `,
};

const UsersIllustration = {
  template: `
    <svg viewBox="0 0 120 120" class="feature-svg">
      <circle cx="30" cy="40" r="15" fill="var(--color-cornflower-400)"/>
      <circle cx="60" cy="40" r="15" fill="var(--color-cornflower-500)"/>
      <circle cx="90" cy="40" r="15" fill="var(--color-cornflower-600)"/>
      <path d="M15 70 Q30 60 45 70" stroke="var(--color-cornflower-400)" stroke-width="4" fill="none"/>
      <path d="M45 70 Q60 60 75 70" stroke="var(--color-cornflower-500)" stroke-width="4" fill="none"/>
      <path d="M75 70 Q90 60 105 70" stroke="var(--color-cornflower-600)" stroke-width="4" fill="none"/>
      <line x1="30" y1="40" x2="60" y2="40" stroke="var(--color-cornflower-300)" stroke-width="2" opacity="0.5"/>
      <line x1="60" y1="40" x2="90" y2="40" stroke="var(--color-cornflower-300)" stroke-width="2" opacity="0.5"/>
    </svg>
  `,
};

const ProfileFeatureIllustration = {
  template: `
    <svg viewBox="0 0 120 120" class="feature-svg">
      <circle cx="60" cy="40" r="25" fill="var(--color-cornflower-400)"/>
      <rect x="35" y="70" width="50" height="40" rx="4" fill="var(--color-cornflower-500)" opacity="0.3"/>
      <line x1="45" y1="85" x2="75" y2="85" stroke="var(--color-cornflower-600)" stroke-width="2"/>
      <line x1="45" y1="95" x2="70" y2="95" stroke="var(--color-cornflower-600)" stroke-width="2"/>
      <line x1="45" y1="105" x2="65" y2="105" stroke="var(--color-cornflower-600)" stroke-width="2"/>
    </svg>
  `,
};

const SkillsFeatureIllustration = {
  template: `
    <svg viewBox="0 0 120 120" class="feature-svg">
      <circle cx="60" cy="60" r="35" fill="none" stroke="var(--color-cornflower-400)" stroke-width="3" opacity="0.3"/>
      <path d="M60 25 L70 50 L45 50 Z" fill="var(--color-cornflower-500)"/>
      <path d="M60 95 L70 70 L45 70 Z" fill="var(--color-cornflower-500)"/>
      <path d="M25 60 L50 50 L50 70 Z" fill="var(--color-cornflower-400)"/>
      <path d="M95 60 L70 50 L70 70 Z" fill="var(--color-cornflower-400)"/>
      <circle cx="60" cy="60" r="8" fill="var(--color-cornflower-600)"/>
    </svg>
  `,
};

const MatchingIllustration = {
  template: `
    <svg viewBox="0 0 300 300" class="matching-svg">
      <defs>
        <linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:var(--color-cornflower-400);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--color-cornflower-600);stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="150" r="40" fill="var(--color-cornflower-400)" opacity="0.3"/>
      <circle cx="200" cy="150" r="40" fill="var(--color-cornflower-500)" opacity="0.3"/>
      <path d="M140 150 Q150 130 160 150" stroke="url(#matchGrad)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M140 150 Q150 170 160 150" stroke="url(#matchGrad)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="150" r="25" fill="var(--color-cornflower-500)"/>
      <circle cx="200" cy="150" r="25" fill="var(--color-cornflower-600)"/>
      <circle cx="100" cy="150" r="15" fill="white"/>
      <circle cx="200" cy="150" r="15" fill="white"/>
      <circle cx="100" cy="150" r="8" fill="var(--color-cornflower-600)"/>
      <circle cx="200" cy="150" r="8" fill="var(--color-cornflower-700)"/>
    </svg>
  `,
};

const steps = [
  {
    title: "Create Your Profile",
    description:
      "Set up your profile, showcase your skills, and let others know what you bring to the table.",
    illustration: ProfileIllustration,
  },
  {
    title: "Assess Your Skills",
    description:
      "Rate your technical abilities and expertise. Help teams find the perfect match for their projects.",
    illustration: SkillsIllustration,
  },
  {
    title: "Build Your Team",
    description:
      "Connect with team leaders or find talented individuals. Match ideas with the right people.",
    illustration: TeamStepIllustration,
  },
];

const features = [
  {
    path: "/dashboard",
    title: "Smart Dashboard",
    description:
      "Track team progress, view metrics, and manage all your projects from one place.",
    illustration: DashboardIllustration,
  },
  {
    path: "/users",
    title: "Discover Talent",
    description:
      "Browse team members, filter by skills, and find the perfect collaborators for your ideas.",
    illustration: UsersIllustration,
  },
  {
    path: "/profile",
    title: "Rich Profiles",
    description:
      "Create detailed profiles showcasing your experience, skills, and what makes you unique.",
    illustration: ProfileFeatureIllustration,
  },
  {
    path: "/onboarding/tech-skills",
    title: "Skills Assessment",
    description:
      "Rate and display your technical capabilities. Let your expertise speak for itself.",
    illustration: SkillsFeatureIllustration,
  },
];

onMounted(() => {
  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".feature-card, .step-card").forEach((card) => {
    observer.observe(card);
  });
});
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: #fafbfc;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(
    135deg,
    var(--color-cornflower-400),
    var(--color-cornflower-600)
  );
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(
    135deg,
    var(--color-cornflower-500),
    var(--color-cornflower-700)
  );
  bottom: -150px;
  right: -150px;
  animation-delay: 5s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(
    135deg,
    var(--color-cornflower-300),
    var(--color-cornflower-500)
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

.hero-illustration {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  opacity: 0.15;
  z-index: 1;
  animation: floatIllustration 15s ease-in-out infinite;
}

.hero-svg {
  width: 100%;
  height: 100%;
}

.hero-content {
  max-width: 900px;
  text-align: center;
  position: relative;
  z-index: 2;
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--color-cornflower-900);
}

.title-line {
  display: block;
  animation: slideInLeft 0.8s ease-out;
}

.title-line.highlight {
  background: linear-gradient(
    135deg,
    var(--color-cornflower-500),
    var(--color-cornflower-700)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-line:last-child {
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: var(--color-cornflower-600);
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
  animation: fadeInUp 1s ease-out 0.6s both;
}

/* .hero-btn {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(90, 134, 182, 0.2);
} */

.hero-stats {
  display: flex;
  gap: 4rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 1s ease-out 0.8s both;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-cornflower-600);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-cornflower-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  animation: bounce 2s infinite;
}

.scroll-arrow {
  width: 24px;
  height: 24px;
  border-right: 2px solid var(--color-cornflower-600);
  border-bottom: 2px solid var(--color-cornflower-600);
  transform: rotate(45deg);
}

/* How It Works Section */
.how-it-works {
  padding: 8rem 2rem;
  position: relative;
  background: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  text-align: center;
  color: var(--color-cornflower-900);
  margin-bottom: 1rem;
  animation: fadeInUp 0.8s ease-out;
}

.section-subtitle {
  font-size: 1.25rem;
  text-align: center;
  color: var(--color-cornflower-600);
  margin-bottom: 4rem;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
}

.step-card {
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  border: 2px solid var(--color-cornflower-100);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  overflow: hidden;
}

.step-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-cornflower-400),
    var(--color-cornflower-600)
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.step-card.visible {
  opacity: 1;
  transform: translateY(0);
  animation: slideInUp 0.6s ease-out forwards;
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(90, 134, 182, 0.15);
  border-color: var(--color-cornflower-300);
}

.step-card:hover::before {
  transform: scaleX(1);
}

.step-number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-cornflower-400),
    var(--color-cornflower-600)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
}

.step-illustration {
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
}

.step-svg {
  width: 100%;
  height: 100%;
  animation: floatIllustration 8s ease-in-out infinite;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-cornflower-900);
  margin-bottom: 1rem;
}

.step-description {
  color: var(--color-cornflower-600);
  line-height: 1.6;
  font-size: 1rem;
}

/* Features Section */
.features {
  padding: 8rem 2rem;
  position: relative;
  background: #fafbfc;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid rgba(90, 134, 182, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-cornflower-400),
    var(--color-cornflower-600)
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
  animation: slideInUp 0.6s ease-out forwards;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(90, 134, 182, 0.15);
  border-color: var(--color-cornflower-300);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-illustration {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    var(--color-cornflower-50),
    var(--color-cornflower-100)
  );
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

.feature-card:hover .feature-illustration {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(
    135deg,
    var(--color-cornflower-100),
    var(--color-cornflower-200)
  );
}

.feature-svg {
  width: 80px;
  height: 80px;
}

.feature-content {
  text-align: center;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-cornflower-900);
  margin-bottom: 0.75rem;
}

.feature-description {
  color: var(--color-cornflower-600);
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.feature-link {
  color: var(--color-cornflower-600);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.feature-card:hover .feature-link {
  color: var(--color-cornflower-700);
  transform: translateX(5px);
}

.feature-card:hover .arrow {
  transform: translateX(5px);
}

/* Matching Section */
.matching {
  padding: 8rem 2rem;
  background: white;
}

.matching-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin: 0 auto;
}

.matching-text {
  animation: fadeInLeft 0.8s ease-out;
}

.matching-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--color-cornflower-900);
  margin-bottom: 1.5rem;
}

.matching-description {
  font-size: 1.125rem;
  color: var(--color-cornflower-600);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.matching-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.matching-features li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: var(--color-cornflower-700);
}

.check-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-cornflower-500);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.matching-button {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
}

.matching-illustration {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInRight 0.8s ease-out;
}

.matching-svg {
  width: 100%;
  height: 100%;
  animation: pulse 3s ease-in-out infinite;
}

/* CTA Section */
.cta {
  padding: 8rem 2rem;
  background: linear-gradient(
    135deg,
    var(--color-cornflower-600),
    var(--color-cornflower-800)
  );
  position: relative;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.cta-orb {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(100px);
  top: -300px;
  right: -300px;
  animation: float 20s ease-in-out infinite;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease-out;
}

.cta-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
}

.cta-button {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes floatIllustration {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(10px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-illustration {
    display: none;
  }

  .matching-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .matching-illustration {
    order: -1;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 90vh;
    padding: 1.5rem;
  }

  .how-it-works,
  .features,
  .matching {
    padding: 4rem 1.5rem;
  }

  .steps-grid,
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .cta {
    padding: 4rem 1.5rem;
  }

  .scroll-indicator {
    display: none;
  }

  .hero-stats {
    gap: 2rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }


  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
