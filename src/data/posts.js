export const posts = [
  {
    slug: "what-is-the-unconscious-mind",
    title: "What Is the Unconscious Mind?",
    category: "Mind & Motivation",
    date: "May 19, 2026",
    readingTime: "5 min read",
    excerpt: "A simple explanation of the unconscious mind and how hidden patterns can shape everyday habits, emotions, and choices.",
    productSlugs: ["Book on the Unconscious Mind", "Guided Habit Journal"],
    sections: [
      { heading: "The quiet layer beneath awareness", body: "The unconscious mind is the part of mental life that operates outside direct awareness. It includes learned associations, emotional patterns, memories, instincts, and automatic responses. You may not notice it directly, but it can influence what feels comfortable, threatening, attractive, or difficult." },
      { heading: "Why it matters for health", body: "Many health choices are not made through logic alone. Stress eating, avoiding exercise, procrastinating sleep, or repeating old routines can be connected to automatic patterns. Understanding those patterns helps you create an environment where healthier choices become easier." },
      { heading: "How to work with it", body: "Start by observing repeated behaviors without judging yourself. Journaling, mindful breathing, therapy, and consistent routines can help bring hidden patterns into awareness. The goal is not to control every thought, but to become more conscious of what drives your choices." },
    ],
  },
  {
    slug: "how-your-mind-influences-physical-health",
    title: "How Your Mind Influences Your Physical Health",
    category: "Mind-Body Connection",
    date: "May 19, 2026",
    readingTime: "4 min read",
    excerpt: "Your thoughts do not magically control your body, but mindset, stress, and habits can strongly shape physical wellbeing over time.",
    productSlugs: ["Comfort Sleep Mask", "Guided Habit Journal"],
    sections: [
      { heading: "Mind and body are connected", body: "Your mental state can affect your breathing, posture, appetite, sleep quality, energy, and motivation. This does not mean positive thinking cures illness. It means your daily mental patterns can support or weaken the routines that protect your health." },
      { heading: "Stress changes behavior", body: "When stress is high, people often sleep less, move less, eat differently, and become more reactive. Reducing stress through simple practices can create more space for better decisions." },
      { heading: "Build supportive cues", body: "A calmer environment, regular sleep schedule, visible workout gear, and short planning rituals can all help your mind and body cooperate. Small cues repeated daily often matter more than one burst of motivation." },
    ],
  },
  {
    slug: "small-daily-habits-stronger-body",
    title: "Small Daily Habits That Build a Stronger Body",
    category: "Physical Health",
    date: "May 19, 2026",
    readingTime: "4 min read",
    excerpt: "A stronger body usually comes from repeatable basics: movement, recovery, hydration, food quality, and consistency.",
    productSlugs: ["Resistance Bands Set", "Reusable Water Bottle"],
    sections: [
      { heading: "Start smaller than your ego wants", body: "The best routine is one you can repeat. Five minutes of movement today is more useful than a perfect plan you avoid. Small wins teach your nervous system that action is safe and possible." },
      { heading: "Use simple anchors", body: "Attach new habits to existing routines. Stretch after brushing your teeth. Drink water after waking. Walk after lunch. Anchors reduce the amount of motivation required." },
      { heading: "Respect recovery", body: "Strength grows when effort and recovery work together. Sleep, rest days, and calm evenings are not laziness; they are part of the system that makes progress sustainable." },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}
