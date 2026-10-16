# Phase 3 — Site Content Plan

## Content status

This is a first copy draft for the site structure in the project brief. The **Terminal Editorial** visual direction is confirmed. Project ideas remain undecided, and no project names, results, testimonials, work history, education, or resume details have been invented.

Before launch, Lawand should review the role statement, skills list, and biography for accuracy and provide a resume if he wants the resume page to be live.

## Audience and purpose

- **Primary audience:** Recruiters and hiring managers considering Lawand for a junior frontend role.
- **Their task:** Understand who he is, scan what he can do, review available work, and find a direct way to contact him.
- **Primary action:** Contact Lawand by email.
- **Secondary actions:** Browse projects, read writing, and visit his professional profiles.
- **Voice:** Direct, thoughtful, professional but friendly. Be specific where facts are known; do not imply experience or shipped work that has not been provided.

## Sitemap and navigation

| Route | Page | Purpose | Content status |
| --- | --- | --- | --- |
| `/` | Home | Introduce Lawand, show current work and interests, and make contact easy. | Draft below |
| `/work` | Work index | Show published projects and their live/repository links. | Honest empty state until projects exist |
| `/work/:slug` | Case study | Explain one project's goal, decisions, implementation, and outcome. | Template only; fill in from a real project |
| `/writing` | Writing index | Share technical notes and reflections. | Honest empty state until posts exist |
| `/writing/:slug` | Article | Present one complete article with author and date. | Template only; fill in from a real post |
| `/about` | About | Give a fuller account of Lawand's interests and direction. | Draft below |
| `/resume` | Resume | Provide a readable resume and optional PDF. | Do not publish until resume content is supplied |

**Primary navigation:** Work · Writing · About · Resume  
**Wordmark:** Lawand Soran  
**Footer links:** Email · GitHub · LinkedIn · X

Keep the labels plain and predictable. Terminal-style labels may identify sections, but visitors should not need to know terminal commands to use the site.

## Home page — `/`

### 1. Hero

**Section label:** `~/intro`

**Name / H1:** Lawand Soran

**Role statement:** Junior frontend developer building accessible interfaces with React and TypeScript.

**Terminal transcript:**

```text
$ whoami
Junior frontend developer — React · TypeScript

$ cat goals.md
Seeking a junior frontend role.
Learning by building and sharing what I learn.
```

**Primary CTA:** View my work  
**Destination:** `/work`

**Secondary CTA:** Read my writing  
**Destination:** `/writing`

**Copy note:** The short role line omits “accessible interfaces” only to keep the terminal output concise; the full positioning remains visible in the hero. Do not make the typing animation the only way to access this text.

### 2. Featured work

**Section label:** `~/work`

**Heading:** Selected work

**Intro:** Projects are where I put new ideas and skills into practice.

**Empty-state heading:** Projects are in progress

**Empty-state body:** I haven't published a project yet. When I do, you'll find what it does, how I built it, and links to explore it here.

**CTA:** View all work  
**Destination:** `/work`

Do not say a specific project is being built or give a shipping date until Lawand chooses and starts a project. When projects are published, replace the empty state with real titles, descriptions, technologies, and working links.

### 3. Short about

**Section label:** `~/about`

**Heading:** Curious about how useful things get built.

**Body:** I'm a self-directed learner interested in technology, business, and turning ideas into reality. I'm developing my frontend skills, exploring AI-powered tools, and learning by building. I'm also interested in economics, startups, and how technology changes the way people work and live.

**CTA:** More about me  
**Destination:** `/about`

### 4. Skills

**Section label:** `~/skills`

**Heading:** Tools and topics

**Intro:** A working list of the technologies I'm learning and using.

**Readout draft, based on the project brief:**

```text
languages/       TypeScript · JavaScript · HTML · CSS
frameworks/      React · Vite · React Router
styling/         Tailwind CSS · shadcn/ui · Base UI
animation/       Motion for React · CSS transitions
tools/           Git · GitHub · GitHub Actions · Figma
learning/        Next.js · Testing Library · Playwright
```

**Accuracy check:** Confirm every item reflects Lawand's current experience before publishing. In particular, distinguish tools he has used from tools he is learning. Remove any item he cannot confidently discuss. Avoid presenting a tool list as proof of project experience.

### 5. Writing preview

**Section label:** `~/writing`

**Heading:** Notes from learning and building

**Empty-state body:** I haven't published any writing yet. I plan to share notes about what I'm learning in frontend development and the choices I make while building.

**CTA:** Browse writing  
**Destination:** `/writing`

Once there are published posts, show the latest two or three with their real title, publication date, and a one-sentence summary. Do not create sample article cards or dates.

### 6. Contact

**Section label:** `~/contact`

**Heading:** Get in touch

**Body:** Looking to discuss a junior frontend opportunity? Email is the best way to reach me.

**Primary CTA:** Email Lawand  
**Destination:** `mailto:lawandsoran110@gmail.com`

**Social links:** GitHub · LinkedIn · X

## Work index — `/work`

**Section label:** `~/work`

**H1:** Work

**Intro:** Projects where I put frontend ideas into practice.

**Empty-state heading:** No published projects yet

**Empty-state body:** I'm still deciding what to build. When a project is ready, this page will include a clear overview, the tools I used, and links to the live project and source code where available.

**Secondary CTA:** Visit my GitHub  
**Destination:** `https://github.com/lawand12-dev`

Keep this as a simple, useful empty state. Do not show filters until there are enough real projects for filtering to help.

### Case study template — `/work/:slug`

This is a content structure, not publishable copy. Replace every bracketed field with verified information from the finished project.

- **Breadcrumb:** Work / [Project title]
- **H1:** [Project title]
- **Summary:** [What the project does, who it is for, and the problem it addresses.]
- **Links:** Live project · Source code
- **At a glance:** Role · Status · Technologies · Dates (only if useful and accurate)
- **The problem:** [What prompted the project?]
- **The approach:** [What did Lawand decide to build and why?]
- **Implementation:** [Describe meaningful technical choices and trade-offs.]
- **What I learned:** [Specific lessons from building or testing it.]
- **Outcome:** [What works now; include measurements only when actually measured.]
- **Next:** [A real next improvement, if one is planned.]
- **Return link:** Back to work

Do not claim team responsibilities, user impact, performance improvements, or outcomes without evidence.

## Writing index — `/writing`

**Section label:** `~/writing`

**H1:** Writing

**Intro:** Notes on frontend development, learning by building, and the ideas behind the work.

**Empty-state heading:** No posts published yet

**Empty-state body:** I haven't published any posts yet. When I do, you'll find practical notes and reflections from my learning and projects here.

**Return/secondary link:** Visit my GitHub  
**Destination:** `https://github.com/lawand12-dev`

### Article template — `/writing/:slug`

Populate only from a real article.

- **Breadcrumb:** Writing / [Article title]
- **H1:** [Article title]
- **Dek:** [One-sentence summary of the article.]
- **Byline:** Lawand Soran · [Publication date]
- **Article body:** [Complete, edited article]
- **End link:** More writing

Do not display an article route until its title, date, summary, and body exist.

## About page — `/about`

**Section label:** `~/about`

**H1:** About Lawand

**Opening:** I'm a self-directed learner interested in technology, business, and the process of turning ideas into reality.

**Body:** I started exploring software development because I wanted to understand how digital products work and how to build my own. That curiosity has grown into an interest in frontend development, AI-powered tools, and the ideas that connect technology and business.

I'm developing my frontend skills and learning by building, experimenting, and understanding the systems behind the things I make. Outside of technology, I'm interested in economics, business strategy, and startups.

**Closing:** My long-term goal is to combine these interests to build useful products. For now, I'm working toward that one step at a time.

**CTA:** View my work  
**Destination:** `/work`

This draft is based on the bio supplied in the project brief, edited for clarity. Add a timeline or personal details only if Lawand provides them.

## Resume page — `/resume`

**Status:** Content not supplied yet.

Do not publish a route that promises a resume but has no resume content or file. Before enabling it, choose one:

1. Create an accessible HTML resume page and optionally link a PDF.
2. Provide a current PDF and include a short accessible page around the download.

The navigation item can remain planned until that content is ready. Do not create a fake resume or a broken download link.

## Shared footer

**Wordmark:** Lawand Soran

**Short line:** Junior frontend developer building accessible interfaces with React and TypeScript.

**Links:** Email · GitHub · LinkedIn · X

**Email address:** lawandsoran110@gmail.com

## Link destinations

- Email: `mailto:lawandsoran110@gmail.com`
- GitHub: `https://github.com/lawand12-dev`
- LinkedIn: `https://www.linkedin.com/in/lawand-soran`
- X: `https://x.com/LawandOps`

## Page titles and descriptions

These are initial metadata drafts. Add a production URL and canonical URLs when the site is deployed.

| Route | Page title | Meta description |
| --- | --- | --- |
| `/` | Lawand Soran — Junior Frontend Developer | Lawand Soran is a junior frontend developer building accessible interfaces with React and TypeScript. Explore his work and get in touch. |
| `/work` | Work — Lawand Soran | Explore frontend projects by Lawand Soran, built while learning React, TypeScript, and accessible interface development. |
| `/work/:slug` | [Project title] — Lawand Soran | [Accurate, project-specific summary. Write after the project is complete.] |
| `/writing` | Writing — Lawand Soran | Notes by Lawand Soran on frontend development, learning by building, and the ideas behind the work. |
| `/writing/:slug` | [Article title] — Lawand Soran | [Accurate, article-specific summary. Write when the post is ready.] |
| `/about` | About — Lawand Soran | Learn about Lawand Soran, a self-directed learner interested in frontend development, technology, and business. |
| `/resume` | Resume — Lawand Soran | [Write after resume content is supplied.] |

## Decisions still open

- Project ideas and names: intentionally undecided.
- Skills and proficiency: review the proposed list before publishing.
- Resume content and whether `/resume` is an HTML page, PDF page, or both.
- Writing topics and publication schedule: no posts or dates are assumed.
- Final copy approval: review this draft before implementation.
