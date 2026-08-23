import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal-document";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — smallbusinesslandingpages.com",
  description:
    "How smallbusinesslandingpages.com collects, uses, and protects inquiry and website information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" updated="23 August 2026">
      <p>
        This Privacy Policy explains how {SITE_NAME} (“we,” “us,” or “our”)
        collects, uses, shares, and protects personal information. It applies to{" "}
        <a href={SITE_URL}>{SITE_URL}</a>, the inquiry form on that site, and
        emails you send to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <p>
        We design, build, and host one-page websites for local businesses. This
        policy is written for that service. It is not a generic template, and it
        does not cover advertising networks, payment processors, or analytics
        products that we do not currently operate on this marketing site.
      </p>
      <p>
        A paid website engagement, if you later agree to one in writing, may
        involve additional information (for example, business copy, photos, or
        domain registration details). How we handle that work is described in
        the section on customer websites below.
      </p>

      <h2>1. Who this policy covers</h2>
      <p>This policy covers:</p>
      <ul>
        <li>
          Visitors to {SITE_NAME}, including people who only browse the page.
        </li>
        <li>
          People who submit the inquiry form or email us about the standard
          package.
        </li>
        <li>
          Business owners whose one-page websites we later build or host, to the
          extent we process their information as a service provider.
        </li>
      </ul>
      <p>
        It does <strong>not</strong> automatically govern visitors to a
        customer’s live landing page. If a customer’s page collects names,
        emails, or other visitor information, that customer is typically the
        business responsible for that collection. We host and maintain the page
        as a service provider. See “Customer websites we host.”
      </p>

      <h2>2. Information we collect</h2>
      <h3>Information you provide</h3>
      <p>
        If you use the inquiry form, we collect the fields the form requires:
        name, business name, email address, phone number, and business type. We
        do not ask for payment card numbers, Social Security numbers, or
        government IDs on this website.
      </p>
      <p>
        If you email {CONTACT_EMAIL}, we collect whatever you include in that
        message and any follow-up correspondence.
      </p>
      <p>
        After an inquiry, if we work together, you may later send business
        content such as service descriptions, hours, photos, logos, addresses,
        or domain preferences. We use that material to design, launch, and
        support your page.
      </p>

      <h3>Information collected automatically</h3>
      <p>
        Like most websites, our hosting environment may record technical
        request data needed to operate and secure the site. That can include
        Internet Protocol (IP) address, date and time of the request, pages
        requested, browser and device type, and referral URL. We do not run a
        third-party advertising pixel or analytics product on this marketing
        site today.
      </p>
      <p>
        When you submit the inquiry form, our server also uses your IP address
        for abuse prevention (including a short-term limit on how many inquiries
        can be sent from the same address). A hidden “website” field is included
        only as a bot check. If that field is filled, we treat the submission as
        automated and do not process it as a customer inquiry.
      </p>

      <h3>Cookies and similar technologies</h3>
      <p>
        This marketing site does not set advertising or analytics cookies. The
        hosting platform may set strictly necessary technical cookies required
        to deliver or protect the site. We do not use cookies to build a
        marketing profile or to sell advertising. If we add analytics or
        non-essential cookies later, we will update this policy and, where
        required, provide a consent mechanism before those technologies run.
      </p>

      <h2>3. How we use information</h2>
      <p>We use personal information to:</p>
      <ul>
        <li>
          Receive, review, and respond to inquiries about the one-page website
          offer.
        </li>
        <li>
          Contact you by email or phone about fit, pricing, timeline, domain
          availability, and next steps.
        </li>
        <li>
          Prevent spam, fraud, and automated abuse of the inquiry form.
        </li>
        <li>Operate, secure, and troubleshoot this website.</li>
        <li>
          Perform a later written engagement: design, revisions, domain
          registration in your business name, launch, hosting, maintenance, and
          support.
        </li>
        <li>Comply with law, enforce our Terms, and protect our rights.</li>
      </ul>
      <p>
        We do not use inquiry information to create a public directory of
        businesses. We do not sell personal information. We do not share
        personal information for cross-context behavioral advertising.
      </p>

      <h2>4. Legal bases (EEA, UK, and similar laws)</h2>
      <p>
        If European or United Kingdom data-protection law applies to a
        particular visitor, we process personal information on these bases as
        applicable:
      </p>
      <ul>
        <li>
          <strong>Contract or steps prior to contract:</strong> responding to an
          inquiry you sent, and performing a website engagement you later
          accept.
        </li>
        <li>
          <strong>Legitimate interests:</strong> operating a secure website,
          preventing spam, and following up on a business inquiry you initiated.
        </li>
        <li>
          <strong>Consent:</strong> where we ask for it, including any future
          non-essential cookies or optional marketing that is not a direct
          response to your inquiry.
        </li>
        <li>
          <strong>Legal obligation:</strong> records we must keep to comply with
          law.
        </li>
      </ul>
      <p>
        You may withdraw consent where processing is based on consent, without
        affecting prior lawful processing.
      </p>

      <h2>5. How we share information</h2>
      <p>
        We share information only as needed to run this service, not as a
        product we sell.
      </p>
      <ul>
        <li>
          <strong>Email delivery:</strong> inquiry submissions are sent to our
          team using Resend, an email delivery provider. Message content is
          stored in the resulting email inbox we use to reply to you.
        </li>
        <li>
          <strong>Hosting and infrastructure:</strong> this marketing site is
          hosted on a cloud platform (currently Vercel). DNS for the domain is
          configured through our domain/DNS provider. Those providers may
          process technical logs as part of hosting.
        </li>
        <li>
          <strong>Domain registration:</strong> if you later hire us, we register
          a standard available domain in your business name through a domain
          registrar. The registrar and registry receive the registration data
          required to issue the domain.
        </li>
        <li>
          <strong>Professional advisers and legal process:</strong> we may share
          information with accountants or lawyers under confidentiality, or if
          required by law, court order, or to protect safety and rights.
        </li>
        <li>
          <strong>Business transfer:</strong> if this business is sold or
          merged, inquiry and customer records may transfer with it, subject to
          this policy or a successor notice.
        </li>
      </ul>
      <p>
        We do not operate on-site checkout. If we later invoice you, payment
        card data would be handled by the payment provider you use to pay—not
        stored in the inquiry form.
      </p>

      <h2>6. Customer websites we host</h2>
      <p>
        After launch, we host the customer’s one-page website. Two different
        roles apply:
      </p>
      <ul>
        <li>
          <strong>Your information as our customer:</strong> we are responsible
          for how we handle your name, contact details, and the content you give
          us to put on the page.
        </li>
        <li>
          <strong>Visitors to your live page:</strong> you are generally
          responsible for what your page says and any forms or tracking you ask
          us to add. Server and security logs created while hosting your page
          (such as IP addresses in access logs) may be processed by us and our
          hosting providers solely to keep the site online, diagnose issues, and
          prevent abuse. We do not sell those logs.
        </li>
      </ul>
      <p>
        If you want a contact form, booking tool, analytics, or chat on your
        page, we will treat that as additional work. Those tools often send
        visitor data to third parties you choose. You should have your own
        privacy notice on your page when you collect personal information from
        your customers.
      </p>

      <h2>7. Retention</h2>
      <p>
        Inquiry emails and related correspondence are kept as long as needed to
        respond, evaluate whether to work together, and maintain a record of
        the conversation. If we do not proceed, we may still keep the inquiry
        for a reasonable period to prevent abuse and for legitimate business
        records, then delete or archive it.
      </p>
      <p>
        If we host your site, we keep customer and site-content records for the
        life of the engagement and for a reasonable period afterward for
        backups, tax, and dispute purposes. Hosting logs are kept according to
        our infrastructure providers’ default periods unless we have a longer
        security need.
      </p>
      <p>
        In-memory rate-limit data about inquiry IP addresses is short-lived
        (measured in hours, not years) and is not a customer database.
      </p>

      <h2>8. Security</h2>
      <p>
        We use HTTPS on this site, limit who can read inquiry inboxes, and rely
        on reputable hosting and email providers. No method of transmission or
        storage is perfectly secure. Do not send payment card numbers or
        sensitive identification documents through the inquiry form.
      </p>

      <h2>9. Your privacy rights</h2>
      <p>
        Depending on where you live, you may have the right to request access
        to the personal information we hold about you, correction of inaccurate
        information, deletion, a copy in a portable format, restriction or
        objection to certain processing, and withdrawal of consent.
      </p>
      <p>
        Residents of California and other U.S. states with consumer privacy
        laws may also have rights to know, delete, correct, and opt out of sale
        or sharing of personal information, and not to be discriminated against
        for exercising those rights. We do not sell or share personal
        information as those terms are used in the California Consumer Privacy
        Act (as amended by the CPRA). We do not use or disclose sensitive
        personal information to infer characteristics. We do not have actual
        knowledge that we sell or share the personal information of consumers
        under 16.
      </p>
      <p>
        To make a request, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the subject
        “Privacy request.” We will verify the request using the contact details
        you previously provided (for example, by replying to the same email
        address). We will not require you to create an account. You may
        authorize an agent where the law allows; we may still need to verify
        both you and the agent.
      </p>
      <p>
        If we deny a request, you may appeal by replying to our decision email.
        If you are in the EEA or UK, you may also complain to your local
        supervisory authority.
      </p>

      <h2>10. Children</h2>
      <p>
        This service is for businesses and adults. We do not knowingly collect
        personal information from children under 16. If you believe a child
        submitted an inquiry, contact us and we will delete it.
      </p>

      <h2>11. International processing</h2>
      <p>
        We and our providers may process information in the United States and
        other countries where our hosting and email vendors operate. Those
        countries may have different data-protection rules than your home
        country.
      </p>

      <h2>12. Do Not Track and Global Privacy Control</h2>
      <p>
        Because we do not sell or share personal information for advertising,
        we treat a Global Privacy Control or similar opt-out signal as
        consistent with our existing practice: we still do not sell or share
        that information. We do not currently change site content based on Do
        Not Track browser headers.
      </p>

      <h2>13. Changes</h2>
      <p>
        We will post updates on this page and change the “Last updated” date.
        If we start collecting new categories of information, add advertising
        or analytics, or materially change how we use inquiry data, we will
        update this policy before or at the time those changes take effect.
      </p>

      <h2>14. Contact</h2>
      <p>
        Privacy questions and requests:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
      <p>
        Related: our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalDocument>
  );
}
