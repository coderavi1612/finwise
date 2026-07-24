# FinWise AI

> **Transparent Credit Scoring & AI-Powered Micro-Investment Advisor for Financial Inclusion**

FinWise AI is an AI-powered financial inclusion platform developed to bridge the gap between underserved individuals and formal financial services. The platform combines **Explainable AI (XAI)**, **alternative credit scoring**, and **AI-driven investment guidance** into a single, easy-to-use application.

Traditional financial institutions primarily assess creditworthiness using banking history, loan repayment records, and credit bureau data. This excludes millions of individuals who are financially responsible but have never taken loans or used formal banking products. FinWise AI addresses this challenge by evaluating alternative digital financial behaviors to generate transparent and understandable credit insights.

Beyond credit assessment, the platform also functions as an AI-powered financial companion that educates users, recommends methods to improve their financial profile, assesses investment risk, and suggests suitable investment categories based on individual financial goals and risk tolerance.

The project focuses on making financial services more transparent, understandable, and accessible for first-time earners, students, gig workers, small merchants, and new investors.

---

## Problem Statement

Millions of Indians remain excluded from the formal financial ecosystem because existing credit scoring systems depend heavily on traditional banking history.

The primary challenges include:

- Over **190 million adults** are considered **credit invisible**, making it difficult to obtain loans or financial products.
- First-time investors, particularly in Tier-2 and Tier-3 cities, often have:
  - Limited financial literacy
  - Limited understanding of investment products
  - No personalized investment guidance
- Financial products remain inaccessible because users cannot demonstrate financial responsibility despite having healthy digital financial behavior.
- Existing credit scoring models operate as "black boxes," providing little explanation about how scores are calculated or how they can be improved.

As a result, many financially responsible individuals cannot access credit opportunities or confidently begin investing.

---

## Our Solution

FinWise AI provides a unified platform that solves two major problems simultaneously:

1. Transparent AI-powered credit assessment.
2. Personalized AI-based investment guidance.

Instead of relying exclusively on bank loans and credit card history, FinWise AI evaluates alternative financial behavior to estimate creditworthiness.

The platform enables users to:

- Understand their financial behavior
- Receive an AI-generated credit score
- Understand why the score was generated
- View the major factors affecting the score
- Receive recommendations for improving creditworthiness
- Learn basic financial concepts
- Determine their investment risk profile
- Receive personalized investment recommendations
- Simulate long-term portfolio growth

This creates one seamless financial journey instead of requiring multiple disconnected services.

---

## Target Users

FinWise AI is designed primarily for users who are underserved by conventional financial systems.

The target audience includes:

- First-time earners
- Students
- Gig workers
- Freelancers
- Small merchants
- Salaried professionals from Tier-2 and Tier-3 cities
- Individuals without formal credit history
- New investors investing between **₹500–₹5,000 per month**

---

## Market Opportunity

The platform addresses a rapidly growing market consisting of:

- 190M+ credit-invisible adults in India
- Rapidly increasing retail investors in Tier-2 and Tier-3 cities
- Large underserved self-directed investor population

Several technological developments make this solution increasingly viable:

- Five or more years of digital payment history (UPI, utility bills, e-commerce)
- India Stack and consent-based data sharing
- Growth of alternative data-driven financial assessment models

---

## Core Features

### 1. Transparent AI Credit Scoring

Unlike traditional credit scoring systems, FinWise AI evaluates alternative financial indicators.

#### Input Features

- Mobile recharge consistency
- Utility bill payment history
- UPI transaction frequency
- Digital payment activity
- E-commerce spending patterns
- Savings behavior
- Income consistency

#### AI Output

The AI generates:

- Credit Score
- Risk Classification
- Top three factors influencing the score
- Personalized recommendations for improvement

Unlike conventional systems, every score is accompanied by an explanation showing exactly why it was generated.

---

### 2. Explainable AI (XAI)

Transparency is the primary differentiator of FinWise AI.

Instead of simply displaying a number, the system explains:

- Positive financial behaviors
- Negative financial behaviors
- Important contributing features
- Score trends over time
- Personalized improvement suggestions

The project uses **SHAP (SHapley Additive Explanations)** to interpret machine learning predictions, ensuring every decision remains understandable to users.

---

### 3. AI Risk Profiling

The platform performs a conversational financial assessment to understand user preferences.

The assessment includes:

- Monthly income
- Investment goal
- Investment duration
- Monthly investment amount
- Risk tolerance
- Emergency savings
- Financial responsibilities

The collected information is processed through an AI profiling engine to classify users into:

- Low Risk
- Medium Risk
- High Risk

---

### 4. Personalized Investment Guidance

Based on the user's risk profile, FinWise AI recommends suitable investment categories, including:

- Index Funds
- Hybrid Funds
- Bonds
- Government Bonds
- Gold ETFs
- Stocks & Bonds
- Emergency Savings Allocation
- Other investment categories

The objective is to simplify investment decisions for first-time investors.

---

### 5. Growth Projection Simulator

Users can estimate future portfolio growth by adjusting:

- Monthly investment amount
- Investment duration

The simulator provides projections under three scenarios:

- Conservative
- Expected
- Optimistic

Portfolio growth is visualized across:

- 1 Year
- 3 Years
- 5 Years

This encourages long-term financial planning through visualization.

---

## Platform Workflow

The overall workflow of FinWise AI consists of seven stages:

1. User Onboarding
2. Financial Behavior Analysis
3. AI Credit Score Generation
4. Explainable Insights Generation
5. Personalized Improvement Suggestions
6. AI Risk Assessment
7. Investment Recommendation

These stages together form the Smart Credit Insight System.

---

## Technology Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Recharts
- TanStack Start (Router & Server)

### Backend / Server

- Vite Dev Server & SSR runtime

### Artificial Intelligence

- Python (Modeling/Exploration)
- Scikit-learn
- Random Forest
- XGBoost
- SHAP Explainability

### Data

- Synthetic financial profiles
- Feature engineering pipeline
- Local database / JSON datasets

---

## What Makes FinWise AI Different

FinWise AI distinguishes itself through five core principles:

- **Explainable AI**: Every AI prediction is accompanied by understandable explanations instead of opaque scores.
- **Alternative Credit Assessment**: Financial responsibility is evaluated using real-world digital financial behavior rather than traditional banking history alone.
- **Personalized Financial Education**: Users receive actionable educational insights that improve financial literacy alongside AI recommendations.
- **Unified Financial Platform**: Credit assessment and investment guidance are integrated into a single user experience instead of separate services.
- **Financial Inclusion**: The platform is specifically designed for first-time users and underserved communities who lack access to traditional financial services.

---

## Responsible AI

FinWise AI follows responsible AI principles.

- Every prediction includes an explanation.
- Users can understand which factors positively or negatively influenced their credit score.
- No black-box decision-making.
- SHAP-based explainability is used for model interpretation.
- Users receive recommendations instead of unexplained decisions.

---

## Local Development

To run this application locally, ensure you have Node.js and npm installed.

1. **Clone the repository:**

   ```bash
   git clone <this-repository-url>
   cd finwise
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## Disclaimer

This project is developed solely for educational and demonstration purposes.

- Credit scores generated by the system are simulated.
- Investment recommendations are educational and should not be considered regulated financial advice.
- The platform does not provide investment advisory services under SEBI or RBI regulations.
- No real user financial data is used.
- All datasets consist of synthetic or fully consented sample data.

---

## Potential Impact

FinWise AI aims to:

- Improve financial inclusion.
- Help credit-invisible individuals understand their financial readiness.
- Encourage responsible financial behavior.
- Improve financial literacy.
- Enable informed investment decisions.
- Promote long-term wealth creation through disciplined investing.

---

## Future Enhancements

The project can be expanded with:

- Secure Account Aggregator integration using consent-based financial data
- Regional language support
- AI-powered financial chatbot
- Personalized financial goal tracking
- Milestone-based investment planning
- Gamified financial health improvement
- Live banking integrations
- Real-time investment portfolio monitoring

---

## Vision

FinWise AI envisions a financial ecosystem where access to credit and investment opportunities is determined by **actual financial behavior rather than historical banking records**. By combining Explainable AI, alternative credit assessment, personalized financial education, and AI-powered investment guidance, the platform seeks to empower millions of first-time and underserved users to make informed financial decisions with confidence, transparency, and trust.
