# 📦 Paystack Wrapper (TypeScript SDK)

A **100% TypeScript** SDK for interacting with the [Paystack API](https://paystack.com/docs/).
This package provides a clean, strongly-typed interface for all Paystack endpoints — Transactions, Customers, Transfers, Refunds, and more.

---

## 🚀 Features

* Fully **written in TypeScript**
* **Strongly typed requests and responses**
* **Service-based API** (TransactionService, CustomerService, etc.)
* Simple and consistent usage across all Paystack endpoints
* Works in **Node.js** and serverless environments

---

## 📦 Installation

```bash
npm install paystack-wrapper
# or
yarn add paystack-wrapper
```

---

## ⚡ Quick Start

```ts
import { PaystackClient, TransactionService, CustomerService } from "paystack-wrapper";

// Initialize client
const client = new PaystackClient("sk_test_xxxxxxx");

// Initialize services
const transactions = new TransactionService(client);
const customers = new CustomerService(client);

async function run() {
  // Create a customer
  const customer = await customers.create({
    email: "johndoe@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "08012345678",
  });
  console.log("Customer:", customer);

  // Initialize a transaction
  const tx = await transactions.initialize({
    email: "johndoe@example.com",
    amount: 200000, // kobo (2000 NGN)
    callback_url: "https://yourapp.com/callback",
  });
  console.log("Payment URL:", tx.data.authorization_url);

  // Verify a transaction
  const verified = await transactions.verify(tx.data.reference);
  console.log("Verified:", verified);
}

run();
```

---

## 🛠️ Available Services

### ✅ TransactionService

* `initialize(params)` – Start a new transaction
* `verify(reference)` – Verify transaction status
* `list(query?)` – List all transactions
* `fetch(id)` – Fetch a single transaction
* `chargeAuthorization(params)` – Charge a saved card
* `timeline(reference)` – View transaction timeline
* `totals()` – Get transaction totals

---

### ✅ CustomerService

* `create(params)` – Create a customer
* `list(query?)` – List customers
* `fetch(codeOrEmail)` – Fetch a customer
* `update(code, data)` – Update a customer

---

### 🏦 TransferService

* `initiate(params)` – Initiate transfer
* `finalizeTransfer(params)` – Finalize transfer with OTP
* `list(query?)` – List transfers
* `fetch(idOrCode)` – Fetch a transfer

---

### 🧾 TransferRecipientService

* `create(params)` – Add a recipient
* `list(query?)` – List recipients
* `fetch(id)` – Fetch recipient details
* `update(id, data)` – Update recipient

---

### 💸 RefundService

* `create(params)` – Create a refund
* `list(query?)` – List refunds
* `fetch(id)` – Fetch refund details

---

### 📅 PlanService

* `create(params)` – Create a subscription plan
* `list(query?)` – List plans
* `fetch(idOrCode)` – Fetch plan
* `update(idOrCode, data)` – Update plan

---

### 🔄 SubscriptionService

* `create(params)` – Create a subscription
* `list(query?)` – List subscriptions
* `fetch(idOrCode)` – Fetch subscription
* `disable(code, token)` – Disable subscription
* `enable(code, token)` – Enable subscription

---

### 🔍 VerificationService

* `resolveAccount(account_number, bank_code)` – Resolve bank account
* `resolveBVN(bvn)` – Resolve BVN

---

### 💰 BalanceService

* `checkBalance()` – Get current balance

---

### 🏦 BankService

* `listBanks()` – List banks supported by Paystack

---

### 📊 SettlementService

* `listSettlements(query?)` – List settlements

---

### 📄 PageService

* `createPaymentPage(params)` – Create a payment page
* `list()` – List payment pages
* `fetch(slugOrId)` – Fetch payment page details

---

## 📖 TypeScript Types

This package ships with full **TypeScript types** for all parameters and responses.
Example:

```ts
import { InitializeTransactionParams } from "paystack-wrapper";

const tx: InitializeTransactionParams = {
  email: "johndoe@example.com",
  amount: 500000,
  callback_url: "https://yourapp.com/callback",
};
```

---

## ⚠️ Notes

* Amounts are always in **kobo** (smallest currency unit).
  Example: `2000 NGN = 200000 kobo`.
* You must use a valid **Paystack secret key** (starts with `sk_`).

---

## 🤝 Contributing

PRs are welcome! To contribute:

```bash
git clone https://github.com/your-username/paystack-wrapper.git
cd paystack-wrapper
npm install
npm run build
```

---

## 📜 License

MIT License © 2025 \[Your Name]
