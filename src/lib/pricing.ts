/** Published package prices. Keep marketing copy, terms, and Stripe constants in sync. */
export const DESIGN_BUILD = 499;
export const DOMAIN_LAUNCH = 229;
export const HOSTING_MONTHLY = 69;
export const TERM_MONTHS = 12;

export const UPFRONT = DESIGN_BUILD + DOMAIN_LAUNCH;
export const HOSTING_YEAR = HOSTING_MONTHLY * TERM_MONTHS;
export const FIRST_YEAR = UPFRONT + HOSTING_YEAR;
export const FIRST_CHARGE = UPFRONT + HOSTING_MONTHLY;

export const LANDING_PAGE_CENTS = DESIGN_BUILD * 100;
export const DOMAIN_SETUP_CENTS = DOMAIN_LAUNCH * 100;
export const HOSTING_MONTHLY_CENTS = HOSTING_MONTHLY * 100;
export const INITIAL_CHARGE_CENTS =
  LANDING_PAGE_CENTS + DOMAIN_SETUP_CENTS + HOSTING_MONTHLY_CENTS;

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
