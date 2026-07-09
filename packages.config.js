// packages.config.js
// One entry per Stripe product. After you generate your 11 Stripe Payment Links,
// paste each URL into the matching "stripeLink" field below.
//
// Field types available: "text", "email", "tel", "textarea", "select", "file"
// Set required: true to force the customer to complete it before they can continue to payment.

export const packages = {

  "financial-snapshot": {
    name: "Financial Snapshot",
    price: "$275",
    stripeLink: "https://buy.stripe.com/14AcN6c8J0K60ii7fNeME0v",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "business_overview", label: "Brief description of your business", type: "textarea", required: true },
      { id: "specific_questions", label: "Specific questions or concerns you want addressed", type: "textarea", required: false },
      { id: "financials", label: "Upload recent financial statements (P&L, balance sheet — last 12 months)", type: "file", required: true, multiple: true }
    ]
  },

  "valuation-forecast": {
    name: "Valuation & Forecast",
    price: "$750",
    stripeLink: "https://buy.stripe.com/fZubJ22y9csOc10gQneME0u",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "valuation_purpose", label: "Purpose of this valuation", type: "select", required: true,
        options: ["Raising funding", "Selling the business", "Internal planning", "Litigation/legal", "Other"] },
      { id: "growth_assumptions", label: "Any known growth assumptions, plans, or upcoming changes we should factor in", type: "textarea", required: false },
      { id: "competitors", label: "Key competitors or comparable companies (if known)", type: "textarea", required: false },
      { id: "financials", label: "Upload financial statements (ideally 2-3 years) and cap table if applicable", type: "file", required: true, multiple: true }
    ]
  },

  "complete-financial-package": {
    name: "Complete Financial Package",
    price: "$1,450",
    stripeLink: "https://buy.stripe.com/6oUbJ2goZ8cy9SSgQneME0t",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "goals", label: "What are you trying to accomplish with this package?", type: "textarea", required: true },
      { id: "timeline", label: "Any deadline we should know about", type: "text", required: false },
      { id: "financials", label: "Upload financial statements, tax returns (if available), and any existing business plan", type: "file", required: true, multiple: true }
    ]
  },

  "business-plan": {
    name: "Business Plan",
    price: "$650",
    stripeLink: "https://buy.stripe.com/eVq9AUc8J3Wi8OOcA7eME0s",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "business_concept", label: "Describe your business concept, product, or service", type: "textarea", required: true },
      { id: "target_market", label: "Who is your target market?", type: "textarea", required: true },
      { id: "funding_amount", label: "Are you seeking funding? If so, how much?", type: "text", required: false },
      { id: "existing_docs", label: "Upload any existing financials, research, or notes (optional)", type: "file", required: false, multiple: true }
    ]
  },

  "breakeven-pricing-analysis": {
    name: "Break-Even & Pricing Analysis",
    price: "$225",
    stripeLink: "https://buy.stripe.com/fZucN68Wx8cyaWW8jReME0r",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "product_description", label: "Describe the product/service being priced", type: "textarea", required: true },
      { id: "current_pricing", label: "Current pricing (if any)", type: "text", required: false },
      { id: "margin_goals", label: "Target profit margin or pricing goals (if known)", type: "text", required: false },
      { id: "cost_structure", label: "Upload your cost/expense breakdown", type: "file", required: true, multiple: true }
    ]
  },

  "cash-flow-dashboard-setup": {
    name: "Cash Flow Dashboard Setup",
    price: "$350",
    stripeLink: "https://buy.stripe.com/6oU7sM8WxgJ4e982ZxeME0q",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "current_software", label: "What software/tools do you currently use for bookkeeping? (QuickBooks, spreadsheet, none, etc.)", type: "text", required: true },
      { id: "priority_metrics", label: "What metrics/categories matter most to you?", type: "textarea", required: false },
      { id: "bank_data", label: "Upload bank statements or transaction export (CSV preferred)", type: "file", required: true, multiple: true }
    ]
  },

  "loan-funding-readiness": {
    name: "Loan & Funding Readiness Package",
    price: "$500",
    stripeLink: "https://buy.stripe.com/5kQ8wQ7St3Wie98cA7eME0p",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "funding_amount", label: "Amount of funding/loan you're seeking", type: "text", required: true },
      { id: "funding_purpose", label: "What will the funding be used for?", type: "textarea", required: true },
      { id: "lender_type", label: "Type of lender/investor you're approaching (bank, SBA, private investor, etc.)", type: "text", required: false },
      { id: "financials", label: "Upload financial statements and any existing loan/funding documents", type: "file", required: true, multiple: true }
    ]
  },

  "grant-financial-narrative": {
    name: "Grant Financial Narrative Support",
    price: "$300",
    stripeLink: "https://buy.stripe.com/7sY00k6OpeAW0iieIfeME0o",
    fields: [
      { id: "business_name", label: "Business/Organization Name", type: "text", required: true },
      { id: "grant_name", label: "Name of the grant and funder", type: "text", required: true },
      { id: "deadline", label: "Application deadline", type: "text", required: true },
      { id: "specific_questions", label: "Paste the specific financial questions/sections from the application", type: "textarea", required: true },
      { id: "supporting_docs", label: "Upload the grant application/RFP and any existing financials", type: "file", required: true, multiple: true }
    ]
  },

  "saas-metrics-analysis": {
    name: "SaaS Metrics Analysis",
    price: "$400",
    stripeLink: "https://buy.stripe.com/9B6fZi4GhfF02qq0RpeME0n",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "current_mrr", label: "Current MRR (approximate is fine)", type: "text", required: false },
      { id: "pricing_tiers", label: "Describe your pricing tiers", type: "textarea", required: false },
      { id: "key_questions", label: "What specific questions do you want answered?", type: "textarea", required: true },
      { id: "revenue_export", label: "Upload revenue/subscriber export and churn data if available", type: "file", required: true, multiple: true }
    ]
  },

  "competitor-financial-benchmarking": {
    name: "Competitor Financial Benchmarking",
    price: "$300",
    stripeLink: "https://buy.stripe.com/8x214o5Kl8cy3uu6bJeME0m",
    fields: [
      { id: "business_name", label: "Business Name", type: "text", required: true },
      { id: "competitors", label: "List the competitors you want benchmarked (names, websites if public)", type: "textarea", required: true },
      { id: "industry", label: "Industry/sector", type: "text", required: true },
      { id: "metrics_of_interest", label: "Specific metrics you're most interested in (pricing, margins, growth, etc.)", type: "textarea", required: false },
      { id: "own_financials", label: "Upload your own financials to benchmark against (optional)", type: "file", required: false, multiple: true }
    ]
  },

};
