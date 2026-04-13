# Resume-Tailored Interview Preparation System (SDE II / Senior, 4 YOE)

## 1) Skill, Project, and Technology Extraction

### Profile Summary Extracted
- 4+ years in full-stack web development with React + TypeScript + Node.js.
- Built scalable, accessible, performance-focused products in product and consulting environments.
- Strong focus areas: real-time systems, frontend architecture, migration/modernization, API integrations, and engineering quality practices.

### Skills Extracted from Resume
- **Languages:** JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL, LiquidJS.
- **Frontend:** React.js, Next.js, React Native, Redux Toolkit, Redux Saga, Zustand, Tailwind CSS, Material UI, Chart.js, Storybook.
- **Backend & APIs:** Node.js, Express.js, REST APIs, GraphQL, JWT, WebSockets, Socket.io, Server-Sent Events, Webhooks.
- **Databases:** MySQL, MongoDB.
- **Dev Tools:** Docker, CI/CD, GitHub Actions, Webpack, Babel, Vite, Git, Figma.
- **Practices:** WCAG accessibility, performance optimization, scalability, security best practices, responsive design, Agile/Scrum, code reviews.
- **AI/Development:** Claude, prompt engineering, AI-assisted workflows.

### Experience & Impact Highlights
- Improved engagement (+20%), load time (-30%), and Lighthouse (48→91).
- Built/maintained real-time global alerting systems using WebSockets.
- Migrated Angular modules to React, improving maintainability and performance.
- Built reusable Storybook-based UI systems, reducing dev time by ~30%.
- Integrated REST + GraphQL for efficient data handling.
- Mentored juniors, established standards/docs, and conducted 30+ interviews.

### Projects Extracted
1. **Inroute Platform – Vehicle Health Dashboard**
   - Real-time parameters, predictive alerts, maps, tracking, historical charts.
   - Stack: React, TypeScript, Storybook, Material UI.
2. **V-Guard E-commerce Platform Revamp**
   - Frontend revamp, performance/accessibility improvements.
   - Stack: HTML5, CSS3, JavaScript, Shopify.
3. **Code Management Internal Dashboard**
   - FOTA release tracking for large fleet scale.
   - Migration Angular→React.
   - Stack: React.js, Redux Toolkit, Redux Saga, Material UI.

---

## 2) Structured Question Bank (Topic-wise)

> Format per question:
> - **Question**
> - **Difficulty:** Easy / Medium / Hard / Senior-Level
> - **Interview-ready answer (bullet points only)**
> - **Follow-up(s)**

---

## A) JavaScript (Basic → Advanced)

### Beginner

1) **What is the difference between `var`, `let`, and `const`?**
- **Difficulty:** Easy
- **Answer:**
  - `var`: function-scoped, hoisted with `undefined`, can redeclare.
  - `let`: block-scoped, hoisted but in TDZ, can reassign, cannot redeclare same scope.
  - `const`: block-scoped, must initialize, no reassignment (object mutation still possible).
- **Follow-up:** TDZ example? Why prefer `const` by default?

2) **Explain `==` vs `===`.**
- **Difficulty:** Easy
- **Answer:**
  - `==` does type coercion before comparison.
  - `===` compares type + value strictly.
  - In production code, prefer `===` to avoid coercion bugs.
- **Follow-up:** Give one coercion edge case.

### Intermediate

3) **How does the JavaScript event loop work?**
- **Difficulty:** Medium
- **Answer:**
  - Call stack executes synchronous code.
  - Async callbacks move to task queues.
  - Microtasks (Promises) run before macrotasks (`setTimeout`).
  - UI responsiveness depends on not blocking main thread.
- **Follow-up:** Why can `Promise.then` run before `setTimeout(..., 0)`?

4) **What are closures and practical use cases?**
- **Difficulty:** Medium
- **Answer:**
  - Function retains lexical scope even after outer function returns.
  - Use cases: data privacy, memoization, factory functions, once/debounce/throttle.
  - Can cause memory retention if large objects are closed over unnecessarily.
- **Follow-up:** Closure-related memory leak scenario?

### Advanced

5) **Explain prototypal inheritance and `this` binding nuances.**
- **Difficulty:** Hard
- **Answer:**
  - Objects inherit via prototype chain (`[[Prototype]]`).
  - Method lookup traverses chain until found or `null`.
  - `this` depends on call-site: implicit, explicit (`call/apply/bind`), `new`, arrow lexical binding.
- **Follow-up:** How does `bind` differ from arrow functions?

6) **What is currying and when would you use it?**
- **Difficulty:** Hard
- **Answer:**
  - Transform function `f(a,b,c)` into `f(a)(b)(c)`.
  - Improves composability and partial application.
  - Useful in functional patterns and reusable configuration.
- **Follow-up:** Currying in React utility patterns?

### Senior-Level

7) **How would you optimize JS execution in a large React product?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Profile first (Performance tab + real-user metrics).
  - Split bundles by route/component and defer non-critical JS.
  - Avoid heavy work on main thread (Web Workers).
  - Use memoization selectively; remove accidental re-renders.
  - Reduce polyfill footprint based on browser targets.
- **Follow-up:** What trade-offs exist with aggressive code splitting?

8) **How do you design error handling for async JS in production?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Standardize error taxonomy (network, auth, validation, server).
  - Centralize logging/observability with correlation IDs.
  - Implement retries with backoff only for idempotent operations.
  - Show user-safe fallback states; prevent infinite error loops.
- **Follow-up:** Which errors should never be retried?

---

## B) React (Core → Advanced Patterns)

### Beginner

1) **Difference between state and props?**
- **Difficulty:** Easy
- **Answer:**
  - Props: read-only inputs from parent.
  - State: internal mutable component data.
  - Changes in either can trigger re-render.
- **Follow-up:** When to lift state up?

2) **What are controlled vs uncontrolled components?**
- **Difficulty:** Easy
- **Answer:**
  - Controlled: form value managed by React state.
  - Uncontrolled: DOM manages value via refs.
  - Controlled is preferred for validation and dynamic UI behavior.
- **Follow-up:** Performance concerns for large forms?

### Intermediate

3) **How do hooks lifecycle patterns map from class lifecycle?**
- **Difficulty:** Medium
- **Answer:**
  - `useEffect` covers mount/update/unmount by dependency array + cleanup.
  - Split effects by concern, avoid monolithic lifecycle logic.
  - Use `useLayoutEffect` only for layout read/write sync requirements.
- **Follow-up:** Common anti-patterns in `useEffect`?

4) **How do you prevent unnecessary re-renders?**
- **Difficulty:** Medium
- **Answer:**
  - `React.memo`, `useMemo`, `useCallback` where measured beneficial.
  - Keep state local and normalized; avoid prop churn.
  - Use stable keys and avoid inline heavy computations in render.
- **Follow-up:** When can memoization hurt performance?

### Advanced

5) **Explain React rendering pipeline and reconciliation.**
- **Difficulty:** Hard
- **Answer:**
  - React builds virtual tree, diffs against previous tree.
  - Reconciliation uses type/key heuristics to optimize updates.
  - Commit phase applies minimal DOM mutations.
  - Concurrent rendering enables interruptible work.
- **Follow-up:** Why are keys critical beyond list warnings?

6) **How would you architect a reusable component library (Storybook context)?**
- **Difficulty:** Hard
- **Answer:**
  - Define design tokens + primitives first.
  - Enforce accessibility, variants, and composition patterns.
  - Use Storybook docs/tests for visual + interaction regressions.
  - Version with semantic release and migration notes.
- **Follow-up:** How do you prevent breaking changes at scale?

### Senior-Level

7) **Design React architecture for a real-time dashboard with charts + alerts.**
- **Difficulty:** Senior-Level
- **Answer:**
  - Separate data layer, domain state, and presentational components.
  - Stream updates via WebSocket with throttled state updates.
  - Use windowing/virtualization for high-volume lists/tables.
  - Build resilient fallback states for disconnect/reconnect.
- **Follow-up:** How would you test race conditions in real-time UI?

8) **How do you drive WCAG compliance in a fast-moving product team?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Shift-left accessibility in component library.
  - CI checks: lint + automated a11y scans + keyboard tests.
  - Include semantic HTML, focus management, aria correctness.
  - Define accessibility acceptance criteria in stories.
- **Follow-up:** Which accessibility issues are hardest to automate?

---

## C) Redux & Redux Toolkit

### Beginner

1) **Why use Redux Toolkit over classic Redux?**
- **Difficulty:** Easy
- **Answer:**
  - Less boilerplate via `createSlice`, `configureStore`.
  - Built-in Immer for immutable updates.
  - Better defaults (DevTools, middleware setup).
- **Follow-up:** When not to use Redux?

2) **What is normalized state and why it matters?**
- **Difficulty:** Medium
- **Answer:**
  - Store entities by ID rather than nested duplicated objects.
  - Reduces update complexity and prevents stale duplicates.
  - Works well with memoized selectors.
- **Follow-up:** How does `createEntityAdapter` help?

### Advanced

3) **How do you handle async flows in RTK and Saga-heavy codebases?**
- **Difficulty:** Hard
- **Answer:**
  - RTK Query / thunks for standard request lifecycle.
  - Saga for complex orchestration, cancellation, and side-effect composition.
  - Keep business workflows explicit and testable.
- **Follow-up:** Migration strategy from Saga to RTK Query?

4) **How do you avoid Redux performance bottlenecks?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Fine-grained selectors with memoization.
  - Avoid oversized global state; colocate transient UI state.
  - Batch updates when possible.
  - Profile connect/useSelector usage and render frequency.
- **Follow-up:** Detecting selector recalculation hotspots?

---

## D) Node.js & Backend

### Beginner

1) **How is Node.js different from traditional threaded servers?**
- **Difficulty:** Easy
- **Answer:**
  - Event-driven, non-blocking I/O model.
  - Single-threaded event loop for JS execution.
  - Best for I/O-heavy workloads; CPU-heavy tasks need workers.
- **Follow-up:** When to use Worker Threads?

2) **REST vs GraphQL – when to choose what?**
- **Difficulty:** Medium
- **Answer:**
  - REST: simple caching semantics, resource-based APIs.
  - GraphQL: flexible data fetching, avoids over/under-fetching.
  - GraphQL adds resolver complexity and N+1 risk.
- **Follow-up:** How do you solve N+1 in GraphQL?

### Advanced

3) **How would you secure a Node.js API for product scale?**
- **Difficulty:** Hard
- **Answer:**
  - JWT/session strategy with rotation and expiry.
  - Rate limiting + input validation + schema enforcement.
  - Secure headers, CORS policy, secret management.
  - Audit logging and anomaly monitoring.
- **Follow-up:** JWT revocation approaches?

4) **Design reliable webhook processing pipeline.**
- **Difficulty:** Senior-Level
- **Answer:**
  - Verify signature + idempotency key handling.
  - Queue-first ingestion; async worker processing.
  - Retry with backoff + dead-letter queue.
  - Observability with delivery status and replay tooling.
- **Follow-up:** How do you prevent duplicate side effects?

---

## E) Databases (SQL + MongoDB)

### SQL

1) **Indexing strategy for high-read transactional tables?**
- **Difficulty:** Medium
- **Answer:**
  - Add indexes to filter/sort/join columns.
  - Prefer composite index order by query pattern.
  - Balance read gains vs write amplification.
- **Follow-up:** Signs of over-indexing?

2) **How do you diagnose slow queries?**
- **Difficulty:** Hard
- **Answer:**
  - Use EXPLAIN plans and query timing metrics.
  - Check index usage, cardinality, and scan types.
  - Optimize query shape before scaling hardware.
- **Follow-up:** Covering index example?

### MongoDB

3) **Embed vs reference in MongoDB schema design?**
- **Difficulty:** Medium
- **Answer:**
  - Embed for tightly coupled, bounded subdocuments.
  - Reference for large/independent or frequently changing entities.
  - Design for access patterns first.
- **Follow-up:** Handling document growth limits?

4) **How to model time-series telemetry for vehicle dashboards?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Partition by vehicle + time bucket.
  - Use TTL/retention for raw data and aggregate rollups.
  - Precompute query-friendly summaries.
- **Follow-up:** Trade-offs between real-time and historical query cost?

---

## F) System Design (Frontend + Backend)

1) **Design a Vehicle Health Dashboard (real-time + historical).**
- **Difficulty:** Senior-Level
- **Answer:**
  - Frontend: modular React app, chart virtualization, resilient socket layer.
  - Backend: ingestion service, stream processor, query API, alert engine.
  - Data: hot path cache + durable storage + aggregated read models.
  - Non-functional: latency SLOs, fault tolerance, observability.
- **Follow-up:** How do you handle websocket fan-out at global scale?

2) **Design global alert notification system with low latency.**
- **Difficulty:** Senior-Level
- **Answer:**
  - Event-driven architecture with pub/sub.
  - Priority queues + per-user/channel preference service.
  - Multi-channel delivery (in-app/websocket/email/SMS fallback).
  - Exactly-once effect via idempotent consumer design.
- **Follow-up:** How do you guarantee ordering per user/device?

3) **Frontend System Design: scalable React architecture for multi-team product.**
- **Difficulty:** Hard
- **Answer:**
  - Domain-driven module boundaries and shared design system.
  - Contract-based APIs and typed SDK.
  - Performance budgets + CI governance.
  - Error boundaries + feature flags + gradual rollout.
- **Follow-up:** Monorepo vs polyrepo trade-offs?

4) **Backend/API design for mixed REST + GraphQL ecosystem.**
- **Difficulty:** Hard
- **Answer:**
  - Use REST for stable, cache-friendly operations.
  - Use GraphQL gateway for composition and tailored reads.
  - Consistent authn/authz and observability across both layers.
- **Follow-up:** Versioning strategy for both API styles?

---

## G) Problem Solving / Coding (Questions Only, No Solutions)

1) Build an LRU Cache class with `get`/`put` in O(1). **(Medium)**
2) Debounce and throttle utility implementation with cancel/flush features. **(Medium)**
3) Flatten deeply nested JSON object with configurable path separator. **(Easy/Medium)**
4) Merge overlapping intervals for telemetry event windows. **(Medium)**
5) Sliding window: longest substring with at most K distinct chars. **(Medium)**
6) Design in-memory pub/sub with topic wildcards. **(Hard)**
7) Top K frequent items in streaming data. **(Medium/Hard)**
8) Detect cycle in dependency graph and return valid build order. **(Medium)**
9) Implement rate limiter (token bucket) for API gateway. **(Hard)**
10) Real-time leaderboard with update/query operations. **(Hard)**
11) SQL: write query for 7-day rolling average per device. **(Medium)**
12) SQL: nth highest salary per department with ties. **(Medium)**
13) MongoDB: design query for latest status per vehicle efficiently. **(Medium)**
14) Build undo/redo for dashboard filter operations. **(Hard)**
15) Given API failures, design retry utility with exponential backoff and jitter. **(Medium/Hard)**

---

## H) Project Deep Dive (Resume-based)

### 1) Inroute Platform – Vehicle Health Dashboard

1) **How did you design real-time data flow from ingestion to UI updates?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Stream source → event processing → websocket channel fan-out.
  - Client-side buffering + throttled chart rendering.
  - Backpressure and reconnect handling to prevent UI flood.
- **Follow-up:** How did you choose push frequency per metric?

2) **How did you balance live data accuracy with frontend performance?**
- **Difficulty:** Hard
- **Answer:**
  - Sample/window updates for visualization.
  - Prioritize critical alerts over non-critical telemetry.
  - Use memoized selectors and chart decimation.
- **Follow-up:** What metrics proved optimization success?

3) **How would you scale this dashboard to 10x vehicles?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Partition websocket channels by tenant/fleet/region.
  - Introduce stream aggregation tiers.
  - Optimize cold/hot data path separation.
- **Follow-up:** Where would bottleneck appear first?

### 2) V-Guard E-commerce Revamp

4) **How did you improve Lighthouse from 48 to 91?**
- **Difficulty:** Hard
- **Answer:**
  - Reduced render-blocking assets and JS payload.
  - Optimized critical path CSS/media.
  - Improved accessibility semantics and interaction readiness.
- **Follow-up:** Which Lighthouse categories moved most and why?

5) **How did you handle Shopify + custom dynamic features?**
- **Difficulty:** Medium
- **Answer:**
  - Used Liquid templates for structure and dynamic blocks.
  - Added progressive enhancement via JS for UX interactions.
  - Ensured theme compatibility and maintainability.
- **Follow-up:** How did you prevent app/theme regressions?

### 3) Code Management Dashboard (FOTA)

6) **Why migrate Angular to React in this system?**
- **Difficulty:** Medium
- **Answer:**
  - Faster UI iteration and better component reuse ecosystem.
  - Improved maintainability and developer onboarding.
  - Better integration with existing frontend standards/tooling.
- **Follow-up:** Biggest migration risks and mitigation?

7) **How did you design release tracking for lakhs of vehicles?**
- **Difficulty:** Senior-Level
- **Answer:**
  - Pagination/filters designed for high-cardinality datasets.
  - State normalization for consistent updates.
  - Background sync + status polling/stream hybrid.
- **Follow-up:** How did you manage partial rollout visibility?

---

## I) Behavioral (Product Company Focus)

1) **Tell me about a high-impact change you led.**
- **Difficulty:** Medium
- **Answer points:**
  - Situation: low engagement + poor performance baseline.
  - Task: revamp architecture/UI with measurable goals.
  - Action: component standardization + perf/a11y optimization.
  - Result: +20% engagement, -30% load, improved Lighthouse.
- **Follow-up:** What would you do differently now?

2) **A launch is at risk due to quality concerns. What do you do?**
- **Difficulty:** Hard
- **Answer points:**
  - Re-scope to must-have path + risk matrix.
  - Add targeted test gates and rollback plan.
  - Align PM/Design/QA on trade-offs and transparency.
- **Follow-up:** Example of a tough trade-off you made.

3) **How do you mentor junior engineers effectively?**
- **Difficulty:** Medium
- **Answer points:**
  - Define coding standards and review checklists.
  - Pair on design/debugging and increment ownership.
  - Track growth with concrete milestones and feedback loops.
- **Follow-up:** Handling repeated quality issues?

4) **Describe a disagreement with product/design and resolution.**
- **Difficulty:** Hard
- **Answer points:**
  - Anchor debate on user metrics and constraints.
  - Present options with impact/cost matrix.
  - Reach decision with experiment/rollout plan.
- **Follow-up:** What if decision still fails post-launch?

5) **How do you work in ambiguity at product companies?**
- **Difficulty:** Senior-Level
- **Answer points:**
  - Convert ambiguous goals into hypotheses + measurable outcomes.
  - Ship in increments with telemetry-driven feedback.
  - Communicate assumptions and revisit quickly.
- **Follow-up:** Example where assumptions were wrong.

---

## 3) 8-Week Interview Preparation Plan

### Weekly Structure
- **Weekdays (2 hrs/day):** 60 mins core topic + 45 mins question drills + 15 mins recap.
- **Weekend (4–5 hrs):** 1 mock interview + 1 system design + 1 project storytelling session.

### Week-wise Roadmap
1. **Week 1:** JavaScript fundamentals + medium coding patterns.
2. **Week 2:** Advanced JS + React core.
3. **Week 3:** React advanced + performance + accessibility.
4. **Week 4:** Redux/RTK + frontend architecture.
5. **Week 5:** Node.js, API design, auth/security.
6. **Week 6:** SQL + MongoDB + data modeling.
7. **Week 7:** System design (frontend + backend) with resume projects.
8. **Week 8:** Behavioral polishing + mock loops + gap closure.

### Daily Execution Template
- 5 questions revise from previous day.
- 8–12 fresh topic questions.
- 2 coding problem statements.
- 1 project deep-dive answer rehearsal.
- 1 behavioral STAR response refinement.

---

## 4) Interview Prep Web App (UI Website Structure)

## Product Modules
1. **Dashboard**
   - Daily goals, streak, weak topics, upcoming mocks.
2. **Topic-wise Navigation**
   - JS, React, Redux, Node, DB, System Design, Behavioral, Projects.
3. **Flashcards Mode**
   - Question front, answer bullets back, spaced repetition.
4. **Quiz Mode**
   - Timed MCQ + short-answer validation + confidence scoring.
5. **Q&A View**
   - Difficulty filters, follow-up chains, bookmark/revise queue.
6. **Progress Tracking**
   - Accuracy trend, topic heatmap, readiness score.

## Suggested React Component Structure
- `AppShell`
  - `TopNav`
  - `SideNav`
  - `DashboardPage`
    - `StatsCards`
    - `WeakAreaPanel`
    - `RecentActivity`
  - `TopicPage`
    - `TopicHeader`
    - `QuestionCard`
    - `AnswerBulletList`
    - `FollowUpAccordion`
  - `FlashcardPage`
    - `FlashcardDeck`
    - `FlipCard`
    - `SpacedRepetitionControls`
  - `QuizPage`
    - `QuizRunner`
    - `Timer`
    - `ResultBreakdown`
  - `ProgressPage`
    - `Heatmap`
    - `TrendChart`
    - `ReadinessGauge`

## Suggested Folder Structure
```txt
src/
  app/
    store.ts
    routes.tsx
  components/
    layout/
    dashboard/
    topic/
    flashcards/
    quiz/
    progress/
    common/
  features/
    questions/
      questionSlice.ts
      selectors.ts
    quiz/
      quizSlice.ts
    progress/
      progressSlice.ts
    user/
      userSlice.ts
  services/
    apiClient.ts
    questionService.ts
    analyticsService.ts
  hooks/
    useTopicFilters.ts
    useFlashcardSession.ts
  utils/
    difficulty.ts
    spacedRepetition.ts
  data/
    questionBank.json
  styles/
    tokens.css
    globals.css
```

## Key UI/UX Features
- Difficulty color tags: Easy (green), Medium (blue), Hard (orange), Senior-Level (purple).
- Smart filters: topic + difficulty + company style + bookmarked.
- One-click “Ask Follow-up” simulation mode.
- Session analytics: response speed, confidence, retention decay.
- Accessibility-first UI: keyboard navigation, focus indicators, aria labels.
- Mobile-first layout for daily practice continuity.

---

## 5) Final Interview Readiness Checklist (Product Companies)

- JavaScript internals, async model, and optimization narratives ready.
- React architecture + performance + accessibility examples from real work.
- Redux/RTK trade-offs and state design decisions clear.
- Node/API security, reliability, and scalability concepts confident.
- SQL/Mongo indexing + query optimization practiced.
- 2–3 end-to-end system design cases rehearsed.
- 3 project deep dives with numbers, trade-offs, and outcomes prepared.
- 8+ behavioral stories mapped to leadership principles.
- Mock interviews completed with iterative feedback loops.

