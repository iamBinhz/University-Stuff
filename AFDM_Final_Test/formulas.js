// AFDM Formula Summary - JavaScript

// Formula Data (with full terms, no abbreviations)
const formulaData = {
    "Time Value of Money": {
        icon: "⏰",
        formulas: [
            { name: "Future Value (Single Sum)", formula: "Future Value = Present Value × (1 + interest rate)^number of periods", description: "Calculate future value of a present amount" },
            { name: "Present Value (Single Sum)", formula: "Present Value = Future Value / (1 + interest rate)^number of periods", description: "Calculate present value of a future amount" },
            { name: "Future Value of Annuity", formula: "Future Value of Annuity = Payment × [(1 + interest rate)^n - 1] / interest rate", description: "Future value of equal periodic payments" },
            { name: "Present Value of Annuity", formula: "Present Value of Annuity = Payment × [1 - (1 + interest rate)^(-n)] / interest rate", description: "Present value of equal periodic payments" },
            { name: "Present Value of Perpetuity", formula: "Present Value = Payment / interest rate", description: "Present value of infinite equal payments" },
            { name: "Growing Perpetuity", formula: "Present Value = Payment / (interest rate - growth rate)", description: "Present value of payments growing at constant rate" },
            { name: "Effective Annual Rate", formula: "Effective Annual Rate = (1 + nominal rate / compounding periods)^compounding periods - 1", description: "Annual rate accounting for compounding frequency" },
            { name: "Continuous Compounding", formula: "Future Value = Present Value × e^(interest rate × time)", description: "Future value with continuous compounding" }
        ]
    },
    "Financial Analysis": {
        icon: "📊",
        formulas: [
            { name: "Gross Profit Margin", formula: "Gross Profit Margin = (Gross Profit / Revenue) × 100%", description: "Profitability from core operations" },
            { name: "Operating Profit Margin", formula: "Operating Margin = (Earnings Before Interest and Taxes / Revenue) × 100%", description: "Operating efficiency ratio" },
            { name: "Net Profit Margin", formula: "Net Margin = (Net Income / Revenue) × 100%", description: "Bottom-line profitability" },
            { name: "Return on Capital Employed", formula: "Return on Capital Employed = Earnings Before Interest and Taxes / (Total Assets - Current Liabilities) × 100%", description: "Efficiency of capital usage" },
            { name: "Return on Equity", formula: "Return on Equity = (Net Income / Shareholders' Equity) × 100%", description: "Return generated for shareholders" },
            { name: "Return on Assets", formula: "Return on Assets = (Net Income / Total Assets) × 100%", description: "Efficiency of asset utilization" },
            { name: "Current Ratio", formula: "Current Ratio = Current Assets / Current Liabilities", description: "Short-term liquidity measure" },
            { name: "Quick Ratio (Acid Test)", formula: "Quick Ratio = (Current Assets - Inventory) / Current Liabilities", description: "Liquidity excluding inventory" },
            { name: "Debt to Equity Ratio", formula: "Debt to Equity = Total Debt / Total Equity", description: "Financial leverage ratio" },
            { name: "Interest Coverage Ratio", formula: "Interest Coverage = Earnings Before Interest and Taxes / Interest Expense", description: "Ability to meet interest payments" },
            { name: "Asset Turnover Ratio", formula: "Asset Turnover = Revenue / Total Assets", description: "Efficiency of asset use in generating sales" },
            { name: "DuPont Analysis", formula: "Return on Equity = Net Profit Margin × Asset Turnover × Equity Multiplier", description: "Decomposed return on equity analysis" }
        ]
    },
    "Risk and Return": {
        icon: "📈",
        formulas: [
            { name: "Expected Return", formula: "Expected Return = (Close Price - Begin Price + Dividend) / Begin Price", description: "Probability-weighted average return" },
            { name: "Holding Period Return", formula: "Holding Period Return = (Ending Price - Beginning Price + Dividend) / Beginning Price", description: "Total return over holding period" },
            { name: "Variance", formula: "Variance = Sum of [Probability × (Return - Expected Return)²]", description: "Measure of return dispersion" },
            { name: "Standard Deviation", formula: "Standard Deviation = Square Root of Variance", description: "Risk measure (volatility)" },
            { name: "Portfolio Expected Return", formula: "Portfolio Return = Sum of [Weight × Expected Return] for each asset", description: "Weighted average of asset returns" },
            { name: "Portfolio Variance (Two Assets)", formula: "Portfolio Variance = w₁²σ₁² + w₂²σ₂² + 2 × w₁ × w₂ × σ₁ × σ₂ × correlation", description: "Risk of two-asset portfolio" },
            { name: "Covariance", formula: "Covariance(A,B) = Sum of [Probability × (Return A - Expected A) × (Return B - Expected B)]", description: "Measure of co-movement between assets" },
            { name: "Correlation Coefficient", formula: "Correlation = Covariance(A,B) / (Standard Deviation A × Standard Deviation B)", description: "Standardized covariance (ranges from -1 to +1)" },
            { name: "Beta (Systematic Risk)", formula: "Beta = Covariance(Stock Return, Market Return) / Variance(Market Return)", description: "Systematic risk measure relative to market" },
            { name: "Capital Asset Pricing Model", formula: "Expected Return = Risk-Free Rate + Beta × (Market Return - Risk-Free Rate)", description: "Required return based on systematic risk" },
            { name: "Sharpe Ratio", formula: "Sharpe Ratio = (Portfolio Return - Risk-Free Rate) / Portfolio Standard Deviation", description: "Risk-adjusted return measure (total risk)" },
            { name: "Treynor Ratio", formula: "Treynor Ratio = (Portfolio Return - Risk-Free Rate) / Portfolio Beta", description: "Return per unit of systematic risk" },
            { name: "Jensen's Alpha", formula: "Alpha = Actual Return - [Risk-Free Rate + Beta × (Market Return - Risk-Free Rate)]", description: "Excess return over Capital Asset Pricing Model prediction" }
        ]
    },
    "Investment Decision Criteria": {
        icon: "💰",
        formulas: [
            { name: "Net Present Value", formula: "Net Present Value = Total of PVinflows - Initial Investment", description: "PVinflows = PV của các năm theo công thức PV = FV × (1+r)^(-t) / Total PVinflows = Tổng của các năm" },
            { name: "Internal Rate of Return (Interpolation)", formula: "Internal Rate of Return = r₁ + [NPV₁ / (NPV₁ - NPV₂)] × (r₂ - r₁)", description: "Estimate internal rate of return between two discount rates" },
            { name: "Payback Period", formula: "Payback Period = Last Year with negative CCF + (|Last negative CCF| / Following Year's CF)", description: "Time required to recover initial investment" },
            { name: "Discounted Payback Period", formula: "Làm tương tự như Payback Period nhưng thêm cột Discounted Cashflows để tính (xem mock test 5 bài 1)", description: "lol" },
            { name: "Accounting Rate of Return", formula: "Accounting Rate of Return = (Average Annual Profit / Average Investment) × 100", description: "Profit-based return measure" },
            { name: "Average Investment", formula: "Average Investment = (Initial Investment + Scrap Value) / 2", description: "Dùng để tính ARR" },
            { name: "Annual Depreciation", formula: "Annual Depreciation = (Initial Investment - Scrap Value) / Project Life (Number of Years)", description: "lol" },
            { name: "Total Depreciation", formula: "Total Depreciation = Depreciation x Number of Years", description: "lol" },
            { name: "Total Accounting Profit", formula: "Total Accounting Profit = Total CashFlows - Total Depreciation", description: "more specific" },
            { name: "Average Annual Profit", formula: "Average Annual Profit = Total Accounting Profit / Number of years", description: "none" },
            { name: "Profitability Index", formula: "Profitability Index = Present Value of Future Cash Flows / Initial Investment", description: "Value created per dollar invested" },
            { name: "Equivalent Annual Annuity", formula: "Equivalent Annual Annuity = Net Present Value × [rate / (1 - (1 + rate)^(-n))]", description: "Compare projects with different useful lives" }
        ]
    },
    "Capital Structure": {
        icon: "🏛️",
        formulas: [
            { name: "Weighted Average Cost of Capital (WACC)", formula: "WACC = (wD x rD) + (wE x rE)", description: "WACC = (Debt/Debt + Equity) × Cost of Debt + (Equity/Debt + Equity) × Cost of Equity)" },
            { name: "Cost of Equity (Capital Asset Pricing Model)", formula: "Cost of Equity = Risk-Free Rate + Beta × (Market Return - Risk-Free Rate)", description: "Required return on equity using market risk" },
            { name: "Cost of Equity (Dividend Growth Model)", formula: "Cost of Equity (rE) = (D1 / P0) + g", description: "D1 = D0 x (1 + g)" },
            { name: "Cost of Debt (After-Tax)", formula: "After-Tax Cost of Debt (rD) = Pre-Tax Cost of Debt × (1 - Tax Rate)", description: "Pre-Tax Cost of Debt = (FV/PV)^1/t (FV trên PV tất cả mũ 1 phần t)" },
            { name: "wD", formula: "wD = Debt / (Debt + Equity)", description: "Tính Debt bằng cách lấy số lượng Bonds nhân với giá của Bonds" },
            { name: "wE", formula: "wE = Equity / (Debt + Equity)", description: "Tính Equity bằng cách lấy số lượng Shares nhân với giá của Shares" },
            { name: "Theoretical Ex-Rights Price (TERP)", formula: "TERP = ((Number of old shares x Old price) + (Number of new shares x New price)) / Number of Old Shares + Number of New Shares", description: "Number of Old/New Shares có thể hiểu là cứ mỗi N Old Shares thì sẽ mua được 1 New Share" },
            { name: "Value of Rights per New Share (VRNS)", formula: "VRNS = TERP - Issue Price", description: "none" },
            { name: "Value of Rights per Existing Share (VRES)", formula: "VRES = Old Price - TERP", description: "none" },
            { name: "New shares (nếu chưa cung cấp)", formula: "New shares = Existing Shares / Rights ratio", description: "none" },
            { name: "Capital Raised", formula: "Capital Raised = New shares x (Market Price x (1 - Discount))", description: "none" },
            { name: "Cost of Preference Shares", formula: "Cost of Preference Shares = Preference Dividend / Current Preference Share Price", description: "Required return on preference shares" },
            { name: "Unlevered Beta (Asset Beta)", formula: "Unlevered Beta = Levered Beta / [1 + (1 - Tax Rate) × (Debt/Equity)]", description: "Beta without leverage effect (pure business risk)" },
            { name: "Levered Beta (Equity Beta)", formula: "Levered Beta = Unlevered Beta × [1 + (1 - Tax Rate) × (Debt/Equity)]", description: "Beta including leverage effect" },
            { name: "Modigliani-Miller Proposition I (No Tax)", formula: "Value of Levered Firm = Value of Unlevered Firm", description: "Firm value is independent of capital structure without taxes" },
            { name: "Modigliani-Miller Proposition II (No Tax)", formula: "Cost of Equity = Cost of Assets + (Cost of Assets - Cost of Debt) × (Debt/Equity)", description: "Cost of equity rises linearly with leverage" },
            { name: "Modigliani-Miller Proposition I (With Tax)", formula: "Value of Levered Firm = Value of Unlevered Firm + (Tax Rate × Debt)", description: "Firm value increases by present value of tax shield" },
            { name: "Market Value of Equity", formula: "Market Value of Equity = Total Firm Value - Market Value of Debt", description: "Residual value belonging to shareholders" }
    
        ]
    },
    "Sources of Finance": {
        icon: "🏦",
        formulas: [
            { name: "Bond Valuation", formula: "Bond Price = Sum of [Coupon Payment / (1 + required return)^t] + [Face Value / (1 + required return)^n]", description: "Present value of all coupon payments and principal" },
            { name: "Yield to Maturity", formula: "Bond Price = Sum of [Coupon / (1 + Yield to Maturity)^t] + [Face Value / (1 + Yield to Maturity)^n]", description: "Discount rate equating bond price to future cash flows" },
            { name: "Current Yield", formula: "Current Yield = Annual Coupon Payment / Current Bond Price", description: "Annual coupon return based on current market price" },
            { name: "Dividend Yield", formula: "Dividend Yield = (Annual Dividend Per Share / Current Share Price) × 100%", description: "Annual dividend as percentage of share price" },
            { name: "Convertible Bond Conversion Value", formula: "Conversion Value = Conversion Ratio × Current Share Price", description: "Value of bond if converted to ordinary shares" },
            { name: "Conversion Premium", formula: "Conversion Premium = (Bond Price - Conversion Value) / Conversion Value × 100%", description: "Premium paid over immediate conversion value" },
            { name: "Fisher Equation", formula: "Nominal Interest Rate ≈ Real Interest Rate + Expected Inflation Rate", description: "Relationship between nominal rate, real rate, and inflation" }
        ]
    },
    "Dividend Policy": {
        icon: "💵",
        formulas: [
            { name: "Dividend Yield", formula: "Dividend Yield = Annual Dividend Per Share / Current Share Price", description: "Return from dividends relative to share price" },
            { name: "Dividend Payout Ratio", formula: "Payout Ratio = Dividend Per Share / Earnings Per Share", description: "Proportion of earnings distributed as dividends" },
            { name: "Retention Ratio (Plowback Ratio)", formula: "Retention Ratio = 1 - Dividend Payout Ratio = Retained Earnings / Net Income", description: "Proportion of earnings retained for reinvestment" },
            { name: "Sustainable Growth Rate", formula: "Sustainable Growth Rate = Return on Equity × Retention Ratio", description: "Maximum growth rate achievable from retained earnings" },
            { name: "Gordon Growth Model (Dividend Discount Model)", formula: "Share Price = Next Year Dividend / (Cost of Equity - Dividend Growth Rate)", description: "Share valuation based on growing dividend stream" },
            { name: "Ex-Dividend Share Price", formula: "Ex-Dividend Price = Cum-Dividend Price - Dividend Per Share", description: "Share price after dividend entitlement date" },
            { name: "Stock Split Price Adjustment", formula: "New Share Price = Old Share Price / Stock Split Ratio", description: "Price adjustment following a stock split" },
            { name: "Stock Dividend Cost Basis Adjustment", formula: "New Cost Per Share = Original Total Cost / (Original Shares × (1 + Stock Dividend Percentage))", description: "Adjusted cost basis after receiving stock dividend" }
        ]
    },
    "Financial Risk Management": {
        icon: "🛡️",
        formulas: [
            { name: "Forward Exchange Rate", formula: "Forward Rate = Spot Rate × [(1 + domestic interest rate) / (1 + foreign interest rate)]^time", description: "Theoretical forward exchange rate based on interest rate differential" },
            { name: "Interest Rate Parity", formula: "Forward Rate / Spot Rate = (1 + domestic interest rate) / (1 + foreign interest rate)", description: "Equilibrium relationship between forward rates and interest rates" },
            { name: "Purchasing Power Parity", formula: "Expected Spot Rate / Current Spot Rate = (1 + domestic inflation) / (1 + foreign inflation)", description: "Exchange rate movement based on inflation differential" },
            { name: "Forward Premium or Discount", formula: "Forward Premium = [(Forward Rate - Spot Rate) / Spot Rate] × (12 / months) × 100%", description: "Annualized percentage deviation of forward rate from spot rate" },
            { name: "Number of Futures Contracts for Hedging", formula: "Number of Contracts = Total Exposure Amount / Contract Size", description: "Quantity of futures contracts needed to hedge exposure" },
            { name: "Call Option Payoff", formula: "Call Payoff = Maximum of (Spot Price - Strike Price, 0) - Option Premium Paid", description: "Profit from call option at expiration" },
            { name: "Put Option Payoff", formula: "Put Payoff = Maximum of (Strike Price - Spot Price, 0) - Option Premium Paid", description: "Profit from put option at expiration" },
            { name: "Put-Call Parity", formula: "Call Price + Present Value of Strike Price = Put Price + Current Spot Price", description: "Arbitrage relationship between European put and call prices" },
            { name: "Option Delta", formula: "Delta = Change in Option Price / Change in Underlying Asset Price", description: "Sensitivity of option price to changes in underlying asset" },
            { name: "Value at Risk (Normal Distribution)", formula: "Value at Risk = Expected Return - (z-score × Standard Deviation × Square Root of Time)", description: "Maximum expected loss at specified confidence level" }
        ]
    },
    "Mergers and Acquisitions": {
        icon: "🤝",
        formulas: [
            { name: "Synergy Value", formula: "Synergy = Value of Combined Firm - Value of Acquirer - Value of Target", description: "Additional value created from business combination" },
            { name: "Acquisition Premium", formula: "Acquisition Premium = [(Offer Price - Pre-Announcement Price) / Pre-Announcement Price] × 100%", description: "Premium paid over target's market price before announcement" },
            { name: "Share Exchange Ratio", formula: "Exchange Ratio = Offer Price Per Target Share / Acquirer's Current Share Price", description: "Number of acquirer shares received per target share" },
            { name: "Post-Merger Earnings Per Share", formula: "Post-Merger Earnings Per Share = Combined Net Earnings / Total Shares Outstanding After Merger", description: "Earnings per share of the combined entity" },
            { name: "Price to Earnings Valuation Method", formula: "Target Company Value = Target's Net Earnings × Appropriate Price-to-Earnings Multiple", description: "Target valuation using comparable company multiples" },
            { name: "Net Present Value of Acquisition", formula: "Acquisition Net Present Value = Present Value of Synergies - Total Premium Paid", description: "Net value creation for the acquiring company" },
            { name: "Maximum Acquisition Bid Price", formula: "Maximum Bid = Standalone Target Value + Present Value of Expected Synergies", description: "Highest price acquirer should pay without destroying value" },
            { name: "Earnings Per Share Accretion or Dilution", formula: "Percentage Change = [(Post-Merger Earnings Per Share - Pre-Merger Earnings Per Share) / Pre-Merger Earnings Per Share] × 100%", description: "Impact of acquisition on acquirer's earnings per share" }
        ]
    }
};

// DOM Elements
let container, filterBar, searchInput;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    container = document.getElementById('formulas-container');
    filterBar = document.querySelector('.filter-bar');
    searchInput = document.getElementById('search-input');

    renderFormulas();
    setupEventListeners();
    updateStats();
});

// Render all formulas
function renderFormulas(filter = 'all', searchTerm = '') {
    container.innerHTML = '';

    Object.entries(formulaData).forEach(([topic, data]) => {
        // Filter by topic
        if (filter !== 'all' && topic !== filter) return;

        // Filter by search term
        let filteredFormulas = data.formulas;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredFormulas = data.formulas.filter(f =>
                f.name.toLowerCase().includes(term) ||
                f.formula.toLowerCase().includes(term) ||
                f.description.toLowerCase().includes(term)
            );
        }

        if (filteredFormulas.length === 0) return;

        const section = document.createElement('section');
        section.className = 'topic-section';
        section.dataset.topic = topic;

        section.innerHTML = `
            <div class="topic-header">
                <div class="topic-icon">${data.icon}</div>
                <h2 class="topic-title">${topic}</h2>
                <span class="formula-count">${filteredFormulas.length} formulas</span>
            </div>
            <div class="formula-grid">
                ${filteredFormulas.map(f => createFormulaCard(f)).join('')}
            </div>
        `;

        container.appendChild(section);
    });

    // Show message if no results
    if (container.children.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #6c757d;">
                <h3>No formulas found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
    }
}

// Create formula card HTML
function createFormulaCard(formula) {
    return `
        <div class="formula-card">
            <button class="copy-btn" onclick="copyFormula(this, '${escapeHtml(formula.formula)}')">📋 Copy</button>
            <h3 class="formula-name">${formula.name}</h3>
            <div class="formula-expression">${formula.formula}</div>
            <p class="formula-description">${formula.description}</p>
        </div>
    `;
}

// Escape HTML for safe insertion
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/'/g, "\\'");
}

// Copy formula to clipboard
function copyFormula(btn, formula) {
    navigator.clipboard.writeText(formula).then(() => {
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '📋 Copy';
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderFormulas(e.target.dataset.filter, searchInput.value);
        }
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        renderFormulas(activeFilter, e.target.value);
    });

    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const btn = document.getElementById('dark-mode-toggle');
        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    // Scroll to top
    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 300);
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Update statistics
function updateStats() {
    let totalFormulas = 0;
    let totalTopics = Object.keys(formulaData).length;

    Object.values(formulaData).forEach(data => {
        totalFormulas += data.formulas.length;
    });

    document.getElementById('total-formulas').textContent = totalFormulas;
    document.getElementById('total-topics').textContent = totalTopics;
}

// Export for external use
window.formulaData = formulaData;
