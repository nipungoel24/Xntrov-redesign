import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s\-()]{7,19}$/;

/**
 * POST /api/lead
 * Validates B2B growth audit requests and enforces an honest integration boundary.
 * Only reports `delivered: true` when `XNTROVA_LEAD_WEBHOOK_URL` is configured and responds 2xx.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot anti-spam check
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      return NextResponse.json(
        {
          ok: true,
          delivered: false,
          mode: "honeypot_filtered",
          message: "Submission filtered.",
        },
        { status: 200 }
      );
    }

    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const companyName = String(body.companyName ?? body.company ?? "").trim();
    const websiteUrl = String(body.websiteUrl ?? body.website ?? "").trim();
    const service = String(body.service ?? "").trim();
    const projectGoals = String(body.projectGoals ?? body.message ?? "").trim();

    const fieldErrors = {};

    if (fullName.length < 2) {
      fieldErrors.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = "Please enter a valid work or business email address.";
    }
    if (!PHONE_REGEX.test(phone)) {
      fieldErrors.phone = "Please enter a valid phone or WhatsApp number (8–20 digits).";
    }
    if (!service) {
      fieldErrors.service = "Please select the primary service you want to discuss.";
    }
    if (projectGoals.length < 15) {
      fieldErrors.projectGoals =
        "Please share at least 15 characters describing your business goals or challenges.";
      fieldErrors.message = fieldErrors.projectGoals;
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          mode: "validation_error",
          message: "Please correct the highlighted fields and try again.",
          fieldErrors,
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const normalizedPayload = {
      fullName,
      email,
      phone,
      companyName: companyName || "Not specified",
      websiteUrl: websiteUrl || "Not specified",
      service,
      projectGoals,
      submittedAt: new Date().toISOString(),
      source: "Xntrova Homepage Redesign",
    };

    const webhookUrl = process.env.XNTROVA_LEAD_WEBHOOK_URL?.trim();

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedPayload),
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          {
            ok: false,
            delivered: false,
            mode: "webhook_error",
            message:
              "Our configured lead endpoint returned an error. Please use the direct email or WhatsApp buttons below to reach Xntrova immediately.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          ok: true,
          delivered: true,
          mode: "live_webhook",
          referenceId: `XN-${Date.now().toString(36).toUpperCase()}`,
          message:
            "Your enquiry was delivered to Xntrova Technologies via the configured webhook endpoint.",
          payload: normalizedPayload,
        },
        { status: 200 }
      );
    }

    // Honest integration boundary when no external webhook is configured
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        mode: "assessment_boundary",
        referenceId: `XN-DEMO-${Date.now().toString(36).toUpperCase()}`,
        message:
          "Enquiry payload validated by /api/lead. Because no external CRM/SMTP webhook (XNTROVA_LEAD_WEBHOOK_URL) is configured in this assessment environment, this submission was not transmitted to Xntrova's live inbox. Use the one-click Email or WhatsApp actions below to send your pre-filled brief directly to info@xntrova.com or +91 868-382-8646.",
        payload: normalizedPayload,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        mode: "server_error",
        message:
          "Unable to process the form request. Please reach out directly via info@xntrova.com or +91 868-382-8646.",
      },
      { status: 500 }
    );
  }
}
