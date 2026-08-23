import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal-document";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — smallbusinesslandingpages.com",
  description:
    "Terms for inquiring about and purchasing a one-page website from smallbusinesslandingpages.com.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Service" updated="23 August 2026">
      <p>
        These Terms of Service (“Terms”) govern your use of {SITE_NAME} at{" "}
        <a href={SITE_URL}>{SITE_URL}</a> and the one-page website service
        described on that site. By browsing the site, submitting an inquiry, or
        engaging us to design, launch, or host a page, you agree to these Terms.
      </p>
      <p>
        If you do not agree, do not use the site or send an inquiry. A paid
        project does not start until we confirm scope and price with you in
        writing (email is enough).
      </p>

      <h2>1. Who we are and what we offer</h2>
      <p>
        {SITE_NAME} provides an inquiry-based service: we design and build a
        custom one-page website for a local business, help launch it on a
        domain registered in the customer’s business name, and host and
        maintain that page under a monthly plan.
      </p>
      <p>The standard package published on the site is:</p>
      <ul>
        <li>
          <strong>$399 one-time</strong> — website design and build, including
          two revision rounds after you review the first custom design.
        </li>
        <li>
          <strong>$129 one-time</strong> — domain registration and launch setup
          for a standard available domain: first-year registration in the
          customer’s business name, DNS, SSL, and connecting the domain to the
          live page.
        </li>
        <li>
          <strong>$59 per month</strong> — hosting, maintenance, and support,
          with a <strong>12-month commitment</strong> that starts when the site
          is launched (or on another start date we confirm in writing).
        </li>
      </ul>
      <p>
        Those amounts describe the standard package only. They are not a bid
        for photography, extra pages, custom software, advertising, or ongoing
        copywriting. Work outside the package is quoted separately and starts
        only after you approve the quote.
      </p>

      <h2>2. Inquiries are not orders</h2>
      <p>
        Submitting the form or emailing {CONTACT_EMAIL} starts a conversation.
        It is not an order, a reservation of a specific domain, a guarantee of
        availability, or a binding purchase. We may decline an inquiry (for
        example, if the business is a poor fit, the requested work is outside
        the package, or we cannot take the project).
      </p>
      <p>
        By submitting an inquiry you ask us to contact you by email and phone
        about this service. You confirm that the information you provide is
        accurate and that you are authorized to discuss the named business.
      </p>

      <h2>3. When a contract is formed</h2>
      <p>
        A paid engagement begins only when we send written confirmation of
        scope, price, and what you will provide (content, photos, approvals),
        and you accept that confirmation. These Terms then apply together with
        that confirmation. If the confirmation conflicts with these Terms, the
        confirmation controls for that project.
      </p>
      <p>
        We do not collect payment on this marketing website. Payment method,
        invoice timing, and any deposit will be stated in the written
        confirmation.
      </p>

      <h2>4. What the standard package includes — and what it does not</h2>
      <h3>Included</h3>
      <ul>
        <li>A custom single-page website for the agreed business.</li>
        <li>Two revision rounds after the first design review.</li>
        <li>
          Basic search-engine setup: page title, description, and indexing
          basics so search engines can find the page.
        </li>
        <li>
          SSL and connecting a standard available domain registered in your
          business name, as described in the $129 launch fee.
        </li>
        <li>
          After launch, hosting, routine maintenance, and support for the page
          as built, under the $59/month plan.
        </li>
      </ul>
      <h3>Not included / not promised</h3>
      <ul>
        <li>
          Leads, sales, phone calls, or Google (or other) search rankings. We
          do not guarantee results of any kind.
        </li>
        <li>
          A multi-page website, online store, customer login, or custom app.
        </li>
        <li>
          Paid ads, social-media management, or reputation marketing.
        </li>
        <li>
          Professional photography, drone video, or unlimited copy rewrites.
        </li>
        <li>
          A month-to-month hosting plan during the initial 12-month term.
        </li>
        <li>
          Premium, trademarked, or otherwise restricted domain names. “Standard
          available domain” means an ordinary domain that the registrar can
          register in the ordinary course, at ordinary first-year cost covered
          by the $129 fee. Unusual strings, aftermarket names, or extra
          registry fees are quoted separately or declined.
        </li>
      </ul>

      <h2>5. Your responsibilities</h2>
      <p>You agree to:</p>
      <ul>
        <li>
          Provide timely, accurate content and approvals so we can design and
          launch the page.
        </li>
        <li>
          Own or have rights to all text, photos, logos, and trademarks you
          send us, and grant us a license to use them to build, host, and
          display the page.
        </li>
        <li>
          Ensure the page does not advertise illegal services or content you
          are not allowed to publish.
        </li>
        <li>
          Review the page before launch and tell us about errors in hours,
          prices, phone numbers, or claims.
        </li>
        <li>
          Keep your own privacy notice on the live page if you collect personal
          information from your visitors (for example, a contact form).
        </li>
      </ul>
      <p>
        Delays in content or approval delay launch. We are not responsible for
        lost business during that wait.
      </p>

      <h2>6. Revisions and additional work</h2>
      <p>
        Two revision rounds means two rounds of reasonable changes to the
        agreed one-page design (layout, copy tweaks, colors, and similar), not
        a new business concept or a different site type. Extra rounds, new
        sections, extra pages, or a change in offer are additional work.
      </p>
      <p>
        Additional work is quoted first. We do not start it until you approve
        the quote. If you ask for extra work in passing and we have not quoted
        it, we may remind you that it is out of scope rather than silently
        expanding the project.
      </p>

      <h2>7. Domains</h2>
      <p>
        The standard available domain is registered in your business name. You
        own that domain registration. The $129 fee covers first-year
        registration of that standard domain plus DNS, SSL, and launch
        connection.
      </p>
      <p>
        Domain availability, registry rules, and registrar processes are
        outside our full control. We will tell you if a requested name cannot
        be registered as a standard domain. After the first year, domain
        renewal is billed by the registrar (or as we otherwise confirm in
        writing); it is not included in the $59 monthly hosting fee unless we
        expressly say so.
      </p>
      <p>
        We do not guarantee a particular name, a particular launch date tied
        only to registry speed, or that third-party email (Google Workspace,
        Microsoft 365, or similar) will be configured as part of the standard
        package unless the written confirmation includes it.
      </p>

      <h2>8. Hosting, maintenance, and the 12-month term</h2>
      <p>
        Monthly hosting, maintenance, and support is $59 per month with a
        12-month commitment. During that term the plan is not month-to-month.
        It typically covers keeping the one-page site online, applying routine
        updates, and helping with the page as built—not a custom development
        retainer.
      </p>
      <p>
        If you want to end hosting or transfer the site before the initial term
        ends, contact us. Remaining months of the commitment remain payable
        unless we agree otherwise in writing. After the initial term, renewal
        and cancellation will follow whatever we confirm at that time (we will
        not surprise you with a different monthly rate without notice).
      </p>
      <p>
        We may suspend hosting for non-payment, abuse, illegal content, or
        security risk, after notice where reasonably practical.
      </p>

      <h2>9. Intellectual property</h2>
      <p>
        You retain ownership of your pre-existing brand assets and content. We
        retain ownership of our underlying tools, templates, and methods.
      </p>
      <p>
        When you have paid the design/build fee in full, you receive a license
        to use the finished one-page design for your business on the hosted
        site (and, if hosting later ends and we provide export files, to use
        those files for that same business). You may not resell our design as a
        template to other businesses or claim our portfolio work as unrelated
        third-party design.
      </p>
      <p>
        We may show screenshots of your public page in our portfolio and
        marketing unless you ask us in writing not to.
      </p>

      <h2>10. Acceptable use</h2>
      <p>
        You may not use this site or a hosted page to send spam, malware, or
        unlawful content; to infringe others’ rights; or to attack or overload
        our systems. We may refuse or take down content that we reasonably
        believe violates this rule or applicable law.
      </p>

      <h2>11. Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> describes how we handle
        inquiry and hosting-related information. By using the site or sending
        an inquiry, you acknowledge that policy.
      </p>

      <h2>12. Warranties and disclaimers</h2>
      <p>
        The marketing site and the service are provided on an “as is” and “as
        available” basis. We work in good faith to deliver the standard package
        described in the written confirmation, but we do not warrant
        uninterrupted hosting, error-free software, or any particular business
        outcome.
      </p>
      <p>
        Search engines, maps listings, and social platforms have their own
        rules. Basic on-page title and description setup is not SEO retainers,
        citation building, or a ranking guarantee.
      </p>
      <p>
        To the fullest extent permitted by law, we disclaim implied warranties
        of merchantability, fitness for a particular purpose, and
        non-infringement.
      </p>

      <h2>13. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we are not liable for lost
        profits, lost leads, loss of data, reputational harm, or any indirect,
        incidental, special, or consequential damages arising from the site,
        an inquiry, delay, hosting interruption, or a project.
      </p>
      <p>
        Our total liability for a paid engagement will not exceed the amounts
        you actually paid us for that engagement in the 12 months before the
        claim. Our total liability arising only from use of the marketing site
        (with no paid engagement) will not exceed $100.
      </p>
      <p>
        Some jurisdictions do not allow certain limitations. In those places,
        our liability is limited to the maximum extent the law allows. Nothing
        in these Terms limits liability that cannot legally be limited,
        including liability for fraud or for death or personal injury caused by
        negligence where such a limit is prohibited.
      </p>

      <h2>14. Indemnity</h2>
      <p>
        You will defend and indemnify us against claims arising from content
        you provided, your business’s services, your misuse of the page, or
        your violation of these Terms or third-party rights (including
        trademark and copyright claims about materials you asked us to publish).
      </p>

      <h2>15. Refunds</h2>
      <p>
        Because design work begins after written confirmation, the $399
        design/build fee is not a casual deposit you can reverse after we have
        started custom design, except as required by law or as we agree in
        writing. If we have not started design and you cancel immediately after
        confirmation, we will discuss a fair reversal of unearned fees.
      </p>
      <p>
        Domain registration fees paid to a registry are often non-refundable
        once the name is registered. Monthly hosting is earned as the month is
        provided; unused months of an early-terminated 12-month term remain
        subject to Section 8.
      </p>

      <h2>16. Third-party services</h2>
      <p>
        Hosting, DNS, domain registrars, email delivery, and similar vendors
        have their own terms. Outages or policy changes at those vendors can
        affect launch timing or uptime. We are not those vendors and do not
        control the public internet.
      </p>

      <h2>17. Site use</h2>
      <p>
        You may not scrape, copy, or republish this marketing site in a way
        that competes with us or misrepresents affiliation. All site content we
        publish is owned by us or used with permission.
      </p>

      <h2>18. Changes</h2>
      <p>
        We may update these Terms by posting a new version on this page. The
        “Last updated” date will change. For an active paid engagement, material
        changes to fees or the 12-month hosting commitment will not apply
        retroactively unless you agree or the law requires it.
      </p>

      <h2>19. General</h2>
      <p>
        These Terms are the agreement for use of this marketing site and, with
        the written confirmation, for a standard-package engagement. If a court
        finds a part unenforceable, the rest remains in effect. Our failure to
        enforce a provision is not a waiver. You may not assign a project
        without our consent; we may assign these Terms in connection with a
        business transfer.
      </p>
      <p>
        These Terms are governed by the laws of the United States and the state
        in which the operator of {SITE_NAME} principally conducts this
        business, without regard to conflict-of-law rules. Courts in that state
        will have venue, except that we may seek injunctive relief in any
        appropriate forum to protect intellectual property or stop abuse.
      </p>

      <h2>20. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalDocument>
  );
}
