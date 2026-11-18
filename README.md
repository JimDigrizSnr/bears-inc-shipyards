# Bears Inc Shipyards

An industrial operations and fleet production management platform for EVE Online corporations.

## Overview

Bears Inc Shipyards provides:

- Ship catalogue management
- Fleet quote requests
- Production tracking
- Inventory management
- Order fulfilment workflows
- Operational dashboards

The application is built with:

- Next.js
- TypeScript
- Supabase
- Tailwind CSS

---

## Features

### Public Site

- Homepage
- Ship catalogue
- Dynamic ship detail pages
- Fleet order request form

### Admin Dashboard

- Operational metrics
- Low stock alerts
- Recent quotes
- Recent production jobs

### Quote Management

- View fleet requests
- Update quote status
- Quote detail pages
- Order timeline tracking

### Production Management

- Create production jobs
- Track production progress
- Complete production jobs
- Production detail pages

### Inventory Management

- Ship inventory tracking
- Stock adjustment controls
- Low stock monitoring

### Automation

Production completion automatically:

- Updates inventory
- Marks production completed
- Updates linked quote status

---

## Workflow

Customer Request

↓

Quote

↓

Production Job

↓

Production Complete

↓

Inventory Updated

↓

Ready For Delivery

↓

Delivered

---

## Database Tables

### ships

Stores ship catalogue and inventory.

### fleet_quotes

Stores customer fleet requests.

### production_jobs

Tracks active production jobs.

### quote_history

Audit trail and timeline data.

---

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## Future Roadmap

### Version 1.1

- Admin authentication
- Dashboard improvements
- Advanced analytics

### Version 1.2

- Slack notifications
- Email notifications
- Reporting

### Version 2.0

- EVE Online SSO
- Character verification
- Corporation verification
- ESI integration"# bears-inc-shipyards" 
