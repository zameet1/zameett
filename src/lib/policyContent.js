export const POLICIES = {
  "refund-cancellation": {
    title: "Refund & Cancellation Policy",
    description: "Cancellation, refund and project-pause rules for Zameett service work.",
    intro: "Refund and cancellation eligibility depends on the work completed, committed supplier costs and the written project scope.",
    sections: [
      { title: "Before work starts", paragraphs: ["A cancellation received before work starts may be eligible for a refund less payment-processing fees and any non-recoverable reservation, research or supplier costs already approved."] },
      { title: "After work starts", paragraphs: ["Deposits compensate for reserved capacity and work performed. Completed milestones, approved deliverables, supplier commitments and non-recoverable costs are not refundable. Any balance calculation will be provided against the project record."] },
      { title: "Pause, delay and restart", items: ["Client feedback delays may move the delivery window.", "A paused project may require a restart fee and a new schedule.", "If required information remains unavailable for an extended period, Zameett may close the inactive project after written notice."] },
      { title: "Manufacturing cancellation", paragraphs: ["Once materials, trims, labels, packaging, production capacity or shipping have been committed, those costs may not be recoverable. Cancellation does not reverse third-party commitments already authorised in writing."] },
    ],
  },
  "digital-product-refund": {
    title: "Digital Product Refund Policy",
    description: "Refund rules for immediately delivered Zameett digital templates.",
    intro: "Digital products are supplied immediately or by delivery email and cannot ordinarily be returned after access has been provided.",
    sections: [
      { title: "Non-refundable after delivery", paragraphs: ["Once a download link, attachment or account download has been delivered or accessed, the purchase is non-refundable, except where mandatory consumer law requires otherwise."] },
      { title: "Before purchase", items: ["Review the listed file formats and software requirements.", "Confirm that Adobe Illustrator access is available where required.", "Understand that templates do not include validated measurements, custom patterns or garment-specific technical decisions."] },
      { title: "Delivery problems", paragraphs: ["Contact hello@zameett.com if a file is missing, corrupted or inaccessible. We will verify the order and provide a replacement delivery where appropriate."] },
      { title: "Duplicate purchases", paragraphs: ["A verified accidental duplicate transaction may be reviewed if no second delivery has been accessed and the request is made promptly."] },
    ],
  },
  "digital-product-licence": {
    title: "Digital Product Licence",
    description: "Permitted use and restrictions for Zameett digital templates.",
    intro: "A digital-product purchase grants a limited, non-exclusive, non-transferable licence to the purchasing brand or individual.",
    sections: [
      { title: "Permitted use", items: ["Edit the template for the purchasing brand's own product-development projects.", "Export working copies for suppliers involved in those projects.", "Use completed brand-specific documents commercially for the purchasing brand."] },
      { title: "Prohibited use", items: ["Resell, sublicense, share or redistribute the blank or editable template.", "Upload the source template to marketplaces, shared libraries or template services.", "Claim ownership of Zameett's underlying template design.", "Use one purchase to provide blank templates to unrelated brands or clients."] },
      { title: "No technical guarantee", paragraphs: ["The template is an organisational tool. It does not create accurate measurements, patterns, grading rules, fit approval or production suitability. Those decisions require qualified professionals and product testing."] },
      { title: "Termination", paragraphs: ["The licence ends if the purchaser breaches these restrictions. Rights in the underlying template remain with Zameett."] },
    ],
  },
  "shipping-delivery": {
    title: "Shipping & Delivery Policy",
    description: "Shipping scope, charges, customs and delivery-risk information.",
    intro: "Shipping options, cost, destination and delivery responsibility are confirmed for each physical project.",
    sections: [
      { title: "Quotes and timing", paragraphs: ["Shipping estimates are not guaranteed delivery dates. Dispatch depends on final approval, payment, packing completion, carrier availability and required export documents."] },
      { title: "Charges, duties and taxes", items: ["Shipping is charged unless expressly included in the quotation.", "Import duties, VAT, customs fees, brokerage and destination charges are normally the client's responsibility.", "Remote-area or re-delivery charges may be billed separately."] },
      { title: "Carrier delays", paragraphs: ["Customs inspection, weather, strikes, carrier disruption, incorrect delivery details and destination restrictions may delay delivery outside Zameett's reasonable control."] },
      { title: "Inspection and claims", paragraphs: ["Inspect packages promptly and retain packaging, labels and photographs if damage or shortage is suspected. Carrier claims must be reported within the applicable carrier deadline."] },
    ],
  },
  "manufacturing-terms": {
    title: "Manufacturing Terms",
    description: "Project-specific rules for reviewed modest-wear manufacturing.",
    intro: "Manufacturing is accepted only after product, quantity, materials, capability, MOQ, price and timing are reviewed.",
    sections: [
      { title: "Scope and MOQ", paragraphs: ["Flexible MOQs may be available. Final minimums depend on garment, fabric, colour, embellishment, labels, supplier requirements and capacity."] },
      { title: "Approval before bulk", paragraphs: ["Bulk production begins after written approval of the identified sample and approved specification, plus confirmation of payment and material availability. Conditional approvals must list every open issue."] },
      { title: "Tolerances and variation", items: ["Measurements are assessed against agreed tolerances, not absolute zero variation.", "Fabric shade, texture, print and handwork may vary within approved commercial limits.", "Natural fibres, dye lots and handmade embellishment can produce minor variation."] },
      { title: "Suppliers and substitutions", paragraphs: ["Third-party suppliers may perform specialised materials, trims, printing, embroidery, pattern, production or logistics work. No material substitution will be treated as approved unless confirmed through the agreed approval process."] },
      { title: "Quality checkpoints", paragraphs: ["Accepted production projects follow documented quality checkpoints before dispatch. Inspection scope and any third-party testing are defined in the project documents."] },
    ],
  },
  "sampling-policy": {
    title: "Sampling Policy",
    description: "Sample scope, corrections and approval responsibilities.",
    intro: "A sample is a development reference, not an automatic guarantee that every aspect is approved for bulk production.",
    sections: [
      { title: "Sample scope", paragraphs: ["The quotation identifies sample type, material assumptions, included correction rounds, shipping and expected deliverables."] },
      { title: "Feedback", items: ["Submit one consolidated, numbered feedback record per round.", "Distinguish required corrections from new design changes.", "Provide feedback within the agreed review window to protect the schedule."] },
      { title: "Approval", paragraphs: ["Written approval must identify the sample or version approved. Bulk approval should also confirm materials, trims, measurements, artwork, labels and packing instructions."] },
      { title: "Additional samples", paragraphs: ["New colourways, materials, designs, sizes or scope changes may require additional paid samples and revised timing."] },
    ],
  },
  "revision-policy": {
    title: "Revision Policy",
    description: "How Zameett handles included revisions and scope changes.",
    intro: "Revision rounds and deliverables are stated in the quotation or statement of work.",
    sections: [
      { title: "Included revisions", paragraphs: ["An included revision corrects or refines the agreed brief within the stated round. Unused rounds have no cash value and do not transfer between projects."] },
      { title: "Scope changes", items: ["A new garment, concept or direction is additional scope.", "Changes after approval may require a new fee and schedule.", "Supplier, material or production changes may require technical-document revisions."] },
      { title: "Feedback format", paragraphs: ["Feedback should be consolidated, numbered and linked to the current version. Conflicting comments or separate message threads may delay work until one instruction set is confirmed."] },
      { title: "Additional fees", paragraphs: ["Additional revisions are quoted before work proceeds. Urgent or out-of-sequence changes may also affect delivery timing."] },
    ],
  },
  "intellectual-property": {
    title: "Intellectual Property Policy",
    description: "Ownership, portfolio permission and third-party materials.",
    intro: "Ownership depends on the deliverable, payment status, licence and written project agreement.",
    sections: [
      { title: "Client deliverables", paragraphs: ["Unless the project agreement states otherwise, rights in custom final deliverables transfer after full payment. Working files, methods, templates and pre-existing Zameett materials remain excluded unless expressly licensed."] },
      { title: "Client-provided materials", paragraphs: ["The client confirms it has permission to use logos, artwork, references, fonts, patterns and other supplied materials and is responsible for third-party claims arising from them."] },
      { title: "Portfolio display", paragraphs: ["Custom work is not displayed as client work unless portfolio permission exists or the agreement permits it. Branding and commercially sensitive details may be removed. NDA terms take priority."] },
      { title: "Digital templates", paragraphs: ["Digital products are licensed, not sold outright. The Digital Product Licence controls their use."] },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description: "How Zameett uses essential, analytics and advertising cookies.",
    intro: "Zameett uses essential browser storage for security and functionality. Optional analytics and advertising storage is controlled through the cookie banner.",
    sections: [
      { title: "Essential storage", paragraphs: ["Essential storage supports security, sign-in, session continuity, consent choices, orders and locally dismissed interface prompts. It cannot be disabled through the website banner."] },
      { title: "Analytics", paragraphs: ["Analytics is denied by default and activated only after consent. It helps us understand page usage, device categories and marketing performance."] },
      { title: "Advertising", paragraphs: ["Advertising storage is denied by default and is activated only if selected. It may help measure campaigns and relevant advertising."] },
      { title: "Managing choices", paragraphs: ["Use the cookie banner when first visiting. You may also clear site data or block cookies in browser settings. Clearing storage may reset your consent choice."] },
    ],
  },
  "disclaimer": {
    title: "Website Disclaimer",
    description: "Limits and qualifications applying to Zameett website information.",
    intro: "Website content is general information and does not replace a project-specific technical, commercial, legal, tax or logistics review.",
    sections: [
      { title: "No automatic production suitability", paragraphs: ["Examples, templates, articles and portfolio materials do not establish that a design, measurement, material or process is suitable for a particular product or market."] },
      { title: "Estimates and availability", paragraphs: ["Prices, timelines, MOQ examples, materials, shipping and capacity may change. Only a written quotation or agreement confirms a project offer."] },
      { title: "Third-party links and services", paragraphs: ["Zameett is not responsible for the availability, policies or content of third-party platforms, suppliers, carriers, payment processors or external links."] },
      { title: "Professional review", paragraphs: ["Seek qualified legal, tax, customs, safety, pattern, fit and technical advice appropriate to the product, transaction and destination."] },
    ],
  },
};

export function getPolicy(slug) { return POLICIES[slug]; }
