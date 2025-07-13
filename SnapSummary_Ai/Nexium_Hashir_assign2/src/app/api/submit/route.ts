export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = body.input;

    // Capture IP from headers
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'Unknown';

    // Forward to n8n webhook
    const webhookRes = await fetch('https://hashir123.app.n8n.cloud/webhook/summarize-blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await webhookRes.json();

    const summary = data.summary || 'No summary returned.';

    console.log("SUMMARY FROM n8n:", summary);

    return Response.json({ summary });

  } catch (error) {
    console.error("Server error:", error);
    return Response.json({ summary: 'Server error occurred.' }, { status: 500 });
  }
}

