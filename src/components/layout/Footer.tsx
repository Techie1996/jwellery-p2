import Link from "next/link";

const CUSTOMER_SERVICE_LINKS = [
  "Customer Service Overview",
  "Order Status",
  "Gift Card Balance",
  "Shipping",
  "Returns & Exchange",
  "Contact Us",
  "Size Guide",
  "Store Finder",
  "Book an Appointment",
];

const MEMBERSHIP_LINKS = ["Register", "Swarovski Club", "Crystal Society (SCS)"];

const ABOUT_LINKS = [
  "About Swarovski",
  "Jobs & Career",
  "Alumni Community",
  "For Professionals",
  "Sitemap",
  "Swarovski Created Diamonds",
  "Kristallwelten",
  "Code of Conduct & Policies",
];

const LEGAL_LINKS = [
  "Terms Of Use",
  "Terms & Conditions",
  "Privacy Policy",
  "Cookie Consent",
  "Imprint",
  "REACH information",
  "Data Protection Consent Statement",
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-neutral-900 text-neutral-200">
      <div className="page-shell py-10">
        <div className="grid gap-10 border-b border-neutral-700 pb-10 md:grid-cols-2 lg:grid-cols-[2fr,1fr,1fr,1fr]">
          <FooterColumn title="Customer Service & FAQ" links={CUSTOMER_SERVICE_LINKS} />
          <FooterColumn title="Membership" links={MEMBERSHIP_LINKS} />
          <FooterColumn title="About Us" links={ABOUT_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-[11px] text-neutral-400 sm:flex-row">
          <div>© 2026 Swarovski-inspired Demo. All rights reserved.</div>
          <div className="tracking-[0.16em] uppercase">India · English</div>
        </div>

        <div className="flex items-center justify-center pb-6">
          <span className="font-heading text-[24px] tracking-[0.32em] text-white">
            SWAROVSKI
          </span>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: string[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase text-white">
        {title}
      </h3>
      <ul className="space-y-2 text-[13px] leading-relaxed text-neutral-300">
        {links.map((label) => (
          <li key={label}>
            <Link href="/" className="hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

