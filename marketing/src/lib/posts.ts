/** Example blog posts for the design. Replace with real articles before launch. */
export type Post = { slug: string; img: string; tag: string; t: string; d: string; m: string; date: string; body: { h: string; p: string[] }[] };

export const POSTS: Post[] = [
  {
    slug: "write-a-hiring-brief", img: "/images/forest.jpg", tag: "Sourcing", m: "6 min read", date: "12 Nov 2026",
    t: "How to write a hiring brief an AI can actually use",
    d: "Five things to put in every brief so your shortlist starts strong.",
    body: [
      { h: "Start with the outcome, not the title", p: ["Job titles mean different things at different companies. Say what this person will own in their first six months, and the shortlist gets sharper straight away."] },
      { h: "Separate must-haves from nice-to-haves", p: ["List the two or three things you won't compromise on, then everything else. Lasso turns these into criteria you can switch on and off, so being honest here saves you hours later."] },
      { h: "Name the context", p: ["Company stage, team size, location and the tools you use all help. \"Senior designer at a 40-person B2B startup, strong in Figma, US time zones\" beats \"great designer\" every time."] },
    ],
  },
  {
    slug: "follow-up-sequence", img: "/images/hills.jpg", tag: "Outreach", m: "5 min read", date: "5 Nov 2026",
    t: "The follow-up sequence that tripled our reply rate",
    d: "Timing, tone and the one line that gets candidates to answer.",
    body: [
      { h: "Most replies come from the follow-up", p: ["Busy people miss first emails. A short, friendly follow-up three or four days later often gets the reply the first message didn't."] },
      { h: "Keep each step shorter than the last", p: ["Your first email can explain the role. The follow-up should be two lines: a reminder of why them, and an easy question to answer."] },
      { h: "Stop the moment they reply", p: ["Nothing feels worse to a candidate than an automated nudge after they've already answered. Sequences in Lasso stop automatically when someone replies."] },
    ],
  },
  {
    slug: "first-designer-without-an-agency", img: "/images/meadow.jpg", tag: "Hiring", m: "8 min read", date: "29 Oct 2026",
    t: "Hiring your first designer without an agency",
    d: "A step-by-step plan for founders running their own search.",
    body: [
      { h: "Decide what kind of designer you need", p: ["Your first designer will do a bit of everything. Look for someone who has shipped real product work end to end, not only polished portfolio pieces."] },
      { h: "Run a focused search", p: ["Write the brief, review a scored shortlist and save ten to fifteen strong people. Quality matters more than volume at this stage."] },
      { h: "Reach out as the founder", p: ["Candidates respond to the person they'd work with. A short, specific note from you will always beat a recruiter template."] },
    ],
  },
  {
    slug: "read-a-match-score", img: "/images/valley.jpg", tag: "Sourcing", m: "4 min read", date: "22 Oct 2026",
    t: "How to read a match score",
    d: "What the number means, and when to look past it.",
    body: [
      { h: "A score is a summary, not a verdict", p: ["The match score shows how many of your criteria someone meets, weighted by importance. It's a fast way to sort, not a replacement for reading the profile."] },
      { h: "Check the criteria, not just the number", p: ["Two people can both score 85 for very different reasons. Open the criteria checks to see exactly what each person meets."] },
      { h: "Adjust and re-sort", p: ["If the top of the list feels off, change a criterion's weight or switch it off. The results update without running a new search."] },
    ],
  },
  {
    slug: "share-shortlists-with-clients", img: "/images/lake.jpg", tag: "Agencies", m: "5 min read", date: "15 Oct 2026",
    t: "Shortlists clients actually open",
    d: "How agencies can send fewer attachments and get faster feedback.",
    body: [
      { h: "Send a link, not a spreadsheet", p: ["A shared link keeps everything in one place and always shows the latest version, with no attachments to dig out of an inbox."] },
      { h: "Show why each person is there", p: ["Clients decide faster when they can see the match details next to each candidate, instead of guessing from a CV."] },
      { h: "Know when they've looked", p: ["Seeing that a client has viewed the shortlist tells you the right moment to follow up."] },
    ],
  },
  {
    slug: "build-a-reusable-talent-pool", img: "/images/hero.jpg", tag: "Hiring", m: "6 min read", date: "8 Oct 2026",
    t: "Build a talent pool you can reuse",
    d: "Turn every past search into a head start on the next one.",
    body: [
      { h: "Every shortlist is an asset", p: ["The strong people you didn't hire this time may be perfect next quarter. Keep them in a collection instead of starting from zero."] },
      { h: "Leave notes for future you", p: ["A one-line note on why someone stood out makes a past collection useful months later, for you and your teammates."] },
      { h: "Search your own pool first", p: ["When a similar role opens, start with the people you already know. Lasso can search your collections as well as new profiles."] },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
