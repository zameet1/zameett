#!/usr/bin/env python3
"""Build the public Zameett Fashion Development Brief Checklist PDF."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resources" / "fashion-development-brief-checklist.pdf"

BURGUNDY = colors.HexColor("#4A0E2B")
BURGUNDY_DEEP = colors.HexColor("#350920")
GOLD = colors.HexColor("#B98735")
INK = colors.HexColor("#281F24")
MUTED = colors.HexColor("#675B61")
LINE = colors.HexColor("#D8CCC3")
PALE = colors.HexColor("#FAF7F2")
WHITE = colors.white

PAGE_W, PAGE_H = A4
MARGIN = 56
CONTENT_W = PAGE_W - (MARGIN * 2)


def draw_header(pdf):
    pdf.setFillColor(BURGUNDY_DEEP)
    pdf.rect(0, PAGE_H - 20, PAGE_W, 20, fill=1, stroke=0)
    pdf.setFillColor(BURGUNDY)
    pdf.setFont("Helvetica-Bold", 22)
    pdf.drawString(MARGIN, PAGE_H - 72, "ZAMEETT")
    pdf.setFillColor(GOLD)
    pdf.setFont("Helvetica-Bold", 7.5)
    pdf.drawString(MARGIN, PAGE_H - 85, "PROJECT PLANNING RESOURCE")


def draw_footer(pdf, page_number):
    y = 26
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.6)
    pdf.line(MARGIN, y + 13, PAGE_W - MARGIN, y + 13)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 6.8)
    pdf.drawString(MARGIN, y, "Zameett Fashion Development Brief Checklist")
    pdf.drawRightString(PAGE_W - MARGIN, y, f"Page {page_number}")


def section_title(pdf, number, title, y):
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica", 15)
    pdf.drawString(MARGIN, y, f"{number}. {title}")


def body_text(pdf, text, x, y, size=8.3):
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", size)
    pdf.drawString(x, y, text)


def field_box(pdf, x, y_top, width, height, label):
    label_h = 18
    pdf.setFillColor(PALE)
    pdf.setStrokeColor(LINE)
    pdf.setLineWidth(0.55)
    pdf.rect(x, y_top - height, width, height, fill=1, stroke=1)
    pdf.setFillColor(WHITE)
    pdf.rect(x, y_top - height, width, height - label_h, fill=1, stroke=0)
    pdf.setStrokeColor(LINE)
    pdf.line(x, y_top - label_h, x + width, y_top - label_h)
    pdf.setFillColor(BURGUNDY)
    pdf.setFont("Helvetica", 7.2)
    pdf.drawString(x + 7, y_top - 12, label)


def checkbox(pdf, x, y, label):
    size = 6.5
    pdf.setStrokeColor(MUTED)
    pdf.setLineWidth(0.55)
    pdf.rect(x, y - size + 1, size, size, fill=0, stroke=1)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 8.2)
    pdf.drawString(x + 10, y - 5, label)


def option_grid(pdf, items, y_start, rows, left_x=MARGIN, right_x=None, row_gap=18):
    right_x = right_x or (MARGIN + (CONTENT_W / 2) + 12)
    for index, label in enumerate(items):
        column = 0 if index < rows else 1
        row = index if column == 0 else index - rows
        x = left_x if column == 0 else right_x
        checkbox(pdf, x, y_start - (row * row_gap), label)


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1, invariant=1)
    pdf.setTitle("Zameett Fashion Development Brief Checklist")
    pdf.setAuthor("Zameett")
    pdf.setSubject("Free project-planning checklist for fashion design and product development")
    pdf.setKeywords("fashion development brief, tech pack checklist, sampling brief, modest wear development")

    # Page 1
    draw_header(pdf)
    pdf.setFillColor(INK)
    pdf.setFont("Helvetica", 25)
    pdf.drawString(MARGIN, PAGE_H - 126, "Fashion Development Brief Checklist")
    body_text(pdf, "Use this worksheet before requesting fashion design, technical development, sampling or production support.", MARGIN, PAGE_H - 148, 8.4)
    body_text(pdf, "Complete what you know now; open decisions can be reviewed before the scope is confirmed.", MARGIN, PAGE_H - 161, 8.4)

    section_title(pdf, 1, "Brand and contact", PAGE_H - 201)
    gap = 10
    box_w = (CONTENT_W - gap) / 2
    left = MARGIN
    right = MARGIN + box_w + gap
    field_box(pdf, left, PAGE_H - 214, box_w, 49, "Brand / company name")
    field_box(pdf, right, PAGE_H - 214, box_w, 49, "Contact name and role")
    field_box(pdf, left, PAGE_H - 273, box_w, 49, "Email and WhatsApp")
    field_box(pdf, right, PAGE_H - 273, box_w, 49, "Website / social profile")

    section_title(pdf, 2, "Required service route", PAGE_H - 353)
    body_text(pdf, "Select the closest route. Zameett will confirm the appropriate scope after reviewing the brief.", MARGIN, PAGE_H - 371)
    option_grid(pdf, [
        "Fashion design / concepts",
        "Textile print development",
        "Prototype or fit sample",
        "Production management",
        "Technical flats / tech pack",
        "Fabric and trim sourcing",
        "Modest-wear sampling / manufacturing",
        "Not sure - recommend a route",
    ], PAGE_H - 392, 4)

    section_title(pdf, 3, "Collection outline", PAGE_H - 486)
    field_box(pdf, left, PAGE_H - 500, box_w, 43, "Product category")
    field_box(pdf, right, PAGE_H - 500, box_w, 43, "Number of styles")
    field_box(pdf, left, PAGE_H - 552, box_w, 43, "Required quantity by style / colour")
    field_box(pdf, right, PAGE_H - 552, box_w, 43, "Target sizes")
    field_box(pdf, left, PAGE_H - 604, box_w, 43, "Target market / country")
    field_box(pdf, right, PAGE_H - 604, box_w, 43, "Preferred delivery date")
    field_box(pdf, left, PAGE_H - 656, box_w, 43, "Target retail price / project budget")
    field_box(pdf, right, PAGE_H - 656, box_w, 43, "Expected sales channel")
    draw_footer(pdf, 1)
    pdf.showPage()

    # Page 2
    draw_header(pdf)
    section_title(pdf, 4, "Product and material decisions", PAGE_H - 120)
    body_text(pdf, "Mark what is confirmed and explain anything that affects cost, coverage, comfort, performance or compliance.", MARGIN, PAGE_H - 138)
    option_grid(pdf, [
        "Reference images available",
        "Existing tech pack available",
        "Fabric selected",
        "Trims / labels selected",
        "Embellishment or print needed",
        "Performance or care requirements",
        "Original sketches available",
        "Physical sample available",
        "Colour standards selected",
        "Packaging selected",
        "Modesty / coverage requirements",
        "Pattern or grading information available",
    ], PAGE_H - 159, 6)
    field_box(pdf, MARGIN + 118, PAGE_H - 270, CONTENT_W - 236, 54, "Key garment details, materials and non-negotiable requirements")

    section_title(pdf, 5, "Files to share", PAGE_H - 351)
    option_grid(pdf, [
        "PDF brief",
        "Sketches or technical flats",
        "Measurement chart",
        "Brand guidelines",
        "JPG / PNG references",
        "Existing AI / tech-pack files",
        "Pattern files, if already available",
        "Drive / WeTransfer folder",
    ], PAGE_H - 372, 4)
    body_text(pdf, "Keep website uploads small. For large files, send a restricted Drive or WeTransfer link and remove access after review.", MARGIN, PAGE_H - 445, 7.2)

    section_title(pdf, 6, "Commercial and approval checkpoints", PAGE_H - 484)
    option_grid(pdf, [
        "Budget approved internally",
        "Revision allowance understood",
        "Bulk approval required",
        "Shipping and customs reviewed",
        "Decision maker identified",
        "Sample approval required",
        "Project-specific MOQ conditions noted",
        "NDA required before sharing",
    ], PAGE_H - 505, 4)
    field_box(pdf, MARGIN + 118, PAGE_H - 578, CONTENT_W - 236, 50, "Questions, risks or approval requirements")

    section_title(pdf, 7, "Before you submit", PAGE_H - 654)
    option_grid(pdf, [
        "I have stated the correct style count and quantity",
        "I understand that MOQ is project specific",
        "I will not treat inspiration images as owned artwork",
        "I have stated a realistic required date",
        "I will review the proposal's inclusions and exclusions",
        "I will confirm approvals in writing",
    ], PAGE_H - 675, 3, row_gap=17)

    pdf.setFillColor(GOLD)
    pdf.setFont("Helvetica-Bold", 7.4)
    pdf.drawString(MARGIN, PAGE_H - 745, "NEXT STEP")
    pdf.setFillColor(BURGUNDY)
    pdf.setFont("Helvetica", 17)
    pdf.drawString(MARGIN, PAGE_H - 767, "Submit your brief at zameett.com/contact")
    body_text(pdf, "This checklist is a planning aid, not a quotation, production specification, legal agreement or guarantee.", MARGIN, PAGE_H - 784, 6.9)
    body_text(pdf, "Final scope, formats, revisions, MOQ, costs, responsibilities and timeline are confirmed in the written proposal.", MARGIN, PAGE_H - 795, 6.9)
    draw_footer(pdf, 2)
    pdf.save()


if __name__ == "__main__":
    build_pdf()
    print(OUTPUT)
