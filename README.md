# Lillavitas Blommor

A responsive florist website built with React, TypeScript and Vite.

The project is designed for a local flower shop and includes a customer order request form, contact section, privacy policy page, email integration, and basic spam protection.

## Features

- Responsive landing page
- Order request form
- Email sending with EmailJS
- Privacy policy page
- GDPR consent checkbox
- Basic spam protection
  - honeypot field
  - submit timing check
  - simple link filtering
- Contact section with Google Maps embed
- Footer with social media links
- Routing with React Router

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind utility classes
- EmailJS
- React Router DOM

## Project Purpose

This project was built as a practical frontend case for a florist business website.

The goal was to create a clean and modern website where customers can:
- read about the business
- browse visual inspiration
- send order requests online
- access contact details easily
- read the privacy policy before submitting personal data

## Pages

- **Home** — landing page, gallery, contact section, and form
- **Privacy Policy** — GDPR/integrity policy page

## Form Functionality

The order request form includes:

- customer name
- phone number
- email
- preferred date
- order type
- budget
- recipient
- delivery method
- preferred contact method
- card message
- extra request details

Before submission, the form also checks:

- whether the hidden honeypot field is empty
- whether the form was submitted too quickly
- whether the message contains too many links
- whether the user accepted the privacy policy

## Setup

Clone the repository:

```bash
git clone https://github.com/Graniten40/lillavitas-blommor.git