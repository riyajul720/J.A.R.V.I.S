
export default {
  async fetch(request, env) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    };

    if (request.method !== "POST") {
      return Response.json(
        { error: "Use POST to send a message." },
        { status: 405, headers }
      );
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON request." },
        { status: 400, headers }
      );
    }

    if (
      typeof body.message !== "string" ||
      body.message.trim().length === 0
    ) {
      return Response.json(
        { error: "Please provide a message." },
        { status: 400, headers }
      );
    }

    if (body.message.length > 4000) {
      return Response.json(
        { error: "Message is too long. Limit: 4000 characters." },
        { status: 413, headers }
      );
    }

    return Response.json({
      agent: "J.A.R.V.I.S.",
      status: "backend_ready",
      glm_connected: false,
      message: "Your backend is running. GLM is not connected yet."
    }, { headers });
  }
};
        
