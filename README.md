# 🧾 React Invoicing System

<div align="center">
  
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

A clean, responsive, and dynamic invoicing system built using **React**, **TypeScript**, and **Tailwind CSS**. This project was created as part of a Frontend Developer assessment and showcases modern React development practices with features like authentication, invoice CRUD operations, dynamic forms, local storage persistence, and a professional printable invoice interface.

---

## 📸 Preview

<div align="center">
  <img src="./public/screenshot.png" alt="React Invoicing System Preview" width="800" />
</div>
<div align="center">
  <img src="./public/screenshot1.png" alt="React Invoicing System Preview" width="800" />
</div>
<div align="center">
  <img src="./public/screenshot2.png" alt="React Invoicing System Preview" width="800" />
</div>
<div align="center">
  <img src="./public/screenshot3.png" alt="React Invoicing System Preview" width="800" />
</div>
<div align="center">
  <img src="./public/screenshot4.png" alt="React Invoicing System Preview" width="800" />
</div>

---

## 🔗 Live Demo

You can try the live application here:  
👉 **[https://reactinvoiceapp.netlify.app/](https://reactinvoiceapp.netlify.app/)**

---

## ✨ Key Features

### 🔐 Authentication System

- **User Registration** with form validation
- **Secure Login** with error handling
- **Session Management** using localStorage tokens
- **Protected Routes** for authenticated users only

### 📋 Invoice Management

- **Create Invoices** with dynamic product rows
- **Edit & Update** existing invoices
- **Delete Invoices** with confirmation dialogs
- **View Invoice List** with search and filter capabilities
- **Real-time Calculations** for subtotals, taxes, and totals

### 🖨️ Professional Output

- **Print-Optimized View** with clean formatting
- **Responsive Design** that works on all devices
- **Export-Ready** invoice layout for professional use

### 💾 Data Persistence

- **Local Storage Integration** for offline functionality
- **Data Validation** with TypeScript interfaces
- **Error Handling** for data operations

---

## 🛠️ Tech Stack

<div align="center">

| Category               | Technology       |
| ---------------------- | ---------------- |
| **Frontend Framework** | React 18+        |
| **Language**           | TypeScript       |
| **Styling**            | Tailwind CSS     |
| **UI Components**      | Shadcn/ui        |
| **Routing**            | React Router DOM |
| **Icons**              | Lucide React     |
| **Notifications**      | Sonner           |
| **State Management**   | Zustand          |

</div>

---

## 🗃️ Local Storage Schema

| Storage Key  | Type        | Description                                |
| ------------ | ----------- | ------------------------------------------ |
| `users`      | `User[]`    | Array of registered users with credentials |
| `auth_token` | `string`    | JWT-like token for authentication state    |
| `user_data`  | `User`      | Current authenticated user information     |
| `invoices`   | `Invoice[]` | Complete list of user's invoices           |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/lenlo121500/react-invoice-app
   cd react-invoice-app
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

---

## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Register.tsx
│   ├── Dashboard/
│   │   └── Dashboard.tsx
│   ├── Invoice/
│   │   ├── InvoiceDetailsForm.tsx
│   │   ├── InvoiceForm.tsx
│   │   ├── InvoiceHeader.tsx
│   │   ├── InvoiceList.tsx
│   │   ├── InvoicePrintSection.tsx
│   │   ├── PrintInvoiceButton.tsx
│   │   ├── ProductRow.tsx
│   │   └── ProductsTable.tsx
│   ├── Layout/
│   │   └── Navbar.tsx
│   └── ui/
├── hooks/
│   ├── use-invoice-form.ts
│   └── use-mobile.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── store/
│   └── init/
│       ├── InitAuth.tsx
│       ├── InitInvoice.tsx
│       ├── useAuthStore.ts
│       └── useInvoiceStore.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

---

## 🖨️ Print Functionality

The application includes a sophisticated print system:

1. **Print Button** - Available on invoice detail pages
2. **Print Preview** - Opens a clean, formatted view
3. **Auto-formatting** - Hides UI elements and optimizes layout
4. **Professional Output** - Line items and totals

### How to Print

1. Navigate to any invoice
2. Click the "Print Invoice" button
3. Browser's print dialog will open
4. Select your printer or save as PDF

---

## 🔧 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint checks        |

---

## 🌟 Future Enhancements

### High Priority

- [ ] **PDF Export** - Download invoices as PDF files
- [ ] **Email Integration** - Send invoices directly to clients
- [ ] **Invoice Templates** - Multiple professional templates
- [ ] **Company Logo Upload** - Branded invoice headers

### Medium Priority

- [ ] **Backend API Integration** - Replace localStorage with database
- [ ] **Multi-user Support** - User roles and permissions
- [ ] **Advanced Filtering** - Date ranges, status filters
- [ ] **Bulk Operations** - Select and manage multiple invoices

### Low Priority

- [ ] **CSV/JSON Import/Export** - Data portability
- [ ] **Recurring Invoices** - Automated invoice generation
- [ ] **Payment Tracking** - Invoice status management
- [ ] **Reporting Dashboard** - Analytics and insights

---

## 📄 Environment Variables

Create a `.env` file in the project root:

```bash
# API Configuration (Future Implementation)
REACT_APP_API_URL=https://your-api-url.com

# App Configuration
REACT_APP_NAME=React Invoice System
REACT_APP_VERSION=1.0.0

# Optional: Analytics
REACT_APP_GOOGLE_ANALYTICS=your-ga-id
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**Raul Castillo**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/raulc8808/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:raulc8808@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://lenlo121500.github.io/lenlodev-portfolio)

</div>

---

<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Built%20with-React-blue?style=for-the-badge&logo=react"/>
</div>
